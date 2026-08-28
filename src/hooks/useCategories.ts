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
        setCategories(data);
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
      let imagen_url;
      if (imageFile) {
        imagen_url = await uploadCategoryImage(imageFile);
      }

      const { data, error } = await supabase
        .from('categorias')
        .insert([{ nombre, slug, visible: true, imagen_url }])
        .select();

      if (error) throw error;
      if (data) {
        setCategories(prev => [...prev, data[0]].sort((a, b) => a.nombre.localeCompare(b.nombre)));
        return data[0];
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
      if (updates.nombre) {
        updates.slug = updates.nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      }

      if (newImageFile) {
        updates.imagen_url = await uploadCategoryImage(newImageFile);
      }

      const { error: catError } = await supabase
        .from('categorias')
        .update(updates)
        .eq('id', id);

      if (catError) throw catError;

      // Actualizar productos si el nombre cambió
      if (updates.nombre && updates.nombre !== oldName) {
        const { error: prodError } = await supabase
          .from('productos')
          .update({ categoria: updates.nombre })
          .eq('categoria', oldName);
        if (prodError) throw prodError;
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
      const { error: prodError } = await supabase
        .from('productos')
        .update({ visible: nextVisible })
        .eq('categoria', currentName);

      if (prodError) throw prodError;

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
