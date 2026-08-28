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
                .variantsManager { display: flex; flex-direction: column; gap: 2rem; }
                .sectionHeader { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
                .primary-btn { background: var(--tech-blue); color: white; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.3s; }
                .primary-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0, 174, 239, 0.2); }
                
                .variantsGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 25px; }
                
                .variantCard { background: rgba(15, 23, 42, 0.4); border-radius: 24px; border: 1.5px solid rgba(255,255,255,0.05); overflow: hidden; transition: all 0.3s; }
                .variantCard:hover { border-color: rgba(0, 174, 239, 0.3); background: rgba(15, 23, 42, 0.6); }
                
                .variantCardHeader { padding: 15px 20px; background: rgba(255,255,255,0.02); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .vBadge { display: flex; align-items: center; gap: 8px; background: rgba(0, 174, 239, 0.1); color: var(--tech-blue); padding: 5px 12px; border-radius: 10px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }
                
                .deleteVariantBtn { background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.1); color: #ef4444; width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
                .deleteVariantBtn:hover { background: #ef4444; color: white; }
                
                .variantCardBody { padding: 25px; display: flex; gap: 25px; }
                
                .variantMedia { display: flex; flex-direction: column; gap: 15px; align-items: center; }
                .variantThumb { 
                  width: 100px; height: 100px; background: #020617; border-radius: 18px; 
                  border: 2px dashed rgba(255,255,255,0.1); display: flex; align-items: center; 
                  justify-content: center; position: relative; cursor: pointer; overflow: hidden;
                  transition: all 0.2s;
                }
                .variantThumb:hover { border-color: var(--tech-blue); }
                .variantThumb img { width: 100%; height: 100%; object-fit: cover; }
                .noImgIcon { color: #1e293b; }
                .thumbOverlay { 
                  position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
                  background: rgba(0, 174, 239, 0.6); display: flex; align-items: center; 
                  justify-content: center; color: white; opacity: 0; transition: opacity 0.2s;
                }
                .variantThumb:hover .thumbOverlay { opacity: 1; }
                
                .variantColor { display: flex; flex-direction: column; align-items: center; gap: 5px; }
                .variantColor label { font-size: 0.6rem; font-weight: 800; color: #64748b; text-transform: uppercase; }
                .varColorPicker { width: 34px; height: 34px; padding: 0; border: 2px solid rgba(255,255,255,0.1); border-radius: 50%; overflow: hidden; background: none; cursor: pointer; }
                
                .variantFields { flex: 1; display: flex; flex-direction: column; gap: 15px; }
                .vFieldGroup { display: flex; flex-direction: column; gap: 8px; }
                .vFieldGroup label { font-size: 0.75rem; font-weight: 700; color: #94a3b8; display: flex; align-items: center; gap: 6px; }
                .vFieldGroup input, .vFieldGroup select { background: rgba(2, 6, 23, 0.5); border: 1.5px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 10px 15px; color: white; font-size: 0.9rem; transition: all 0.2s; }
                .vFieldGroup input:focus, .vFieldGroup select:focus { border-color: var(--tech-blue); outline: none; background: rgba(30, 41, 59, 0.5); }
                
                .vInputRow { display: flex; gap: 10px; }
                .vCustomInput { flex: 1; }
                
                .vPriceGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 5px; }
                
                .emptyHint { grid-column: 1 / -1; text-align: center; padding: 60px; color: #475569; font-style: italic; background: rgba(255,255,255,0.01); border-radius: 30px; border: 2px dashed rgba(255,255,255,0.05); }

                @media (max-width: 480px) {
                  .variantCardBody { flex-direction: column; }
                  .variantMedia { flex-direction: row; justify-content: space-around; width: 100%; }
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
