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
                .primary-btn { background: linear-gradient(135deg, #0066ff 0%, #0047cc 100%); color: white; border: 1px solid rgba(255,255,255,0.15); padding: 10px 20px; border-radius: 12px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; box-shadow: 0 4px 14px rgba(0, 102, 255, 0.35); }
                .primary-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0, 102, 255, 0.5); }
                
                .variantsGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 18px; }
                
                .variantCard { background: #070b14; border-radius: 18px; border: 1.5px solid rgba(255,255,255,0.08); overflow: hidden; transition: all 0.25s; }
                .variantCard:hover { border-color: rgba(0, 102, 255, 0.4); }
                
                .variantCardHeader { padding: 12px 18px; background: rgba(255,255,255,0.02); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06); }
                .vBadge { display: flex; align-items: center; gap: 6px; background: rgba(0, 102, 255, 0.15); color: #60a5fa; padding: 4px 10px; border-radius: 8px; font-size: 0.74rem; font-weight: 800; text-transform: uppercase; border: 1px solid rgba(0, 102, 255, 0.25); }
                
                .deleteVariantBtn { background: rgba(238, 27, 36, 0.1); border: 1px solid rgba(238, 27, 36, 0.25); color: #ff6b6b; width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
                .deleteVariantBtn:hover { background: #ee1b24; color: white; }
                
                .variantCardBody { padding: 18px; display: flex; gap: 18px; }
                
                .variantMedia { display: flex; flex-direction: column; gap: 12px; align-items: center; flex-shrink: 0; }
                .variantThumb { 
                  width: 90px; height: 90px; background: #0d1527; border-radius: 14px; 
                  border: 2px dashed rgba(255,255,255,0.12); display: flex; align-items: center; 
                  justify-content: center; position: relative; cursor: pointer; overflow: hidden;
                  transition: all 0.2s;
                }
                .variantThumb:hover { border-color: #0066ff; }
                .variantThumb img { width: 100%; height: 100%; object-fit: contain; }
                .noImgIcon { color: #64748b; }
                .thumbOverlay { 
                  position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
                  background: rgba(0, 102, 255, 0.6); display: flex; align-items: center; 
                  justify-content: center; color: white; opacity: 0; transition: opacity 0.2s;
                }
                .variantThumb:hover .thumbOverlay { opacity: 1; }
                
                .variantColor { display: flex; flex-direction: column; align-items: center; gap: 4px; }
                .variantColor label { font-size: 0.64rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
                .varColorPicker { width: 32px; height: 32px; padding: 0; border: 2px solid rgba(255,255,255,0.15); border-radius: 50%; overflow: hidden; background: none; cursor: pointer; }
                
                .variantFields { flex: 1; display: flex; flex-direction: column; gap: 12px; min-width: 0; }
                .vFieldGroup { display: flex; flex-direction: column; gap: 6px; }
                .vFieldGroup label { font-size: 0.74rem; font-weight: 700; color: #cbd5e1; display: flex; align-items: center; gap: 6px; }
                .vFieldGroup input, .vFieldGroup select { background: #0d1527; border: 1.5px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 9px 12px; color: white; font-size: 0.88rem; transition: all 0.2s; }
                .vFieldGroup input:focus, .vFieldGroup select:focus { border-color: #0066ff; outline: none; background: #0f1a30; }
                
                .vInputRow { display: flex; gap: 8px; }
                .vCustomInput { flex: 1; }
                
                .vPriceGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                
                .emptyHint { grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: #64748b; font-style: italic; background: rgba(255,255,255,0.015); border-radius: 16px; border: 1px dashed rgba(255,255,255,0.06); }

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
