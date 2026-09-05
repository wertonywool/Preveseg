import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, LayoutList, Package, History, Tags, Zap, Eye, EyeOff,
  TrendingUp, DollarSign, Search, X, RotateCcw,
  ShieldCheck, Layers, ArrowRight, ExternalLink, Plus, BarChart3, CheckCircle2 
} from 'lucide-react';
import logoImg from '../../assets/logo.png';
import ProductForm from './components/ProductForm';
import RecentProducts from './components/RecentProducts';
import CategoryManager from './components/CategoryManager';
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

  const [activeTab, setActiveTab] = useState<'create' | 'inventory' | 'categories' | 'stats' | 'featured'>('inventory');
  
  // INVENTORY FILTERS & SEARCH
  const [inventorySearch, setInventorySearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'visible' | 'hidden' | 'featured'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'price-asc' | 'price-desc' | 'name'>('newest');

  // Sincronizar tab si se activa edición desde fuera (ej: useEffect de useAdminProduct)
  useEffect(() => {
    if (editingId && activeTab !== 'create') {
      setActiveTab('create');
    }
  }, [editingId, activeTab]);

  // Lista única de categorías encontradas en base de datos y en la gestión de categorías
  const allCategoryNames = useMemo(() => {
    const set = new Set<string>();
    categories.forEach(c => {
      if (c && c.nombre) set.add(c.nombre);
    });
    dbProducts.forEach(p => {
      if (Array.isArray(p.categoria)) {
        p.categoria.forEach((cat: string) => { if (cat) set.add(cat); });
      } else if (p.categoria) {
        set.add(p.categoria);
      }
    });
    return Array.from(set).sort();
  }, [categories, dbProducts]);

  // Filtrado y ordenamiento de inventario
  const filteredProducts = useMemo(() => {
    return dbProducts.filter(p => {
      const search = inventorySearch.toLowerCase().trim();
      const pCats = Array.isArray(p.categoria) ? p.categoria : (p.categoria ? [p.categoria] : []);
      
      const matchesSearch = !search ||
        (p.nombre && p.nombre.toLowerCase().includes(search)) ||
        (p.id && p.id.toString().includes(search)) ||
        pCats.some((c: string) => c.toLowerCase().includes(search));

      const matchesCategory = categoryFilter === 'all' ||
        pCats.some((c: string) => c.toLowerCase() === categoryFilter.toLowerCase());

      const matchesStatus = 
        statusFilter === 'all' ? true :
        statusFilter === 'visible' ? p.visible :
        statusFilter === 'hidden' ? !p.visible :
        statusFilter === 'featured' ? p.destacado : true;

      return matchesSearch && matchesCategory && matchesStatus;
    }).sort((a, b) => {
      if (sortOrder === 'price-asc') {
        const pA = Number(a.precio_oferta || a.precio_normal || 0);
        const pB = Number(b.precio_oferta || b.precio_normal || 0);
        return pA - pB;
      }
      if (sortOrder === 'price-desc') {
        const pA = Number(a.precio_oferta || a.precio_normal || 0);
        const pB = Number(b.precio_oferta || b.precio_normal || 0);
        return pB - pA;
      }
      if (sortOrder === 'name') {
        return (a.nombre || '').localeCompare(b.nombre || '');
      }
      return Number(b.id) - Number(a.id);
    });
  }, [dbProducts, inventorySearch, categoryFilter, statusFilter, sortOrder]);

  const hasActiveFilters = inventorySearch !== '' || categoryFilter !== 'all' || statusFilter !== 'all' || sortOrder !== 'newest';

  const clearAllFilters = () => {
    setInventorySearch('');
    setCategoryFilter('all');
    setStatusFilter('all');
    setSortOrder('newest');
  };

  // Métricas avanzadas para la página de estadísticas
  const statsMetrics = useMemo(() => {
    const total = dbProducts.length;
    const visibleCount = dbProducts.filter(p => p.visible).length;
    const hiddenCount = dbProducts.filter(p => !p.visible).length;
    const visiblePercent = total > 0 ? Math.round((visibleCount / total) * 100) : 0;
    const featuredCount = dbProducts.filter(p => p.destacado).length;
    const offerCount = dbProducts.filter(p => p.en_oferta || (Number(p.precio_normal) > Number(p.precio_oferta) && Number(p.precio_oferta) > 0)).length;
    const regularCount = total - offerCount;
    const kitsCount = dbProducts.filter(p => p.es_kit).length;
    const withVideoCount = dbProducts.filter(p => p.youtube_url || p.youtubeUrl).length;
    const withImagesCount = dbProducts.filter(p => Array.isArray(p.imagenes) && p.imagenes.length > 0).length;
    const withMultiImagesCount = dbProducts.filter(p => Array.isArray(p.imagenes) && p.imagenes.length > 1).length;
    const withSpecsCount = dbProducts.filter(p => Array.isArray(p.detalles) && p.detalles.length > 0).length;
    const withVariantsCount = dbProducts.filter(p => Array.isArray(p.variantes) && p.variantes.length > 0).length;

    // Precios y valoración económica
    const prices = dbProducts.map(p => Number(p.precio_oferta) || Number(p.precio_normal) || 0);
    const positivePrices = prices.filter(pr => pr > 0);
    const totalCatalogValue = prices.reduce((acc, curr) => acc + curr, 0);
    const avgPrice = total > 0 ? Math.round(totalCatalogValue / total) : 0;
    const minPrice = positivePrices.length > 0 ? Math.min(...positivePrices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
    
    // Ahorro total acumulado en descuentos
    const totalSavings = dbProducts
      .filter(p => Number(p.precio_normal) > Number(p.precio_oferta) && Number(p.precio_oferta) > 0)
      .reduce((acc, p) => acc + (Number(p.precio_normal) - Number(p.precio_oferta)), 0);

    // Distribución por categorías
    const categoryCounts: { [cat: string]: number } = {};
    dbProducts.forEach(p => {
      const pCats = Array.isArray(p.categoria) ? p.categoria : (p.categoria ? [p.categoria] : ['Sin categoría']);
      if (pCats.length === 0) {
        categoryCounts['Sin categoría'] = (categoryCounts['Sin categoría'] || 0) + 1;
      } else {
        pCats.forEach((c: string) => {
          if (c) categoryCounts[c] = (categoryCounts[c] || 0) + 1;
        });
      }
    });

    const categoryDistribution = Object.entries(categoryCounts)
      .map(([name, count]) => ({
        name,
        count,
        percent: total > 0 ? Math.round((count / total) * 100) : 0
      }))
      .sort((a, b) => b.count - a.count);

    return {
      total,
      visibleCount,
      hiddenCount,
      visiblePercent,
      featuredCount,
      offerCount,
      regularCount,
      kitsCount,
      withVideoCount,
      withImagesCount,
      withMultiImagesCount,
      withSpecsCount,
      withVariantsCount,
      totalCatalogValue,
      avgPrice,
      minPrice,
      maxPrice,
      totalSavings,
      categoryDistribution
    };
  }, [dbProducts]);

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
      es_kit: false,
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
          <div className="adminBrand">
            <div className="adminLogoBadge">
              <img src={logoImg} alt="Preveseg Logo" className="adminLogoImg" />
            </div>
            <div className="logoText">
              <h2>Preveseg <span>Admin</span></h2>
              <p>Seguridad Industrial</p>
            </div>
          </div>
          <button 
            onClick={() => { localStorage.removeItem('isAdmin'); navigate('/login'); }} 
            className="mobileHeaderLogout"
            title="Cerrar Sesión"
          >
            <LogOut size={16} /> <span>Salir</span>
          </button>
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
            className={`navItem ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <Tags size={20} /> <span>Categorías</span>
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
              {/* OPERATIONAL BANNER */}
              <div className="statsBanner">
                <div className="statsBannerContent">
                  <h2>
                    <BarChart3 size={24} color="#ee1b24" />
                    Panel de Control y Métricas Preveseg
                  </h2>
                  <p>
                    Analítica integral de catálogo, valoración comercial y estado del inventario en tiempo real.
                  </p>
                </div>
                <div className="statsBannerActions">
                  <button 
                    type="button" 
                    className="statsBannerBtn primary" 
                    onClick={startNewProduct}
                  >
                    <Plus size={16} /> <span>Nuevo Producto</span>
                  </button>
                  <button 
                    type="button" 
                    className="statsBannerBtn" 
                    onClick={() => setActiveTab('inventory')}
                  >
                    <LayoutList size={16} /> <span>Ver Catálogo</span>
                  </button>
                  <a 
                    href="/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="statsBannerBtn"
                  >
                    <ExternalLink size={16} /> <span>Ver Tienda</span>
                  </a>
                </div>
              </div>

              {/* TOP 4 INTERACTIVE KPI CARDS */}
              <div className="statsGrid">
                {/* 1. TOTAL INVENTORY */}
                <div 
                  className="statCard primary" 
                  onClick={() => setActiveTab('inventory')}
                  title="Click para ver inventario completo"
                >
                  <div className="statIcon"><Package size={24} /></div>
                  <div className="statInfo">
                    <div className="statHeaderRow">
                      <span className="statLabel">Inventario Total</span>
                      <span className="statBadgePill red">{statsMetrics.visiblePercent}% Activo</span>
                    </div>
                    <span className="statValue">{statsMetrics.total}</span>
                    <span className="statSub">
                      Productos en catálogo <ArrowRight size={12} />
                    </span>
                  </div>
                </div>

                {/* 2. VISIBLE PRODUCTS */}
                <div 
                  className="statCard success"
                  onClick={() => {
                    setStatusFilter('visible');
                    setActiveTab('inventory');
                  }}
                  title="Click para ver productos públicos"
                >
                  <div className="statIcon"><Eye size={24} /></div>
                  <div className="statInfo">
                    <div className="statHeaderRow">
                      <span className="statLabel">Públicos en Tienda</span>
                      <span className="statBadgePill green">{statsMetrics.visibleCount} Visibles</span>
                    </div>
                    <span className="statValue">{statsMetrics.visibleCount}</span>
                    <span className="statSub">
                      Listos para venta <ArrowRight size={12} />
                    </span>
                  </div>
                </div>

                {/* 3. FEATURED PRODUCTS */}
                <div 
                  className="statCard warning"
                  onClick={() => setActiveTab('featured')}
                  title="Click para ver productos destacados"
                >
                  <div className="statIcon"><Zap size={24} /></div>
                  <div className="statInfo">
                    <div className="statHeaderRow">
                      <span className="statLabel">Vitrina Destacada</span>
                      <span className="statBadgePill amber">{statsMetrics.featuredCount} En Portada</span>
                    </div>
                    <span className="statValue">{statsMetrics.featuredCount}</span>
                    <span className="statSub">
                      En sección principal <ArrowRight size={12} />
                    </span>
                  </div>
                </div>

                {/* 4. ACTIVE CATEGORIES */}
                <div 
                  className="statCard info"
                  onClick={() => setActiveTab('categories')}
                  title="Click para gestionar categorías"
                >
                  <div className="statIcon"><Tags size={24} /></div>
                  <div className="statInfo">
                    <div className="statHeaderRow">
                      <span className="statLabel">Categorías Activas</span>
                      <span className="statBadgePill blue">{categories.length} Sectores</span>
                    </div>
                    <span className="statValue">{categories.length}</span>
                    <span className="statSub">
                      Líneas de seguridad <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>

              {/* DETAILED INSIGHTS 2x2 GRID */}
              <div className="statsDetailedGrid">
                {/* 1. FINANCIAL ESTIMATE */}
                <div className="statsCardClean">
                  <div className="statsCardHeader">
                    <div className="statsCardHeaderTitle">
                      <div className="statsCardHeaderIcon blue">
                        <DollarSign size={20} />
                      </div>
                      <div>
                        <h3>Valoración Económica</h3>
                        <p>Estimación del inventario según precios actuales</p>
                      </div>
                    </div>
                  </div>

                  <div className="financeMainMetric">
                    <div>
                      <div className="financeMainMetricLabel">Valor Total del Catálogo</div>
                      <div className="financeMainMetricValue">
                        ${statsMetrics.totalCatalogValue.toLocaleString('es-CO')}
                      </div>
                    </div>
                    <div className="statBadgePill red" style={{ fontSize: '0.75rem', padding: '5px 12px' }}>
                      COP Vigente
                    </div>
                  </div>

                  <div className="financeSubMetricsGrid">
                    <div className="financeSubCard">
                      <span className="label">Precio Promedio</span>
                      <span className="val">${statsMetrics.avgPrice.toLocaleString('es-CO')}</span>
                    </div>
                    <div className="financeSubCard">
                      <span className="label">Más Económico</span>
                      <span className="val">${statsMetrics.minPrice.toLocaleString('es-CO')}</span>
                    </div>
                    <div className="financeSubCard">
                      <span className="label">Más Costoso</span>
                      <span className="val">${statsMetrics.maxPrice.toLocaleString('es-CO')}</span>
                    </div>
                  </div>

                  {statsMetrics.totalSavings > 0 && (
                    <div className="savingsAlertRow">
                      <span>🏷️ Descuento acumulado en ofertas activas:</span>
                      <strong>${statsMetrics.totalSavings.toLocaleString('es-CO')}</strong>
                    </div>
                  )}
                </div>

                {/* 2. COMMERCIAL PERFORMANCE & OFFERS */}
                <div className="statsCardClean">
                  <div className="statsCardHeader">
                    <div className="statsCardHeaderTitle">
                      <div className="statsCardHeaderIcon red">
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <h3>Rendimiento Comercial & Ofertas</h3>
                        <p>Segmentación de precios, promociones y kits</p>
                      </div>
                    </div>
                  </div>

                  <div className="commercialBreakdown">
                    <div className="progressSegmentedWrap">
                      <div className="progressSegmentedHeader">
                        <span>
                          En Oferta: <strong>{statsMetrics.offerCount}</strong> ({statsMetrics.total > 0 ? Math.round((statsMetrics.offerCount / statsMetrics.total) * 100) : 0}%)
                        </span>
                        <span>
                          Precio Regular: <strong>{statsMetrics.regularCount}</strong>
                        </span>
                      </div>
                      <div className="progressSegmentedBar">
                        <div 
                          className="progressSegmentedFill offer" 
                          style={{ width: `${statsMetrics.total > 0 ? (statsMetrics.offerCount / statsMetrics.total) * 100 : 0}%` }}
                          title={`Ofertas: ${statsMetrics.offerCount}`}
                        />
                        <div 
                          className="progressSegmentedFill regular" 
                          style={{ width: `${statsMetrics.total > 0 ? (statsMetrics.regularCount / statsMetrics.total) * 100 : 0}%` }}
                          title={`Precio regular: ${statsMetrics.regularCount}`}
                        />
                      </div>
                    </div>

                    <div className="commercialMetricsRows">
                      <div className="commercialMetricItem">
                        <span className="name">Productos en Oferta</span>
                        <span className="num" style={{ color: '#ee1b24' }}>{statsMetrics.offerCount}</span>
                      </div>
                      <div className="commercialMetricItem">
                        <span className="name">Sin Promoción</span>
                        <span className="num">{statsMetrics.regularCount}</span>
                      </div>
                      <div className="commercialMetricItem">
                        <span className="name">Kits de Seguridad</span>
                        <span className="num" style={{ color: '#2563eb' }}>{statsMetrics.kitsCount}</span>
                      </div>
                      <div className="commercialMetricItem">
                        <span className="name">Con Video Explicativo</span>
                        <span className="num" style={{ color: '#059669' }}>{statsMetrics.withVideoCount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. CATEGORY DISTRIBUTION */}
                <div className="statsCardClean">
                  <div className="statsCardHeader">
                    <div className="statsCardHeaderTitle">
                      <div className="statsCardHeaderIcon purple">
                        <Layers size={20} />
                      </div>
                      <div>
                        <h3>Distribución por Categoría</h3>
                        <p>Concentración de productos por línea de protección</p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setActiveTab('categories')}
                      className="statsBannerBtn"
                      style={{ padding: '6px 12px', fontSize: '0.75rem', background: '#f8fafc', color: '#334155', borderColor: '#e2e8f0' }}
                    >
                      Ver Categorías
                    </button>
                  </div>

                  <div className="categoryDistList">
                    {statsMetrics.categoryDistribution.length > 0 ? (
                      statsMetrics.categoryDistribution.map((cat, idx) => (
                        <div key={idx} className="categoryDistItem">
                          <div className="categoryDistTop">
                            <span>{cat.name}</span>
                            <span style={{ color: '#64748b', fontSize: '0.78rem' }}>
                              <strong>{cat.count}</strong> {cat.count === 1 ? 'producto' : 'productos'} ({cat.percent}%)
                            </span>
                          </div>
                          <div className="categoryDistBarBg">
                            <div 
                              className="categoryDistBarFill" 
                              style={{ width: `${cat.percent}%` }}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem 0', margin: 0 }}>
                        No hay productos categorizados actualmente.
                      </p>
                    )}
                  </div>
                </div>

                {/* 4. CATALOG QUALITY & COMPLETENESS */}
                <div className="statsCardClean">
                  <div className="statsCardHeader">
                    <div className="statsCardHeaderTitle">
                      <div className="statsCardHeaderIcon green">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <h3>Salud del Catálogo</h3>
                        <p>Completitud técnica para maximizar la conversión</p>
                      </div>
                    </div>
                  </div>

                  <div className="qualityList">
                    <div className="qualityItem">
                      <div className="qualityItemLeft">
                        <div className="qualityItemIcon">
                          <CheckCircle2 size={18} />
                        </div>
                        <span>Con imágenes principales</span>
                      </div>
                      <span className="qualityBadge">
                        {statsMetrics.withImagesCount} / {statsMetrics.total} ({statsMetrics.total > 0 ? Math.round((statsMetrics.withImagesCount / statsMetrics.total) * 100) : 0}%)
                      </span>
                    </div>

                    <div className="qualityItem">
                      <div className="qualityItemLeft">
                        <div className="qualityItemIcon">
                          <CheckCircle2 size={18} />
                        </div>
                        <span>Con galería de fotos múltiples</span>
                      </div>
                      <span className="qualityBadge">
                        {statsMetrics.withMultiImagesCount} / {statsMetrics.total} ({statsMetrics.total > 0 ? Math.round((statsMetrics.withMultiImagesCount / statsMetrics.total) * 100) : 0}%)
                      </span>
                    </div>

                    <div className="qualityItem">
                      <div className="qualityItemLeft">
                        <div className="qualityItemIcon">
                          <CheckCircle2 size={18} />
                        </div>
                        <span>Con especificaciones y detalles</span>
                      </div>
                      <span className="qualityBadge">
                        {statsMetrics.withSpecsCount} / {statsMetrics.total} ({statsMetrics.total > 0 ? Math.round((statsMetrics.withSpecsCount / statsMetrics.total) * 100) : 0}%)
                      </span>
                    </div>

                    <div className="qualityItem">
                      <div className="qualityItemLeft">
                        <div className="qualityItemIcon">
                          <CheckCircle2 size={18} />
                        </div>
                        <span>Con variantes (tallas, calibres o colores)</span>
                      </div>
                      <span className="qualityBadge">
                        {statsMetrics.withVariantsCount} / {statsMetrics.total} ({statsMetrics.total > 0 ? Math.round((statsMetrics.withVariantsCount / statsMetrics.total) * 100) : 0}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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
              {/* QUICK STATS CHIPS BAR */}
              <div className="inventoryQuickStats">
                <div 
                  className={`quickStatChip all ${statusFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('all')}
                  title="Mostrar todos los productos"
                >
                  <div className="quickStatInfo">
                    <span className="quickStatLabel">Todos</span>
                    <span className="quickStatValue">{dbProducts.length}</span>
                  </div>
                  <div className="quickStatIcon">
                    <Package size={20} />
                  </div>
                </div>

                <div 
                  className={`quickStatChip visible ${statusFilter === 'visible' ? 'active' : ''}`}
                  onClick={() => setStatusFilter(statusFilter === 'visible' ? 'all' : 'visible')}
                  title="Filtrar por productos públicos"
                >
                  <div className="quickStatInfo">
                    <span className="quickStatLabel">Públicos</span>
                    <span className="quickStatValue">{dbProducts.filter(p => p.visible).length}</span>
                  </div>
                  <div className="quickStatIcon">
                    <Eye size={20} />
                  </div>
                </div>

                <div 
                  className={`quickStatChip hidden ${statusFilter === 'hidden' ? 'active' : ''}`}
                  onClick={() => setStatusFilter(statusFilter === 'hidden' ? 'all' : 'hidden')}
                  title="Filtrar por productos ocultos"
                >
                  <div className="quickStatInfo">
                    <span className="quickStatLabel">Ocultos</span>
                    <span className="quickStatValue">{dbProducts.filter(p => !p.visible).length}</span>
                  </div>
                  <div className="quickStatIcon">
                    <EyeOff size={20} />
                  </div>
                </div>

                <div 
                  className={`quickStatChip featured ${statusFilter === 'featured' ? 'active' : ''}`}
                  onClick={() => setStatusFilter(statusFilter === 'featured' ? 'all' : 'featured')}
                  title="Filtrar por productos destacados"
                >
                  <div className="quickStatInfo">
                    <span className="quickStatLabel">Destacados</span>
                    <span className="quickStatValue">{dbProducts.filter(p => p.destacado).length}</span>
                  </div>
                  <div className="quickStatIcon">
                    <Zap size={20} />
                  </div>
                </div>
              </div>

              {/* SEARCH & FILTERS CONTROLS CARD */}
              <div className="inventoryControlsCard">
                <div className="inventorySearchWrapper">
                  <Search size={18} className="searchIconLeft" />
                  <input 
                    type="text" 
                    className="inventorySearchInput"
                    placeholder="Buscar por nombre, SKU o categoría..." 
                    value={inventorySearch}
                    onChange={(e) => setInventorySearch(e.target.value)}
                  />
                  {inventorySearch && (
                    <button 
                      type="button"
                      className="clearSearchBtn" 
                      onClick={() => setInventorySearch('')}
                      title="Limpiar búsqueda"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <div className="inventoryFiltersGroup">
                  <select 
                    className="filterSelect"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    title="Filtrar por categoría"
                  >
                    <option value="all">Todas las Categorías</option>
                    {allCategoryNames.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>

                  <select 
                    className="filterSelect"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as any)}
                    title="Ordenar por"
                  >
                    <option value="newest">Más recientes</option>
                    <option value="price-asc">Precio: Menor a Mayor</option>
                    <option value="price-desc">Precio: Mayor a Menor</option>
                    <option value="name">Nombre: A - Z</option>
                  </select>

                  {hasActiveFilters && (
                    <button 
                      type="button"
                      className="clearAllFiltersBtn"
                      onClick={clearAllFilters}
                      title="Restablecer todos los filtros"
                    >
                      <RotateCcw size={14} /> <span>Limpiar filtros</span>
                    </button>
                  )}
                </div>
              </div>

              {/* RESULTS META INFO */}
              <div className="inventoryResultsMeta">
                <span>
                  Mostrando <strong>{filteredProducts.length}</strong> de <strong>{dbProducts.length}</strong> productos
                  {statusFilter !== 'all' && ` (Filtro: ${statusFilter === 'visible' ? 'Públicos' : statusFilter === 'hidden' ? 'Ocultos' : 'Destacados'})`}
                </span>
                {categoryFilter !== 'all' && (
                  <span className="categoryBadge">Categoría: {categoryFilter}</span>
                )}
              </div>

              {/* PRODUCTS TABLE */}
              <RecentProducts 
                products={filteredProducts} 
                onToggleVisibility={toggleVisibility}
                onToggleFeatured={toggleFeatured}
                onEdit={(p) => { startEdit(p); setActiveTab('create'); }}
                onDelete={deleteProduct}
                isFullView={true}
              />
            </div>
          )}

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

          

          
        </div>
      </main>
    </div>
  );
};

export default Admin;
