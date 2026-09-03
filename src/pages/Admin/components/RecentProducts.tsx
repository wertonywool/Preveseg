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
        .recentProductsList { display: flex; flex-direction: column; gap: 10px; }
        .miniProductCard { display: flex; align-items: center; gap: 14px; padding: 12px 14px; border-radius: 14px; background: #ffffff; border: 1.5px solid #e2e8f0; transition: all 0.2s; }
        .miniProductCard:hover { background: #f8fafc; border-color: #ee1b24; transform: translateX(3px); }
        .miniThumb { width: 44px; height: 44px; border-radius: 10px; overflow: hidden; background: #f8fafc; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .miniThumb img { width: 100%; height: 100%; object-fit: contain; }
        .miniProductMeta { flex: 1; min-width: 0; }
        .miniProductMeta h4 { font-size: 0.9rem; font-weight: 800; color: #0f172a; margin: 0 0 2px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .miniPrice { font-size: 0.84rem; font-weight: 900; color: #ee1b24; }
        .hiddenBadge { font-size: 0.65rem; background: #fee2e2; color: #ee1b24; padding: 2px 6px; border-radius: 4px; margin-left: 8px; font-weight: 800; }
        .miniEditBtn { background: #f8fafc; border: 1.5px solid #e2e8f0; color: #64748b; width: 34px; height: 34px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .miniEditBtn:hover { background: #ee1b24; color: white; border-color: #ee1b24; }
        .noActivity { padding: 2rem; text-align: center; color: #64748b; font-size: 0.88rem; font-weight: 600; }
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
