import { ShieldCheck, Award, Users, CheckCircle2, Flame, MapPin, ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroProductsImg from '../../assets/hero-products.jpg';
import './About.css';

const About = () => {
  return (
    <div className="aboutPage page-transition">
      {/* HEADER HERO */}
      <section className="aboutHero">
        <div className="container">
          <div className="aboutHeroContent">
            <span className="pageTagRed">— PREVESEG CALI</span>
            <h1>Seguridad & Protección que <span className="textRed">Salva Vidas</span></h1>
            <p className="heroLead">
              Somos una empresa colombiana especializada en la venta, distribución y mantenimiento de equipos contra incendio y seguridad industrial. Atendemos a empresas, industrias, instituciones y obras en Cali y a nivel nacional.
            </p>
            <div className="aboutHeroActions">
              <a 
                href="https://wa.me/573046296285?text=Hola%20Preveseg%20Cali%2C%20quisiera%20conocer%20m%C3%A1s%20sobre%20sus%20servicios%20empresariales." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btnRedPill"
              >
                <Phone size={18} /> Asesoría Directa WhatsApp
              </a>
              <Link to="/contacto" className="btnOutlinePill">
                Visitar Sede en Cali <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="aboutStatsBar">
        <div className="container">
          <div className="statsGrid">
            <div className="statBox">
              <span className="statNumber">+10</span>
              <span className="statTitle">Años de Experiencia</span>
              <p>Trayectoria continua en el sector de seguridad y protección industrial.</p>
            </div>
            <div className="statBox">
              <span className="statNumber">100%</span>
              <span className="statTitle">Equipos Certificados</span>
              <p>Cumplimiento estricto con las normas NTC 2885, NFPA 10 y RETIE.</p>
            </div>
            <div className="statBox">
              <span className="statNumber">Cali</span>
              <span className="statTitle">Sede Principal</span>
              <p>Punto de distribución y taller técnico en Cra 28D 72f-79.</p>
            </div>
            <div className="statBox">
              <span className="statNumber">24/7</span>
              <span className="statTitle">Soporte y Asesoría</span>
              <p>Respuesta ágil a cotizaciones y emergencias operativas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MISIÓN & VISIÓN */}
      <section className="missionVisionSection">
        <div className="container">
          <div className="mvGrid">
            <div className="mvCard">
              <div className="mvIconBadge"><ShieldCheck size={28} /></div>
              <h2>Nuestra Misión</h2>
              <p>
                Proveer a las empresas, instituciones y hogares equipos de protección contra incendio y seguridad industrial de la más alta calidad técnica y normativa. Garantizamos la tranquilidad de nuestros clientes mediante recargas certificadas, mantenimiento preventivo continuo y asesoría experta.
              </p>
            </div>

            <div className="mvCard">
              <div className="mvIconBadge"><Award size={28} /></div>
              <h2>Nuestra Visión</h2>
              <p>
                Consolidarnos como el referente líder en seguridad industrial y protección contra incendios en el suroccidente colombiano, reconocidos por nuestra excelencia técnica, agilidad en despachos y compromiso inquebrantable con la preservación de la vida humana e instalaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES Y PILARES */}
      <section className="pillarsSection">
        <div className="container">
          <div className="sectionHeader center">
            <span className="pageTagRed">— POR QUÉ ELEGIRNOS</span>
            <h2>Pilares que Respaldan <span className="textRed">Nuestro Servicio</span></h2>
            <div className="headerDivider"></div>
          </div>

          <div className="pillarsGrid">
            <div className="pillarItem">
              <div className="pillarIcon"><CheckCircle2 size={24} /></div>
              <h3>Cumplimiento Normativo</h3>
              <p>Todos nuestros equipos y procesos de recarga cumplen estrictamente con la normativa nacional e internacional vigente (NFPA 10, NTS 2885, ISO 9001).</p>
            </div>

            <div className="pillarItem">
              <div className="pillarIcon"><Flame size={24} /></div>
              <h3>Garantía & Seguridad</h3>
              <p>Pruebas hidrostáticas, sellos de seguridad originales, pasadores intactos y codificación por colores para una trazabilidad perfecta de cada cilindro.</p>
            </div>

            <div className="pillarItem">
              <div className="pillarIcon"><Users size={24} /></div>
              <h3>Asesoría Especializada</h3>
              <p>Capacitamos a tu equipo en el uso adecuado de extintores, primeros auxilios y brigadas de emergencia para responder efectivamente a cualquier contingencia.</p>
            </div>

            <div className="pillarItem">
              <div className="pillarIcon"><MapPin size={24} /></div>
              <h3>Cobertura y Puntualidad</h3>
              <p>Atención directa en Cali, Yumbo, Jamundí, Palmira y envíos a todo el territorio nacional con tiempos de entrega récord.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPOSICIÓN VISUAL / EQUIPO */}
      <section className="aboutVisualSection">
        <div className="container">
          <div className="visualBannerCard">
            <div className="visualBannerText">
              <h2>Equipamiento Integral para la <span className="textRed">Protección de tu Empresa</span></h2>
              <p>
                Desde extintores de polvo químico seco ABC, CO₂ y Solkaflam agente limpio, hasta camillas rígidas, botiquines tipo A/B, kits viales y elementos de protección personal (EPP).
              </p>
              <div className="bannerPoints">
                <div className="bPoint"><CheckCircle2 size={16} className="textRed" /> Extintores nuevos y servicio de recarga</div>
                <div className="bPoint"><CheckCircle2 size={16} className="textRed" /> Dotación para brigadistas y primeros auxilios</div>
                <div className="bPoint"><CheckCircle2 size={16} className="textRed" /> Señalización reglamentaria fotoluminiscente</div>
              </div>
              <Link to="/productos" className="btnRedPill" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
                Explorar Catálogo de Equipos <ArrowRight size={16} />
              </Link>
            </div>
            <div className="visualBannerImgBox">
              <img src={heroProductsImg} alt="Productos Preveseg" className="visualBannerImg" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA INVITACIÓN */}
      <section className="aboutCtaSection">
        <div className="container">
          <div className="aboutCtaCard">
            <h2>¿Necesitas asesoría para el plan de seguridad de tu empresa?</h2>
            <p>Contáctanos hoy mismo. Te ayudamos a cumplir con los requerimientos del SG-SST y normatividad vigente.</p>
            <div className="aboutCtaActions">
              <a 
                href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20necesito%20asesor%C3%ADa%20para%20el%20plan%20de%20seguridad%20de%20mi%20empresa." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btnRedPill"
              >
                <Phone size={18} /> Hablar con un Asesor (304 629 6285)
              </a>
              <Link to="/contacto" className="btnOutlinePill">
                Ver Datos de Contacto
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
