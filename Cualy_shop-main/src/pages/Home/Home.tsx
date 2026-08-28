import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Headphones, ArrowRight, Star, ShoppingBag, Globe, Mail, Phone } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductSkeleton from '../../components/ProductCard/ProductSkeleton';
import { useHome } from '../../hooks/useHome';
import { supabase } from '../../services/supabaseClient';
import './Home.css';

const Home = () => {
  const { featuredProducts, categories, loading } = useHome();

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector('input');
    const email = input?.value;

    if (email) {
      try {
        const { error } = await supabase
          .from('newsletter_subscriptions')
          .insert([{ email }]);

        if (error) {
          if (error.code === '23505') {
            alert('Este correo ya está suscrito. ¡Gracias!');
          } else {
            console.error('Error subscribing:', error);
            alert('Hubo un error al suscribirte. Inténtalo de nuevo.');
          }
        } else {
          alert('¡Gracias por suscribirte! Te enviaremos las mejores ofertas pronto.');
          form.reset();
        }
      } catch (err) {
        console.error('Crash preventing error:', err);
      }
    }
  };

  return (
    <div className="homeContainer page-transition">
      {/* ... Hero and TrustBar sections remain similar ... */}
      <section className="hero">
        <div className="heroGrid">
          <div className="heroContent">
            <div className="heroBadge animate-in">Lo mejor en tecnología</div>
            <h1 className="heroTitle animate-in delay-1">
              Cualy Shop <span>Tienda de Tecnología</span>
            </h1>
            <p className="heroSubtitle animate-in delay-2">
              Productos económicos de excelente calidad. Los mejores gadgets y accesorios al mejor precio.
            </p>
            <div className="heroActions animate-in delay-3">
              <Link to="/productos" className="ctaMain">
                Explorar Catálogo <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          
          <div className="heroVisual">
            <div className="visualContainer">
              <div className="floatingCard card-1">
                <div className="cardIcon"><Zap size={20} /></div>
                <span>Envío Rápido</span>
              </div>
              <div className="floatingCard card-2">
                <div className="cardIcon"><Headphones size={20} /></div>
                <span>Atención 24/7</span>
              </div>
              <img src="/gadgets.png" alt="Tech Gadgets" className="heroMainImage" />
              <div className="mainVisualBlob"></div>
              <div className="visualCircle"></div>
            </div>
          </div>
        </div>
        
        <div className="heroScrollIndicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
      </section>

      <section className="trustBar">
        <div className="trustGrid">
          <div className="trustItem">
            <div className="trustIcon"><Globe size={24} /></div>
            <div className="trustText">
              <h4>Envíos en Cali ($8.000)</h4>
              <p>Entregas rápidas y seguras en toda la ciudad</p>
            </div>
          </div>
          <div className="trustItem">
            <div className="trustIcon"><ShieldCheck size={24} /></div>
            <div className="trustText">
              <h4>Calidad Garantizada</h4>
              <p>Productos seleccionados y probados</p>
            </div>
          </div>
          <div className="trustItem">
            <div className="trustIcon"><Zap size={24} /></div>
            <div className="trustText">
              <h4>Precios Bajos</h4>
              <p>La mejor tecnología al alcance de todos</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES - DYNAMIC */}
      <section className="categorySection">
        <div className="container">
          <div className="sectionHeader">
            <div className="headerInfo">
              <span className="subTitle">Explora por Estilo</span>
              <h2>Categorías <span>Principales</span></h2>
            </div>
            <Link to="/productos" className="textBtn">Ver todas <ArrowRight size={16} /></Link>
          </div>
          
          <div className="categoryLayout">
            {categories.length > 0 ? (
              <>
                <Link 
                  to={`/productos?categoria=${categories[0].nombre}`} 
                  className="catTile large" 
                  style={{ backgroundImage: `url("${categories[0].imagen_url || '/componentes.png'}")` }}
                >
                  <div className="catOverlay">
                    <div className="catContent">
                      <span className="catTag">Destacado</span>
                      <h3>{categories[0].nombre}</h3>
                    </div>
                    <div className="catBtn"><ArrowRight size={24} /></div>
                  </div>
                </Link>
                
                <div className="catSubGrid scrollbar-hide">
                  {categories.slice(1).map((cat) => (
                    <Link 
                      key={cat.id}
                      to={`/productos?categoria=${cat.nombre}`} 
                      className="catTile small" 
                      style={{ backgroundImage: `url("${cat.imagen_url || '/gadgets.png'}")` }}
                    >
                      <div className="catOverlay">
                        <div className="catContent">
                          <h3>{cat.nombre}</h3>
                        </div>
                        <div className="catBtn"><ArrowRight size={20} /></div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="emptyCats">
                <p>Cargando categorías...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS - CLEAN GRID */}

      <section id="destacados" className="showcaseSection dark">
        <div className="container">
          <div className="sectionHeader center">
            <span className="subTitle"><Star size={16} fill="currentColor" /> Selección Premium</span>
            <h2>Productos <span>Destacados</span></h2>
            <div className="headerDivider"></div>
          </div>
          
          {loading ? (
            <div className="productGrid">
              {[1, 2, 3, 4].map(i => <ProductSkeleton key={i} />)}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="productGrid">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  nombre={product.nombre}
                  categoria={product.categoria}
                  precioNormal={product.precio_normal}
                  precioOferta={product.precio_oferta}
                  imagenes={product.imagenes || []}
                  youtubeUrl={product.youtube_url}
                  variantes={product.variantes || []}
                  enOferta={product.en_oferta}
                />
              ))}
            </div>
          ) : (
            <div className="emptyShowcase">
              <ShoppingBag size={48} />
              <p>Estamos preparando lo mejor para ti. Vuelve pronto.</p>
            </div>
          )}
        </div>
      </section>

      {/* FINAL CTA / NEWSLETTER */}
      <section className="newsletter">
        <div className="newsletterVisual"></div>
        <div className="newsletterContent">
          <div className="newsletterIcon"><Mail size={32} /></div>
          <h2>Únete a la Comunidad</h2>
          <p>Recibe antes que nadie las novedades tecnológicas y ofertas exclusivas que tenemos para ti.</p>
          <form className="newsletterForm" onSubmit={handleSubscribe}>
            <input type="email" placeholder="Tu mejor correo electrónico" required />
            <button type="submit">Suscribirme Ahora</button>
          </form>
          <p className="formHint">Respetamos tu privacidad. Cancela cuando quieras.</p>
        </div>
      </section>

      {/* VALUES BAR */}
      <section className="valuesBar">
        <div className="valueItem">
          <Zap size={18} /> <span>Envío Ágil</span>
        </div>
        <div className="valueItemDivider"></div>
        <div className="valueItem">
          <ShieldCheck size={18} /> <span>Pago Seguro</span>
        </div>
        <div className="valueItemDivider"></div>
        <div className="valueItem">
          <Headphones size={18} /> <span>Soporte Experto</span>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/573189029468?text=Hola%20Cualy%20Shop%2C%20quisiera%20pedir%20información%20sobre%20un%20producto." 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <div className="whatsapp-pulse"></div>
        <Phone size={24} />
        <span className="whatsapp-tooltip">¿En qué puedo ayudarte?</span>
      </a>
    </div>
  );
};

export default Home;
