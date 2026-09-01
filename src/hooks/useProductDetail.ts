import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { useCart } from '../context/CartContext';
import { INITIAL_PRODUCTS } from '../data/defaultCatalog';

export interface Variant {
  tipo: string;
  valor: string;
  imagenUrl?: string;
  precio_oferta?: string;
  precio_normal?: string;
  color?: string;
}

export interface Product {
  id: string;
  nombre: string;
  categoria: string[];
  descripcion: string;
  precio_normal: number;
  precio_oferta: number;
  imagenes: string[];
  detalles: Array<{ clave: string; valor: string }>;
  variantes: Variant[];
  youtube_url?: string;
  custom_html?: string;
  custom_css?: string;
  lo_que_incluye?: string[];
  caracteristicas?: string[];
  es_kit?: boolean;
}

export const useProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMedia, setActiveMedia] = useState({ type: 'image', url: '' });
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [showYoutube, setShowYoutube] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');

  const WHATSAPP_NUMBER = '573046296285';

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

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      if (!id) return setDebugInfo('ID de producto no encontrado');

      // Fetch current product
      const { data } = await supabase
        .from('productos')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      let foundProduct = null;

      if (data) {
        foundProduct = {
          ...data,
          imagenes: normalizeArray(data.imagenes),
          detalles: normalizeArray(data.detalles),
          variantes: normalizeArray(data.variantes),
          categoria: normalizeArray(data.categoria),
          lo_que_incluye: normalizeArray(data.lo_que_incluye),
          caracteristicas: normalizeArray(data.caracteristicas),
          precio_normal: parseFloat(data.precio_normal) || 0,
          precio_oferta: parseFloat(data.precio_oferta) || 0,
          nombre: data.nombre || 'Producto sin nombre',
          descripcion: data.descripcion || 'Sin descripción'
        };
      } else {
        // Search in INITIAL_PRODUCTS
        const fallback = INITIAL_PRODUCTS.find(p => p.id === id);
        if (fallback) {
          foundProduct = {
            ...fallback,
            detalles: [],
            variantes: fallback.variantes || [],
            categoria: fallback.categoria || [],
            lo_que_incluye: fallback.lo_que_incluye || [],
            caracteristicas: fallback.caracteristicas || []
          };
        }
      }

      if (!foundProduct) {
        setDebugInfo('El producto no existe o ha sido eliminado.');
        return;
      }

      const productData: Product = foundProduct as Product;
      setProduct(productData);
      const imgs = productData.imagenes || [];
      setActiveMedia({ type: 'image', url: imgs.length > 0 ? imgs[0] : '' });

      // Fetch recommended products
      const { data: allProducts, error: allErr } = await supabase
        .from('productos')
        .select('*')
        .eq('visible', true)
        .neq('id', id)
        .limit(10);

      if (!allErr && allProducts && allProducts.length > 0) {
        const shuffled = allProducts
          .sort(() => 0.5 - Math.random())
          .slice(0, 2)
          .map(item => ({
            ...item,
            imagenes: normalizeArray(item.imagenes),
            precio_normal: parseFloat(item.precio_normal) || 0,
            precio_oferta: parseFloat(item.precio_oferta) || 0
          }));
        setRecommendedProducts(shuffled as Product[]);
      } else {
        const fallbackRecs = INITIAL_PRODUCTS
          .filter(p => p.id !== id)
          .slice(0, 2)
          .map(item => ({
            ...item,
            detalles: [],
            variantes: item.variantes || [],
            categoria: item.categoria || []
          }));
        setRecommendedProducts(fallbackRecs as Product[]);
      }

    } catch (err: any) {
      console.error('Crash preventing error:', err);
      setDebugInfo(`Error al cargar: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleVariantSelect = useCallback((tipo: string, valor: string, imagenUrl?: string) => {
    setSelectedVariants(prev => ({ ...prev, [tipo]: valor }));
    if (imagenUrl) {
      setActiveMedia({ type: 'image', url: imagenUrl });
      setShowYoutube(false);
    }
  }, []);

  const variants = product?.variantes || [];
  
  // Pre-calculate prices based on selection
  let currentOfferPrice = product?.precio_oferta || 0;
  let currentNormalPrice = product?.precio_normal || 0;

  Object.entries(selectedVariants).forEach(([tipo, valor]) => {
    const variantMatch = variants.find((v: Variant) => v.tipo === tipo && v.valor === valor);
    if (variantMatch) {
      if (variantMatch.precio_oferta) {
        currentOfferPrice = parseFloat(variantMatch.precio_oferta);
      }
      if (variantMatch.precio_normal) {
        currentNormalPrice = parseFloat(variantMatch.precio_normal);
      }
    }
  });

  const groupedVariants = variants.reduce((acc: Record<string, Variant[]>, v: Variant) => {
    if (v && v.tipo && v.valor) {
      if (!acc[v.tipo]) acc[v.tipo] = [];
      acc[v.tipo].push(v);
    }
    return acc;
  }, {});

  const validateSelection = useCallback(() => {
    const requiredTypes = Object.keys(groupedVariants);
    const missing = requiredTypes.filter(type => !selectedVariants[type]);
    if (missing.length > 0) {
      alert(`Por favor, selecciona las siguientes opciones: ${missing.join(', ')}`);
      return false;
    }
    return true;
  }, [groupedVariants, selectedVariants]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    if (!validateSelection()) return;
    
    const variantSuffix = Object.values(selectedVariants).join(' / ');
    addToCart({
      id: product.id,
      nombre: variantSuffix ? `${product.nombre} (${variantSuffix})` : product.nombre,
      precio_oferta: currentOfferPrice,
      precio_normal: currentNormalPrice,
      imagenes: product.imagenes
    });
  }, [product, selectedVariants, currentOfferPrice, currentNormalPrice, addToCart, validateSelection]);

  const handleWhatsAppInquiry = useCallback(() => {
    if (!product) return;
    if (!validateSelection()) return;

    const variantSuffix = Object.values(selectedVariants).join(' / ');
    const productUrl = window.location.href;
    const message = `Hola Preveseg Cali, solicito cotización formal para el siguiente equipo:\n\n• *${product.nombre}* ${variantSuffix ? `\n• Opción / Especificación: ${variantSuffix}` : ''}\n• Ubicación: Cra 28D 72f-79, Cali / A coordinar\n\n🔗 Enlace: ${productUrl}\n\n¿Me confirman disponibilidad y tiempos de entrega?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  }, [product, selectedVariants, validateSelection]);

  const getYoutubeId = useCallback((url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  }, []);

  const getYoutubeThumbnail = useCallback((url: string) => {
    const videoId = getYoutubeId(url);
    if (!videoId) return '';
    // Use hqdefault as it's more reliable than maxresdefault for all videos including shorts
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }, [getYoutubeId]);

  const getYoutubeEmbedUrl = useCallback((url: string) => {
    const videoId = getYoutubeId(url);
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }, [getYoutubeId]);

  return {
    product,
    loading,
    activeMedia,
    setActiveMedia,
    selectedVariants,
    showYoutube,
    setShowYoutube,
    debugInfo,
    handleVariantSelect,
    handleAddToCart,
    handleWhatsAppInquiry,
    getYoutubeThumbnail,
    getYoutubeEmbedUrl,
    groupedVariants,
    currentOfferPrice,
    currentNormalPrice,
    recommendedProducts,
    navigate
  };
};
