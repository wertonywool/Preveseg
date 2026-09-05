import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string[];
  precio_normal: number;
  precio_oferta: number;
  imagenes: string[];
  youtube_url: string;
  en_oferta: boolean;
  es_kit?: boolean;
  destacado?: boolean;
  visible?: boolean;
  variantes?: any[];
  lo_que_incluye?: string[];
  caracteristicas?: string[];
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'offer' | 'price-asc' | 'price-desc' | 'featured'>('default');
  
  const location = useLocation();

  const normalizeArray = (val: any) => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') {
      if (val.trim().startsWith('[') || val.trim().startsWith('{')) {
        try { 
          const parsed = JSON.parse(val); 
          return Array.isArray(parsed) ? parsed : [parsed];
        } catch(e) { return val.split(',').map(s => s.trim()).filter(Boolean); }
      }
      return val.split(',').map(s => s.trim()).filter(Boolean);
    }
    return [];
  };

  const processProducts = (items: any[]): Product[] => items.map(item => {
    const rawDetalles = normalizeArray(item.detalles);
    const rawCategoria = normalizeArray(item.categoria);
    const isKit = Boolean(item.es_kit) || 
      rawDetalles.some((d: any) => d.clave === '_es_kit' && (d.valor === 'true' || d.valor === true)) ||
      rawCategoria.some((c: any) => String(c).toLowerCase().includes('kit'));

    return {
      ...item,
      es_kit: isKit,
      imagenes: normalizeArray(item.imagenes),
      variantes: normalizeArray(item.variantes),
      categoria: rawCategoria,
      detalles: rawDetalles.filter((d: any) => d.clave !== '_es_kit'),
      lo_que_incluye: normalizeArray(item.lo_que_incluye),
      caracteristicas: normalizeArray(item.caracteristicas),
      precio_normal: parseFloat(item.precio_normal) || 0,
      precio_oferta: parseFloat(item.precio_oferta) || 0
    };
  });

  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        sessionStorage.removeItem('products_cache');
      } catch (e) {}

      let allProducts: Product[] = [];
      setProducts(allProducts);

      // Check for category in URL
      const params = new URLSearchParams(location.search);
      const catParam = params.get('categoria');
      const searchParam = params.get('q') || '';
      
      if (searchParam) setSearchTerm(searchParam);
      
      if (catParam) {
        setActiveCategory(catParam);
        applyFilters(searchParam || searchTerm, catParam, sortBy, allProducts);
      } else {
        applyFilters(searchParam || searchTerm, 'todos', sortBy, allProducts);
      }

      // Fetch fresh from Supabase in background
      await fetchRemoteProducts();
    };

    fetchAndFilter();
  }, [location.search]);

  const fetchRemoteProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('visible', true);

      if (!error && data && Array.isArray(data)) {
        const processed = processProducts(data);
        setProducts(processed);
        applyFilters(searchTerm, activeCategory, sortBy, processed);
      } else {
        setProducts([]);
        applyFilters(searchTerm, activeCategory, sortBy, []);
      }
    } catch (error: any) {
      setProducts([]);
      applyFilters(searchTerm, activeCategory, sortBy, []);
    }
  };

  const applyFilters = (term: string, categoryId: string, sortMode: string, sourceProducts: Product[]) => {
    let filtered = [...sourceProducts];
    
    if (categoryId && categoryId.toLowerCase() !== 'todos') {
      const target = categoryId.toLowerCase().trim();
      filtered = filtered.filter(p => {
        if (!p.categoria || p.categoria.length === 0) return false;
        return p.categoria.some(c => {
          const cat = String(c).toLowerCase().trim();
          return cat === target || cat.includes(target) || target.includes(cat);
        });
      });
    }
    
    if (term.trim()) {
      const q = term.toLowerCase().trim();
      filtered = filtered.filter(p => 
        (p.nombre?.toLowerCase().includes(q) || false) || 
        (p.descripcion?.toLowerCase().includes(q) || false) ||
        (p.categoria?.some(c => c.toLowerCase().includes(q)) || false)
      );
    }

    if (sortMode === 'offer') {
      filtered = filtered.filter(p => p.en_oferta);
    } else if (sortMode === 'price-asc') {
      filtered.sort((a, b) => a.precio_oferta - b.precio_oferta);
    } else if (sortMode === 'price-desc') {
      filtered.sort((a, b) => b.precio_oferta - a.precio_oferta);
    } else if (sortMode === 'featured') {
      filtered = filtered.filter(p => p.destacado);
    }
    
    setFilteredProducts(filtered);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, activeCategory, sortBy, products);
  };

  const filterByCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    applyFilters(searchTerm, categoryId, sortBy, products);
  };

  const handleSortChange = (sort: 'default' | 'offer' | 'price-asc' | 'price-desc' | 'featured') => {
    setSortBy(sort);
    applyFilters(searchTerm, activeCategory, sort, products);
  };

  return {
    filteredProducts,
    totalProducts: products.length,
    loading,
    activeCategory,
    searchTerm,
    sortBy,
    handleSearch,
    filterByCategory,
    handleSortChange
  };
};

