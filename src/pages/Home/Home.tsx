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
  Sparkles,
  MapPin,
  Clock,
  Wrench,
  GraduationCap,
  Move,
  Tag,
  AlertTriangle
} from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductSkeleton from '../../components/ProductCard/ProductSkeleton';
import { useHome } from '../../hooks/useHome';
// import { supabase } from '../../services/supabaseClient';
import { PREVESEG_COMPANY_INFO, INITIAL_CATEGORIES } from '../../data/defaultCatalog';
import './Home.css';
import logoImgFile from '../../assets/logo.png';

const Home = () => {
  const { featuredProducts, categories, loading } = useHome();
  const displayCategories = categories.length > 0 ? categories : INITIAL_CATEGORIES;

  // =========================================================================
  // BOLETÍN / NEWSLETTER (PRESERVADO EN CÓDIGO - OCULTO TEMPORALMENTE)
  // =========================================================================
  /*
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
            alert('Este correo ya está suscrito a las novedades de Preveseg Cali. ¡Gracias!');
          } else {
            console.error('Error subscribing:', error);
            alert('¡Gracias por registrar tu correo! Nos pondremos en contacto contigo.');
          }
        } else {
          alert('¡Gracias por suscribirte! Te enviaremos información técnica sobre seguridad industrial y normativas.');
          form.reset();
        }
      } catch (err) {
        console.error('Crash preventing error:', err);
        alert('¡Gracias por registrar tu correo en Preveseg!');
        form.reset();
      }
    }
  };
  */

  const getServiceWhatsAppUrl = (servicioTitulo: string) => {
    const msg = `Hola Preveseg Cali, requiero asesoría y cotización para el servicio de: *${servicioTitulo}*\nUbicación: Cra 28D 72f-79, Cali / A coordinar`;
    return `https://wa.me/573046296285?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="homeContainer page-transition">
      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="heroGrid">
          <div className="heroContent">
            <div className="heroBadge animate-in">
              <ShieldCheck size={15} /> Cali • Prevención & Seguridad Industrial
            </div>
            <h1 className="heroTitle animate-in delay-1">
              PREVESEG <span>Equipos Contra Incendio & Seguridad Industrial</span>
            </h1>
            <p className="heroSubtitle animate-in delay-2">
              Somos una empresa dedicada a la venta y mantenimiento de equipos contra incendio y seguridad industrial. Suministramos extintores certificados, camillas, botiquines, conos viales, señalización y EPP en Cali y a nivel nacional.
            </p>
            <div className="heroActions animate-in delay-3">
              <Link to="/productos" className="ctaMain">
                Explorar Catálogo de Equipos <ArrowRight size={18} />
              </Link>
              <a 
                href="https://wa.me/573046296285?text=Hola%20Preveseg%20Cali%2C%20solicito%20una%20cotizaci%C3%B3n%20para%20mi%20empresa." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ctaSecondary"
              >
                <FileText size={18} /> Solicitar Cotización Directa
              </a>
            </div>
          </div>
          
          <div className="heroVisual">
            <div className="visualContainer">
              <div className="floatingCard card-1">
                <div className="cardIcon red"><Flame size={20} /></div>
                <span>Extintores & Recargas</span>
              </div>
              <div className="floatingCard card-2">
                <div className="cardIcon blue"><HardHat size={20} /></div>
                <span>EPP & Señalización</span>
              </div>
              
              <div className="logoDisplayWrapper">
                <img src={logoImgFile} alt="Preveseg Seguridad Industrial Cali" className="heroLogoImage" />
                <div className="heroBrandBadge">PREVESEG CALI</div>
              </div>
              <div className="mainVisualBlob"></div>
              <div className="visualCircle"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BARRA DE ATENCIÓN Y CONTACTO INMEDIATO (DATOS OFICIALES) */}
      <section className="locationNoticeBar">
        <div className="container">
          <div className="infoBarGrid">
            <div className="infoBarItem">
              <MapPin size={20} className="infoBarIcon red" />
              <div>
                <strong>Dirección en Cali</strong>
                <span>Cra 28D 72f-79, Cali</span>
              </div>
            </div>

            <div className="infoBarItem">
              <Phone size={20} className="infoBarIcon green" />
              <div>
                <strong>WhatsApp / Teléfono</strong>
                <a href="https://wa.me/573046296285" target="_blank" rel="noopener noreferrer">
                  +57 304 629 6285
                </a>
              </div>
            </div>

            <div className="infoBarItem">
              <Clock size={20} className="infoBarIcon blue" />
              <div>
                <strong>Horarios de Atención</strong>
                <span>Lunes a Viernes 8am - 6pm | Sábados 8am - 4pm</span>
              </div>
            </div>

            <div className="infoBarItem">
              <Mail size={20} className="infoBarIcon navy" />
              <div>
                <strong>Correo Electrónico</strong>
                <span>prevesegcali@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST BAR / VALORES */}
      <section className="trustBar">
        <div className="container">
          <div className="trustGrid">
            <div className="trustItem">
              <div className="trustIcon blue"><Award size={22} /></div>
              <div className="trustText">
                <h4>Equipos Certificados</h4>
                <p>Cumplimiento de normas técnicas NFPA, ANSI, NTC y OSHA</p>
              </div>
            </div>
            <div className="trustItem">
              <div className="trustIcon red"><Flame size={22} /></div>
              <div className="trustText">
                <h4>Equipos Contra Incendio</h4>
                <p>Venta, recarga, mantenimiento y pruebas hidrostáticas</p>
              </div>
            </div>
            <div className="trustItem">
              <div className="trustIcon blue"><Building2 size={22} /></div>
              <div className="trustText">
                <h4>Cotizaciones para Empresas</h4>
                <p>Atención inmediata a industrias, obras, conjuntos y locales</p>
              </div>
            </div>
            <div className="trustItem">
              <div className="trustIcon green"><Truck size={22} /></div>
              <div className="trustText">
                <h4>Despacho Inmediato</h4>
                <p>Entregas en Cali y envíos garantizados a todo el país</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICIOS ESPECIALIZADOS PREVESEG */}
      <section className="servicesSection">
        <div className="container">
          <div className="sectionHeader center">
            <span className="subTitle"><Wrench size={14} className="inline-icon" /> Asesoría & Soporte Técnico</span>
            <h2>Nuestros <span>Servicios Especializados</span></h2>
            <p className="sectionSubDesc">
              Soluciones integrales de mantenimiento, inspección y capacitación en seguridad contra incendios en Cali.
            </p>
            <div className="headerDivider"></div>
          </div>

          <div className="servicesGrid">
            {PREVESEG_COMPANY_INFO.services.map((serv, index) => (
              <div key={serv.id} className="serviceCard">
                <div className="serviceIconBox">
                  {index === 0 && <Flame size={28} className="servIcon red" />}
                  {index === 1 && <ShieldCheck size={28} className="servIcon blue" />}
                  {index === 2 && <Tag size={28} className="servIcon blue" />}
                  {index === 3 && <AlertTriangle size={28} className="servIcon red" />}
                  {index === 4 && <Move size={28} className="servIcon blue" />}
                  {index === 5 && <GraduationCap size={28} className="servIcon green" />}
                </div>
                <div className="serviceContent">
                  <h3>{serv.titulo}</h3>
                  <p>{serv.descripcion}</p>
                  <a 
                    href={getServiceWhatsAppUrl(serv.titulo)}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="serviceCtaLink"
                  >
                    <span>Cotizar Servicio</span> <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LÍNEAS DE PRODUCTOS */}
      <section className="categorySection">
        <div className="container">
          <div className="sectionHeader">
            <div className="headerInfo">
              <span className="subTitle"><Sparkles size={14} className="inline-icon" /> Catálogo Industrial</span>
              <h2>Líneas de <span>Productos Disponibles</span></h2>
            </div>
            <Link to="/productos" className="textBtn">Ver catálogo completo <ArrowRight size={16} /></Link>
          </div>
          
          <div className="categoryLayout">
            {displayCategories.map((cat, idx) => (
              <Link 
                key={cat.id || idx}
                to={`/productos?categoria=${cat.nombre}`} 
                className="categoryCardItem"
              >
                <div className="categoryIconBox">
                  {idx === 0 ? <Flame size={26} /> : idx === 1 ? <ShieldCheck size={26} /> : <HardHat size={26} />}
                </div>
                <div className="categoryInfo">
                  <h3>{cat.nombre}</h3>
                  <span className="categoryLinkText">Ver equipos <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EQUIPOS DESTACADOS (CATÁLOGO PARA COTIZAR) */}
      <section id="destacados" className="showcaseSection dark">
        <div className="container">
          <div className="sectionHeader center">
            <span className="subTitle"><Star size={16} fill="currentColor" /> Catálogo de Referencias</span>
            <h2>Equipos <span>Destacados para Cotización</span></h2>
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
                  esKit={product.es_kit}
                />
              ))}
            </div>
          ) : (
            <div className="emptyShowcase">
              <ShoppingBag size={48} />
              <h3>Catálogo de Equipos</h3>
              <p>Puedes solicitar cotización formal de cualquier equipo de protección y contra incendio directamente por WhatsApp.</p>
              <a 
                href="https://wa.me/573046296285?text=Hola%20Preveseg%20Cali%2C%20solicito%20cotizaci%C3%B3n%20de%20equipos." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ctaMain"
                style={{ display: 'inline-flex', marginTop: '1rem' }}
              >
                Solicitar Cotización por WhatsApp <ArrowRight size={18} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* 7. COMPANY PRESENTATION SECTION */}
      <section className="aboutSection">
        <div className="container">
          <div className="aboutGrid">
            <div className="aboutInfo">
              <span className="subTitle red"><ShieldCheck size={16} /> Sobre Preveseg Cali</span>
              <h2>Venta y Mantenimiento de <span>Equipos Contra Incendio y Seguridad Industrial</span></h2>
              <p className="aboutDescription">
                En <strong>PREVESEG</strong> nos especializamos en brindar soluciones efectivas para la prevención de riesgos y protección de instalaciones en Cali y la región. Atendemos requerimientos normativos para empresas, obras, colegios, conjuntos y comercios.
              </p>
              
              <div className="aboutHighlights">
                <div className="highlightCard">
                  <CheckCircle2 className="highlightIcon" size={20} />
                  <div>
                    <h4>Extintores, Recargas & Mantenimiento</h4>
                    <p>Polvo químico seco ABC, Solkaflam agente limpio, CO2, inspección reglamentaria y pruebas hidrostáticas.</p>
                  </div>
                </div>
                <div className="highlightCard">
                  <CheckCircle2 className="highlightIcon" size={20} />
                  <div>
                    <h4>Camillas, Botiquines & Seguridad Vial</h4>
                    <p>Camillas rígidas de inmovilización, botiquines industriales tipo A/B, conos reflectivos y reductores.</p>
                  </div>
                </div>
                <div className="highlightCard">
                  <CheckCircle2 className="highlightIcon" size={20} />
                  <div>
                    <h4>Capacitación, Instalación & Codificación</h4>
                    <p>Talleres en manejo de extintores, demarcación, señalización fotoluminiscente y codificación técnica.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="aboutBanner">
              <div className="bannerCard">
                <Flame size={48} className="bannerIconRed" />
                <h3>Seguridad & Prevención Oficial</h3>
                <p>Punto de atención y despachos en Cali (Cra 28D 72f-79). Garantía directa y asesoría especializada.</p>
                <div className="bannerStats">
                  <div className="statItem">
                    <span className="statNum">Cali</span>
                    <span className="statLabel">Sede Principal</span>
                  </div>
                  <div className="statItem">
                    <span className="statNum">100%</span>
                    <span className="statLabel">Normas Certificadas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. BOLETÍN TÉCNICO (OCULTO TEMPORALMENTE - PRESERVADO PARA USO FUTURO)
         ========================================================================= */}
      {/*
      <section className="newsletter">
        <div className="newsletterVisual"></div>
        <div className="newsletterContent">
          <div className="newsletterIcon"><Mail size={30} /></div>
          <h2>Boletín Técnico Preveseg Cali</h2>
          <p>Suscríbete para recibir información sobre normativas contra incendio, recomendaciones de brigadas y novedades en seguridad industrial.</p>
          <form className="newsletterForm">
            <input type="email" placeholder="Ingresa tu correo corporativo o personal" required />
            <button type="submit">Suscribirme</button>
          </form>
          <p className="formHint">Respetamos tu privacidad. No enviamos spam.</p>
        </div>
      </section>
      */}

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/573046296285?text=Hola%20Preveseg%20Cali%2C%20solicito%20asesor%C3%ADa%20y%20cotizaci%C3%B3n%20para%20mi%20empresa." 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Contactar a Preveseg Cali por WhatsApp"
      >
        <div className="whatsapp-pulse"></div>
        <Phone size={24} />
        <span className="whatsapp-tooltip">¿Cotización de Extintores o EPP en Cali?</span>
      </a>
    </div>
  );
};

export default Home;
