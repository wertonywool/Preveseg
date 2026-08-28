import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

interface Product {
  id: string;
  nombre: string;
  categoria: string;
  precio_normal: number;
  precio_oferta: number;
  imagenes: string[];
  youtube_url: string;
  en_oferta: boolean;
  created_at?: string;
  variantes?: any[];
}

interface Category {
  id: number;
  nombre: string;
  slug: string;
  imagen_url?: string;
}

export const useHome = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

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
        setFeaturedProducts(processProducts(featured));
        if (cats) setCategories(cats);
        setLoading(false);
        fetchData(true); // Refrescar en background
      } catch (e) {
        console.error('Error parsing cache:', e);
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

      if (featuredRes.data) setFeaturedProducts(processProducts(featuredRes.data));
      if (categoriesRes.data) setCategories(categoriesRes.data);

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

