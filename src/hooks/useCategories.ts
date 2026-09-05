import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { optimizeImage } from '../services/imageOptimizer';
import { INITIAL_CATEGORIES } from '../data/defaultCatalog';

export interface Category {
  id: number;
  nombre: string;
  slug: string;
  visible: boolean;
  imagen_url?: string;
  created_at?: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('categorias')
        .select('*')
        .order('nombre', { ascending: true });

      if (error) {
        // Fallback to initial categories
      } else if (data && data.length > 0) {
        setCategories(data.map((d: any) => ({
          id: d.id,
          nombre: d.nombre,
          slug: d.slug || d.nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
          visible: d.visible,
          imagen_url: d.imagen_url || d.foto || '',
          descripcion: d.descripcion || ''
        })));
      }
    } catch (err) {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  const uploadCategoryImage = async (file: File) => {
    try {
      const optimized = await optimizeImage(file, 800, 0.7);
      const fileName = `cat-${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
      const { error: uploadError } = await supabase.storage
        .from('productos_fotos')
        .upload(fileName, optimized);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('productos_fotos')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (err) {
      console.error('Error uploading category image:', err);
      throw err;
    }
  };

  const createCategory = async (nombre: string, imageFile?: File) => {
    setLoading(true);
    const slug = nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    try {
      let imagen_url = '';
      if (imageFile) {
        imagen_url = await uploadCategoryImage(imageFile);
      }

      const { data, error } = await supabase
        .from('categorias')
        .insert([{ nombre, visible: true, foto: imagen_url, descripcion: '' }])
        .select();

      if (error) throw error;
      if (data && data[0]) {
        const newCat: Category = {
          id: data[0].id,
          nombre: data[0].nombre,
          slug,
          visible: data[0].visible,
          imagen_url: data[0].foto || imagen_url
        };
        setCategories(prev => [...prev, newCat].sort((a, b) => a.nombre.localeCompare(b.nombre)));
        return newCat;
      }
    } catch (err: any) {
      alert('Error al crear categoría: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id: number, oldName: string, updates: Partial<Category>, newImageFile?: File) => {
    setLoading(true);
    try {
      const payload: any = {};
      if (updates.nombre !== undefined) payload.nombre = updates.nombre;
      if (updates.visible !== undefined) payload.visible = updates.visible;
      if (updates.imagen_url !== undefined) payload.foto = updates.imagen_url;

      if (newImageFile) {
        const uploadedUrl = await uploadCategoryImage(newImageFile);
        payload.foto = uploadedUrl;
        updates.imagen_url = uploadedUrl;
      }

      const { error: catError } = await supabase
        .from('categorias')
        .update(payload)
        .eq('id', id);

      if (catError) throw catError;

      // Actualizar productos si el nombre cambió
      if (updates.nombre && updates.nombre !== oldName) {
        try {
          const { data: prods } = await supabase.from('productos').select('id, categoria');
          if (prods && prods.length > 0) {
            for (const p of prods) {
              let cats: string[] = [];
              if (Array.isArray(p.categoria)) {
                cats = p.categoria;
              } else if (typeof p.categoria === 'string') {
                try {
                  const parsed = JSON.parse(p.categoria);
                  cats = Array.isArray(parsed) ? parsed : [parsed];
                } catch (e) {
                  cats = [p.categoria];
                }
              }

              if (cats.includes(oldName)) {
                const updatedCats = cats.map(c => c === oldName ? updates.nombre! : c);
                await supabase
                  .from('productos')
                  .update({ categoria: JSON.stringify(updatedCats) })
                  .eq('id', p.id);
              }
            }
          }
        } catch (syncErr) {
          console.error('Error synchronizing category in products:', syncErr);
        }
      }

      setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    } catch (err: any) {
      alert('Error al actualizar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };


  const renameCategory = (id: number, oldName: string, newName: string) => 
    updateCategory(id, oldName, { nombre: newName });


  const toggleCategoryVisibility = async (id: number, currentName: string, nextVisible: boolean) => {
    setLoading(true);
    try {
      // 1. Actualizar visibilidad de la categoría
      const { error: catError } = await supabase
        .from('categorias')
        .update({ visible: nextVisible })
        .eq('id', id);

      if (catError) throw catError;

      // 2. Actualizar todos los productos de esa categoría
      try {
        const { data: prods } = await supabase.from('productos').select('id, categoria');
        if (prods && prods.length > 0) {
          for (const p of prods) {
            let cats: string[] = [];
            if (Array.isArray(p.categoria)) {
              cats = p.categoria;
            } else if (typeof p.categoria === 'string') {
              try {
                const parsed = JSON.parse(p.categoria);
                cats = Array.isArray(parsed) ? parsed : [parsed];
              } catch (e) {
                cats = [p.categoria];
              }
            }

            if (cats.includes(currentName)) {
              await supabase
                .from('productos')
                .update({ visible: nextVisible })
                .eq('id', p.id);
            }
          }
        }
      } catch (syncErr) {
        console.error('Error synchronizing category visibility in products:', syncErr);
      }

      setCategories(prev => prev.map(c => c.id === id ? { ...c, visible: nextVisible } : c));
    } catch (err: any) {
      alert('Error al cambiar visibilidad: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: number, nombre: string) => {
    if (!confirm(`¿Estás seguro de eliminar la categoría "${nombre}"? Los productos no se borrarán, pero quedarán sin categoría vinculada.`)) return;
    
    setLoading(true);
    try {
      const { error } = await supabase.from('categorias').delete().eq('id', id);
      if (error) throw error;
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      alert('Error al eliminar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    fetchCategories,
    createCategory,
    updateCategory,
    renameCategory,
    toggleCategoryVisibility,
    deleteCategory
  };
};
