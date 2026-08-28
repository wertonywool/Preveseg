import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Flame, 
  HardHat, 
  Award, 
  ArrowRight, 
  Star, 
  ShoppingBag, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Building2, 
  FileText,
  Truck,
  Sparkles
} from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductSkeleton from '../../components/ProductCard/ProductSkeleton';
import { useHome } from '../../hooks/useHome';
import { supabase } from '../../services/supabaseClient';
import './Home.css';
import logoImgFile from '../../assets/logo.png';

const DEFAULT_CATEGORIES = [
  { id: 1, nombre: 'Protección Craneal y Facial', slug: 'proteccion-craneal', imagen_url: '' },
  { id: 2, nombre: 'Protección Respiratoria', slug: 'proteccion-respiratoria', imagen_url: '' },
  { id: 3, nombre: 'Calzado Industrial', slug: 'calzado-industrial', imagen_url: '' },
  { id: 4, nombre: 'Extintores y Fuego', slug: 'extintores', imagen_url: '' },
];

const Home = () => {
  const { featuredProducts, categories, loading } = useHome();
  const displayCategories = categories.length > 0 ? categories : DEFAULT_CATEGORIES;

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
            alert('Este correo ya está suscrito a las novedades de Preveseg. ¡Gracias!');
          } else {
            console.error('Error subscribing:', error);
            alert('¡Gracias por registrar tu correo! Nos pondremos en contacto contigo.');
          }
        } else {
          alert('¡Gracias por suscribirte! Te enviaremos información técnica y ofertas en EPP.');
          form.reset();
        }
      } catch (err) {
        console.error('Crash preventing error:', err);
        alert('¡Gracias por registrar tu correo en Preveseg!');
        form.reset();
      }
    }
  };

  return (
    <div className="homeContainer page-transition">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="heroGrid">
          <div className="heroContent">
            <div className="heroBadge animate-in">
              <ShieldCheck size={15} /> Prevención y Seguridad Industrial
            </div>
            <h1 className="heroTitle animate-in delay-1">
              PREVESEG <span>Protección Laboral & Contra Incendios</span>
            </h1>
            <p className="heroSubtitle animate-in delay-2">
              Suministramos equipos de protección personal (EPP), extintores certificados y señalización de alta resistencia para proteger la vida y productividad en tu empresa.
            </p>
            <div className="heroActions animate-in delay-3">
              <Link to="/productos" className="ctaMain">
                Explorar Catálogo EPP <ArrowRight size={18} />
              </Link>
              <a 
                href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20requiero%20una%20cotizaci%C3%B3n%20para%20mi%20empresa." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ctaSecondary"
              >
                <FileText size={18} /> Cotizar por WhatsApp
              </a>
            </div>
          </div>
          
          <div className="heroVisual">
            <div className="visualContainer">
              <div className="floatingCard card-1">
                <div className="cardIcon red"><Flame size={20} /></div>
                <span>Extintores Certificados</span>
              </div>
              <div className="floatingCard card-2">
                <div className="cardIcon blue"><HardHat size={20} /></div>
                <span>EPP Normas ANSI / NTC</span>
              </div>
              
              <div className="logoDisplayWrapper">
                <img src={logoImgFile} alt="Preveseg Seguridad Industrial" className="heroLogoImage" />
                <div className="heroBrandBadge">PREVESEG</div>
              </div>
              <div className="mainVisualBlob"></div>
              <div className="visualCircle"></div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR / VALORES */}
      <section className="trustBar">
        <div className="container">
          <div className="trustGrid">
            <div className="trustItem">
              <div className="trustIcon blue"><Award size={22} /></div>
              <div className="trustText">
                <h4>Equipos Certificados</h4>
                <p>Cumplimiento estricto de normas de seguridad laboral</p>
              </div>
            </div>
            <div className="trustItem">
              <div className="trustIcon red"><Flame size={22} /></div>
              <div className="trustText">
                <h4>Control de Incendios</h4>
                <p>Venta, recarga y mantenimiento de extintores</p>
              </div>
            </div>
            <div className="trustItem">
              <div className="trustIcon blue"><Building2 size={22} /></div>
              <div className="trustText">
                <h4>Atención Corporativa</h4>
                <p>Precios especiales al por mayor para empresas</p>
              </div>
            </div>
            <div className="trustItem">
              <div className="trustIcon green"><Truck size={22} /></div>
              <div className="trustText">
                <h4>Despacho Nacional</h4>
                <p>Envíos ágiles y seguros a todo el país</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="categorySection">
        <div className="container">
          <div className="sectionHeader">
            <div className="headerInfo">
              <span className="subTitle"><Sparkles size={14} className="inline-icon" /> Catálogo Especializado</span>
              <h2>Líneas de <span>Protección Industrial</span></h2>
            </div>
            <Link to="/productos" className="textBtn">Ver todo el catálogo <ArrowRight size={16} /></Link>
          </div>
          
          <div className="categoryLayout">
            {displayCategories.map((cat, idx) => (
              <Link 
                key={cat.id || idx}
                to={`/productos?categoria=${cat.nombre}`} 
                className="categoryCardItem"
              >
                <div className="categoryIconBox">
                  {idx % 3 === 0 ? <HardHat size={28} /> : idx % 3 === 1 ? <Flame size={28} /> : <ShieldCheck size={28} />}
                </div>
                <div className="categoryInfo">
                  <h3>{cat.nombre}</h3>
                  <span className="categoryLinkText">Explorar línea <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section id="destacados" className="showcaseSection dark">
        <div className="container">
          <div className="sectionHeader center">
            <span className="subTitle"><Star size={16} fill="currentColor" /> Selección Industrial</span>
            <h2>Equipos <span>Destacados</span></h2>
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
              <h3>Catálogo en preparación</h3>
              <p>Puedes consultar disponibilidad de cualquier equipo de seguridad directamente por WhatsApp.</p>
              <a 
                href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20quisiera%20consultar%20disponibilidad%20de%20equipos%20EPP." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ctaMain"
                style={{ display: 'inline-flex', marginTop: '1rem' }}
              >
                Consultar por WhatsApp <ArrowRight size={18} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* COMPANY PRESENTATION SECTION */}
      <section className="aboutSection">
        <div className="container">
          <div className="aboutGrid">
            <div className="aboutInfo">
              <span className="subTitle red"><ShieldCheck size={16} /> Sobre Preveseg</span>
              <h2>Tu Aliado en <span>Seguridad y Salud en el Trabajo</span></h2>
              <p className="aboutDescription">
                En <strong>PREVESEG</strong> asesoramos y equipamos industrias, obras de construcción, almacenes y entidades comerciales con insumos normados de alta durabilidad y protección comprobada.
              </p>
              
              <div className="aboutHighlights">
                <div className="highlightCard">
                  <CheckCircle2 className="highlightIcon" size={20} />
                  <div>
                    <h4>Protección Personal Completa (EPP)</h4>
                    <p>Cascos de seguridad, respiradores, monofajas, guantes de nitrilo/carnaza y calzado dieléctrico.</p>
                  </div>
                </div>
                <div className="highlightCard">
                  <CheckCircle2 className="highlightIcon" size={20} />
                  <div>
                    <h4>Protección Contra Incendios</h4>
                    <p>Extintores Solkaflam, ABC multipropósito, CO2 y gabinetes de emergencia.</p>
                  </div>
                </div>
                <div className="highlightCard">
                  <CheckCircle2 className="highlightIcon" size={20} />
                  <div>
                    <h4>Señalización & Primeros Auxilios</h4>
                    <p>Cintas de demarcación, botiquines tipo A/B/C y kits para derrames.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="aboutBanner">
              <div className="bannerCard">
                <Flame size={48} className="bannerIconRed" />
                <h3>Seguridad & Prevención 24/7</h3>
                <p>Protege la integridad de tus colaboradores con el respaldo técnico y normativo de profesionales.</p>
                <div className="bannerStats">
                  <div className="statItem">
                    <span className="statNum">100%</span>
                    <span className="statLabel">Garantía Técnica</span>
                  </div>
                  <div className="statItem">
                    <span className="statNum">ANSI</span>
                    <span className="statLabel">Normas Certificadas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <div className="newsletterVisual"></div>
        <div className="newsletterContent">
          <div className="newsletterIcon"><Mail size={30} /></div>
          <h2>Boletín Técnico & Ofertas Preveseg</h2>
          <p>Suscríbete para recibir novedades sobre normativas laborales, guías de prevención y promociones exclusivas para empresas.</p>
          <form className="newsletterForm" onSubmit={handleSubscribe}>
            <input type="email" placeholder="Ingresa tu correo corporativo o personal" required />
            <button type="submit">Suscribirme</button>
          </form>
          <p className="formHint">Respetamos tu privacidad. No enviamos spam.</p>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20quisiera%20solicitar%20informaci%C3%B3n%20sobre%20sus%20equipos%20de%20seguridad%20industrial." 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Contactar a Preveseg por WhatsApp"
      >
        <div className="whatsapp-pulse"></div>
        <Phone size={24} />
        <span className="whatsapp-tooltip">¿Asesoría en Seguridad Industrial?</span>
      </a>
    </div>
  );
};

export default Home;
