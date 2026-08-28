import { useState } from 'react';
import { Loader2, PlusCircle, Save, Info, Image as ImageIcon, List, Layers, XCircle, Palette } from 'lucide-react';
import ImageManager from './ImageManager';
import BasicInfo from './form/BasicInfo';
import SpecsSection from './form/SpecsSection';
import VariantsSection from './form/VariantsSection';
import CustomStyleSection from './form/CustomStyleSection';

interface ProductFormProps {
  editingId: number | null;
  product: any;
  previews: string[];
  loading: boolean;
  availableVariantTypes: string[];
  categories: any[];
  onInputChange: (e: any) => void;
  onImageUpload: (e: any) => void;
  onRemoveExisting: (url: string) => void;
  onRemoveNew: (idx: number) => void;
  onReorder: (dragIdx: number, dropIdx: number) => void;
  onAddDetail: () => void;
  onUpdateDetail: (index: number, field: 'clave' | 'valor', value: string) => void;
  onSetAllDetails: (details: { clave: string, valor: string }[]) => void;
  onRemoveDetail: (index: number) => void;
  onAddVariant: () => void;
  onUpdateVariant: (index: number, field: string, value: string) => void;
  onRemoveVariant: (index: number) => void;
  onCategoryToggle: (catName: string) => void;
  onListUpdate: (field: 'loQueIncluye' | 'caracteristicas', action: 'add' | 'remove', value: string, index?: number) => void;
  onSubmit: (e: any) => void;
  onCancel: () => void;
}

