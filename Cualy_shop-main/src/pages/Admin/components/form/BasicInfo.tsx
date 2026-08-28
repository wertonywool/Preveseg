import { Type, FileText, Tag, Youtube, DollarSign, Zap, Star, Plus, Check, Package, ListChecks, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface BasicInfoProps {
  product: any;
  categories: any[];
  onInputChange: (e: any) => void;
  onCategoryToggle: (catName: string) => void;
  onListUpdate: (field: 'loQueIncluye' | 'caracteristicas', action: 'add' | 'remove', value: string, index?: number) => void;
}

const BasicInfo = ({ product, categories, onInputChange, onCategoryToggle, onListUpdate }: BasicInfoProps) => {
  const selectedCategories = Array.isArray(product.categoria) ? product.categoria : [];
  const [newInclude, setNewInclude] = useState('');
  const [newFeature, setNewFeature] = useState('');

  const handleAddInclude = () => {
    if (newInclude.trim()) {
      onListUpdate('loQueIncluye', 'add', newInclude);
      setNewInclude('');
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      onListUpdate('caracteristicas', 'add', newFeature);
      setNewFeature('');
    }
  };

  return (
    <div className="formSection animate-in">
      <div className="sectionHeader">
        <div className="headerText">
          <h3>Información del Producto</h3>
          <p>Define los detalles principales que verán tus clientes.</p>
        </div>
      </div>

      <div className="formGrid">
        <div className="formGroup fullWidth">
          <label><Type size={16} /> Nombre del Producto</label>
          <input 
            name="nombre" 
            value={product.nombre} 
            onChange={onInputChange} 
            required 
            placeholder="Ej: iPhone 15 Pro Max 256GB Titanium" 
          />
        </div>

        <div className="formGroup fullWidth">
          <label><FileText size={16} /> Descripción Detallada</label>
          <textarea 
            name="descripcion" 
            value={product.descripcion} 
            onChange={onInputChange} 
            required 
            rows={4} 
            placeholder="Describe las características principales, beneficios y qué incluye la caja..." 
          />
        </div>

        {/* Nueva Sección: Características Principales */}
        <div className="formGroup fullWidth">
          <label><ListChecks size={16} /> Características Principales (Bullets)</label>
          <div className="listInputGroup">
            <input 
              value={newFeature} 
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Ej: Batería de larga duración (48h)"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
            />
            <button type="button" onClick={handleAddFeature} className="addListItemBtn">
              <Plus size={18} />
            </button>
          </div>
          <div className="listItemsDisplay">
            {(product.caracteristicas || []).map((item: string, idx: number) => (
              <div key={idx} className="listItem">
                <span>{item}</span>
                <button type="button" onClick={() => onListUpdate('caracteristicas', 'remove', '', idx)}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Nueva Sección: Lo que incluye */}
        <div className="formGroup fullWidth">
          <label><Package size={16} /> ¿Qué incluye la caja?</label>
          <div className="listInputGroup">
            <input 
              value={newInclude} 
              onChange={(e) => setNewInclude(e.target.value)}
              placeholder="Ej: Cable de carga USB-C"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInclude())}
            />
            <button type="button" onClick={handleAddInclude} className="addListItemBtn">
              <Plus size={18} />
            </button>
          </div>
          <div className="listItemsDisplay">
            {(product.loQueIncluye || []).map((item: string, idx: number) => (
              <div key={idx} className="listItem">
                <span>{item}</span>
                <button type="button" onClick={() => onListUpdate('loQueIncluye', 'remove', '', idx)}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="formGroup fullWidth">
          <label><Tag size={16} /> Categorías (La primera será la Principal)</label>
          <div className="categorySelectionGrid">
            {categories.map(cat => {
              const isSelected = selectedCategories.includes(cat.nombre);
              const isPrimary = selectedCategories[0] === cat.nombre;

              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`categoryPill ${isSelected ? 'active' : ''} ${isPrimary ? 'primary-cat' : ''}`}
                  onClick={() => onCategoryToggle(cat.nombre)}
                  title={isPrimary ? 'Categoría Principal' : isSelected ? 'Hacer Principal' : 'Añadir Categoría'}
                >
                  {isPrimary ? <Star size={14} fill="currentColor" /> : isSelected ? <Check size={14} /> : <Plus size={14} />}
                  <span>{cat.nombre}</span>
                  {isPrimary && <span className="cat-badge">Principal</span>}
                </button>
              );
            })}
          </div>
          <p className="field-hint">Haz clic en una categoría seleccionada para volverla principal o desmarcarla.</p>
        </div>

        <div className="formGroup">
          <label><Youtube size={16} /> YouTube Video ID (Opcional)</label>
          <input 
            name="youtubeUrl" 
            value={product.youtubeUrl} 
            onChange={onInputChange} 
            placeholder="Ej: dQw4w9WgXcQ (Solo el ID)" 
          />
        </div>

        <div className="formGroup">
          <label><DollarSign size={16} /> Precio Normal ($)</label>
          <div className="inputWithIcon">
            <input 
              type="number" 
              name="precioNormal" 
              value={product.precioNormal} 
              onChange={onInputChange} 
              required 
              placeholder="0.00" 
              min="0"
            />
          </div>
        </div>

        <div className="formGroup">
          <label><Zap size={16} /> Precio Oferta ($)</label>
          <div className="inputWithIcon">
            <input 
              type="number" 
              name="precioOferta" 
              value={product.precioOferta} 
              onChange={onInputChange} 
              required 
              placeholder="0.00" 
              min="0"
            />
          </div>
        </div>

        <div className="formGroup checkboxGroup">
          <label className="checkboxLabel">
            <input 
              type="checkbox" 
              name="destacado" 
              checked={product.destacado} 
              onChange={onInputChange} 
            />
            <Star size={18} className={product.destacado ? 'text-yellow' : ''} />
            <span>Producto Destacado</span>
          </label>
        </div>

        <div className="formGroup checkboxGroup">
          <label className="checkboxLabel">
            <input 
              type="checkbox" 
              name="enOferta" 
              checked={product.enOferta} 
              onChange={onInputChange} 
            />
            <Tag size={18} className={product.enOferta ? 'text-green' : ''} />
            <span>Mostrar Etiqueta de Oferta</span>
          </label>
        </div>
      </div>

      <style>{`
        .formGroup label { display: flex; align-items: center; gap: 10px; }
        .text-yellow { color: #f59e0b; fill: #f59e0b; }
        .text-green { color: #10b981; }
        .inputWithIcon { position: relative; }
        .sectionHeader { margin-bottom: 2rem; }
        .headerText h3 { margin: 0; color: white; font-size: 1.25rem; font-weight: 800; }
        .headerText p { margin: 5px 0 0 0; color: #64748b; font-size: 0.9rem; }

        .categorySelectionGrid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
        .categoryPill { display: flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 12px; background: rgba(255,255,255,0.03); border: 1.5px solid rgba(255,255,255,0.05); color: #94a3b8; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; position: relative; }
        .categoryPill:hover { background: rgba(255,255,255,0.06); color: white; border-color: rgba(255,255,255,0.1); }
        .categoryPill.active { background: rgba(255,255,255,0.05); color: white; border-color: rgba(255,255,255,0.2); }
        .categoryPill.primary-cat { background: rgba(0, 174, 239, 0.1); color: var(--tech-blue); border-color: var(--tech-blue); }

        .cat-badge { font-size: 0.6rem; text-transform: uppercase; background: var(--tech-blue); color: white; padding: 2px 6px; border-radius: 4px; margin-left: 5px; }
        .field-hint { font-size: 0.75rem; color: #64748b; margin-top: 10px; }

        .listInputGroup { display: flex; gap: 10px; margin-top: 8px; }
        .listInputGroup input { flex: 1; }
        .addListItemBtn { background: var(--tech-blue); color: white; border: none; width: 45px; height: 45px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .listItemsDisplay { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
        .listItem { display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02); padding: 8px 15px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.05); }
        .listItem span { font-size: 0.9rem; color: #cbd5e1; }
        .listItem button { background: none; border: none; color: #64748b; cursor: pointer; }
        .listItem button:hover { color: #ef4444; }
      `}</style>
    </div>
  );
};

export default BasicInfo;
