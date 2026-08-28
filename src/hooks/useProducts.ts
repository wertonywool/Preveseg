import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { INITIAL_PRODUCTS } from '../data/defaultCatalog';

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
  destacado?: boolean;
  visible?: boolean;
  variantes?: any[];
  lo_que_incluye?: string[];
  caracteristicas?: string[];
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(INITIAL_PRODUCTS);
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

  const processProducts = (items: any[]): Product[] => items.map(item => ({
    ...item,
    imagenes: normalizeArray(item.imagenes),
    variantes: normalizeArray(item.variantes),
    categoria: normalizeArray(item.categoria),
    lo_que_incluye: normalizeArray(item.lo_que_incluye),
    caracteristicas: normalizeArray(item.caracteristicas),
    precio_normal: parseFloat(item.precio_normal) || 0,
    precio_oferta: parseFloat(item.precio_oferta) || 0
  }));

  useEffect(() => {
    const fetchAndFilter = async () => {
      let allProducts = INITIAL_PRODUCTS;
      const cachedProducts = sessionStorage.getItem('products_cache');
      
      if (cachedProducts) {
        try {
          const parsed = JSON.parse(cachedProducts);
          if (Array.isArray(parsed) && parsed.length > 0) {
            allProducts = processProducts(parsed);
          }
        } catch (e) {
          console.error(e);
        }
      }

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

      if (!error && data && data.length > 0) {
        const processed = processProducts(data);
        setProducts(processed);
        sessionStorage.setItem('products_cache', JSON.stringify(processed));
        applyFilters(searchTerm, activeCategory, sortBy, processed);
      }
    } catch (error: any) {
      // Graceful fallback to initial products
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

