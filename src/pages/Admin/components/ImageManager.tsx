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
        .imageManagerSection { display: flex; flex-direction: column; gap: 1.5rem; width: 100%; }
        
        .uploadZone { width: 100%; }
        .uploadLabel { 
          display: flex; align-items: center; gap: 18px; 
          padding: 22px; background: rgba(0, 102, 255, 0.08); 
          border: 2px dashed rgba(0, 102, 255, 0.35); 
          border-radius: 16px; cursor: pointer; transition: all 0.25s;
        }
        .uploadLabel:hover { background: rgba(0, 102, 255, 0.12); border-color: #0066ff; }
        .uploadIconBox { 
          width: 52px; height: 52px; background: linear-gradient(135deg, #0066ff 0%, #ee1b24 100%); 
          border-radius: 14px; display: flex; align-items: center; 
          justify-content: center; color: white; box-shadow: 0 4px 15px rgba(0, 102, 255, 0.35);
          flex-shrink: 0;
        }
        .uploadText { display: flex; flex-direction: column; }
        .uploadText .mainText { font-weight: 800; color: white; font-size: 1rem; }
        .uploadText .subText { font-size: 0.8rem; color: #94a3b8; margin-top: 2px; }

        .imagesGrid { 
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); 
          gap: 14px; 
        }
        
        .imgThumbCard { 
          position: relative; aspect-ratio: 1/1; 
          background: #070b14; border-radius: 14px; 
          border: 1.5px solid rgba(255,255,255,0.08); 
          overflow: hidden; transition: transform 0.2s;
        }
        .imgThumbCard:hover { transform: scale(1.02); z-index: 10; border-color: rgba(0, 102, 255, 0.4); }
        .imgThumbCard.is-new { border: 2px dashed #0066ff; }
        
        .imgWrapper { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #070b14; }
        .imgWrapper img { width: 100%; height: 100%; object-fit: contain; padding: 6px; }
        
        .dragHandle { 
          position: absolute; top: 6px; left: 6px; 
          background: rgba(0,0,0,0.6); color: white; 
          padding: 4px; border-radius: 6px; cursor: grab; opacity: 0.8; transition: opacity 0.2s;
        }
        
        .deleteImgBtn { 
          position: absolute; top: 6px; right: 6px; 
          background: #ee1b24; color: white; border: none; 
          width: 28px; height: 28px; border-radius: 50%; 
          display: flex; align-items: center; justify-content: center; 
          cursor: pointer; opacity: 1; transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
          z-index: 5;
        }
        .deleteImgBtn:hover { background: #dc141d; transform: scale(1.15); }
        
        .mainBadge { 
          position: absolute; bottom: 0; left: 0; width: 100%; 
          background: linear-gradient(135deg, #0066ff 0%, #0047cc 100%); color: white; 
          font-size: 0.64rem; font-weight: 900; text-align: center; padding: 4px 0;
          letter-spacing: 0.05em;
        }
        .newBadge { 
          position: absolute; bottom: 0; left: 0; width: 100%; 
          background: linear-gradient(135deg, #ee1b24 0%, #c41018 100%); color: white; 
          font-size: 0.64rem; font-weight: 900; text-align: center; padding: 4px 0;
          letter-spacing: 0.05em;
        }
        
        .emptyGridPlaceholder { 
          grid-column: 1 / -1; padding: 40px 20px; text-align: center; 
          color: #64748b; display: flex; flex-direction: column; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.015); border-radius: 16px; border: 1px dashed rgba(255,255,255,0.08);
        }
        .emptyGridPlaceholder p { font-size: 0.9rem; margin: 0; }

        @media (max-width: 640px) {
          .imagesGrid { grid-template-columns: repeat(3, 1fr); gap: 10px; }
          .uploadLabel { padding: 16px; }
        }
      `}</style>
    </div>
  );
};

export default ImageManager;
