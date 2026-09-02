import { useState } from 'react';
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
import equipmentEpp from '../../assets/equipment-epp.png';
import equipmentRescue from '../../assets/equipment-rescue.png';
import './Home.css';

const Home = () => {
  const { featuredProducts, categories, loading } = useHome();
  const displayCategories = categories.length > 0 ? categories : INITIAL_CATEGORIES;
  const [activeHeroTab, setActiveHeroTab] = useState<'epp' | 'rescue'>('epp');

  const getServiceWhatsAppUrl = (servicioTitulo: string) => {
    const msg = `Hola Preveseg Cali, solicito asesoría y cotización para el servicio de: *${servicioTitulo}*\nUbicación: Cra 28D 72f-79, Cali / A coordinar`;
    return `https://wa.me/573046296285?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="homeContainer page-transition">
      {/* =========================================================================
          1. HERO SECTION (LUMINOUS WHITE & INDUSTRIAL RED ACCENTS)
         ========================================================================= */}
      <section className="heroLightSection">
        <div className="heroLightContainer">
          {/* LEFT CONTENT COLUMN (CLEAN WHITE BACKGROUND & CRISP DARK TEXT) */}
          <div className="heroLightContent">
            {/* EYEBROW TAG */}
            <div className="heroEyebrowLine">
              <span className="eyebrowRedDash"></span>
              <span className="eyebrowRedText">SEGURIDAD QUE PROTEGE VIDAS</span>
            </div>

            {/* MAIN HEADLINE */}
            <h1 className="heroMainTitleLight">
              PROTEGEMOS<br />
              LO QUE <span className="titleRedHighlight">IMPORTA</span>
            </h1>

            {/* SUBTITLE */}
            <p className="heroSubtitleDark">
              Especialistas en recarga y mantenimiento de extintores y venta de elementos de protección personal. Equipos certificados para empresas, obras e industrias en Cali y a nivel nacional.
            </p>

            {/* 4 HORIZONTAL VALUES BADGES (FROM MOCKUP 2) */}
            <div className="heroFourValuesRow">
              <div className="valueColItem">
                <div className="valueColIcon">
                  <ShieldCheck size={20} />
                </div>
                <div className="valueColText">
                  <strong>CALIDAD</strong>
                  <span>Equipos certificados y personal calificado.</span>
                </div>
              </div>

              <div className="valueColItem">
                <div className="valueColIcon">
                  <Wrench size={20} />
                </div>
                <div className="valueColText">
                  <strong>EXPERIENCIA</strong>
                  <span>Más de 10 años en el mercado.</span>
                </div>
              </div>

              <div className="valueColItem">
                <div className="valueColIcon">
                  <Award size={20} />
                </div>
                <div className="valueColText">
                  <strong>CONFIANZA</strong>
                  <span>Soluciones seguras para tu empresa.</span>
                </div>
              </div>

              <div className="valueColItem">
                <div className="valueColIcon">
                  <Headphones size={20} />
                </div>
                <div className="valueColText">
                  <strong>ASESORÍA</strong>
                  <span>Atención personalizada y soporte continuo.</span>
                </div>
              </div>
            </div>

            {/* 2 ACTION BUTTONS (RED PILL + OUTLINE PILL) */}
            <div className="heroActionButtonsRow">
              <a 
                href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20solicito%20una%20cotizaci%C3%B3n%20inmediata%20para%20mi%20empresa." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btnRedPillWhatsApp"
                title="Cotizar por WhatsApp"
              >
                <Phone size={18} />
                <span>3046 296285</span>
              </a>

              <Link to="/productos" className="btnWhitePillCatalog">
                <span>VER PRODUCTOS</span>
                <ChevronRight size={17} />
              </Link>
            </div>
          </div>

          {/* RIGHT VISUAL COLUMN (REALISTIC PHOTOGRAPHIC EQUIPMENT SHOWCASE) */}
          <div className="heroLightVisual">
            <div className="equipmentPhotoCard">
              <img 
                src={activeHeroTab === 'epp' ? equipmentEpp : equipmentRescue} 
                alt="Equipos de seguridad y extintores Preveseg" 
                className="equipmentMainImg"
              />
              <div className="equipmentFadeEdge"></div>

              {/* TABS SELECTOR */}
              <div className="equipmentTabsBar">
                <button 
                  className={`eqTabBtn ${activeHeroTab === 'epp' ? 'active' : ''}`}
                  onClick={() => setActiveHeroTab('epp')}
                >
                  <HardHat size={14} /> Extintores & EPP
                </button>
                <button 
                  className={`eqTabBtn ${activeHeroTab === 'rescue' ? 'active' : ''}`}
                  onClick={() => setActiveHeroTab('rescue')}
                >
                  <Flame size={14} /> Rescate & Señalización
                </button>
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
                <Flame size={24} />
              </div>
              <div className="serviceCardInfo">
                <h4>RECARGA DE EXTINTORES</h4>
                <p>Servicio certificado con equipos de última tecnología y repuestos de calidad.</p>
              </div>
            </a>

            <a 
              href={getServiceWhatsAppUrl('Mantenimiento Preventivo y Correctivo')} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="floatingServiceCard"
            >
              <div className="serviceIconCircle red">
                <Wrench size={24} />
              </div>
              <div className="serviceCardInfo">
                <h4>MANTENIMIENTO PREVENTIVO Y CORRECTIVO</h4>
                <p>Alargamos la vida útil de tus equipos y garantizamos su funcionamiento.</p>
              </div>
            </a>

            <Link to="/productos?categoria=EPP (Protección Personal)" className="floatingServiceCard">
              <div className="serviceIconCircle red">
                <HardHat size={24} />
              </div>
              <div className="serviceCardInfo">
                <h4>ELEMENTOS DE PROTECCIÓN PERSONAL</h4>
                <p>Amplio catálogo de EPP certificado para la seguridad en el trabajo.</p>
              </div>
            </Link>

            <a 
              href={getServiceWhatsAppUrl('Asesoría y Normatividad')} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="floatingServiceCard"
            >
              <div className="serviceIconCircle red">
                <FileCheck2 size={24} />
              </div>
              <div className="serviceCardInfo">
                <h4>ASESORÍA Y NORMATIVIDAD</h4>
                <p>Cumplimos con la normatividad vigente para tu total tranquilidad.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. WHITE NORMATIVITY RIBBON BAR (LIGHT BAR WITH CRISP CONTRAST)
         ========================================================================= */}
      <section className="whiteNormativityRibbon">
        <div className="container">
          <div className="normativityGrid">
            <div className="normativityItem">
              <div className="normativityIconBox">
                <Shield size={24} />
              </div>
              <div className="normativityText">
                <strong>CUMPLIMOS CON LA NORMATIVIDAD</strong>
                <span>NTS 2885 • NFPA 10 • RETIE • ISO 9001</span>
              </div>
            </div>

            <div className="normativityItem">
              <div className="normativityIconBox">
                <CheckCircle2 size={24} />
              </div>
              <div className="normativityText">
                <strong>SERVICIO CON COBERTURA</strong>
                <span>EN CALI Y ALREDEDORES (Cra 28D 72f-79)</span>
              </div>
            </div>

            <div className="normativityItem">
              <div className="normativityIconBox">
                <Users size={24} />
              </div>
              <div className="normativityText">
                <strong>CLIENTES SATISFECHOS</strong>
                <span>EMPRESAS QUE CONFÍAN EN NOSOTROS</span>
              </div>
            </div>

            <div className="normativityItem">
              <div className="normativityIconBox">
                <Flame size={24} />
              </div>
              <div className="normativityText">
                <strong>PREVENCIÓN EFECTIVA</strong>
                <span>SOLUCIONES INTEGRALES CONTRA RIESGOS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. PRODUCT LINES (FONDO BLANCO / CLARO CON TARJETAS INDUSTRIALES)
         ========================================================================= */}
      <section className="categorySectionLight">
        <div className="container">
          <div className="sectionHeader">
            <div className="headerInfo">
              <span className="subTitleRed"><Sparkles size={14} className="inline-icon" /> CATÁLOGO INDUSTRIAL</span>
              <h2 className="titleDark">Líneas de <span className="textRed">Productos Disponibles</span></h2>
            </div>
            <Link to="/productos" className="textBtnRed">Ver catálogo completo <ArrowRight size={16} /></Link>
          </div>
          
          <div className="categoryLayoutLight">
            {displayCategories.map((cat, idx) => (
              <Link 
                key={cat.id || idx}
                to={`/productos?categoria=${encodeURIComponent(cat.nombre)}`} 
                className="categoryCardItemLight"
              >
                <div className="categoryIconBoxLight">
                  {idx === 0 ? <Flame size={26} /> : idx === 1 ? <ShieldCheck size={26} /> : <Package size={26} />}
                </div>
                <div className="categoryInfoLight">
                  <h3>{cat.nombre}</h3>
                  <span className="categoryLinkTextLight">Ver equipos <ArrowRight size={14} /></span>
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
            <span className="subTitleRed"><Star size={16} fill="currentColor" /> EQUIPOS RECOMENDADOS</span>
            <h2 className="titleDark">Equipos <span className="textRed">Destacados para Cotización</span></h2>
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
              <ShoppingBag size={48} />
              <h3>Catálogo de Equipos</h3>
              <p>Puedes solicitar cotización formal de cualquier equipo de protección y contra incendio directamente por WhatsApp.</p>
              <a 
                href="https://wa.me/573046296285?text=Hola%20Preveseg%20Cali%2C%20solicito%20cotizaci%C3%B3n%20de%20equipos." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btnRedPillWhatsApp"
                style={{ display: 'inline-flex', marginTop: '1rem' }}
              >
                Solicitar Cotización por WhatsApp <ArrowRight size={18} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          6. ABOUT SECTION (NOSOTROS - FONDO CLARO / BLANCO EQUILIBRADO)
         ========================================================================= */}
      <section id="nosotros" className="aboutSectionLight">
        <div className="container">
          <div className="aboutGrid">
            <div className="aboutInfo">
              <span className="subTitleRed"><ShieldCheck size={16} /> SOBRE PREVESEG CALI</span>
              <h2 className="titleDark">Venta y Mantenimiento de <span className="textRed">Equipos Contra Incendio y Seguridad Industrial</span></h2>
              <p className="aboutDescriptionDark">
                En <strong>PREVESEG</strong> nos especializamos en brindar soluciones efectivas para la prevención de riesgos y protección de instalaciones en Cali y la región. Atendemos requerimientos normativos para empresas, obras, colegios, conjuntos y comercios.
              </p>
              
              <div className="aboutHighlightsLight">
                <div className="highlightCardLight">
                  <CheckCircle2 className="highlightIconRed" size={20} />
                  <div>
                    <h4>Extintores, Recargas & Mantenimiento</h4>
                    <p>Polvo químico seco ABC, Solkaflam agente limpio, CO2, inspección reglamentaria y pruebas hidrostáticas.</p>
                  </div>
                </div>
                <div className="highlightCardLight">
                  <CheckCircle2 className="highlightIconRed" size={20} />
                  <div>
                    <h4>Camillas, Botiquines & Seguridad Vial</h4>
                    <p>Camillas rígidas de inmovilización, botiquines industriales tipo A/B, conos reflectivos y reductores.</p>
                  </div>
                </div>
                <div className="highlightCardLight">
                  <CheckCircle2 className="highlightIconRed" size={20} />
                  <div>
                    <h4>Capacitación, Instalación & Codificación</h4>
                    <p>Talleres en manejo de extintores, demarcación, señalización fotoluminiscente y codificación técnica.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="aboutBanner">
              <div className="bannerCardIndustrial">
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
