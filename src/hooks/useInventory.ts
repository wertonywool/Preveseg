import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

export const useInventory = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchInventory();
  }, []);

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

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.from('productos').select('*').order('id', { ascending: false });
      if (data) {
        const processed = data.map(p => {
          const rawDetalles = normalizeArray(p.detalles);
          const rawCategoria = normalizeArray(p.categoria);
          const isKit = Boolean(p.es_kit) || 
            rawDetalles.some((d: any) => d.clave === '_es_kit' && (d.valor === 'true' || d.valor === true)) ||
            rawCategoria.some((c: any) => String(c).toLowerCase().includes('kit'));

          return {
            ...p,
            es_kit: isKit,
            categoria: rawCategoria,
            detalles: rawDetalles.filter((d: any) => d.clave !== '_es_kit')
          };
        });
        setProducts(processed);
        setFiltered(processed);
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filteredList = products.filter(p => {
      const search = term.toLowerCase();
      const categories = Array.isArray(p.categoria) ? p.categoria : [];
      return (p.nombre?.toLowerCase().includes(search) || false) || 
             categories.some((c: string) => c.toLowerCase().includes(search));
    });
    setFiltered(filteredList);
  };

  const toggleVisibility = async (id: number, current: boolean) => {
    try {
      const { error } = await supabase.from('productos').update({ visible: !current }).eq('id', id);
      if (error) throw error;
      await fetchInventory();
    } catch (err: any) {
      alert('Error al cambiar visibilidad: ' + err.message);
    }
  };

  const toggleDestacado = async (id: number, current: boolean) => {
    try {
      const { error } = await supabase.from('productos').update({ destacado: !current }).eq('id', id);
      if (error) throw error;
      await fetchInventory();
    } catch (err: any) {
      alert('Error al cambiar destacado: ' + err.message + '\n\nAsegúrate de que la columna "destacado" existe en Supabase.');
    }
  };

  const deleteProduct = async (id: number) => {
    if (confirm('¿Borrar definitivamente?')) {
      const { error } = await supabase.from('productos').delete().eq('id', id);
      if (!error) fetchInventory();
    }
  };

  const startEdit = (p: any) => {
    navigate('/Admin_panel', { state: { editProduct: p } });
  };

  return {
    filtered,
    loading,
    searchTerm,
    handleSearch,
    toggleVisibility,
    toggleDestacado,
    deleteProduct,
    startEdit,
    navigate,
    stats: {
      total: products.length,
      visible: products.filter(p => p.visible).length,
      hidden: products.filter(p => !p.visible).length,
      featured: products.filter(p => p.destacado).length
    }
  };
};
