import { useState } from 'react';
import { Plus, Trash2, ClipboardPaste, Check, AlertCircle } from 'lucide-react';

interface SpecsSectionProps {
  detalles: any[];
  onAddDetail: () => void;
  onUpdateDetail: (index: number, field: 'clave' | 'valor', value: string) => void;
  onSetAllDetails: (details: { clave: string, valor: string }[]) => void;
  onRemoveDetail: (index: number) => void;
}

const SpecsSection = ({ detalles, onAddDetail, onUpdateDetail, onSetAllDetails, onRemoveDetail }: SpecsSectionProps) => {
  const [showBulk, setShowBulk] = useState(false);
  const [bulkText, setBulkText] = useState('');

  const handleBulkImport = () => {
    if (!bulkText.trim()) return;

    // El formato esperado es:
    // Caracteristica 1
    // Valor 1
    // Caracteristica 2
    // Valor 2
    const lines = bulkText.split('\n').map(l => l.trim()).filter(l => l !== '');
    const newDetails: { clave: string, valor: string }[] = [];

    for (let i = 0; i < lines.length; i += 2) {
      const clave = lines[i];
      const valor = lines[i + 1] || ''; // Por si falta el último valor
      newDetails.push({ clave, valor });
    }

    if (newDetails.length > 0) {
      if (detalles.length > 0) {
        if (confirm('Esto reemplazará los detalles actuales. ¿Continuar?')) {
          onSetAllDetails(newDetails);
          setBulkText('');
          setShowBulk(false);
        }
      } else {
        onSetAllDetails(newDetails);
        setBulkText('');
        setShowBulk(false);
      }
    }
  };

  return (
    <div className="formSection">
      <div className="sectionHeader">
        <div className="headerText">
          <h3>Detalles / Especificaciones</h3>
          <p>Añade la ficha técnica del producto.</p>
        </div>
        <div className="headerActions">
          <button type="button" onClick={() => setShowBulk(!showBulk)} className="bulkBtn">
            <ClipboardPaste size={16}/> Pegado Rápido
          </button>
          <button type="button" onClick={onAddDetail} className="addBtn">
            <Plus size={16}/> Añadir Uno
          </button>
        </div>
      </div>

      {showBulk && (
        <div className="bulkImportArea animate-in">
          <div className="bulkHint">
            <AlertCircle size={14}/>
            <span>Pega el texto aquí. El sistema tomará una línea como título y la siguiente como valor.</span>
          </div>
          <textarea 
            rows={8} 
            placeholder="Ej:&#10;Material&#10;Metal&#10;Peso&#10;50g" 
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
          />
          <div className="bulkActions">
            <button type="button" onClick={handleBulkImport} className="processBtn" disabled={!bulkText.trim()}>
              <Check size={16}/> Procesar y Aplicar
            </button>
            <button type="button" onClick={() => setShowBulk(false)} className="cancelBtn">Cancelar</button>
          </div>
        </div>
      )}

      <div className="detailsGrid">
        {detalles.map((det: any, i: number) => (
          <div key={i} className="detailRow">
            <div className="dField">
              <label>Característica</label>
              <input placeholder="Marca, Peso, etc." value={det.clave} onChange={(e) => onUpdateDetail(i, 'clave', e.target.value)} />
            </div>
            <div className="dField">
              <label>Valor</label>
              <input placeholder="Apple, 200g, etc." value={det.valor} onChange={(e) => onUpdateDetail(i, 'valor', e.target.value)} />
            </div>
            <button type="button" onClick={() => onRemoveDetail(i)} className="removeBtn" title="Eliminar"><Trash2 size={18}/></button>
          </div>
        ))}
        {detalles.length === 0 && !showBulk && (
          <div className="emptyHint">
            <p>No hay detalles agregados. Usa "Pegado Rápido" para ahorrar tiempo.</p>
          </div>
        )}
      </div>

      <style>{`
        .sectionHeader { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; gap: 10px; }
        .headerActions { display: flex; gap: 8px; flex-wrap: wrap; }
        
        .bulkBtn { background: rgba(238, 27, 36, 0.08); color: #ee1b24; border: 1.5px solid rgba(238, 27, 36, 0.25); padding: 9px 16px; border-radius: 10px; font-weight: 800; font-size: 0.84rem; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; }
        .bulkBtn:hover { background: #ee1b24; color: white; }
        
        .addBtn { background: #f8fafc; color: #334155; border: 1.5px solid #cbd5e1; padding: 9px 16px; border-radius: 10px; font-weight: 800; font-size: 0.84rem; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; }
        .addBtn:hover { border-color: #ee1b24; color: #ee1b24; background: #ffffff; }

        .bulkImportArea { background: #f8fafc; padding: 1.5rem; border-radius: 16px; border: 1.5px solid #e2e8f0; margin-bottom: 1.75rem; display: flex; flex-direction: column; gap: 12px; }
        .bulkHint { display: flex; align-items: center; gap: 10px; font-size: 0.82rem; color: #64748b; font-weight: 600; }
        .bulkImportArea textarea { background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 14px; color: #0f172a; font-family: monospace; font-size: 0.9rem; resize: vertical; }
        .bulkActions { display: flex; gap: 10px; }
        
        .processBtn { background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 800; font-size: 0.88rem; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .processBtn:disabled { opacity: 0.5; cursor: not-allowed; }
        .cancelBtn { background: transparent; color: #64748b; border: none; cursor: pointer; font-weight: 700; padding: 10px; }
        .cancelBtn:hover { color: #ee1b24; }

        .detailsGrid { display: flex; flex-direction: column; gap: 10px; }
        .detailRow { display: flex; gap: 12px; align-items: flex-end; background: #f8fafc; padding: 14px; border-radius: 14px; border: 1px solid #e2e8f0; }
        .dField { flex: 1; display: flex; flex-direction: column; gap: 5px; }
        .dField label { font-size: 0.74rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; }
        .dField input { background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 10px; padding: 10px 14px; color: #0f172a; font-size: 0.9rem; font-weight: 600; }
        .dField input:focus { border-color: #ee1b24; outline: none; }
        
        .removeBtn { background: #fee2e2; color: #ee1b24; border: 1px solid #fecaca; width: 44px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
        .removeBtn:hover { background: #ee1b24; color: white; }
        
        .emptyHint { text-align: center; padding: 35px 20px; color: #64748b; font-style: italic; background: #f8fafc; border-radius: 16px; border: 1.5px dashed #cbd5e1; font-size: 0.88rem; font-weight: 600; }

        @media (max-width: 640px) {
          .sectionHeader { flex-direction: column; align-items: stretch; gap: 12px; }
          .headerActions { width: 100%; }
          .headerActions button { flex: 1; justify-content: center; }
          .detailRow { flex-direction: column; align-items: stretch; gap: 10px; }
          .removeBtn { width: 100%; height: 38px; }
        }
      `}</style>
    </div>
  );
};

export default SpecsSection;
