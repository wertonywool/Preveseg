import React, { useState } from 'react';
import { Upload, X, GripVertical, Image as ImageIcon } from 'lucide-react';

interface ImageManagerProps {
  existingImages: string[];
  newPreviews: string[];
  onRemoveExisting: (url: string) => void;
  onRemoveNew: (index: number) => void;
  onReorder: (dragIndex: number, dropIndex: number) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageManager = ({ existingImages, newPreviews, onRemoveExisting, onRemoveNew, onReorder, onUpload }: ImageManagerProps) => {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  return (
    <div className="imageManagerSection">
      <div className="uploadZone">
        <input type="file" multiple onChange={onUpload} accept="image/*" id="fileIn" hidden />
        <label htmlFor="fileIn" className="uploadLabel">
          <div className="uploadIconBox">
            <Upload size={28} />
          </div>
          <div className="uploadText">
            <span className="mainText">Añadir archivos</span>
            <span className="subText">JPG, PNG o WEBP (Máx. 5MB)</span>
          </div>
        </label>
      </div>

      <div className="imagesGrid">
        {existingImages && existingImages.map((src, i) => (
          <div 
            key={`ex-${i}`} 
            className="imgThumbCard"
            draggable
            onDragStart={() => setDragIndex(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragIndex !== null) onReorder(dragIndex, i);
              setDragIndex(null);
            }}
          >
            <div className="imgWrapper">
              <img src={src} alt={`Product ${i}`} />
            </div>
            <div className="dragHandle"><GripVertical size={14}/></div>
            {i === 0 && <span className="mainBadge">PORTADA</span>}
            <button type="button" onClick={() => onRemoveExisting(src)} className="deleteImgBtn" title="Eliminar">
              <X size={14}/>
            </button>
          </div>
        ))}

        {newPreviews && newPreviews.map((src, i) => (
          <div key={`new-${i}`} className="imgThumbCard is-new">
            <div className="imgWrapper">
              <img src={src} alt="new preview" />
            </div>
            <span className="newBadge">NUEVA</span>
            <button type="button" onClick={() => onRemoveNew(i)} className="deleteImgBtn">
              <X size={14}/>
            </button>
          </div>
        ))}

        {(!existingImages.length && !newPreviews.length) && (
          <div className="emptyGridPlaceholder">
            <ImageIcon size={40} />
            <p>No hay imágenes seleccionadas</p>
          </div>
        )}
      </div>

      <style>{`
        .imageManagerSection { display: flex; flex-direction: column; gap: 1.5rem; }
        
        .uploadZone { width: 100%; }
        .uploadLabel { 
          display: flex; align-items: center; gap: 20px; 
          padding: 20px; background: rgba(0, 174, 239, 0.05); 
          border: 2px dashed rgba(0, 174, 239, 0.2); 
          border-radius: 16px; cursor: pointer; transition: all 0.3s;
        }
        .uploadLabel:hover { background: rgba(0, 174, 239, 0.08); border-color: var(--tech-blue); }
        .uploadIconBox { 
          width: 50px; height: 50px; background: var(--tech-blue); 
          border-radius: 12px; display: flex; align-items: center; 
          justify-content: center; color: white; box-shadow: 0 4px 12px rgba(0, 174, 239, 0.3);
        }
        .uploadText { display: flex; flex-direction: column; }
        .uploadText .mainText { font-weight: 700; color: white; }
        .uploadText .subText { font-size: 0.75rem; color: #64748b; }

        .imagesGrid { 
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); 
          gap: 15px; 
        }
        
        .imgThumbCard { 
          position: relative; aspect-ratio: 1/1; 
          background: #1e293b; border-radius: 12px; 
          border: 1px solid rgba(255,255,255,0.05); 
          overflow: hidden; transition: transform 0.2s;
        }
        .imgThumbCard:hover { transform: scale(1.02); z-index: 10; }
        .imgThumbCard.is-new { border: 2px dashed var(--tech-blue); }
        
        .imgWrapper { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
        .imgWrapper img { width: 100%; height: 100%; object-fit: cover; }
        
        .dragHandle { 
          position: absolute; top: 5px; left: 5px; 
          background: rgba(0,0,0,0.5); color: white; 
          padding: 4px; border-radius: 6px; cursor: grab; opacity: 0; transition: opacity 0.2s;
        }
        .imgThumbCard:hover .dragHandle { opacity: 1; }
        
        .deleteImgBtn { 
          position: absolute; top: 5px; right: 5px; 
          background: #ef4444; color: white; border: none; 
          width: 24px; height: 24px; border-radius: 6px; 
          display: flex; align-items: center; justify-content: center; 
          cursor: pointer; opacity: 0; transition: opacity 0.2s;
        }
        .imgThumbCard:hover .deleteImgBtn { opacity: 1; }
        
        .mainBadge { 
          position: absolute; bottom: 0; left: 0; width: 100%; 
          background: var(--tech-blue); color: white; 
          font-size: 0.6rem; font-weight: 800; text-align: center; padding: 4px 0;
        }
        .newBadge { 
          position: absolute; top: 5px; left: 5px; 
          background: var(--tech-blue); color: white; 
          font-size: 0.6rem; font-weight: 800; padding: 2px 6px; border-radius: 4px;
        }
        
        .emptyGridPlaceholder { 
          grid-column: 1 / -1; padding: 40px; text-align: center; 
          color: #475569; display: flex; flex-direction: column; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.01); border-radius: 16px; border: 1px dashed rgba(255,255,255,0.05);
        }
      `}</style>
    </div>
  );
};

export default ImageManager;
