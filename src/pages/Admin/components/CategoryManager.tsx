import { useState, useRef } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, Check, X, Loader2, Image as ImageIcon, Upload } from 'lucide-react';

interface Category {
  id: number;
  nombre: string;
  slug: string;
  visible: boolean;
  imagen_url?: string;
}

interface CategoryManagerProps {
  categories: Category[];
  loading: boolean;
  createCategory: (name: string, imageFile?: File) => Promise<any>;
  updateCategory: (id: number, oldName: string, updates: Partial<Category>, newImageFile?: File) => Promise<void>;
  toggleCategoryVisibility: (id: number, currentName: string, nextVisible: boolean) => Promise<void>;
  deleteCategory: (id: number, name: string) => Promise<void>;
}

const CategoryManager = ({ 
  categories, 
  loading, 
  createCategory, 
  updateCategory, 
  toggleCategoryVisibility, 
  deleteCategory 
}: CategoryManagerProps) => {
  const [newCatName, setNewCatName] = useState('');
  const [newCatFile, setNewCatFile] = useState<File | null>(null);
  const [newPreview, setNewPreview] = useState<string>('');
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState<string>('');

  const createInputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, mode: 'create' | 'edit') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (mode === 'create') {
        setNewCatFile(file);
        setNewPreview(url);
      } else {
        setEditFile(file);
        setEditPreview(url);
      }
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    await createCategory(newCatName.trim(), newCatFile || undefined);
    setNewCatName('');
    setNewCatFile(null);
    setNewPreview('');
    if (createInputRef.current) createInputRef.current.value = '';
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.nombre);
    setEditPreview(cat.imagen_url || '');
    setEditFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditFile(null);
    setEditPreview('');
  };

  const handleUpdate = async (id: number, oldName: string) => {
    const updates: Partial<Category> = {};
    if (editName.trim() && editName !== oldName) updates.nombre = editName.trim();
    
    await updateCategory(id, oldName, updates, editFile || undefined);
    setEditingId(null);
  };

  return (
    <div className="categoryManagerContainer">
      <form onSubmit={handleCreate} className="catHeaderForm">
        <h3 className="formTitle">Nueva Categoría</h3>
        <div className="catInputGrid">
          <div className="catInputWrapper">
            <label>Nombre de Categoría</label>
            <input 
              type="text" 
              placeholder="Ej. Extintores y Gabinetes" 
              value={newCatName} 
              onChange={(e) => setNewCatName(e.target.value)}
            />
          </div>
          
          <div className="catInputWrapper">
            <label>Imagen de Portada</label>
            <div className="uploadTrigger" onClick={() => createInputRef.current?.click()}>
              {newPreview ? (
                <div className="previewContainer">
                  <img src={newPreview} alt="Preview" />
                  <div className="changeOverlay"><Upload size={16} /></div>
                </div>
              ) : (
                <div className="placeholderTrigger">
                  <ImageIcon size={20} />
                  <span>Subir Foto</span>
                </div>
              )}
              <input 
                type="file" 
                ref={createInputRef} 
                onChange={(e) => handleFileChange(e, 'create')} 
                accept="image/*"
                hidden 
              />
            </div>
          </div>

          <button type="submit" className="catAddBtn" disabled={loading || !newCatName.trim()}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : <><Plus size={18} /> Crear</>}
          </button>
        </div>
      </form>

      <div className="catList">
        {categories.map((cat) => (
          <div key={cat.id} className={`catRow ${!cat.visible ? 'is-hidden' : ''}`}>
            {editingId === cat.id ? (
              <div className="catEditFullWrapper">
                <div className="catEditVisual">
                  <div className="editUploadTrigger" onClick={() => editInputRef.current?.click()}>
                    <img src={editPreview || '/placeholder.png'} alt="Edit preview" />
                    <div className="editOverlay"><Upload size={16} /></div>
                    <input 
                      type="file" 
                      ref={editInputRef} 
                      onChange={(e) => handleFileChange(e, 'edit')} 
                      accept="image/*"
                      hidden 
                    />
                  </div>
                </div>
                <div className="catEditContent">
                  <input 
                    type="text" 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Nombre"
                    className="catEditInput"
                  />
                  <div className="catEditActions">
                    <button onClick={() => handleUpdate(cat.id, cat.nombre)} className="catBtn check"><Check size={18} /> Guardar</button>
                    <button onClick={cancelEdit} className="catBtn x"><X size={18} /> Cancelar</button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="catMainInfo">
                  <div className="catPreviewThumb">
                    {cat.imagen_url ? (
                      <img src={cat.imagen_url} alt={cat.nombre} />
                    ) : (
                      <ImageIcon size={20} />
                    )}
                  </div>
                  <div className="catTextInfo">
                    <span className="catLabel">{cat.nombre}</span>
                    {!cat.visible && <span className="catStatus">Oculta</span>}
                  </div>
                </div>
                <div className="catRowActions">
                  <button 
                    onClick={() => toggleCategoryVisibility(cat.id, cat.nombre, !cat.visible)}
                    className="catBtn"
                    title={cat.visible ? 'Ocultar' : 'Mostrar'}
                  >
                    {cat.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <button onClick={() => startEdit(cat)} className="catBtn" title="Editar"><Pencil size={18} /></button>
                  <button onClick={() => deleteCategory(cat.id, cat.nombre)} className="catBtn delete" title="Eliminar"><Trash2 size={18} /></button>
                </div>
              </>
            )}
          </div>
        ))}
        {categories.length === 0 && !loading && (
          <div className="catEmpty">
            <p>No hay categorías creadas aún.</p>
          </div>
        )}
      </div>

      <style>{`
        .categoryManagerContainer { display: flex; flex-direction: column; gap: 2rem; }
        
        .catHeaderForm { background: #f8fafc; padding: 2rem; border-radius: 18px; border: 1px solid #e2e8f0; }
        .formTitle { font-size: 0.95rem; margin-bottom: 1.5rem; color: #0f172a; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
        
        .catInputGrid { display: grid; grid-template-columns: 1fr 1fr auto; gap: 20px; align-items: flex-end; }
        .catInputWrapper { display: flex; flex-direction: column; gap: 8px; }
        .catInputWrapper label { font-size: 0.78rem; font-weight: 800; color: #334155; text-transform: uppercase; }
        .catInputWrapper input { background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 10px; padding: 11px 16px; color: #0f172a; font-size: 0.92rem; font-family: inherit; transition: all 0.2s; }
        .catInputWrapper input:focus { outline: none; border-color: #ee1b24; box-shadow: 0 0 0 3px rgba(238, 27, 36, 0.1); }
        
        .uploadTrigger { height: 44px; background: #ffffff; border: 1.5px dashed #cbd5e1; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; overflow: hidden; transition: all 0.2s; }
        .uploadTrigger:hover { border-color: #ee1b24; background: #fff5f5; }
        
        .placeholderTrigger { display: flex; align-items: center; gap: 8px; color: #64748b; font-size: 0.85rem; font-weight: 700; }
        .previewContainer { width: 100%; height: 100%; position: relative; }
        .previewContainer img { width: 100%; height: 100%; object-fit: cover; }
        .changeOverlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; color: white; }
        .previewContainer:hover .changeOverlay { opacity: 1; }
        
        .catAddBtn { background: #ee1b24; color: white; border: none; border-radius: 10px; padding: 0 24px; font-weight: 800; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s; height: 44px; box-shadow: 0 4px 14px rgba(238, 27, 36, 0.35); font-size: 0.9rem; }
        .catAddBtn:hover { background: #dc141d; transform: translateY(-2px); box-shadow: 0 6px 18px rgba(238, 27, 36, 0.45); }
        .catAddBtn:disabled { opacity: 0.5; transform: none; cursor: not-allowed; }
        
        .catList { display: flex; flex-direction: column; gap: 10px; }
        .catRow { display: flex; justify-content: space-between; align-items: center; background: #ffffff; padding: 14px 20px; border-radius: 14px; border: 1px solid #e2e8f0; transition: all 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
        .catRow:hover { border-color: #ee1b24; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.05); }
        .catRow.is-hidden { opacity: 0.5; }
        
        .catMainInfo { display: flex; align-items: center; gap: 15px; }
        .catPreviewThumb { width: 48px; height: 48px; background: #f1f5f9; border-radius: 10px; display: flex; align-items: center; justify-content: center; overflow: hidden; color: #64748b; border: 1px solid #e2e8f0; }
        .catPreviewThumb img { width: 100%; height: 100%; object-fit: cover; }
        
        .catTextInfo { display: flex; flex-direction: column; gap: 2px; }
        .catLabel { font-weight: 800; color: #0f172a; font-size: 0.96rem; }
        .catStatus { font-size: 0.65rem; background: rgba(238, 27, 36, 0.1); color: #ee1b24; padding: 2px 8px; border-radius: 6px; font-weight: 800; width: fit-content; text-transform: uppercase; }
        
        .catRowActions { display: flex; gap: 8px; }
        .catBtn { background: #f8fafc; border: 1px solid #e2e8f0; color: #64748b; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
        .catBtn:hover { background: #ffffff; color: #0f172a; border-color: #cbd5e1; }
        .catBtn.delete:hover { color: #ee1b24; background: #fff5f5; border-color: rgba(238, 27, 36, 0.3); }
        
        .catEditFullWrapper { display: flex; flex: 1; gap: 20px; align-items: center; }
        .catEditVisual { flex-shrink: 0; }
        .editUploadTrigger { width: 56px; height: 56px; border-radius: 10px; position: relative; overflow: hidden; cursor: pointer; border: 2px solid #ee1b24; }
        .editUploadTrigger img { width: 100%; height: 100%; object-fit: cover; }
        .editOverlay { position: absolute; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; color: white; }
        .editUploadTrigger:hover .editOverlay { opacity: 1; }
        
        .catEditContent { flex: 1; display: flex; flex-direction: column; gap: 10px; }
        .catEditInput { background: #ffffff; border: 1.5px solid #ee1b24; border-radius: 10px; padding: 10px 14px; color: #0f172a; font-size: 0.95rem; font-weight: 600; width: 100%; }
        .catEditActions { display: flex; gap: 10px; }
        .catEditActions .catBtn { width: auto; padding: 0 15px; font-size: 0.85rem; font-weight: 700; gap: 8px; }
        .catEditActions .catBtn.check { background: #ee1b24; color: white; border: none; }
        
        @media (max-width: 768px) {
          .catInputGrid { grid-template-columns: 1fr; gap: 15px; }
          .catAddBtn { width: 100%; }
          .catEditFullWrapper { flex-direction: column; align-items: stretch; }
          .catEditVisual { display: flex; justify-content: center; }
        }
`}</style>
    </div>
  );
};

export default CategoryManager;
