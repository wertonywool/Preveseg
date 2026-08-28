import { Search, Grid, SlidersHorizontal, ChevronRight, ShieldCheck, X, Sparkles, Flame, DollarSign } from 'lucide-react';
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
            <h3 className="sidebarTitle">Líneas de Protección</h3>
            <div className="categoryNav">
              <button
                onClick={() => filterByCategory('todos')}
                className={`categoryLink ${activeCategory === 'todos' ? 'active' : ''}`}
              >
                <div className="catIcon">
                  <Grid size={16} />
                </div>
                <span>Todo el Catálogo EPP</span>
                <ChevronRight size={16} className="chevron" />
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
                  <ChevronRight size={16} className="chevron" />
                </button>
              ))}
            </div>
          </div>

          <div className="sidebarSection hide-mobile">
            <div className="promoCard">
              <div className="promoGradient"></div>
              <span className="promoTag">Asesoría Técnica</span>
              <h4>Precios Corporativos</h4>
              <p>Descuentos especiales por volumen, licitaciones y dotaciones completas.</p>
              <a 
                href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20quisiera%20cotizar%20dotaciones%20para%20mi%20empresa." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="promoBtn"
              >
                Cotizar Dotación
              </a>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="productsContent">
          {/* MOBILE HERO & SEARCH UNIT */}
          <div className="productsHeroHeader">
            <div className="heroBadge">
              <span className="badgeDot"></span>
              <span>Equipos EPP Certificados • Precios Mayoristas</span>
            </div>

            <h1 className="productsMainTitle">
              {activeCategory === 'todos' ? (
                <>Catálogo de <span className="text-gradient-blue">Seguridad</span> <span className="text-gradient-red">Industrial</span></>
              ) : (
                activeCategory
              )}
            </h1>

            <p className="productsSubTitle">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'producto disponible' : 'equipos y referencias disponibles con despacho inmediato'}
            </p>

            {/* INTEGRATED SEARCH BOX */}
            <div className="mainSearchWrapper">
              <div className="mainSearchBox">
                <Search size={20} className="mainSearchIcon" />
                <input 
                  type="text" 
                  placeholder="Buscar casco, guantes, extintor, botas, arnés..." 
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
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* HORIZONTAL CATEGORIES BAR (Scrollable on mobile) */}
            <div className="mobileCatScroll scrollbar-hide">
              <button
                onClick={() => filterByCategory('todos')}
                className={`mobileCatBtn ${activeCategory === 'todos' ? 'active' : ''}`}
              >
                <Grid size={15} />
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

            {/* QUICK SORT / FILTER CHIPS */}
            <div className="quickFilterChips scrollbar-hide">
              <button 
                className={`filterChip ${sortBy === 'default' ? 'active' : ''}`}
                onClick={() => handleSortChange('default')}
              >
                Todos
              </button>
              <button 
                className={`filterChip chip-offer ${sortBy === 'offer' ? 'active' : ''}`}
                onClick={() => handleSortChange('offer')}
              >
                <Flame size={14} /> Ofertas
              </button>
              <button 
                className={`filterChip ${sortBy === 'featured' ? 'active' : ''}`}
                onClick={() => handleSortChange('featured')}
              >
                <Sparkles size={14} /> Destacados
              </button>
              <button 
                className={`filterChip ${sortBy === 'price-asc' ? 'active' : ''}`}
                onClick={() => handleSortChange('price-asc')}
              >
                <DollarSign size={14} /> Menor Precio
              </button>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          {loading ? (
            <div className="productGrid">
              {[1, 2, 3, 4, 5, 6].map(i => <ProductSkeleton key={i} />)}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="productGrid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="productCardWrapper">
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
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="noProducts">
              <div className="noProductsContent">
                <div className="emptyIconWrapper">
                  <SlidersHorizontal size={38} className="empty-icon" />
                </div>
                <h3>No encontramos productos para "{searchTerm || activeCategory}"</h3>
                <p>Prueba con otros términos como <strong>casco, guantes, extintor, botas</strong> o revisa todas las categorías.</p>
                <button 
                  onClick={() => { handleSearch(''); filterByCategory('todos'); handleSortChange('default'); }} 
                  className="resetBtn"
                >
                  Ver Todo el Catálogo EPP
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;

