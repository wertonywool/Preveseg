import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutList, Package, History, Tags, FileText, Zap, Palette, Eye, TrendingUp, DollarSign, Search, Image as ImageIcon, Mail } from 'lucide-react';
import ProductForm from './components/ProductForm';
import RecentProducts from './components/RecentProducts';
import CategoryManager from './components/CategoryManager';
import StyleManager from './components/StyleManager';
import NewsletterManager from './components/NewsletterManager';
import QRGenerator from './QRGenerator/QRGenerator';
import { useAdminProduct } from '../../hooks/useAdminProduct';
import { useCategories } from '../../hooks/useCategories';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const {
    product,
    setProduct,
    previews,
    setPreviews,
    loading,
    dbProducts,
    editingId,
    availableVariantTypes,
    handleInputChange,
    handleImageUpload,
    handleSubmit,
    cancelEdit,
    addDetail,
    updateDetail,
    setAllDetails,
    removeDetail,
    addVariant,
    updateVariant,
    removeVariant,
    toggleVisibility,
    toggleFeatured,
    startEdit,
    deleteProduct,
    handleCategoryToggle,
    handleListUpdate
  } = useAdminProduct();

  const { 
    categories, 
    loading: loadingCats, 
    createCategory, 
    updateCategory, 
    toggleCategoryVisibility, 
    deleteCategory 
  } = useCategories();

  const [activeTab, setActiveTab] = useState<'create' | 'inventory' | 'categories' | 'stats' | 'featured' | 'cards' | 'styles' | 'newsletter'>('inventory');
  const [inventorySearch, setInventorySearch] = useState('');

  // Sincronizar tab si se activa edición desde fuera (ej: useEffect de useAdminProduct)
  useEffect(() => {
    if (editingId && activeTab !== 'create') {
      setActiveTab('create');
    }
  }, [editingId, activeTab]);

  const startNewProduct = () => {
    // Si ya estamos en la pestaña de crear y no estamos editando, no resetear (evita borrar por accidente)
    if (activeTab === 'create' && !editingId) return;

    setProduct({
      nombre: '',
      descripcion: '',
      categoria: [],
      precioNormal: '',
      precioOferta: '',
      youtubeUrl: '',
      destacado: false,
      enOferta: false,
      imagenes: [],
      existingImages: [],
      detalles: [],
      variantes: [],
      loQueIncluye: [],
      caracteristicas: [],
      customHtml: '',
      customCss: ''
    });
    setPreviews([]);
    setActiveTab('create');
  };

  return (
    <div className="adminPage">
      <aside className="adminSidebar no-print">
        <div className="adminLogo">
          <div className="logoIcon"><Package size={24} /></div>
          <div className="logoText">
            <h2>Cualy <span>Admin</span></h2>
            <p>Panel de Control</p>
          </div>
        </div>

        <nav className="sidebarNav">
          <button 
            className={`navItem ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <History size={20} /> <span>Estadísticas</span>
          </button>
          <button 
            className={`navItem ${activeTab === 'featured' ? 'active' : ''}`}
            onClick={() => setActiveTab('featured')}
          >
            <Zap size={20} /> <span>Destacados</span>
          </button>
          <button 
            className={`navItem ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <LayoutList size={20} /> <span>Productos</span>
          </button>
          <button 
            className={`navItem ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => {
              if (!editingId) startNewProduct();
              else setActiveTab('create');
            }}
          >
            <Package size={20} /> <span>{editingId ? 'Editando' : 'Nuevo'}</span>
          </button>
          <button 
            className={`navItem ${activeTab === 'styles' ? 'active' : ''}`}
            onClick={() => setActiveTab('styles')}
          >
            <Palette size={20} /> <span>Estilos</span>
          </button>
          <button 
            className={`navItem ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <Tags size={20} /> <span>Categorías</span>
          </button>
          <button 
            className={`navItem ${activeTab === 'newsletter' ? 'active' : ''}`}
            onClick={() => setActiveTab('newsletter')}
          >
            <Mail size={20} /> <span>Boletín</span>
          </button>
          <button 
            className={`navItem ${activeTab === 'cards' ? 'active' : ''}`}
            onClick={() => setActiveTab('cards')}
          >
            <FileText size={20} /> <span>Cartas QR</span>
          </button>
        </nav>

        <div className="sidebarFooter">
          <button onClick={() => { localStorage.removeItem('isAdmin'); navigate('/login'); }} className="logoutBtn">
            <LogOut size={20} /> <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      <main className="adminMain">
        <header className="mainHeader no-print">
          <div className="headerInfo">
            <h1>{
              activeTab === 'stats' ? 'Estadísticas' :
              activeTab === 'featured' ? 'Productos Destacados' :
              activeTab === 'inventory' ? 'Inventario Completo' :
              activeTab === 'create' ? (editingId ? 'Modificar Producto' : 'Crear Nuevo Producto') :
              activeTab === 'cards' ? 'Generador de Cartas' :
              activeTab === 'newsletter' ? 'Gestión de Boletín' :
              'Gestión de Categorías'
            }</h1>
            <p>Gestiona tu tienda desde un solo lugar.</p>
          </div>
          <div className="headerActions">
            {activeTab === 'inventory' && (
              <button className="primaryActionBtn" onClick={startNewProduct}>
                + Agregar Producto
              </button>
            )}
          </div>
        </header>

        <div className="viewContainer">
          {activeTab === 'stats' && (
            <div className="statsDashboard animate-in">
              <div className="statsGrid">
                <div className="statCard primary">
                  <div className="statIcon"><Package size={24} /></div>
                  <div className="statInfo">
                    <span className="statLabel">Inventario Total</span>
                    <span className="statValue">{dbProducts.length}</span>
                    <span className="statSub">Productos registrados</span>
                  </div>
                </div>
                <div className="statCard success">
                  <div className="statIcon"><Eye size={24} /></div>
                  <div className="statInfo">
                    <span className="statLabel">Visibles al Público</span>
                    <span className="statValue">{dbProducts.filter(p => p.visible).length}</span>
                    <span className="statSub">Listos para comprar</span>
                  </div>
                </div>
                <div className="statCard warning">
                  <div className="statIcon"><Zap size={24} /></div>
                  <div className="statInfo">
                    <span className="statLabel">Productos Destacados</span>
                    <span className="statValue">{dbProducts.filter(p => p.destacado).length}</span>
                    <span className="statSub">En vitrina principal</span>
                  </div>
                </div>
                <div className="statCard info">
                  <div className="statIcon"><Tags size={24} /></div>
                  <div className="statInfo">
                    <span className="statLabel">Categorías Activas</span>
                    <span className="statValue">{categories.length}</span>
                    <span className="statSub">Segmentos de mercado</span>
                  </div>
                </div>
              </div>

              <div className="statsSecondaryGrid">
                <div className="dataCard">
                  <h3><TrendingUp size={18} /> Resumen de Ofertas</h3>
                  <div className="dataContent">
                    <div className="dataRow">
                      <span>Productos en Oferta</span>
                      <span className="count">{dbProducts.filter(p => p.en_oferta).length}</span>
                    </div>
                    <div className="dataRow">
                      <span>Sin Oferta</span>
                      <span className="count">{dbProducts.filter(p => !p.en_oferta).length}</span>
                    </div>
                    <div className="progressContainer">
                      <div 
                        className="progressBar" 
                        style={{ width: `${(dbProducts.filter(p => p.en_oferta).length / dbProducts.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="dataCard">
                  <h3><DollarSign size={18} /> Valor del Inventario</h3>
                  <div className="dataContent">
                    <div className="dataRow">
                      <span>Precio Promedio</span>
                      <span className="count">
                        ${(dbProducts.reduce((acc, p) => acc + (p.precio_oferta || 0), 0) / (dbProducts.length || 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="dataRow">
                      <span>Producto más costoso</span>
                      <span className="count">
                        ${Math.max(...dbProducts.map(p => p.precio_oferta || 0)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <style>{`
                .statsDashboard { display: flex; flex-direction: column; gap: 2rem; }
                .statsSecondaryGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; }
                
                .statCard { display: flex; align-items: center; gap: 20px; padding: 2rem; }
                .statIcon { width: 60px; height: 60px; border-radius: 20px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); color: white; }
                
                .statCard.primary .statIcon { background: rgba(0, 174, 239, 0.1); color: var(--tech-blue); }
                .statCard.success .statIcon { background: rgba(16, 185, 129, 0.1); color: #10b981; }
                .statCard.warning .statIcon { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
                .statCard.info .statIcon { background: rgba(99, 102, 241, 0.1); color: #6366f1; }
                
                .statInfo { display: flex; flex-direction: column; }
                .statSub { font-size: 0.75rem; color: #64748b; font-weight: 600; margin-top: 4px; }
                
                .dataCard { background: rgba(15, 23, 42, 0.6); border-radius: 32px; padding: 2rem; border: 1px solid rgba(255,255,255,0.03); }
                .dataCard h3 { font-size: 1rem; color: white; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 10px; font-weight: 800; }
                .dataContent { display: flex; flex-direction: column; gap: 15px; }
                .dataRow { display: flex; justify-content: space-between; font-size: 0.9rem; color: #94a3b8; font-weight: 600; }
                .dataRow .count { color: white; font-weight: 800; }
                
                .progressContainer { width: 100%; height: 8px; background: rgba(255,255,255,0.05); border-radius: 10px; overflow: hidden; margin-top: 5px; }
                .progressBar { height: 100%; background: var(--tech-blue); border-radius: 10px; box-shadow: 0 0 15px rgba(0, 174, 239, 0.4); }
              `}</style>
            </div>
          )}

          {activeTab === 'featured' && (
            <div className="inventoryView animate-in">
              <RecentProducts 
                products={dbProducts.filter(p => p.destacado)} 
                onToggleVisibility={toggleVisibility}
                onToggleFeatured={toggleFeatured}
                onEdit={(p) => { startEdit(p); setActiveTab('create'); }}
                onDelete={deleteProduct}
                isFullView={true}
              />
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="inventoryView animate-in">
              <div className="inventoryHeader">
                <div className="inventorySearch">
                  <Search size={20} />
                  <input 
                    type="text" 
                    placeholder="Buscar por nombre o categoría..." 
                    value={inventorySearch}
                    onChange={(e) => setInventorySearch(e.target.value)}
                  />
                  {inventorySearch && (
                    <button className="clearSearch" onClick={() => setInventorySearch('')}>
                      <ImageIcon size={16} />
                    </button>
                  )}
                </div>
              </div>
              <RecentProducts 
                products={dbProducts.filter(p => {
                  const search = inventorySearch.toLowerCase();
                  const categories = Array.isArray(p.categoria) ? p.categoria : [];
                  return p.nombre.toLowerCase().includes(search) ||
                         categories.some((c: string) => c.toLowerCase().includes(search));
                })} 
                onToggleVisibility={toggleVisibility}
                onToggleFeatured={toggleFeatured}
                onEdit={(p) => { startEdit(p); setActiveTab('create'); }}
                onDelete={deleteProduct}
                isFullView={true}
              />
            </div>
          )}

          <style>{`
            .inventoryHeader { margin-bottom: 2rem; display: flex; justify-content: flex-start; }
            .inventorySearch { 
              display: flex; align-items: center; gap: 12px; 
              background: rgba(15, 23, 42, 0.6); 
              padding: 12px 20px; border-radius: 20px; 
              border: 1.5px solid rgba(255,255,255,0.05);
              width: 100%; max-width: 500px;
              transition: all 0.3s;
            }
            .inventorySearch:focus-within { border-color: var(--tech-blue); box-shadow: 0 0 20px rgba(0, 174, 239, 0.15); }
            .inventorySearch input { background: none; border: none; color: white; outline: none; width: 100%; font-size: 0.95rem; }
            .inventorySearch svg { color: #64748b; }
            .clearSearch { background: none; border: none; color: #64748b; cursor: pointer; padding: 5px; display: flex; align-items: center; justify-content: center; }
            .clearSearch:hover { color: white; }
          `}</style>

          {activeTab === 'create' && product && (
            <div className="formView animate-in">
              <ProductForm 
                editingId={editingId} 
                product={product} 
                previews={previews} 
                loading={loading}
                availableVariantTypes={availableVariantTypes}
                categories={categories || []}
                onInputChange={handleInputChange} 
                onCategoryToggle={handleCategoryToggle}
                onImageUpload={handleImageUpload}
                onRemoveExisting={(url) => {
                  const currentImages = product.existingImages || [];
                  setProduct({...product, existingImages: currentImages.filter(i => i !== url)});
                }}
                onRemoveNew={(i) => {
                  const newImgs = [...(product.imagenes || [])]; newImgs.splice(i, 1);
                  const newPrevs = [...(previews || [])]; newPrevs.splice(i, 1);
                  setProduct({...product, imagenes: newImgs}); setPreviews(newPrevs);
                }}
                onReorder={(dragIdx, dropIdx) => {
                  const newExisting = [...(product.existingImages || [])];
                  if (newExisting.length > 0) {
                    const item = newExisting.splice(dragIdx, 1)[0];
                    newExisting.splice(dropIdx, 0, item);
                    setProduct({...product, existingImages: newExisting});
                  }
                }}
                onAddDetail={addDetail}
                onUpdateDetail={updateDetail}
                onSetAllDetails={setAllDetails}
                onRemoveDetail={removeDetail}
                onAddVariant={addVariant}
                onUpdateVariant={updateVariant}
                onRemoveVariant={removeVariant}
                onListUpdate={handleListUpdate}
                onSubmit={handleSubmit} 
                onCancel={() => { cancelEdit(); setActiveTab('inventory'); }}
              />
            </div>
          )}

          {activeTab === 'styles' && (
            <StyleManager onEditProduct={(p) => { startEdit(p); setActiveTab('create'); }} />
          )}

          {activeTab === 'categories' && (
            <div className="categoriesView animate-in">
              <CategoryManager 
                categories={categories}
                loading={loadingCats}
                createCategory={createCategory}
                updateCategory={updateCategory}
                toggleCategoryVisibility={toggleCategoryVisibility}
                deleteCategory={deleteCategory}
              />
            </div>
          )}

          {activeTab === 'cards' && (
            <div className="cardsView animate-in">
              <QRGenerator isSubComponent={true} />
            </div>
          )}

          {activeTab === 'newsletter' && (
            <div className="newsletterView animate-in">
              <NewsletterManager />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
