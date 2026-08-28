import { Search, Trash2, Eye, EyeOff, Pencil, ArrowLeft, Loader2, Star, Package, ShoppingBag } from 'lucide-react';
import { useInventory } from '../../hooks/useInventory';
import './Inventory.css';

const Inventory = () => {
  const {
    filtered,
    loading,
    searchTerm,
    handleSearch,
    toggleVisibility,
    toggleDestacado,
    deleteProduct,
    startEdit,
    navigate,
    stats
  } = useInventory();

  return (
    <div className="inventoryPage">
      <header className="inventoryHeader">
        <div className="headerTop">
          <button onClick={() => navigate('/wertonywool')} className="backBtn">
            <ArrowLeft size={20}/> Volver al Panel
          </button>
          <h1>Gestión de <span>Inventario</span></h1>
        </div>
        
        <div className="statsGrid">
          <div className="statCard">
            <Package size={20} color="#00AEEF" />
            <div className="statInfo">
              <span className="statLabel">Total</span>
              <span className="statValue">{stats.total}</span>
            </div>
          </div>
          <div className="statCard">
            <Eye size={20} color="#10B981" />
            <div className="statInfo">
              <span className="statLabel">Visibles</span>
              <span className="statValue">{stats.visible}</span>
            </div>
          </div>
          <div className="statCard">
            <Star size={20} color="#F59E0B" />
            <div className="statInfo">
              <span className="statLabel">Destacados</span>
              <span className="statValue">{stats.featured} / 3</span>
            </div>
          </div>
        </div>

        <div className="searchBarContainer">
          <div className="searchBox">
            <Search className="searchIcon" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre o categoría..." 
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <button onClick={() => navigate('/wertonywool')} className="addNewBtn">
             Nuevo Producto
          </button>
        </div>
      </header>

      {loading ? (
        <div className="loadingState">
          <Loader2 className="animate-spin" size={48} color="#00AEEF"/>
          <p>Cargando inventario...</p>
        </div>
      ) : (
        <div className="inventoryContainer">
          <div className="inventoryTable">
            <div className="tableHeader">
              <div className="colProduct">Producto</div>
              <div className="colCategory">Categoría</div>
              <div className="colPrice">Precio</div>
              <div className="colStatus">Estado</div>
              <div className="colActions">Acciones</div>
            </div>

            <div className="tableBody">
              {filtered.map(p => (
                <div key={p.id} className={`tableRow ${!p.visible ? 'is-hidden' : ''}`}>
                  <div className="colProduct">
                    <div className="productInfo">
                      <img src={Array.isArray(p.imagenes) ? p.imagenes[0] : (typeof p.imagenes === 'string' ? p.imagenes : 'https://via.placeholder.com/50')} alt={p.nombre} />
                      <div className="nameWrapper">
                        <span className="pName">{p.nombre || 'Sin nombre'}</span>
                        <span className="pId">ID: {p.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="colCategory">
                    <span className="categoryBadge">{p.categoria || 'Sin categoría'}</span>
                  </div>
                  <div className="colPrice">
                    <span className="priceValue">${(p.precio_oferta || 0).toLocaleString()}</span>
                  </div>
                  <div className="colStatus">
                    <div className="statusBadges">
                      {p.visible ? <span className="statusTag visible">Público</span> : <span className="statusTag hidden">Oculto</span>}
                      {p.destacado && <span className="statusTag featured">★ Destacado</span>}
                    </div>
                  </div>
                  <div className="colActions">
                    <div className="btnGroup">
                      <button 
                        onClick={() => toggleDestacado(p.id, p.destacado)}
                        className={`actionBtn star ${p.destacado ? 'active' : ''}`}
                        title={p.destacado ? 'Quitar de destacados' : 'Poner en destacados'}
                      >
                        <Star size={18} fill={p.destacado ? "currentColor" : "none"} />
                      </button>
                      <button 
                        onClick={() => toggleVisibility(p.id, p.visible)}
                        className={`actionBtn eye ${p.visible ? 'active' : ''}`}
                        title={p.visible ? 'Ocultar producto' : 'Mostrar producto'}
                      >
                        {p.visible ? <Eye size={18}/> : <EyeOff size={18}/>}
                      </button>
                      <button onClick={() => startEdit(p)} className="actionBtn edit" title="Editar"><Pencil size={18}/></button>
                      <button onClick={() => deleteProduct(p.id)} className="actionBtn delete" title="Borrar"><Trash2 size={18}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filtered.length === 0 && (
            <div className="emptyState">
              <ShoppingBag size={48} color="#cbd5e1" />
              <p>No se encontraron productos en el inventario.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Inventory;
