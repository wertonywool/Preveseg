import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { optimizeImage } from '../services/imageOptimizer';

export const useAdminProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [availableVariantTypes, setAvailableVariantTypes] = useState<string[]>(['color', 'capacidad', 'otro']);

  const [product, setProduct] = useState({
    nombre: '', 
    descripcion: '', 
    categoria: [] as string[],
    precioNormal: '', 
    precioOferta: '', 
    youtubeUrl: '',
    destacado: false,
    enOferta: false,
    imagenes: [] as File[], 
    existingImages: [] as string[],
    detalles: [] as { clave: string, valor: string }[],
    variantes: [] as any[],
    loQueIncluye: [] as string[],
    caracteristicas: [] as string[],
    customHtml: '',
    customCss: ''
  });
  
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') return navigate('/login');
    fetchAdminProducts();

    try {
      const savedTypes = localStorage.getItem('customVariantTypes');
      if (savedTypes) {
        const parsed = JSON.parse(savedTypes);
        if (Array.isArray(parsed)) {
          setAvailableVariantTypes(Array.from(new Set([...parsed, 'color', 'capacidad', 'otro'])));
        }
      }
    } catch (e) {
      console.error('Error loading variant types:', e);
    }

    if (location.state && (location.state as any).editProduct) {
      startEdit((location.state as any).editProduct);
      // Clear state after use to avoid re-triggering on next location change
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [navigate, location.state, location.pathname]);

  const fetchAdminProducts = async () => {
    try {
      const { data, error } = await supabase.from('productos').select('*').order('id', { ascending: false }).limit(100);
      if (error) throw error;
      if (data) {
        const normalized = data.map(p => ({
          ...p,
          imagenes: normalizeArray(p.imagenes),
          detalles: normalizeArray(p.detalles),
          variantes: normalizeArray(p.variantes),
          categoria: normalizeArray(p.categoria),
          loQueIncluye: normalizeArray(p.lo_que_incluye),
          caracteristicas: normalizeArray(p.caracteristicas)
        }));
        setDbProducts(normalized);
        const types = new Set(['color', 'capacidad', 'otro']);
        normalized.forEach(p => {
          p.variantes.forEach((v: any) => { if(v && v.tipo) types.add(v.tipo); });
        });
        const updatedTypes = Array.from(types);
        setAvailableVariantTypes(updatedTypes);
        localStorage.setItem('customVariantTypes', JSON.stringify(updatedTypes));
      }
    } catch (err) {
      console.error('Error fetching admin products:', err);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCategoryToggle = (catName: string) => {
    setProduct(prev => {
      const current = Array.isArray(prev.categoria) ? prev.categoria : [prev.categoria].filter(Boolean);
      const exists = current.includes(catName);
      
      let newCategories;
      if (exists) {
        // Si ya es la principal (index 0) y hay más, quitarla. Si es la única, quitarla.
        // Si no es la principal, volverla la principal (mover al inicio).
        if (current[0] === catName) {
          newCategories = current.filter(c => c !== catName);
        } else {
          newCategories = [catName, ...current.filter(c => c !== catName)];
        }
      } else {
        newCategories = [...current, catName];
      }
      
      return {
        ...prev,
        categoria: newCategories
      };
    });
  };

  const handleListUpdate = (field: 'loQueIncluye' | 'caracteristicas', action: 'add' | 'remove', value: string, index?: number) => {
    setProduct(prev => {
      const currentList = [...(prev[field] || [])];
      if (action === 'add' && value.trim()) {
        currentList.push(value.trim());
      } else if (action === 'remove' && index !== undefined) {
        currentList.splice(index, 1);
      }
      return { ...prev, [field]: currentList };
    });
  };

  const handleImageUpload = async (e: any) => {
    if (e.target.files) {
      const files = Array.from(e.target.files) as File[];
      setLoading(true);
      try {
        const optimizedFiles = await Promise.all(files.map((f: File) => optimizeImage(f)));
        setProduct(prev => ({ ...prev, imagenes: [...prev.imagenes, ...optimizedFiles] }));
        setPreviews(prev => [...prev, ...optimizedFiles.map(f => URL.createObjectURL(f))]);
      } catch (err) {
        console.error('Error optimizando imágenes:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const normalizeArray = (val: any): any[] => {
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

  const startEdit = (p: any) => {
    setEditingId(p.id);
    const normalizedVars = normalizeArray(p.variantes);
    
    const currentTypes = new Set(availableVariantTypes);
    normalizedVars.forEach((v: any) => {
      if (v && v.tipo) currentTypes.add(v.tipo);
    });
    const updatedTypes = Array.from(currentTypes);
    setAvailableVariantTypes(updatedTypes);
    localStorage.setItem('customVariantTypes', JSON.stringify(updatedTypes));

    setProduct({
      nombre: p.nombre || '', 
      descripcion: p.descripcion || '', 
      categoria: normalizeArray(p.categoria),
      precioNormal: p.precio_normal?.toString() || '', 
      precioOferta: p.precio_oferta?.toString() || '',
      youtubeUrl: p.youtube_url || '', 
      destacado: p.destacado || false,
      enOferta: p.en_oferta || false,
      imagenes: [], 
      existingImages: normalizeArray(p.imagenes),
      detalles: normalizeArray(p.detalles),
      variantes: normalizedVars,
      loQueIncluye: normalizeArray(p.lo_que_incluye),
      caracteristicas: normalizeArray(p.caracteristicas),
      customHtml: p.custom_html || '',
      customCss: p.custom_css || ''
    });
    setPreviews([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setProduct({ 
      nombre: '', descripcion: '', categoria: [], precioNormal: '', precioOferta: '', 
      youtubeUrl: '', destacado: false, enOferta: false, imagenes: [], existingImages: [], detalles: [], variantes: [],
      loQueIncluye: [], caracteristicas: [],
      customHtml: '', customCss: ''
    });
    setPreviews([]);
    navigate('/wertonywool', { replace: true, state: {} });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (loading) return;

    // Validación básica
    if (!product.nombre.trim()) {
      alert('El nombre del producto es obligatorio');
      return;
    }
    if (!product.categoria || product.categoria.length === 0) {
      alert('Selecciona al menos una categoría');
      return;
    }
    if (!product.precioNormal || isNaN(parseFloat(product.precioNormal))) {
      alert('Ingresa un precio normal válido');
      return;
    }

    setLoading(true);
    
    try {
      const finalUrls = [...product.existingImages];
      
      for (const file of product.imagenes) {
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
        const { error: uploadError } = await supabase.storage.from('productos_fotos').upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from('productos_fotos').getPublicUrl(fileName);
        finalUrls.push(publicUrl);
      }

      const processedVariantes = [];
      const currentVars = normalizeArray(product.variantes);
      for (const v of currentVars) {
        let variantImgUrl = v.imagenUrl || '';
        if (v.file instanceof File) {
          const fileName = `var-${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
          const { error: uploadError } = await supabase.storage.from('productos_fotos').upload(fileName, v.file);
          if (uploadError) throw uploadError;
          const { data: { publicUrl } } = supabase.storage.from('productos_fotos').getPublicUrl(fileName);
          variantImgUrl = publicUrl;
        }
        
        const { file, ...variantToSave } = v;
        processedVariantes.push({ ...variantToSave, imagenUrl: variantImgUrl });
      }
      
      const productData: any = { 
        nombre: product.nombre, 
        descripcion: product.descripcion, 
        categoria: JSON.stringify(product.categoria), 
        precio_normal: parseFloat(product.precioNormal) || 0, 
        precio_oferta: parseFloat(product.precioOferta) || 0, 
        imagenes: finalUrls, 
        youtube_url: product.youtubeUrl,
        detalles: normalizeArray(product.detalles),
        variantes: processedVariantes,
        lo_que_incluye: JSON.stringify(product.loQueIncluye),
        caracteristicas: JSON.stringify(product.caracteristicas),
        destacado: Boolean(product.destacado),
        en_oferta: Boolean(product.enOferta),
        visible: true,
        custom_html: product.customHtml,
        custom_css: product.customCss
      };
      
      let result;
      if (editingId) {
        result = await supabase.from('productos').update(productData).eq('id', editingId).select();
      } else {
        result = await supabase.from('productos').insert([productData]).select();
      }
      
      if (result.error) {
        throw result.error;
      }
      
      alert(editingId ? '¡Producto actualizado con éxito!' : '¡Producto publicado con éxito!');
      cancelEdit(); 
      await fetchAdminProducts();
    } catch (err: any) { 
      console.error('Error saving product:', err);
      alert('Error al guardar: ' + (err.message || 'Error desconocido')); 
    } finally { 
      setLoading(false); 
    }
  };

  const addDetail = () => {
    setProduct(prev => ({ ...prev, detalles: [...normalizeArray(prev.detalles), { clave: '', valor: '' }] }));
  };

  const updateDetail = (index: number, field: 'clave' | 'valor', value: string) => {
    setProduct(prev => {
      const newDetalles = [...normalizeArray(prev.detalles)];
      if (newDetalles[index]) {
        newDetalles[index][field] = value;
      }
      return { ...prev, detalles: newDetalles };
    });
  };

  const setAllDetails = (newDetails: { clave: string, valor: string }[]) => {
    setProduct(prev => ({ ...prev, detalles: newDetails }));
  };

  const removeDetail = (index: number) => {
    setProduct(prev => ({ ...prev, detalles: normalizeArray(prev.detalles).filter((_, i) => i !== index) }));
  };

  const addVariant = () => {
    const newVariant = { tipo: 'color', valor: '', color: '#000000', precio_normal: '', precio_oferta: '', imagenUrl: '' };
    setProduct(prev => ({ ...prev, variantes: [...normalizeArray(prev.variantes), newVariant] }));
  };

  const updateVariant = async (index: number, field: string, value: any) => {
    let finalValue = value;
    
    // Si estamos subiendo una foto de variante, optimizarla
    if (field === 'file' && value instanceof File) {
      setLoading(true);
      try {
        finalValue = await optimizeImage(value, 800, 0.7);
      } catch (err) {
        console.error('Error optimizando imagen de variante:', err);
      } finally {
        setLoading(false);
      }
    }

    setProduct(prev => {
      const newVariantes = [...normalizeArray(prev.variantes)];
      if (newVariantes[index]) {
        newVariantes[index][field] = finalValue;
      }
      return { ...prev, variantes: newVariantes };
    });
  };

  const removeVariant = (index: number) => {
    setProduct(prev => ({ ...prev, variantes: normalizeArray(prev.variantes).filter((_, i) => i !== index) }));
  };

  const toggleVisibility = async (id: number, current: boolean) => {
    try {
      const { error } = await supabase.from('productos').update({ visible: !current }).eq('id', id);
      if (error) throw error;
      fetchAdminProducts();
    } catch (err: any) {
      alert('Error al cambiar visibilidad: ' + err.message);
    }
  };

  const deleteProduct = async (id: number) => {
    if(confirm('¿Seguro que quieres borrar este producto?')) { 
      try {
        const { error } = await supabase.from('productos').delete().eq('id', id); 
        if (error) throw error;
        fetchAdminProducts(); 
      } catch (err: any) {
        alert('Error al eliminar: ' + err.message);
      }
    }
  };

  const toggleFeatured = async (id: number, current: boolean) => {
    try {
      const { error } = await supabase.from('productos').update({ destacado: !current }).eq('id', id);
      if (error) throw error;
      fetchAdminProducts();
    } catch (err: any) {
      alert('Error al cambiar destacado: ' + err.message);
    }
  };

  return {
    product,
    setProduct,
    previews,
    setPreviews,
    loading,
    dbProducts,
    editingId,
    availableVariantTypes,
    handleInputChange,
    handleImageUpload,
    handleSubmit,
    cancelEdit,
    addDetail,
    updateDetail,
    setAllDetails,
    removeDetail,
    addVariant,
    updateVariant,
    removeVariant,
    toggleVisibility,
    toggleFeatured,
    startEdit,
    deleteProduct,
    handleCategoryToggle,
    handleListUpdate
  };
};