const ProductForm = (props: ProductFormProps) => {
  const { 
    editingId, product, previews, loading, availableVariantTypes, categories,
    onInputChange, onImageUpload, onRemoveExisting, onRemoveNew, onReorder,
    onAddDetail, onUpdateDetail, onSetAllDetails, onRemoveDetail,
    onAddVariant, onUpdateVariant, onRemoveVariant, onCategoryToggle,
    onListUpdate,
    onSubmit, onCancel 
  } = props;

  const [formTab, setFormTab] = useState<'info' | 'images' | 'specs' | 'variants' | 'style'>('info');

  if (!product) return (
    <div className="formError">
      <XCircle size={48} />
      <h3>Error al cargar el formulario</h3>
      <p>No se pudo inicializar el estado del producto.</p>
      <button onClick={onCancel} className="btn-secondary">Volver al Inventario</button>
    </div>
  );

  return (
    <form className={`productFormContainer ${editingId ? 'isEditing' : ''}`} onSubmit={onSubmit}>
      <header className="formInternalHeader">
        <div className="formHeaderTitle">
          <div className={`modeIcon ${editingId ? 'edit' : 'create'}`}>
            {editingId ? <Save size={20} /> : <PlusCircle size={20} />}
          </div>
          <div>
            <h3>{editingId ? 'Editando Producto' : 'Crear Nuevo Producto'}</h3>
            <p>{editingId ? `ID: #${editingId}` : 'Completa los campos para publicar un nuevo artículo.'}</p>
          </div>
        </div>
        <div className="formHeaderActions">
          <button type="button" onClick={onCancel} className="cancelLink">Cancelar</button>
          <button type="submit" className="saveQuickBtn" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={18} /> : (editingId ? 'Actualizar' : 'Publicar')}
          </button>
        </div>
      </header>

      <div className="formTabsNav">
        <button type="button" className={`formTabBtn ${formTab === 'info' ? 'active' : ''}`} onClick={() => setFormTab('info')}>
          <Info size={18} /> <span>Básico</span>
        </button>
        <button type="button" className={`formTabBtn ${formTab === 'images' ? 'active' : ''}`} onClick={() => setFormTab('images')}>
          <ImageIcon size={18} /> <span>Imágenes</span>
        </button>
        <button type="button" className={`formTabBtn ${formTab === 'specs' ? 'active' : ''}`} onClick={() => setFormTab('specs')}>
          <List size={18} /> <span>Ficha Técnica</span>
        </button>
        <button type="button" className={`formTabBtn ${formTab === 'variants' ? 'active' : ''}`} onClick={() => setFormTab('variants')}>
          <Layers size={18} /> <span>Variantes</span>
        </button>
        <button type="button" className={`formTabBtn ${formTab === 'style' ? 'active' : ''}`} onClick={() => setFormTab('style')}>
          <Palette size={18} /> <span>Estilo</span>
        </button>
      </div>

      <div className="formContentArea">
        {formTab === 'info' && (
          <div className="tab-pane">
            <BasicInfo 
              product={product} 
              onInputChange={onInputChange} 
              categories={categories} 
              onCategoryToggle={onCategoryToggle}
              onListUpdate={onListUpdate}
            />
          </div>
        )}

        {formTab === 'images' && (
          <div className="tab-pane">
            <div className="paneHeader">
              <h3 className="subTitle">Galería Multimedia</h3>
              <p>Sube hasta 10 fotos. La primera será la portada principal.</p>
            </div>
            <ImageManager 
              existingImages={product.existingImages || []}
              newPreviews={previews || []}
              onRemoveExisting={onRemoveExisting}
              onRemoveNew={onRemoveNew}
              onReorder={onReorder}
              onUpload={onImageUpload}
            />
          </div>
        )}

        {formTab === 'specs' && (
          <div className="tab-pane">
            <SpecsSection 
              detalles={product.detalles || []} 
              onAddDetail={onAddDetail} 
              onUpdateDetail={onUpdateDetail} 
              onSetAllDetails={onSetAllDetails}
              onRemoveDetail={onRemoveDetail} 
            />
          </div>
        )}

        {formTab === 'variants' && (
          <div className="tab-pane">
            <VariantsSection 
              variantes={product.variantes || []} 
              availableVariantTypes={availableVariantTypes} 
              onAddVariant={onAddVariant} 
              onUpdateVariant={onUpdateVariant} 
              onRemoveVariant={onRemoveVariant} 
            />
          </div>
        )}

        {formTab === 'style' && (
          <div className="tab-pane">
            <CustomStyleSection 
              product={product} 
              onInputChange={onInputChange} 
            />
          </div>
        )}
      </div>

      <div className="formActionFooter">
        <div className="footerStatus">
          {loading && <><Loader2 size={16} className="animate-spin" /> <span>Guardando cambios...</span></>}
        </div>
        <div className="footerBtns">
          {editingId && (
            <button type="button" onClick={onCancel} className="cancelActionBtn">
              Descartar Cambios
            </button>
          )}
          <button type="submit" className="submitActionBtn" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : (editingId ? <><Save size={20}/> Guardar Cambios</> : <><PlusCircle size={20}/> Publicar Producto</>)}
          </button>
        </div>
      </div>

      <style>{`
        .productFormContainer { display: flex; flex-direction: column; gap: 0; }
        
        .formInternalHeader { display: flex; justify-content: space-between; align-items: center; padding-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 2.5rem; }
        .formHeaderTitle { display: flex; align-items: center; gap: 15px; }
        .modeIcon { width: 44px; height: 44px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .modeIcon.create { background: rgba(0, 174, 239, 0.1); color: var(--tech-blue); }
        .modeIcon.edit { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .formHeaderTitle h3 { margin: 0; font-size: 1.25rem; font-weight: 800; color: white; }
        .formHeaderTitle p { margin: 2px 0 0 0; font-size: 0.85rem; color: #64748b; font-weight: 500; }
        
        .formHeaderActions { display: flex; align-items: center; gap: 20px; }
        .cancelLink { background: none; border: none; color: #64748b; font-weight: 700; cursor: pointer; font-size: 0.9rem; }
        .cancelLink:hover { color: #ef4444; }
        .saveQuickBtn { background: #1e293b; color: white; border: 1px solid rgba(255,255,255,0.1); padding: 8px 20px; border-radius: 10px; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; }
        .saveQuickBtn:hover { border-color: var(--tech-blue); color: var(--tech-blue); }

        .formTabsNav { display: flex; gap: 8px; margin-bottom: 3rem; background: rgba(15, 23, 42, 0.5); padding: 6px; border-radius: 18px; border: 1px solid rgba(255,255,255,0.05); }
        .formTabBtn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 14px; border-radius: 14px; background: transparent; border: none; color: #64748b; font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .formTabBtn:hover { background: rgba(255,255,255,0.03); color: #cbd5e1; }
        .formTabBtn.active { background: var(--tech-blue); color: white; box-shadow: 0 10px 20px rgba(0, 174, 239, 0.3); }
        
        .formContentArea { min-height: 450px; }
        .tab-pane { animation: tabFadeIn 0.4s ease-out forwards; }
        @keyframes tabFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .paneHeader { margin-bottom: 2rem; }
        .subTitle { font-size: 1rem; font-weight: 800; color: white; margin-bottom: 5px; }
        .paneHeader p { font-size: 0.85rem; color: #64748b; margin: 0; }
        
        .formActionFooter { margin-top: 4rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; }
        .footerStatus { display: flex; align-items: center; gap: 10px; color: #94a3b8; font-size: 0.85rem; font-weight: 600; }
        .footerBtns { display: flex; gap: 15px; }
        
        .cancelActionBtn { background: rgba(239, 68, 68, 0.05); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.1); padding: 14px 28px; border-radius: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .cancelActionBtn:hover { background: #ef4444; color: white; transform: translateY(-2px); }
        
        .submitActionBtn { background: var(--tech-blue); color: white; border: none; padding: 14px 36px; border-radius: 14px; font-weight: 900; font-size: 1.05rem; cursor: pointer; transition: all 0.3s; box-shadow: 0 15px 30px rgba(0, 174, 239, 0.3); display: flex; align-items: center; gap: 12px; }
        .submitActionBtn:hover { transform: translateY(-3px); background: var(--tech-blue-dark); box-shadow: 0 20px 40px rgba(0, 174, 239, 0.4); }
        .submitActionBtn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
        
        .formError { padding: 4rem; text-align: center; color: #ef4444; }
        .formError h3 { color: white; margin: 20px 0 10px; }

        @media (max-width: 768px) {
          .formTabsNav { overflow-x: auto; justify-content: flex-start; scrollbar-width: none; }
          .formTabsNav::-webkit-scrollbar { display: none; }
          .formTabBtn { flex-shrink: 0; padding: 12px 25px; }
          .formTabBtn span { display: block; }
          .formHeaderActions .saveQuickBtn { display: none; }
          .formActionFooter { flex-direction: column; gap: 20px; }
          .footerBtns { width: 100%; flex-direction: column; }
          .footerBtns button { width: 100%; }
        }
      `}</style>
    </form>
  );
};

export default ProductForm;
