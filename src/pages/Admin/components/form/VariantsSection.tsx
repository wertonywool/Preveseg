import { Plus, Trash2, Image as ImageIcon, DollarSign, Tag, Layers } from 'lucide-react';

interface VariantsSectionProps {
  variantes: any[];
  availableVariantTypes: string[];
  onAddVariant: () => void;
  onUpdateVariant: (index: number, field: string, value: any) => void;
  onRemoveVariant: (index: number) => void;
}

const VariantsSection = ({ 
  variantes, 
  availableVariantTypes, 
  onAddVariant, 
  onUpdateVariant, 
  onRemoveVariant 
}: VariantsSectionProps) => {
  return (
    <div className="variantsManager animate-in">
      <div className="sectionHeader">
        <div className="headerText">
          <h3>Variantes de Producto</h3>
          <p>Crea diferentes versiones del producto (color, talla, almacenamiento, etc.) con sus propios precios e imágenes.</p>
        </div>
        <button type="button" onClick={onAddVariant} className="catAddBtn primary-btn">
          <Plus size={18}/> Agregar Variante
        </button>
      </div>

      <div className="variantsGrid">
        {(Array.isArray(variantes) ? variantes : []).map((varnt: any, i: number) => {
          if (!varnt) return null;
          const currentAvailableTypes = Array.isArray(availableVariantTypes) ? availableVariantTypes : ['color', 'capacidad', 'otro'];
          const isCustomType = !currentAvailableTypes.includes(varnt.tipo);

          return (
            <div key={i} className="variantCard">
              <div className="variantCardHeader">
                <div className="vHeaderLeft">
                  <div className="vBadge"><Layers size={14}/> <span>Variante #{i + 1}</span></div>
                </div>
                <button type="button" onClick={() => onRemoveVariant(i)} className="deleteVariantBtn" title="Eliminar esta variante">
                  <Trash2 size={16}/>
                </button>
              </div>

              <div className="variantCardBody">
                <div className="variantMedia">
                  <div className="variantImageUpload">
                    <input type="file" id={`var-img-${i}`} hidden accept="image/*" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onUpdateVariant(i, 'file', file);
                    }} />
                    <label htmlFor={`var-img-${i}`} className="variantThumb">
                      {varnt.file instanceof File ? (
                        <img src={URL.createObjectURL(varnt.file)} alt="preview" />
                      ) : (varnt.imagenUrl ? (
                        <img src={varnt.imagenUrl} alt="existente" />
                      ) : <div className="noImgIcon"><ImageIcon size={24}/></div>)}
                      <div className="thumbOverlay"><Plus size={16}/></div>
                    </label>
                  </div>
                  {varnt.tipo === 'color' && (
                    <div className="variantColor">
                      <label>Color</label>
                      <input type="color" value={varnt.color || '#000000'} onChange={(e) => onUpdateVariant(i, 'color', e.target.value)} className="varColorPicker" />
                    </div>
                  )}
                </div>

                <div className="variantFields">
                  <div className="vFieldGroup">
                    <label>Tipo de Atributo</label>
                    <div className="vInputRow">
                      <select 
                        value={isCustomType ? 'personalizado' : varnt.tipo} 
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateVariant(i, 'tipo', val === 'personalizado' ? '' : val);
                        }}
                      >
                        {currentAvailableTypes.map(t => (
                          <option key={t} value={t}>{typeof t === 'string' ? t.charAt(0).toUpperCase() + t.slice(1) : t}</option>
                        ))}
                        <option value="personalizado">Otro (Manual)...</option>
                      </select>
                      {isCustomType && (
                        <input 
                          className="vCustomInput"
                          placeholder="Ej: Talla, Material..." 
                          value={varnt.tipo || ''} 
                          onChange={(e) => onUpdateVariant(i, 'tipo', e.target.value)} 
                        />
                      )}
                    </div>
                  </div>

                  <div className="vFieldGroup">
                    <label>Valor / Etiqueta</label>
                    <input placeholder="Ej: Azul, 256GB, Grande..." value={varnt.valor || ''} onChange={(e) => onUpdateVariant(i, 'valor', e.target.value)} />
                  </div>

                  <div className="vPriceGrid">
                    <div className="vFieldGroup">
                      <label><DollarSign size={12}/> Normal</label>
                      <input type="number" placeholder="0.00" value={varnt.precio_normal || ''} onChange={(e) => onUpdateVariant(i, 'precio_normal', e.target.value)} />
                    </div>
                    <div className="vFieldGroup">
                      <label><Tag size={12}/> Oferta</label>
                      <input type="number" placeholder="0.00" value={varnt.precio_oferta || ''} onChange={(e) => onUpdateVariant(i, 'precio_oferta', e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>

              <style>{`
                .variantsManager { display: flex; flex-direction: column; gap: 1.5rem; width: 100%; }
                .sectionHeader { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; gap: 12px; }
                .primary-btn { background: #ee1b24; color: white; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; box-shadow: 0 4px 14px rgba(238, 27, 36, 0.35); font-size: 0.88rem; }
                .primary-btn:hover { background: #dc141d; transform: translateY(-2px); box-shadow: 0 6px 18px rgba(238, 27, 36, 0.45); }
                
                .variantsGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 18px; }
                
                .variantCard { background: #f8fafc; border-radius: 16px; border: 1.5px solid #e2e8f0; overflow: hidden; transition: all 0.2s; }
                .variantCard:hover { border-color: #ee1b24; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04); }
                
                .variantCardHeader { padding: 12px 18px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; }
                .vBadge { display: flex; align-items: center; gap: 6px; background: rgba(238, 27, 36, 0.08); color: #ee1b24; padding: 4px 10px; border-radius: 8px; font-size: 0.74rem; font-weight: 800; text-transform: uppercase; border: 1px solid rgba(238, 27, 36, 0.2); }
                
                .deleteVariantBtn { background: #fee2e2; border: 1px solid #fecaca; color: #ee1b24; width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
                .deleteVariantBtn:hover { background: #ee1b24; color: white; }
                
                .variantCardBody { padding: 18px; display: flex; gap: 18px; background: #f8fafc; }
                
                .variantMedia { display: flex; flex-direction: column; gap: 12px; align-items: center; flex-shrink: 0; }
                .variantThumb { 
                  width: 90px; height: 90px; background: #ffffff; border-radius: 14px; 
                  border: 2px dashed #cbd5e1; display: flex; align-items: center; 
                  justify-content: center; position: relative; cursor: pointer; overflow: hidden;
                  transition: all 0.2s;
                }
                .variantThumb:hover { border-color: #ee1b24; background: #fff5f5; }
                .variantThumb img { width: 100%; height: 100%; object-fit: contain; }
                .noImgIcon { color: #64748b; }
                .thumbOverlay { 
                  position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
                  background: rgba(238, 27, 36, 0.7); display: flex; align-items: center; 
                  justify-content: center; color: white; opacity: 0; transition: opacity 0.2s;
                }
                .variantThumb:hover .thumbOverlay { opacity: 1; }
                
                .variantColor { display: flex; flex-direction: column; align-items: center; gap: 4px; }
                .variantColor label { font-size: 0.68rem; font-weight: 800; color: #475569; text-transform: uppercase; }
                .varColorPicker { width: 34px; height: 34px; padding: 0; border: 2px solid #cbd5e1; border-radius: 50%; overflow: hidden; background: none; cursor: pointer; }
                
                .variantFields { flex: 1; display: flex; flex-direction: column; gap: 12px; min-width: 0; }
                .vFieldGroup { display: flex; flex-direction: column; gap: 6px; }
                .vFieldGroup label { font-size: 0.76rem; font-weight: 800; color: #334155; display: flex; align-items: center; gap: 6px; }
                .vFieldGroup input, .vFieldGroup select { background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 10px; padding: 9px 12px; color: #0f172a; font-size: 0.9rem; font-weight: 600; font-family: inherit; transition: all 0.2s; }
                .vFieldGroup input:focus, .vFieldGroup select:focus { border-color: #ee1b24; outline: none; box-shadow: 0 0 0 3px rgba(238, 27, 36, 0.1); }
                
                .vInputRow { display: flex; gap: 8px; }
                .vCustomInput { flex: 1; }
                
                .vPriceGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                
                .emptyHint { grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: #64748b; font-style: italic; background: #f8fafc; border-radius: 16px; border: 1.5px dashed #cbd5e1; font-weight: 600; }

                @media (max-width: 640px) {
                  .sectionHeader { flex-direction: column; align-items: stretch; }
                  .primary-btn { justify-content: center; }
                  .variantCardBody { flex-direction: column; align-items: stretch; }
                  .variantMedia { flex-direction: row; justify-content: flex-start; gap: 15px; }
                  .variantsGrid { grid-template-columns: 1fr; }
                }
              `}</style>
            </div>
          );
        })}
        {(variantes?.length || 0) === 0 && <p className="emptyHint">No hay variantes agregadas. Usa el botón "Agregar Variante" para crear diferentes versiones de este producto.</p>}
      </div>
    </div>
  );
};

export default VariantsSection;
