import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../data/defaultCatalog';

interface Category {
  id: number;
  nombre: string;
  slug: string;
  imagen_url?: string;
}

export const useHome = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>(
    INITIAL_PRODUCTS.filter(p => p.destacado || p.en_oferta).slice(0, 4)
  );
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const normalizeArray = (val: any) => {
      if (Array.isArray(val)) return val;
      if (typeof val === 'string') {
        try { return JSON.parse(val); } catch(e) { return []; }
      }
      return [];
    };

    const processProducts = (items: any[]) => items.map(item => ({
      ...item,
      imagenes: normalizeArray(item.imagenes),
      variantes: normalizeArray(item.variantes),
      precio_normal: parseFloat(item.precio_normal) || 0,
      precio_oferta: parseFloat(item.precio_oferta) || 0
    }));

    const cached = sessionStorage.getItem('home_products_cache');
    if (cached) {
      try {
        const { featured, cats } = JSON.parse(cached);
        if (featured && featured.length > 0) setFeaturedProducts(processProducts(featured));
        if (cats && cats.length > 0) setCategories(cats);
        fetchData(true); // Refrescar en background
      } catch (e) {
        fetchData();
      }
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async (isBackground = false) => {
    try {
      if (!isBackground) setLoading(true);
      
      const [featuredRes, categoriesRes] = await Promise.all([
        supabase.from('productos').select('*').eq('visible', true).eq('destacado', true).order('created_at', { ascending: false }).limit(4),
        supabase.from('categorias').select('*').eq('visible', true).order('nombre', { ascending: true })
      ]);

      const normalizeArray = (val: any) => {
        if (Array.isArray(val)) return val;
        if (typeof val === 'string') {
          try { return JSON.parse(val); } catch(e) { return []; }
        }
        return [];
      };

      const processProducts = (items: any[]) => items.map(item => ({
        ...item,
        imagenes: normalizeArray(item.imagenes),
        variantes: normalizeArray(item.variantes),
        precio_normal: parseFloat(item.precio_normal) || 0,
        precio_oferta: parseFloat(item.precio_oferta) || 0
      }));

      if (featuredRes.data && featuredRes.data.length > 0) {
        setFeaturedProducts(processProducts(featuredRes.data));
      }
      if (categoriesRes.data && categoriesRes.data.length > 0) {
        setCategories(categoriesRes.data);
      }

      if (featuredRes.data && categoriesRes.data) {
        sessionStorage.setItem('home_products_cache', JSON.stringify({
          featured: processProducts(featuredRes.data),
          cats: categoriesRes.data
        }));
      }

    } catch (error: any) {
      console.error('Error fetching home data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    featuredProducts,
    categories,
    loading
  };
};


