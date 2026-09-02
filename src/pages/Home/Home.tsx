import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Flame, 
  HardHat, 
  ArrowRight, 
  ShoppingBag, 
  Phone, 
  Wrench, 
  ChevronRight, 
  FileCheck2, 
  Truck,
  MapPin,
  Clock
} from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductSkeleton from '../../components/ProductCard/ProductSkeleton';
import { useHome } from '../../hooks/useHome';
import heroProductsImg from '../../assets/hero-products.jpg';
import './Home.css';

const Home = () => {
  const { featuredProducts, loading } = useHome();

  return (
    <div className="homePageUnified page-transition">
      {/* =========================================================================
          1. HERO EXPANSIVO FULL-WIDTH (DARK INDUSTRIAL & FIRE RED)
         ========================================================================= */}
      <section className="heroFullWidthSection">
        <div className="heroFullWidthContainer">
          {/* LEFT: TEXT CONTENT */}
          <div className="heroLeftCol">
            <div className="heroTagLine">
              <span className="tagLineRedDash"></span>
              <span>SEGURIDAD QUE PROTEGE VIDAS</span>
            </div>

            <h1 className="heroTitleUnified">
              PROTEGEMOS<br />
              LO QUE <span className="textRedGlow">IMPORTA</span>
            </h1>

            <p className="heroSubTextUnified">
              Venta, recarga certificada y mantenimiento de extintores y equipos contra incendio. Atención directa a empresas, obras y comercios en Cali.
            </p>

            {/* 4 REFINED CHIP PILLS */}
            <div className="heroChipsRow">
              <div className="heroChipItem">
                <ShieldCheck size={16} className="chipIcon" />
                <span>Normas NTC & NFPA</span>
              </div>
              <div className="heroChipItem">
                <Wrench size={16} className="chipIcon" />
                <span>Taller Autorizado</span>
              </div>
              <div className="heroChipItem">
                <Truck size={16} className="chipIcon" />
                <span>Despachos Rápidos</span>
              </div>
              <div className="heroChipItem">
                <FileCheck2 size={16} className="chipIcon" />
                <span>Asesoría SG-SST</span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="heroButtonsRow">
              <a 
                href="https://wa.me/573046296285?text=Hola%20Preveseg%20Cali%2C%20solicito%20una%20cotizaci%C3%B3n%20para%20mi%20empresa." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btnRedPillSolid"
                title="Cotizar por WhatsApp"
              >
                <Phone size={17} />
                <span>304 629 6285</span>
              </a>

              <Link to="/productos" className="btnOutlinePillGlass">
                <span>VER PRODUCTOS</span>
                <ChevronRight size={17} />
              </Link>
            </div>
          </div>

          {/* RIGHT: REAL PRODUCTS PHOTOGRAPH */}
          <div className="heroRightCol">
            <div className="heroProductsDisplay">
              <img 
                src={heroProductsImg} 
                alt="Equipos contra incendio y seguridad industrial Preveseg" 
                className="heroProductsImage"
              />
              <div className="productsFloatingBadge">
                <span className="floatingBadgeDot"></span>
                <span>Equipos 100% Nuevos & Certificados</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. RESUMEN DE SERVICIOS (TARJETAS OSCURAS CON ENLACE A /servicios)
         ========================================================================= */}
      <section className="servicesSummarySection">
        <div className="container">
          <div className="sectionHeaderUnified">
            <div>
              <span className="sectionPreTitle">— COBERTURA INTEGRAL</span>
              <h2>Nuestros <span className="textRed">Servicios Especializados</span></h2>
            </div>
            <Link to="/servicios" className="sectionLinkAction">
              Ver todos los servicios <ArrowRight size={16} />
            </Link>
          </div>

          <div className="servicesSummaryGrid">
            <div className="serviceSummaryCard">
              <div className="serviceSummaryIconBox">
                <Flame size={24} />
              </div>
              <h3>Recarga de Extintores</h3>
              <p>PQS multipropósito ABC, Solkaflam agente limpio, CO₂ y agua presurizada bajo norma NTC 2885.</p>
              <Link to="/servicios" className="serviceCardLink">
                Conocer detalles <ChevronRight size={15} />
              </Link>
            </div>

            <div className="serviceSummaryCard">
              <div className="serviceSummaryIconBox">
                <Wrench size={24} />
              </div>
              <h3>Mantenimiento Técnico</h3>
              <p>Pruebas hidrostáticas, cambio de vástagos, empaques, pintura y puesta a punto de cilindros.</p>
              <Link to="/servicios" className="serviceCardLink">
                Conocer detalles <ChevronRight size={15} />
              </Link>
            </div>

            <div className="serviceSummaryCard">
              <div className="serviceSummaryIconBox">
                <HardHat size={24} />
              </div>
              <h3>Dotaciones y EPP</h3>
              <p>Cascos, gafas, guantes, botas de seguridad, camillas de inmovilización y botiquines tipo A/B.</p>
              <Link to="/servicios" className="serviceCardLink">
                Conocer detalles <ChevronRight size={15} />
              </Link>
            </div>

            <div className="serviceSummaryCard">
              <div className="serviceSummaryIconBox">
                <FileCheck2 size={24} />
              </div>
              <h3>Asesoría y Capacitación</h3>
              <p>Talleres en manejo de extintores para brigadas de emergencia y preparación para visitas de Bomberos.</p>
              <Link to="/servicios" className="serviceCardLink">
                Conocer detalles <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. EQUIPOS DESTACADOS PARA COTIZACIÓN (ENLACE A /productos)
         ========================================================================= */}
      <section className="featuredProductsSection">
        <div className="container">
          <div className="sectionHeaderUnified">
            <div>
              <span className="sectionPreTitle">— CATÁLOGO PARA COTIZAR</span>
              <h2>Equipos <span className="textRed">Destacados</span></h2>
            </div>
            <Link to="/productos" className="sectionLinkAction">
              Ver catálogo completo <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="productGridUnified">
              {[1, 2, 3, 4].map(i => <ProductSkeleton key={i} />)}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="productGridUnified">
              {featuredProducts.slice(0, 4).map((product) => (
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
            <div className="emptyCatalogCard">
              <ShoppingBag size={40} className="emptyIcon" />
              <h3>Catálogo de Equipos Disponibles</h3>
              <p>Solicita la cotización formal de extintores, camillas, botiquines o kits de seguridad directamente por WhatsApp.</p>
              <Link to="/productos" className="btnRedPillSolid" style={{ marginTop: '1rem', display: 'inline-flex' }}>
                Explorar Catálogo Completo <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          4. BANNER INSTITUCIONAL: SEDE CALI & CONTACTO
         ========================================================================= */}
      <section className="caliBannerSection">
        <div className="container">
          <div className="caliBannerCard">
            <div className="caliBannerText">
              <span className="bannerTag">— PREVESEG CALI</span>
              <h2>Punto de Atención y Taller Técnico en <span className="textRed">Cali</span></h2>
              <p>
                Visítanos en nuestra sede en <strong>Cra 28D 72f-79</strong> o solicita cotización inmediata por WhatsApp. Atendemos requerimientos normativos para empresas, conjuntos residenciales, obras y comercio.
              </p>
              
              <div className="bannerDetailsRow">
                <div className="bannerDetailItem">
                  <MapPin size={18} className="detailIcon" />
                  <span>Cra 28D 72f-79, Cali</span>
                </div>
                <div className="bannerDetailItem">
                  <Clock size={18} className="detailIcon" />
                  <span>Lun - Vie: 8am - 6pm | Sáb: 8am - 4pm</span>
                </div>
              </div>

              <div className="bannerActions">
                <Link to="/contacto" className="btnRedPillSolid">
                  Ver Mapa y Contacto <ArrowRight size={16} />
                </Link>
                <Link to="/nosotros" className="btnOutlinePillGlass">
                  Sobre Nosotros
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href="https://wa.me/573046296285?text=Hola%20Preveseg%20Cali%2C%20solicito%20asesor%C3%ADa%20y%20cotizaci%C3%B3n%20para%20mi%20empresa." 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Contactar a Preveseg Cali por WhatsApp"
      >
        <div className="whatsapp-pulse"></div>
        <Phone size={22} />
      </a>
    </div>
  );
};

export default Home;
