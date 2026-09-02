import { Search, Grid, SlidersHorizontal, ChevronRight, ShieldCheck, X, Sparkles, Flame, Phone, MapPin, Truck, Award } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductSkeleton from '../../components/ProductCard/ProductSkeleton';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import './Products.css';

const Products = () => {
  const {
    filteredProducts,
    loading,
    activeCategory,
    searchTerm,
    sortBy,
    handleSearch,
    filterByCategory,
    handleSortChange
  } = useProducts();

  const { categories: dbCategories } = useCategories();
  const visibleCategories = dbCategories.filter(c => c.visible);

  return (
    <div className="productsPage page-transition">
      <div className="productsContainer">
        {/* DESKTOP SIDEBAR */}
        <aside className="productsSidebar">
          <div className="sidebarSection">
            <h3 className="sidebarTitle">Líneas de Productos</h3>
            <div className="categoryNav">
              <button
                onClick={() => filterByCategory('todos')}
                className={`categoryLink ${activeCategory === 'todos' ? 'active' : ''}`}
              >
                <div className="catIcon">
                  <Grid size={16} />
                </div>
                <span>Todo el Catálogo</span>
                <ChevronRight size={15} className="chevron" />
              </button>
              {visibleCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => filterByCategory(cat.nombre)}
                  className={`categoryLink ${activeCategory === cat.nombre ? 'active' : ''}`}
                >
                  <div className="catIcon">
                    {cat.imagen_url ? (
                      <img src={cat.imagen_url} alt={cat.nombre} />
                    ) : (
                      <ShieldCheck size={16} />
                    )}
                  </div>
                  <span>{cat.nombre}</span>
                  <ChevronRight size={15} className="chevron" />
                </button>
              ))}
            </div>
          </div>

          <div className="sidebarSection hide-mobile">
            <div className="sidebarPromoCard">
              <span className="sidebarPromoBadge">PREVESEG CALI</span>
              <h4>Asesoría & Cotizaciones</h4>
              <p>Suministramos extintores reglamentarios, camillas, botiquines y dotaciones EPP con entrega inmediata en Cali.</p>
              
              <div className="promoMeta">
                <div className="promoMetaItem"><MapPin size={14} className="textRed" /> Cra 28D 72f-79, Cali</div>
                <div className="promoMetaItem"><Truck size={14} className="textRed" /> Despachos a nivel local y nacional</div>
              </div>

              <a 
                href="https://wa.me/573046296285?text=Hola%20Preveseg%20Cali%2C%20solicito%20cotizaci%C3%B3n%20para%20los%20equipos%20de%20mi%20empresa." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btnSidebarWa"
              >
                <Phone size={15} /> Cotizar por WhatsApp (304 629 6285)
              </a>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="productsMain">
          {/* HEADER BANNER */}
          <div className="catalogHeaderCard">
            <div className="catalogHeaderTop">
              <span className="catalogPreTitle">— PREVESEG CALI • VENTA DIRECTA & MANTENIMIENTO</span>
              <div className="catalogHeaderBadge">
                <Award size={14} /> Equipos 100% Certificados NTC & NFPA
              </div>
            </div>

            <h1 className="catalogMainTitle">
              {activeCategory === 'todos' ? (
                <>Catálogo de <span className="textRed">Equipos Contra Incendio</span> y Seguridad Industrial</>
              ) : (
                activeCategory
              )}
            </h1>

            <p className="catalogLeadText">
              Extintores nuevos (PQS, CO₂, Solkaflam, Agua), camillas rígidas, botiquines trauma, kits de carretera, elementos viales y EPP. Solicita tu cotización formal con asesoría personalizada para tu empresa.
            </p>

            {/* TRUST PILLS */}
            <div className="catalogTrustPills">
              <div className="cPill"><ShieldCheck size={14} className="textRed" /> Cumplimiento NTC 2885 & Bomberos</div>
              <div className="cPill"><Truck size={14} className="textRed" /> Despachos en Cali y Valle del Cauca</div>
              <div className="cPill"><Phone size={14} className="textRed" /> Cotización Rápida por WhatsApp</div>
            </div>

            {/* SEARCH AND CONTROLS TOOLBAR */}
            <div className="catalogControlsToolbar">
              <div className="mainSearchBox">
                <Search size={18} className="mainSearchIcon" />
                <input 
                  type="text" 
                  placeholder="Buscar extintor, camilla, botiquín, casco, chaleco, kit..." 
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  autoComplete="off"
                />
                {searchTerm && (
                  <button 
                    className="clearSearchBtn" 
                    onClick={() => handleSearch('')} 
                    aria-label="Limpiar búsqueda"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* QUICK SORT / FILTER CHIPS */}
              <div className="catalogFilterChips">
                <button 
                  className={`filterChip ${sortBy === 'default' && activeCategory === 'todos' ? 'active' : ''}`}
                  onClick={() => { handleSortChange('default'); filterByCategory('todos'); }}
                >
                  Todos ({filteredProducts.length})
                </button>
                <button 
                  className={`filterChip ${sortBy === 'offer' ? 'active' : ''}`}
                  onClick={() => handleSortChange('offer')}
                >
                  <Flame size={14} className="chipIconRed" /> Ofertas
                </button>
                <button 
                  className={`filterChip ${sortBy === 'featured' ? 'active' : ''}`}
                  onClick={() => handleSortChange('featured')}
                >
                  <Sparkles size={14} className="chipIconYellow" /> Destacados
                </button>
                <button 
                  className={`filterChip ${activeCategory === 'Kits & Combos de Seguridad' ? 'active' : ''}`}
                  onClick={() => filterByCategory('Kits & Combos de Seguridad')}
                >
                  <ShieldCheck size={14} className="chipIconBlue" /> Kits & Combos
                </button>
              </div>
            </div>

            {/* MOBILE CATEGORIES SCROLL */}
            <div className="mobileCatScroll scrollbar-hide">
              <button
                onClick={() => filterByCategory('todos')}
                className={`mobileCatBtn ${activeCategory === 'todos' ? 'active' : ''}`}
              >
                <Grid size={14} />
                <span>Todos</span>
              </button>
              {visibleCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => filterByCategory(cat.nombre)}
                  className={`mobileCatBtn ${activeCategory === cat.nombre ? 'active' : ''}`}
                >
                  <span>{cat.nombre}</span>
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCTS GRID */}
          {loading ? (
            <div className="productsGridList">
              {[1, 2, 3, 4, 5, 6].map(i => <ProductSkeleton key={i} />)}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="productsGridList">
              {filteredProducts.map((product) => (
                <div key={product.id} className="productCardItem">
                  <ProductCard
                    id={product.id}
                    nombre={product.nombre}
                    categoria={Array.isArray(product.categoria) ? product.categoria[0] : product.categoria}
                    precioNormal={product.precio_normal}
                    precioOferta={product.precio_oferta}
                    imagenes={product.imagenes || []}
                    youtubeUrl={product.youtube_url}
                    variantes={product.variantes || []}
                    enOferta={product.en_oferta}
                    esKit={product.es_kit}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="noProductsCard">
              <div className="emptyIconCircle">
                <SlidersHorizontal size={32} />
              </div>
              <h3>No se encontraron productos para "{searchTerm || activeCategory}"</h3>
              <p>Intenta buscar por términos generales como <strong>extintor, camilla, botiquín, conos, cascos o gafas</strong>.</p>
              <button 
                onClick={() => { handleSearch(''); filterByCategory('todos'); handleSortChange('default'); }} 
                className="btnResetCatalog"
              >
                Ver Todo el Catálogo de Equipos
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
