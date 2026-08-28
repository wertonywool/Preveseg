import { Search, Grid, List, SlidersHorizontal, ChevronRight } from 'lucide-react';
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
    handleSearch,
    filterByCategory
  } = useProducts();

  const { categories: dbCategories } = useCategories();
  const visibleCategories = dbCategories.filter(c => c.visible);

  return (
    <div className="productsPage page-transition">
      <div className="productsContainer animate-in">
        {/* SIDEBAR FOR DESKTOP / TOP BAR FOR MOBILE */}
        <aside className="productsSidebar animate-in delay-1">
          <div className="sidebarSection">
            <h3 className="sidebarTitle">Explorar</h3>
            <div className="categoryNav">
              <button
                onClick={() => filterByCategory('todos')}
                className={`categoryLink ${activeCategory === 'todos' ? 'active' : ''}`}
              >
                <Grid size={18} />
                <span>Todos los Productos</span>
                <ChevronRight size={16} className="chevron" />
              </button>
              {visibleCategories.map((cat, idx) => (
                <button
                  key={cat.id}
                  onClick={() => filterByCategory(cat.nombre)}
                  className={`categoryLink ${activeCategory === cat.nombre ? 'active' : ''}`}
                  style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
                >
                  <div className="catIcon">
                    {cat.imagen_url ? (
                      <img src={cat.imagen_url} alt="" />
                    ) : (
                      <List size={18} />
                    )}
                  </div>
                  <span>{cat.nombre}</span>
                  <ChevronRight size={16} className="chevron" />
                </button>
              ))}
            </div>
          </div>

          <div className="sidebarSection hide-mobile animate-in delay-3">
            <div className="promoCard">
              <div className="promoGradient"></div>
              <span>Oferta Especial</span>
              <h4>Gadgets de Calidad</h4>
              <p>Envío rápido en toda Cali</p>
            </div>
          </div>
        </aside>

        <main className="productsContent">
          <header className="productsHeader animate-in delay-1">
            <div className="headerTop">
              <div className="titleArea">
                <h1 className="gradient-text">{activeCategory === 'todos' ? 'Catálogo Completo' : activeCategory}</h1>
                <p className="productCount">{filteredProducts.length} productos encontrados</p>
              </div>
              <div className="headerActions">
                <div className="searchBox">
                  <Search size={18} className="searchIcon" />
                  <input 
                    type="text" 
                    placeholder="¿Qué estás buscando?" 
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Categories Scroll */}
            <div className="mobileCatScroll scroll-reveal">
              <button
                onClick={() => filterByCategory('todos')}
                className={`mobileCatBtn ${activeCategory === 'todos' ? 'active' : ''}`}
              >
                Todos
              </button>
              {visibleCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => filterByCategory(cat.nombre)}
                  className={`mobileCatBtn ${activeCategory === cat.nombre ? 'active' : ''}`}
                >
                  {cat.nombre}
                </button>
              ))}
            </div>
          </header>

          {loading ? (
            <div className="productGrid">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <ProductSkeleton key={i} />)}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="productGrid animate-in delay-2">
              {filteredProducts.map((product, idx) => (
                <div key={product.id} className="productCardWrapper" style={{ animationDelay: `${idx * 0.05}s` }}>
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
            <div className="noProducts animate-in delay-2">
              <div className="noProductsContent">
                <SlidersHorizontal size={48} className="empty-icon" />
                <h3>No hay coincidencias</h3>
                <p>Prueba buscando con otros términos o cambia de categoría.</p>
                <button onClick={() => { handleSearch(''); filterByCategory('todos'); }} className="resetBtn">
                  Limpiar Filtros
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
