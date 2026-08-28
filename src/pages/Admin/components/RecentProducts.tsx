import { Pencil, Trash2, ExternalLink, Star, Image as ImageIcon } from 'lucide-react';

interface RecentProductsProps {
  products: any[];
  onToggleVisibility: (id: number, current: boolean) => void;
  onToggleFeatured?: (id: number, current: boolean) => void;
  onEdit: (product: any) => void;
  onDelete: (id: number) => void;
  onViewAll?: () => void;
  isFullView?: boolean;
}

const RecentProducts = ({ 
  products, 
  onToggleVisibility, 
  onToggleFeatured,
  onEdit, 
  onDelete, 
  isFullView = false 
}: RecentProductsProps) => {
  if (isFullView) {
    return (
      <div className="fullInventoryWrapper">
        <div className="tableContainer">
          <table className="inventoryTable">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Estado</th>
                <th>Precio Actual</th>
                <th>Categoría</th>
                <th className="textCenter">Destacado</th>
                <th className="textRight">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className={!p.visible ? 'row-hidden' : ''}>
                  <td>
                    <div className="productInfoCell">
                      <div className="pThumb">
                        {p.imagenes && p.imagenes.length > 0 ? (
                          <img src={p.imagenes[0]} alt="" />
                        ) : (
                          <ImageIcon size={18} />
                        )}
                      </div>
                      <div className="productNames">
                        <span className="pName">{p.nombre}</span>
                        <span className="pId">#{p.id.toString().slice(-6)}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button 
                      className={`statusBadge ${p.visible ? 'active' : 'inactive'}`}
                      onClick={() => onToggleVisibility(p.id, p.visible)}
                    >
                      {p.visible ? 'Público' : 'Oculto'}
                    </button>
                  </td>
                  <td>
                    <div className="priceCell">
                      <span className="pOffer">${p.precio_oferta?.toLocaleString()}</span>
                      {p.precio_normal > p.precio_oferta && (
                        <span className="pNormal">${p.precio_normal?.toLocaleString()}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="categoryBadge">
                      {Array.isArray(p.categoria) ? p.categoria[0] : (p.categoria || 'Sin cat.')}
                    </span>
                  </td>
                  <td className="textCenter">
                    <button 
                      className={`starBadge ${p.destacado ? 'is-destacado' : ''}`}
                      onClick={() => onToggleFeatured && onToggleFeatured(p.id, p.destacado)}
                      title={p.destacado ? "Quitar de destacados" : "Marcar como destacado"}
                    >
                      <Star size={18} fill={p.destacado ? "currentColor" : "none"} />
                    </button>
                  </td>
                  <td>
                    <div className="tableActions">
                      <button onClick={() => onEdit(p)} className="tableBtn edit" title="Editar">
                        <Pencil size={18} />
                      </button>
                      <a href={`/producto/${p.id}`} target="_blank" rel="noreferrer" className="tableBtn view" title="Ver">
                        <ExternalLink size={18} />
                      </a>
                      <button onClick={() => onDelete(p.id)} className="tableBtn delete" title="Eliminar">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="emptyState">
              <p>No se encontraron productos con esos criterios.</p>
            </div>
          )}
        </div>

        <style>{`
          .fullInventoryWrapper { width: 100%; animation: slideIn 0.4s ease-out; }
          .tableContainer { 
            overflow-x: auto; 
            background: rgba(15, 23, 42, 0.4); 
            border-radius: 32px; 
            border: 1.5px solid rgba(255,255,255,0.03);
            padding: 12px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.4);
          }
          .inventoryTable { width: 100%; border-collapse: separate; border-spacing: 0 12px; margin-top: -12px; }
          .inventoryTable th { 
            text-align: left; 
            padding: 1.5rem; 
            color: #94a3b8; 
            font-size: 0.7rem; 
            text-transform: uppercase; 
            letter-spacing: 2px; 
            font-weight: 800; 
            border-bottom: none;
          }
          .inventoryTable td { 
            padding: 1.2rem 1.5rem; 
            vertical-align: middle; 
            background: rgba(30, 41, 59, 0.4); 
            border-top: 1px solid rgba(255,255,255,0.03); 
            border-bottom: 1px solid rgba(255,255,255,0.03);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .inventoryTable tr:hover td {
            background: rgba(30, 41, 59, 0.8);
            border-color: rgba(0, 174, 239, 0.3);
            transform: scale(1.002);
          }

          .inventoryTable td:first-child { border-left: 1px solid rgba(255,255,255,0.03); border-radius: 20px 0 0 20px; }
          .inventoryTable td:last-child { border-right: 1px solid rgba(255,255,255,0.03); border-radius: 0 20px 20px 0; }
          
          .row-hidden td { opacity: 0.4; filter: grayscale(0.6); }
          .textCenter { text-align: center !important; }
          .textRight { text-align: right !important; }
          
          .productInfoCell { display: flex; align-items: center; gap: 20px; }
          .pThumb { 
            width: 58px; height: 58px; border-radius: 16px; overflow: hidden; 
            background: #020617; display: flex; align-items: center; justify-content: center; 
            border: 2px solid rgba(255,255,255,0.08);
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
          }
          .pThumb img { width: 100%; height: 100%; object-fit: cover; }
          .productNames { display: flex; flex-direction: column; gap: 4px; }
          .pName { font-weight: 800; color: white; font-size: 1rem; letter-spacing: -0.3px; }
          .pId { font-size: 0.65rem; color: #64748b; font-family: 'JetBrains Mono', monospace; font-weight: 600; background: rgba(0,0,0,0.2); padding: 2px 6px; border-radius: 6px; width: fit-content; }
          
          .statusBadge { 
            border: none; padding: 8px 18px; border-radius: 14px; 
            font-size: 0.7rem; font-weight: 950; text-transform: uppercase; 
            cursor: pointer; transition: all 0.3s; letter-spacing: 0.8px;
          }
          .statusBadge.active { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.25); box-shadow: 0 0 15px rgba(16, 185, 129, 0.1); }
          .statusBadge.inactive { background: rgba(100, 116, 139, 0.1); color: #94a3b8; border: 1px solid rgba(100, 116, 139, 0.1); }
          .statusBadge:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
          
          .priceCell { display: flex; flex-direction: column; gap: 3px; }
          .pOffer { font-weight: 950; color: white; font-size: 1.15rem; }
          .pNormal { font-size: 0.8rem; color: #475569; text-decoration: line-through; font-weight: 700; opacity: 0.7; }
          
          .categoryBadge { 
            background: rgba(0, 102, 255, 0.12); 
            color: #60a5fa; 
            padding: 6px 14px; border-radius: 10px; font-size: 0.72rem; 
            font-weight: 800; border: 1px solid rgba(0, 102, 255, 0.25);
            text-transform: uppercase; letter-spacing: 0.05em;
          }
          
          .starBadge { 
            background: none; border: none; padding: 5px; cursor: pointer;
            color: #334155; display: inline-flex; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
          }
          .starBadge:hover { transform: scale(1.25); }
          .starBadge.is-destacado { color: #f59e0b; filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.5)); }

          .tableActions { display: flex; justify-content: flex-end; gap: 10px; }
          .tableBtn { 
            background: #070b14; border: 1.5px solid rgba(255,255,255,0.08); 
            color: #94a3b8; width: 40px; height: 40px; border-radius: 12px; 
            display: flex; align-items: center; justify-content: center; 
            cursor: pointer; transition: all 0.25s;
          }
          .tableBtn:hover { transform: translateY(-3px); border-color: rgba(255,255,255,0.25); color: white; background: #0e172a; }
          .tableBtn.edit:hover { border-color: #0066ff; color: #60a5fa; box-shadow: 0 4px 15px rgba(0, 102, 255, 0.35); }
          .tableBtn.delete:hover { border-color: #ee1b24; color: #ff6b6b; box-shadow: 0 4px 15px rgba(238, 27, 36, 0.35); }
          .tableBtn.view:hover { border-color: #10b981; color: #34d399; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.35); }
          
          .emptyState { padding: 5rem 2rem; text-align: center; color: #64748b; font-style: italic; font-weight: 500; }
          
          @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

          @media (max-width: 1100px) {
            .inventoryTable th:nth-child(4), .inventoryTable td:nth-child(4) { display: none; }
          }
          @media (max-width: 900px) {
            .inventoryTable th:nth-child(2), .inventoryTable td:nth-child(2),
            .inventoryTable th:nth-child(5), .inventoryTable td:nth-child(5) { display: none; }
            .pName { font-size: 0.85rem; }
            .pThumb { width: 44px; height: 44px; }
            .tableBtn { width: 36px; height: 36px; border-radius: 10px; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="recentProductsList">
      {products && products.length > 0 ? products.slice(0, 5).map((p) => (
        <div key={p.id} className="miniProductCard">
          <div className="miniThumb">
            {p.imagenes && p.imagenes.length > 0 ? (
              <img src={p.imagenes[0]} alt="" />
            ) : (
              <ImageIcon size={16} />
            )}
          </div>
          <div className="miniProductMeta">
            <h4>{p.nombre}</h4>
            <div className="miniProductPricing">
              <span className="miniPrice">${p.precio_offer?.toLocaleString() || p.precio_oferta?.toLocaleString()}</span>
              {!p.visible && <span className="hiddenBadge">Oculto</span>}
            </div>
          </div>
          <button type="button" onClick={() => onEdit(p)} className="miniEditBtn"><Pencil size={16}/></button>
        </div>
      )) : (
        <div className="noActivity"><p>Sin productos recientes.</p></div>
      )}
      
      <style>{`
        .recentProductsList { display: flex; flex-direction: column; gap: 10px; }
        .miniProductCard { display: flex; align-items: center; gap: 14px; padding: 12px 14px; border-radius: 14px; background: #070b14; border: 1px solid rgba(255,255,255,0.06); transition: all 0.25s; }
        .miniProductCard:hover { background: #0c1324; transform: translateX(4px); border-color: rgba(0, 102, 255, 0.3); }
        .miniThumb { width: 42px; height: 42px; border-radius: 10px; overflow: hidden; background: #0d1527; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .miniThumb img { width: 100%; height: 100%; object-fit: contain; }
        .miniProductMeta { flex: 1; min-width: 0; }
        .miniProductMeta h4 { font-size: 0.88rem; font-weight: 700; color: white; margin: 0 0 2px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .miniPrice { font-size: 0.82rem; font-weight: 800; color: #60a5fa; }
        .hiddenBadge { font-size: 0.62rem; background: rgba(238, 27, 36, 0.15); color: #ff6b6b; padding: 2px 6px; border-radius: 4px; margin-left: 8px; font-weight: 800; }
        .miniEditBtn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); color: #94a3b8; width: 34px; height: 34px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .miniEditBtn:hover { background: #0066ff; color: white; }
        .noActivity { padding: 2rem; text-align: center; color: #64748b; font-size: 0.85rem; }
      `}</style>
    </div>
  );
};

export default RecentProducts;
