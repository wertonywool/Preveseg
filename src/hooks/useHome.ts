import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { INITIAL_CATEGORIES } from '../data/defaultCatalog';

interface Category {
  id: number;
  nombre: string;
  slug: string;
  imagen_url?: string;
}

export const useHome = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Purge any legacy mock cache
    try {
      sessionStorage.removeItem('home_products_cache');
    } catch (e) {}

    fetchData();
  }, []);

  const normalizeArray = (val: any) => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') {
      try { return JSON.parse(val); } catch(e) { return []; }
    }
    return [];
  };

  const processProducts = (items: any[]) => (items || []).map(item => {
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
      precio_normal: parseFloat(item.precio_normal) || 0,
      precio_oferta: parseFloat(item.precio_oferta) || 0
    };
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [featuredRes, categoriesRes] = await Promise.all([
        supabase.from('productos').select('*').eq('visible', true).eq('destacado', true).order('id', { ascending: false }).limit(4),
        supabase.from('categorias').select('*').eq('visible', true).order('nombre', { ascending: true })
      ]);

      if (featuredRes.data && Array.isArray(featuredRes.data)) {
        setFeaturedProducts(processProducts(featuredRes.data));
      } else {
        setFeaturedProducts([]);
      }

      if (categoriesRes.data && categoriesRes.data.length > 0) {
        setCategories(categoriesRes.data.map((d: any) => ({
          id: d.id,
          nombre: d.nombre,
          slug: d.slug || d.nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
          imagen_url: d.imagen_url || d.foto || ''
        })));
      }

    } catch (error: any) {
      console.error('Error fetching home data:', error.message);
      setFeaturedProducts([]);
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


