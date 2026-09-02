import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Flame, 
  HardHat, 
  Award, 
  ArrowRight, 
  Star, 
  ShoppingBag, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  Wrench, 
  ChevronRight, 
  Headphones, 
  Package, 
  Shield, 
  FileCheck2, 
  Users 
} from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductSkeleton from '../../components/ProductCard/ProductSkeleton';
import { useHome } from '../../hooks/useHome';
import { INITIAL_CATEGORIES } from '../../data/defaultCatalog';
import heroProductsImg from '../../assets/hero-products.jpg';
import './Home.css';

const Home = () => {
  const { featuredProducts, categories, loading } = useHome();
  const displayCategories = categories.length > 0 ? categories : INITIAL_CATEGORIES;

  const getServiceWhatsAppUrl = (servicioTitulo: string) => {
    const msg = `Hola Preveseg Cali, solicito asesoría y cotización para el servicio de: *${servicioTitulo}*\nUbicación: Cra 28D 72f-79, Cali / A coordinar`;
    return `https://wa.me/573046296285?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="homeContainer page-transition">
      {/* =========================================================================
          1. HERO SECTION (LUMINOUS WHITE WITH REAL PRODUCTS HERO IMAGE)
         ========================================================================= */}
      <section className="heroLightSection">
        <div className="heroLightContainer">
          {/* LEFT CONTENT COLUMN */}
          <div className="heroLightContent">
            {/* EYEBROW */}
            <div className="heroEyebrowLine">
              <span className="eyebrowRedDash"></span>
              <span className="eyebrowRedText">SEGURIDAD QUE PROTEGE VIDAS</span>
            </div>

            {/* HEADLINE */}
            <h1 className="heroMainTitleLight">
              PROTEGEMOS<br />
              LO QUE <span className="titleRedHighlight">IMPORTA</span>
            </h1>

            {/* SHORT SUBTITLE (NO LONG TEXT WALLS) */}
            <p className="heroSubtitleDark">
              Especialistas en recarga y mantenimiento de extintores y venta de elementos de protección personal en Cali y todo el país.
            </p>

            {/* 4 COMPACT REFINED VALUES (CLEAN & MINIMALIST) */}
            <div className="heroCompactValuesRow">
              <div className="compactValueItem">
                <div className="compactValueIcon">
                  <ShieldCheck size={16} />
                </div>
                <div className="compactValueText">
                  <strong>CALIDAD</strong>
                  <span className="mobileHideSub">Equipos certificados</span>
                </div>
              </div>

              <div className="compactValueItem">
                <div className="compactValueIcon">
                  <Wrench size={16} />
                </div>
                <div className="compactValueText">
                  <strong>EXPERIENCIA</strong>
                  <span className="mobileHideSub">+10 años en el sector</span>
                </div>
              </div>

              <div className="compactValueItem">
                <div className="compactValueIcon">
                  <Award size={16} />
                </div>
                <div className="compactValueText">
                  <strong>CONFIANZA</strong>
                  <span className="mobileHideSub">Soluciones seguras</span>
                </div>
              </div>

              <div className="compactValueItem">
                <div className="compactValueIcon">
                  <Headphones size={16} />
                </div>
                <div className="compactValueText">
                  <strong>ASESORÍA</strong>
                  <span className="mobileHideSub">Soporte continuo</span>
                </div>
              </div>
            </div>

            {/* 2 ACTION BUTTONS */}
            <div className="heroActionButtonsRow">
              <a 
                href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20solicito%20una%20cotizaci%C3%B3n%20inmediata%20para%20mi%20empresa." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btnRedPillWhatsApp"
                title="Cotizar por WhatsApp"
              >
                <Phone size={17} />
                <span>304 629 6285</span>
              </a>

              <Link to="/productos" className="btnWhitePillCatalog">
                <span>VER PRODUCTOS</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          {/* RIGHT VISUAL COLUMN: PURE CLEAN PRODUCTS IMAGE */}
          <div className="heroLightVisual">
            <div className="heroProductImageWrapper">
              <img 
                src={heroProductsImg} 
                alt="Extintores, camillas, botiquines y seguridad vial Preveseg" 
                className="heroProductsRealImg"
              />
              <div className="heroProductBadgeOverlay">
                <span className="badgeDotRed"></span>
                <span>Equipos Certificados NTC & NFPA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. FLOATING SERVICES BAR (BLACK CARDS WITH RED ICONS)
         ========================================================================= */}
      <section id="servicios" className="floatingServicesSection">
        <div className="container">
          <div className="floatingServicesContainer">
            <a 
              href={getServiceWhatsAppUrl('Recarga de Extintores')} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="floatingServiceCard"
            >
              <div className="serviceIconCircle red">
                <Flame size={18} />
              </div>
              <div className="serviceCardInfo">
                <h4>RECARGA DE EXTINTORES</h4>
                <p>Servicio certificado con equipos de última tecnología.</p>
              </div>
            </a>

            <a 
              href={getServiceWhatsAppUrl('Mantenimiento Preventivo y Correctivo')} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="floatingServiceCard"
            >
              <div className="serviceIconCircle red">
                <Wrench size={18} />
              </div>
              <div className="serviceCardInfo">
                <h4>MANTENIMIENTO PREVENTIVO</h4>
                <p>Pruebas hidrostáticas y puesta a punto garantizada.</p>
              </div>
            </a>

            <Link to="/productos?categoria=EPP (Protección Personal)" className="floatingServiceCard">
              <div className="serviceIconCircle red">
                <HardHat size={18} />
              </div>
              <div className="serviceCardInfo">
                <h4>PROTECCIÓN PERSONAL</h4>
                <p>Catálogo completo de EPP para la seguridad laboral.</p>
              </div>
            </Link>

            <a 
              href={getServiceWhatsAppUrl('Asesoría y Normatividad')} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="floatingServiceCard"
            >
              <div className="serviceIconCircle red">
                <FileCheck2 size={18} />
              </div>
              <div className="serviceCardInfo">
                <h4>ASESORÍA Y NORMATIVIDAD</h4>
                <p>Cumplimiento normativo y asesoría para SG-SST.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. WHITE NORMATIVITY RIBBON BAR
         ========================================================================= */}
      <section className="whiteNormativityRibbon">
        <div className="container">
          <div className="normativityGrid">
            <div className="normativityItem">
              <Shield size={18} className="normativityIcon" />
              <div className="normativityText">
                <strong>CUMPLIMIENTO NORMATIVO</strong>
                <span>NTS 2885 • NFPA 10 • RETIE • ISO 9001</span>
              </div>
            </div>

            <div className="normativityItem">
              <CheckCircle2 size={18} className="normativityIcon" />
              <div className="normativityText">
                <strong>COBERTURA EN CALI</strong>
                <span>Cra 28D 72f-79 y despachos nacionales</span>
              </div>
            </div>

            <div className="normativityItem">
              <Users size={18} className="normativityIcon" />
              <div className="normativityText">
                <strong>EMPRESAS QUE CONFÍAN</strong>
                <span>Atención a industrias, obras y comercio</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. PRODUCT LINES (LÍNEAS DE PRODUCTO CON ESTILO LIMPIO)
         ========================================================================= */}
      <section className="categorySectionLight">
        <div className="container">
          <div className="sectionHeader">
            <div className="headerInfo">
              <span className="subTitleRed"><Sparkles size={13} className="inline-icon" /> CATÁLOGO INDUSTRIAL</span>
              <h2 className="titleDark">Líneas de <span className="textRed">Productos</span></h2>
            </div>
            <Link to="/productos" className="textBtnRed">Ver todo el catálogo <ArrowRight size={15} /></Link>
          </div>
          
          <div className="categoryLayoutLight">
            {displayCategories.map((cat, idx) => (
              <Link 
                key={cat.id || idx}
                to={`/productos?categoria=${encodeURIComponent(cat.nombre)}`} 
                className="categoryCardItemLight"
              >
                <div className="categoryIconBoxLight">
                  {idx === 0 ? <Flame size={20} /> : idx === 1 ? <ShieldCheck size={20} /> : <Package size={20} />}
                </div>
                <div className="categoryInfoLight">
                  <h3>{cat.nombre}</h3>
                  <span className="categoryLinkTextLight">Ver equipos <ArrowRight size={12} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. FEATURED PRODUCTS (DESTACADOS PARA COTIZACIÓN)
         ========================================================================= */}
      <section id="destacados" className="showcaseSectionLight">
        <div className="container">
          <div className="sectionHeader center">
            <span className="subTitleRed"><Star size={14} fill="currentColor" /> EQUIPOS DESTACADOS</span>
            <h2 className="titleDark">Catálogo para <span className="textRed">Cotización</span></h2>
            <div className="headerRedDivider"></div>
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
              <ShoppingBag size={40} />
              <h3>Catálogo de Equipos</h3>
              <p>Puedes solicitar cotización formal de cualquier equipo de protección y contra incendio directamente por WhatsApp.</p>
              <a 
                href="https://wa.me/573046296285?text=Hola%20Preveseg%20Cali%2C%20solicito%20cotizaci%C3%B3n%20de%20equipos." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btnRedPillWhatsApp"
                style={{ display: 'inline-flex', marginTop: '1rem' }}
              >
                Solicitar Cotización por WhatsApp <ArrowRight size={16} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          6. ABOUT SECTION (NOSOTROS)
         ========================================================================= */}
      <section id="nosotros" className="aboutSectionLight">
        <div className="container">
          <div className="aboutGrid">
            <div className="aboutInfo">
              <span className="subTitleRed"><ShieldCheck size={14} /> SOBRE PREVESEG CALI</span>
              <h2 className="titleDark">Venta y Mantenimiento de <span className="textRed">Equipos Contra Incendio</span></h2>
              <p className="aboutDescriptionDark">
                En <strong>PREVESEG</strong> nos especializamos en brindar soluciones efectivas para la prevención de riesgos y protección de instalaciones en Cali y la región.
              </p>
              
              <div className="aboutHighlightsLight">
                <div className="highlightCardLight">
                  <CheckCircle2 className="highlightIconRed" size={18} />
                  <div>
                    <h4>Extintores, Recargas & Mantenimiento</h4>
                    <p>Polvo químico seco ABC, Solkaflam agente limpio, CO2 y pruebas hidrostáticas.</p>
                  </div>
                </div>
                <div className="highlightCardLight">
                  <CheckCircle2 className="highlightIconRed" size={18} />
                  <div>
                    <h4>Camillas, Botiquines & Seguridad Vial</h4>
                    <p>Camillas de inmovilización, botiquines industriales, conos reflectivos y reductores.</p>
                  </div>
                </div>
                <div className="highlightCardLight">
                  <CheckCircle2 className="highlightIconRed" size={18} />
                  <div>
                    <h4>Capacitación, Instalación & Codificación</h4>
                    <p>Talleres en manejo de extintores, demarcación y señalización fotoluminiscente.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="aboutBanner">
              <div className="bannerCardIndustrial">
                <Flame size={40} className="bannerIconRed" />
                <h3>Punto de Atención en Cali</h3>
                <p>Cra 28D 72f-79, Cali, Valle del Cauca. Asesoría especializada y despacho inmediato.</p>
                <div className="bannerStats">
                  <div className="statItem">
                    <span className="statNum">Cali</span>
                    <span className="statLabel">Sede Principal</span>
                  </div>
                  <div className="statItem">
                    <span className="statNum">100%</span>
                    <span className="statLabel">Certificado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/573046296285?text=Hola%20Preveseg%20Cali%2C%20solicito%20asesor%C3%ADa%20y%20cotizaci%C3%B3n%20para%20mi%20empresa." 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Contactar a Preveseg Cali por WhatsApp"
      >
        <div className="whatsapp-pulse"></div>
        <Phone size={22} />
        <span className="whatsapp-tooltip">¿Cotizar en Cali?</span>
      </a>
    </div>
  );
};

export default Home;
