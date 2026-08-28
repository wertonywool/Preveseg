import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string[];
  precio_normal: number;
  precio_oferta: number;
  imagenes: string[];
  youtube_url: string;
  en_oferta: boolean;
  variantes?: any[];
  lo_que_incluye?: string[];
  caracteristicas?: string[];
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  
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

  useEffect(() => {
    const fetchAndFilter = async () => {
      const processProducts = (items: any[]) => items.map(item => ({
        ...item,
        imagenes: normalizeArray(item.imagenes),
        variantes: normalizeArray(item.variantes),
        categoria: normalizeArray(item.categoria),
        lo_que_incluye: normalizeArray(item.lo_que_incluye),
        caracteristicas: normalizeArray(item.caracteristicas),
        precio_normal: parseFloat(item.precio_normal) || 0,
        precio_oferta: parseFloat(item.precio_oferta) || 0
      }));

      let allProducts = [];
      const cachedProducts = sessionStorage.getItem('products_cache');
      
      if (cachedProducts) {
        allProducts = processProducts(JSON.parse(cachedProducts));
        setProducts(allProducts);
        setLoading(false);
        fetchProducts(true); // Background refresh
      } else {
        allProducts = await fetchProducts();
      }

      // Check for category in URL
      const params = new URLSearchParams(location.search);
      const catParam = params.get('categoria');
      if (catParam) {
        setActiveCategory(catParam);
        applyFilters(searchTerm, catParam, allProducts);
      } else {
        setFilteredProducts(allProducts);
      }
    };

    fetchAndFilter();
  }, [location.search]);

  const fetchProducts = async (isBackground = false) => {
    try {
      if (!isBackground) setLoading(true);
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('visible', true);

      if (error) throw error;
      if (data) {
        const processed = data.map(item => ({
          ...item,
          imagenes: normalizeArray(item.imagenes),
          variantes: normalizeArray(item.variantes),
          categoria: normalizeArray(item.categoria),
          lo_que_incluye: normalizeArray(item.lo_que_incluye),
          caracteristicas: normalizeArray(item.caracteristicas),
          precio_normal: parseFloat(item.precio_normal) || 0,
          precio_oferta: parseFloat(item.precio_oferta) || 0
        }));

        setProducts(processed);
        sessionStorage.setItem('products_cache', JSON.stringify(processed));
        return processed;
      }
      return [];
    } catch (error: any) {
      console.error('Error fetching products:', error.message);
      return [];
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, activeCategory, products);
  };

  const filterByCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    applyFilters(searchTerm, categoryId, products);
  };

  const applyFilters = (term: string, categoryId: string, allProducts: Product[]) => {
    let filtered = [...allProducts];
    
    if (categoryId !== 'todos') {
      filtered = filtered.filter(p => 
        p.categoria.some(c => c.toLowerCase() === categoryId.toLowerCase())
      );
    }
    
    if (term) {
      filtered = filtered.filter(p => 
        (p.nombre?.toLowerCase().includes(term.toLowerCase()) || false) || 
        (p.descripcion?.toLowerCase().includes(term.toLowerCase()) || false)
      );
    }
    
    setFilteredProducts(filtered);
  };

  return {
    filteredProducts,
    loading,
    activeCategory,
    searchTerm,
    handleSearch,
    filterByCategory
  };
};
