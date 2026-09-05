import React from 'react';
import { Pencil, Trash2, ExternalLink, Star, Image as ImageIcon, Package } from 'lucide-react';

interface RecentProductsProps {
  products: any[];
  onToggleVisibility: (id: number, current: boolean) => void;
  onToggleFeatured?: (id: number, current: boolean) => void;
  onEdit: (product: any) => void;
  onDelete: (id: number) => void;
  onViewAll?: () => void;
  isFullView?: boolean;
}

const RecentProducts: React.FC<RecentProductsProps> = ({ 
  products = [], 
  onToggleVisibility, 
  onToggleFeatured,
  onEdit, 
  onDelete, 
  isFullView = false 
}) => {
  if (isFullView) {
    return (
      <div className="fullInventoryWrapper">
        <div className="tableContainer">
          <table className="inventoryTable">
            <thead>
              <tr>
                <th style={{ minWidth: '260px' }}>Producto</th>
                <th style={{ width: '130px' }}>Estado</th>
                <th style={{ width: '150px' }}>Precio</th>
                <th style={{ width: '160px' }}>Categoría</th>
                <th className="textCenter" style={{ width: '90px' }}>Destacado</th>
                <th className="textRight" style={{ width: '130px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const imgList = Array.isArray(p.imagenes) 
                  ? p.imagenes 
                  : (typeof p.imagenes === 'string' && p.imagenes ? [p.imagenes] : []);
                const mainImg = imgList.length > 0 ? imgList[0] : null;

                const offerPrice = Number(p.precio_oferta || 0);
                const normalPrice = Number(p.precio_normal || 0);
                const hasDiscount = normalPrice > offerPrice && offerPrice > 0;
                const discountPercent = hasDiscount 
                  ? Math.round(((normalPrice - offerPrice) / normalPrice) * 100) 
                  : 0;

                const categories = Array.isArray(p.categoria) 
                  ? p.categoria 
                  : (p.categoria ? [p.categoria] : []);

                return (
                  <tr key={p.id} className={!p.visible ? 'row-hidden' : ''}>
                    {/* PRODUCT INFO */}
                    <td>
                      <div className="productInfoCell">
                        <div className="pThumb">
                          {mainImg ? (
                            <img 
                              src={mainImg} 
                              alt={p.nombre || 'Producto'} 
                              loading="lazy"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = 'none';
                                if (target.parentElement) {
                                  target.parentElement.innerHTML = '<span style="color:#94a3b8;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></span>';
                                }
                              }}
                            />
                          ) : (
                            <ImageIcon size={20} className="pThumbFallbackIcon" />
                          )}
                        </div>
                        <div className="productNames">
                          <span className="pName" title={p.nombre}>{p.nombre || 'Sin nombre'}</span>
                          <div className="pMetaTags">
                            <span className="pId">ID #{p.id.toString().slice(-6)}</span>
                            {p.es_kit && <span className="pTagBadge kit">Kit</span>}
                            {p.en_oferta && <span className="pTagBadge offer">Oferta</span>}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td>
                      <button 
                        type="button"
                        className={`statusBadge ${p.visible ? 'active' : 'inactive'}`}
                        onClick={() => onToggleVisibility(p.id, p.visible)}
                        title={p.visible ? 'Click para ocultar del catálogo' : 'Click para publicar en la tienda'}
                      >
                        <span className="statusDot" />
                        {p.visible ? 'Público' : 'Oculto'}
                      </button>
                    </td>

                    {/* PRICE */}
                    <td>
                      <div className="priceCell">
                        <span className="pOffer">
                          ${offerPrice > 0 ? offerPrice.toLocaleString('es-CO') : (normalPrice > 0 ? normalPrice.toLocaleString('es-CO') : '0')}
                        </span>
                        {hasDiscount && (
                          <div className="pNormalRow">
                            <span className="pNormal">${normalPrice.toLocaleString('es-CO')}</span>
                            <span className="pDiscountChip">-{discountPercent}%</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td>
                      <div className="categoryCell">
                        {categories.length > 0 ? (
                          categories.slice(0, 2).map((cat: string, idx: number) => (
                            <span key={idx} className="categoryBadge">{cat}</span>
                          ))
                        ) : (
                          <span className="categoryBadge empty">Sin categoría</span>
                        )}
                        {categories.length > 2 && (
                          <span className="categoryBadge" title={categories.slice(2).join(', ')}>
                            +{categories.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* FEATURED */}
                    <td className="textCenter">
                      <button 
                        type="button"
                        className={`starBadge ${p.destacado ? 'is-destacado' : ''}`}
                        onClick={() => onToggleFeatured && onToggleFeatured(p.id, p.destacado)}
                        title={p.destacado ? "Quitar de destacados" : "Marcar como destacado"}
                      >
                        <Star 
                          size={18} 
                          fill={p.destacado ? "#f59e0b" : "none"} 
                          color={p.destacado ? "#f59e0b" : "#94a3b8"} 
                        />
                      </button>
                    </td>

                    {/* ACTIONS */}
                    <td>
                      <div className="tableActions">
                        <button 
                          type="button" 
                          onClick={() => onEdit(p)} 
                          className="tableBtn edit" 
                          title="Editar producto"
                        >
                          <Pencil size={16} />
                        </button>
                        <a 
                          href={`/producto/${p.id}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="tableBtn view" 
                          title="Ver en la tienda"
                        >
                          <ExternalLink size={16} />
                        </a>
                        <button 
                          type="button" 
                          onClick={() => onDelete(p.id)} 
                          className="tableBtn delete" 
                          title="Eliminar producto"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="emptyState">
              <div className="emptyStateIcon">
                <Package size={36} />
              </div>
              <h4>No se encontraron productos</h4>
              <p>Intenta ajustar la búsqueda o los filtros para encontrar tus productos.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mini-view (e.g. for sidebar or compact widget)
  return (
    <div className="recentProductsList">
      {products && products.length > 0 ? products.slice(0, 5).map((p) => {
        const imgList = Array.isArray(p.imagenes) ? p.imagenes : (typeof p.imagenes === 'string' && p.imagenes ? [p.imagenes] : []);
        const mainImg = imgList.length > 0 ? imgList[0] : null;
        const price = p.precio_oferta || p.precio_normal || 0;

        return (
          <div key={p.id} className="miniProductCard">
            <div className="miniThumb">
              {mainImg ? (
                <img src={mainImg} alt={p.nombre || ''} />
              ) : (
                <ImageIcon size={16} color="#94a3b8" />
              )}
            </div>
            <div className="miniProductMeta">
              <h4>{p.nombre}</h4>
              <div className="miniProductPricing">
                <span className="miniPrice">${Number(price).toLocaleString('es-CO')}</span>
                {!p.visible && <span className="hiddenBadge">Oculto</span>}
              </div>
            </div>
            <button type="button" onClick={() => onEdit(p)} className="miniEditBtn" title="Editar">
              <Pencil size={15}/>
            </button>
          </div>
        );
      }) : (
        <div className="noActivity">
          <p>Sin productos recientes.</p>
        </div>
      )}
    </div>
  );
};

export default RecentProducts;
