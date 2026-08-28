import { Search, Grid, SlidersHorizontal, ChevronRight, ShieldCheck, X } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductSkeleton from '../../components/ProductCard/ProductSkeleton';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import './Products.css';

interface CategoryItem {
  id: number;
  nombre: string;
  visible: boolean;
  imagen_url?: string;
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: 1, nombre: 'Protección Craneal y Facial', visible: true, imagen_url: '' },
  { id: 2, nombre: 'Protección Respiratoria', visible: true, imagen_url: '' },
  { id: 3, nombre: 'Calzado Industrial', visible: true, imagen_url: '' },
  { id: 4, nombre: 'Extintores y Fuego', visible: true, imagen_url: '' },
];

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
  const visibleCategories = dbCategories.filter(c => c.visible).length > 0 
    ? dbCategories.filter(c => c.visible) 
    : DEFAULT_CATEGORIES;

  return (
    <div className="productsPage page-transition">
      <div className="productsContainer">
        {/* SIDEBAR FOR DESKTOP */}
        <aside className="productsSidebar">
          <div className="sidebarSection">
            <h3 className="sidebarTitle">Líneas de Protección</h3>
            <div className="categoryNav">
              <button
                onClick={() => filterByCategory('todos')}
                className={`categoryLink ${activeCategory === 'todos' ? 'active' : ''}`}
              >
                <Grid size={18} />
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
                      <img src={cat.imagen_url} alt="" />
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
              <p>Descuentos especiales por volumen y dotaciones completas.</p>
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

        <main className="productsContent">
          <header className="productsHeader">
            <div className="headerTop">
              <div className="titleArea">
                <h1 className="gradient-text">{activeCategory === 'todos' ? 'Catálogo de Seguridad Industrial' : activeCategory}</h1>
                <p className="productCount">{filteredProducts.length} {filteredProducts.length === 1 ? 'producto disponible' : 'productos disponibles'}</p>
              </div>
              <div className="headerActions">
                <div className="searchBox">
                  <Search size={18} className="searchIcon" />
                  <input 
                    type="text" 
                    placeholder="Buscar casco, guantes, extintor..." 
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  {searchTerm && (
                    <button className="clearSearchBtn" onClick={() => handleSearch('')} aria-label="Limpiar búsqueda">
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Categories Horizontal Scroll */}
            <div className="mobileCatScroll scrollbar-hide">
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
                <SlidersHorizontal size={44} className="empty-icon" />
                <h3>No encontramos productos</h3>
                <p>Intenta con otra palabra clave o explora todas las categorías.</p>
                <button onClick={() => { handleSearch(''); filterByCategory('todos'); }} className="resetBtn">
                  Ver Todos los Productos
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
