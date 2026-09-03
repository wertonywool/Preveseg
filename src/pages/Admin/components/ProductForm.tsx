import { useState } from 'react';
import { Loader2, PlusCircle, Save, Info, Image as ImageIcon, List, Layers, XCircle } from 'lucide-react';
import ImageManager from './ImageManager';
import BasicInfo from './form/BasicInfo';
import SpecsSection from './form/SpecsSection';
import VariantsSection from './form/VariantsSection';

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

  const [formTab, setFormTab] = useState<'info' | 'images' | 'specs' | 'variants'>('info');

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
        .productFormContainer { display: flex; flex-direction: column; gap: 0; width: 100%; }
        
        .formInternalHeader { display: flex; justify-content: space-between; align-items: center; padding-bottom: 1.5rem; border-bottom: 1px solid #e2e8f0; margin-bottom: 2rem; }
        .formHeaderTitle { display: flex; align-items: center; gap: 14px; }
        .modeIcon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .modeIcon.create { background: rgba(238, 27, 36, 0.08); color: #ee1b24; border: 1px solid rgba(238, 27, 36, 0.25); }
        .modeIcon.edit { background: rgba(238, 27, 36, 0.12); color: #ee1b24; border: 1px solid rgba(238, 27, 36, 0.35); }
        .formHeaderTitle h3 { margin: 0; font-size: 1.25rem; font-weight: 900; color: #0f172a; letter-spacing: -0.02em; }
        .formHeaderTitle p { margin: 2px 0 0 0; font-size: 0.84rem; color: #64748b; font-weight: 500; }
        
        .formHeaderActions { display: flex; align-items: center; gap: 14px; }
        .cancelLink { background: none; border: none; color: #64748b; font-weight: 700; cursor: pointer; font-size: 0.9rem; padding: 6px 12px; border-radius: 8px; transition: color 0.2s; }
        .cancelLink:hover { color: #ee1b24; }
        .saveQuickBtn { background: #ee1b24; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 800; font-size: 0.88rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 14px rgba(238, 27, 36, 0.35); }
        .saveQuickBtn:hover { background: #dc141d; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(238, 27, 36, 0.45); }

        .formTabsNav { display: flex; gap: 6px; margin-bottom: 2.25rem; background: #f1f5f9; padding: 6px; border-radius: 14px; border: 1px solid #e2e8f0; overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .formTabBtn { flex: 1; min-width: 90px; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 11px 14px; border-radius: 10px; background: transparent; border: none; color: #64748b; font-weight: 700; font-size: 0.88rem; cursor: pointer; transition: all 0.2s ease; white-space: nowrap; }
        .formTabBtn:hover { background: #ffffff; color: #0f172a; }
        .formTabBtn.active { background: #ee1b24; color: white; box-shadow: 0 4px 14px rgba(238, 27, 36, 0.3); }
        
        .formContentArea { min-height: 450px; }
        .tab-pane { animation: tabFadeIn 0.3s ease-out forwards; }
        @keyframes tabFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

        .paneHeader { margin-bottom: 1.75rem; }
        .subTitle { font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
        .paneHeader p { font-size: 0.88rem; color: #64748b; margin: 0; }
        
        .formActionFooter { margin-top: 3.5rem; padding-top: 1.75rem; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; gap: 15px; }
        .footerStatus { display: flex; align-items: center; gap: 10px; color: #64748b; font-size: 0.85rem; font-weight: 600; }
        .footerBtns { display: flex; gap: 12px; }
        
        .cancelActionBtn { background: #f8fafc; color: #64748b; border: 1.5px solid #cbd5e1; padding: 12px 24px; border-radius: 10px; font-weight: 800; font-size: 0.92rem; cursor: pointer; transition: all 0.2s; }
        .cancelActionBtn:hover { border-color: #ee1b24; color: #ee1b24; }
        
        .submitActionBtn { background: #ee1b24; color: white; border: none; padding: 13px 32px; border-radius: 10px; font-weight: 900; font-size: 0.96rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 16px rgba(238, 27, 36, 0.35); display: flex; align-items: center; gap: 10px; }
        .submitActionBtn:hover { transform: translateY(-2px); background: #dc141d; box-shadow: 0 8px 22px rgba(238, 27, 36, 0.45); }
        .submitActionBtn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
        
        .formError { padding: 4rem; text-align: center; color: #ee1b24; }
        .formError h3 { color: #0f172a; margin: 20px 0 10px; }

        @media (max-width: 768px) {
          .formInternalHeader { flex-direction: column; align-items: flex-start; gap: 12px; padding-bottom: 1.25rem; margin-bottom: 1.5rem; }
          .formHeaderActions { width: 100%; justify-content: space-between; }
          .formTabsNav { scrollbar-width: none; border-radius: 10px; gap: 4px; padding: 4px; }
          .formTabsNav::-webkit-scrollbar { display: none; }
          .formTabBtn { flex-shrink: 0; padding: 9px 14px; font-size: 0.8rem; }
          .formActionFooter { flex-direction: column; gap: 15px; }
          .footerBtns { width: 100%; flex-direction: column; }
          .footerBtns button { width: 100%; justify-content: center; }
        }
`}</style>
    </form>
  );
};

export default ProductForm;
