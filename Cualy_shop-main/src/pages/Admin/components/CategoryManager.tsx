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
              placeholder="Ej. Accesorios Gaming" 
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
        
        .catHeaderForm { background: rgba(255,255,255,0.02); padding: 2rem; border-radius: 24px; border: 1px solid rgba(255,255,255,0.05); }
        .formTitle { font-size: 1rem; margin-bottom: 1.5rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
        
        .catInputGrid { display: grid; grid-template-columns: 1fr 1fr auto; gap: 20px; align-items: flex-end; }
        .catInputWrapper { display: flex; flex-direction: column; gap: 10px; }
        .catInputWrapper label { font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; }
        .catInputWrapper input { background: #0f172a; border: 1.5px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 12px 16px; color: white; transition: all 0.2s; }
        .catInputWrapper input:focus { outline: none; border-color: var(--tech-blue); box-shadow: 0 0 0 4px rgba(0, 174, 239, 0.1); }
        
        .uploadTrigger { height: 48px; background: #0f172a; border: 1.5px dashed rgba(255,255,255,0.1); border-radius: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; overflow: hidden; transition: all 0.2s; }
        .uploadTrigger:hover { border-color: var(--tech-blue); background: rgba(0, 174, 239, 0.05); }
        
        .placeholderTrigger { display: flex; align-items: center; gap: 10px; color: #64748b; font-size: 0.85rem; font-weight: 600; }
        .previewContainer { width: 100%; height: 100%; position: relative; }
        .previewContainer img { width: 100%; height: 100%; object-fit: cover; }
        .changeOverlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; color: white; }
        .previewContainer:hover .changeOverlay { opacity: 1; }
        
        .catAddBtn { background: var(--tech-blue); color: white; border: none; border-radius: 14px; padding: 0 30px; font-weight: 800; display: flex; align-items: center; gap: 10px; cursor: pointer; transition: all 0.3s; height: 48px; box-shadow: 0 10px 20px -5px rgba(0, 174, 239, 0.3); }
        .catAddBtn:hover { transform: translateY(-3px); box-shadow: 0 15px 30px -8px rgba(0, 174, 239, 0.4); }
        .catAddBtn:disabled { opacity: 0.5; transform: none; cursor: not-allowed; }
        
        .catList { display: flex; flex-direction: column; gap: 12px; }
        .catRow { display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02); padding: 12px 20px; border-radius: 18px; border: 1px solid rgba(255,255,255,0.04); transition: all 0.2s; }
        .catRow:hover { border-color: rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); }
        .catRow.is-hidden { opacity: 0.5; }
        
        .catMainInfo { display: flex; align-items: center; gap: 15px; }
        .catPreviewThumb { width: 50px; height: 50px; background: #0f172a; border-radius: 12px; display: flex; align-items: center; justify-content: center; overflow: hidden; color: #475569; border: 1px solid rgba(255,255,255,0.05); }
        .catPreviewThumb img { width: 100%; height: 100%; object-fit: cover; }
        
        .catTextInfo { display: flex; flex-direction: column; gap: 2px; }
        .catLabel { font-weight: 700; color: #f1f5f9; font-size: 1rem; }
        .catStatus { font-size: 0.65rem; background: rgba(239, 68, 68, 0.1); color: #ef4444; padding: 2px 8px; border-radius: 6px; font-weight: 800; width: fit-content; text-transform: uppercase; }
        
        .catRowActions { display: flex; gap: 8px; }
        .catBtn { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); color: #94a3b8; width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
        .catBtn:hover { background: rgba(255,255,255,0.08); color: white; border-color: rgba(255,255,255,0.2); }
        .catBtn.delete:hover { color: #ef4444; background: rgba(239, 68, 68, 0.1); border-color: rgba(239, 68, 68, 0.2); }
        
        .catEditFullWrapper { display: flex; flex: 1; gap: 20px; align-items: center; }
        .catEditVisual { flex-shrink: 0; }
        .editUploadTrigger { width: 60px; height: 60px; border-radius: 14px; position: relative; overflow: hidden; cursor: pointer; border: 2px solid var(--tech-blue); }
        .editUploadTrigger img { width: 100%; height: 100%; object-fit: cover; }
        .editOverlay { position: absolute; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; color: white; }
        .editUploadTrigger:hover .editOverlay { opacity: 1; }
        
        .catEditContent { flex: 1; display: flex; flex-direction: column; gap: 10px; }
        .catEditInput { background: #0f172a; border: 1px solid var(--tech-blue); border-radius: 10px; padding: 10px 14px; color: white; font-size: 0.95rem; font-weight: 600; width: 100%; }
        .catEditActions { display: flex; gap: 10px; }
        .catEditActions .catBtn { width: auto; padding: 0 15px; font-size: 0.85rem; font-weight: 700; gap: 8px; }
        .catEditActions .catBtn.check { background: var(--tech-blue); color: white; border: none; }
        
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
