import { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  CheckCircle2, 
  MapPin, 
  ArrowRight, 
  Phone, 
  Building2, 
  Factory, 
  Truck, 
  FileCheck2, 
  HeartHandshake, 
  Clock, 
  ChevronDown, 
  Sparkles, 
  Zap, 
  HardHat, 
  Compass,
  HelpCircle,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import aboutHeroImg from '../../assets/about-hero.jpg';
import './About.css';

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: '¿Cada cuánto tiempo se debe recargar un extintor en Colombia?',
    a: 'De acuerdo con la norma técnica NTC 2885 y las directrices de los Cuerpos de Bomberos en Colombia, los extintores deben someterse a inspección y recarga obligatoria una vez al año (cada 12 meses), incluso si no han sido percutados o descargados, para certificar la presión y calidad del agente químico.'
  },
  {
    q: '¿Preveseg entrega certificado válido para el SG-SST y Bomberos?',
    a: 'Sí, absolutamente. Con cada servicio de venta, recarga o mantenimiento emitimos el Certificado Oficial de Inspección y Recarga con fecha de ejecución, vigencia, número de collarín reglamentario y registro técnico, 100% válido ante inspecciones de la Secretaría de Salud, Bomberos Cali y auditores del SG-SST.'
  },
  {
    q: '¿Prestan extintores de respaldo mientras se realiza la recarga de nuestros equipos?',
    a: 'Sí. Ofrecemos servicio de extintores de préstamo temporal para que las instalaciones de tu empresa, obra o comercio nunca queden desprotegidas durante el tiempo que toma el proceso técnico en nuestro taller.'
  },
  {
    q: '¿Realizan visitas de inspección técnica en empresas de Cali y alrededores?',
    a: 'Sí. Nuestro equipo técnico visita tus instalaciones en Cali, Yumbo, Jamundí y Palmira para realizar el levantamiento de carga de fuego, verificar alturas reglamentarias, señalización y estado de gabinetes sin compromiso comercial.'
  },
  {
    q: '¿Qué garantía tienen los productos y recargas suministrados por Preveseg?',
    a: 'Todos los extintores nuevos cuentan con garantía directa de fábrica. Las recargas cuentan con 1 año de garantía en sellos, manómetros y presurización, respaldadas por repuestos y collarines originales.'
  }
];

const About = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="aboutPageBalanced page-transition">
      {/* =========================================================================
          1. HERO CORPORATIVO LUMINOSO (BLANCO, GRIS CLARO Y ROJO)
         ========================================================================= */}
      <section className="aboutHeroLight">
        <div className="container">
          <div className="aboutHeroGrid">
            <div className="aboutHeroText">
              <div className="aboutHeroBadge">
                <span className="badgeDotRed"></span>
                <span>EMPRESA LÍDER EN SEGURIDAD INDUSTRIAL Y EXTINTORES</span>
              </div>
              
              <h1>
                Más que equipos, <br />
                <span className="textRed">Protegemos Vidas</span> e Instalaciones
              </h1>

              <p className="heroLeadText">
                En <strong>PREVESEG</strong> somos una empresa colombiana especializada en la venta, mantenimiento certificado y recarga de equipos contra incendio, dotaciones EPP y seguridad vial. Con sede principal en Cali, brindamos respaldo normativo y tranquilidad a más de 500 empresas de la región.
              </p>

              <div className="aboutHeroChips">
                <div className="heroChip"><MapPin size={15} className="chipIconRed" /> Sede Cali: Cra 28D 72f-79</div>
                <div className="heroChip"><Award size={15} className="chipIconRed" /> +10 Años de Experiencia</div>
                <div className="heroChip"><ShieldCheck size={15} className="chipIconRed" /> Normas NTC 2885 & NFPA 10</div>
              </div>

              <div className="aboutHeroActions">
                <a 
                  href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20quisiera%20solicitar%20asesor%C3%ADa%20corporativa%20para%20mi%20empresa." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btnRedPillSolid"
                >
                  <Phone size={17} /> Hablar con un Asesor (304 629 6285)
                </a>
                <Link to="/servicios" className="btnGrayOutline">
                  Ver Portafolio de Servicios <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="aboutHeroVisual">
              <div className="aboutImageCard">
                <img src={aboutHeroImg} alt="Inspección y taller técnico Preveseg Cali" className="aboutHeroImg" />
                <div className="aboutImgOverlayCard">
                  <div className="overlayBadge">
                    <CheckCircle2 size={18} className="textRed" />
                    <div>
                      <strong>Taller Técnico Autorizado en Cali</strong>
                      <span>Inspección, recargas reglamentarias y pruebas de presión</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MÉTRICAS CLAVE / STATS BAR (TARJETAS BLANCAS CON SOMBRA SUAVE)
         ========================================================================= */}
      <section className="aboutMetricsSection">
        <div className="container">
          <div className="metricsGrid">
            <div className="metricCard">
              <span className="metricNum">+10</span>
              <span className="metricTitle">Años de Trayectoria</span>
              <p>Experiencia sólida y continuada en el sector de protección contra incendios.</p>
            </div>
            <div className="metricCard">
              <span className="metricNum">100%</span>
              <span className="metricTitle">Certificación Oficial</span>
              <p>Equipos y procesos que cumplen con la reglamentación técnica de Bomberos y SG-SST.</p>
            </div>
            <div className="metricCard">
              <span className="metricNum">+500</span>
              <span className="metricTitle">Empresas Protegidas</span>
              <p>Atención a industrias, obras civiles, centros de salud, comercios e instituciones.</p>
            </div>
            <div className="metricCard">
              <span className="metricNum">24/48h</span>
              <span className="metricTitle">Tiempos de Entrega</span>
              <p>Despachos ágiles en Cali y cobertura con extintores de préstamo temporal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. NUESTRA HISTORIA & EVOLUCIÓN (FONDO BLANCO)
         ========================================================================= */}
      <section className="aboutStorySection">
        <div className="container">
          <div className="storyHeader center">
            <span className="sectionPreTitle">— TRAYECTORIA Y COMPROMISO</span>
            <h2>Nuestra Evolución <span className="textRed">en Cali</span></h2>
            <p className="storyIntro">
              Nacimos con la convicción de que la seguridad contra incendios no debe ser un simple trámite, sino una garantía real de protección para el patrimonio y la vida de las personas.
            </p>
            <div className="redDivider"></div>
          </div>

          <div className="timelineGrid">
            <div className="timelineItem">
              <div className="timelineYear">2014</div>
              <div className="timelineContent">
                <h4>Fundación y Primer Taller Técnico</h4>
                <p>Iniciamos operaciones en Cali con servicio especializado en recarga y mantenimiento de extintores de Polvo Químico Seco (PQS) y CO₂ para el sector comercial.</p>
              </div>
            </div>

            <div className="timelineItem">
              <div className="timelineYear">2018</div>
              <div className="timelineContent">
                <h4>Expansión a Seguridad Industrial</h4>
                <p>Ampliamos nuestro catálogo a camillas rígidas de inmovilización, botiquines reglamentarios tipo trauma, señalización fotoluminiscente y elementos de protección personal (EPP).</p>
              </div>
            </div>

            <div className="timelineItem">
              <div className="timelineYear">2021</div>
              <div className="timelineContent">
                <h4>Laboratorio de Pruebas Hidrostáticas</h4>
                <p>Implementamos banco de pruebas hidrostáticas de alta y baja presión y tolva neumática de llenado automatizado para garantizar agentes extintores libres de humedad.</p>
              </div>
            </div>

            <div className="timelineItem">
              <div className="timelineYear">HOY</div>
              <div className="timelineContent">
                <h4>Aliado Estratégico Integral</h4>
                <p>Consolidados como referente en Cali y el Valle del Cauca, capacitando brigadas y abasteciendo a industrias con asesoría normativa continua.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. MISIÓN, VISIÓN Y PILARES ESTRATÉGICOS (FONDO GRIS CLARO)
         ========================================================================= */}
      <section className="missionVisionSection">
        <div className="container">
          <div className="mvGridUnified">
            <div className="mvCardUnified">
              <div className="mvIconBadge"><Compass size={28} /></div>
              <h3>Nuestra Misión</h3>
              <p>
                Proveer a las empresas, industrias, instituciones y hogares equipos de protección contra incendio y seguridad industrial con los más altos estándares técnicos y de calidad. Aseguramos la continuidad operativa de nuestros clientes mediante recargas certificadas, mantenimiento preventivo y formación técnica de brigadas.
              </p>
              <div className="mvHighlight">
                <CheckCircle2 size={16} className="textRed" />
                <span>Salvar vidas y resguardar bienes materiales es nuestro objetivo primordial.</span>
              </div>
            </div>

            <div className="mvCardUnified">
              <div className="mvIconBadge"><Sparkles size={28} /></div>
              <h3>Nuestra Visión</h3>
              <p>
                Ser reconocidos como la empresa líder y más confiable en soluciones integrales de seguridad industrial y prevención contra incendios en el suroccidente colombiano, destacándonos por la rigurosidad técnica de nuestro taller, la innovación en servicios y la cercanía humana con cada cliente.
              </p>
              <div className="mvHighlight">
                <CheckCircle2 size={16} className="textRed" />
                <span>Consolidar alianzas a largo plazo fundamentadas en transparencia y cumplimiento.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. VALORES CORPORATIVOS (FONDO BLANCO)
         ========================================================================= */}
      <section className="aboutValuesSection">
        <div className="container">
          <div className="sectionHeaderCenter">
            <span className="sectionPreTitle">— CÓDIGO DE TRABAJO</span>
            <h2>Nuestros Valores <span className="textRed">Fundamentales</span></h2>
            <div className="redDivider"></div>
          </div>

          <div className="valuesFourGrid">
            <div className="valueBox">
              <div className="valueBoxIcon"><ShieldCheck size={24} /></div>
              <h4>Rigor Técnico & Normativo</h4>
              <p>No improvisamos. Cada proceso de recarga, desarme y prueba hidrostática se rige fielmente por las normas NFPA 10 y NTC 2885.</p>
            </div>

            <div className="valueBox">
              <div className="valueBoxIcon"><HeartHandshake size={24} /></div>
              <h4>Transparencia y Trazabilidad</h4>
              <p>Sellos de seguridad originales con fecha grabada, anillo de verificación del año en curso y collarín inviolable en cada cilindro entregado.</p>
            </div>

            <div className="valueBox">
              <div className="valueBoxIcon"><Zap size={24} /></div>
              <h4>Agilidad y Compromiso</h4>
              <p>Sabemos que un extintor vencido representa riesgos y posibles sanciones. Atendemos con velocidad récord y extintores de préstamo.</p>
            </div>

            <div className="valueBox">
              <div className="valueBoxIcon"><Users size={24} /></div>
              <h4>Vocación de Servicio</h4>
              <p>Te acompañamos paso a paso para que entiendas la normativa de tu sector y tomes las mejores decisiones de seguridad costo-beneficio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SECTORES QUE PROTEGEMOS (FONDO GRIS CLARO)
         ========================================================================= */}
      <section className="sectorsSection">
        <div className="container">
          <div className="sectionHeaderFlex">
            <div>
              <span className="sectionPreTitle">— COBERTURA SECTORIAL</span>
              <h2>Soluciones a Medida para <span className="textRed">Cada Sector</span></h2>
            </div>
            <Link to="/productos" className="sectionLinkAction">
              Ver equipos por sector <ArrowRight size={16} />
            </Link>
          </div>

          <div className="sectorsGrid">
            <div className="sectorCard">
              <div className="sectorIconBox"><Factory size={26} /></div>
              <h4>Industria & Manufactura</h4>
              <p>Extintores rodantes de 150 lbs, sistemas CO₂ para maquinaria eléctrica, gabinetes contra incendio y señalización fotoluminiscente de alta resistencia.</p>
            </div>

            <div className="sectorCard">
              <div className="sectorIconBox"><Building2 size={26} /></div>
              <h4>Comercio & Edificios</h4>
              <p>Solkaflam agente limpio para salas de cómputo y servidores, extintores ABC de 10 y 20 lbs, detectores de humo y gabinetes para propiedad horizontal.</p>
            </div>

            <div className="sectorCard">
              <div className="sectorIconBox"><HardHat size={26} /></div>
              <h4>Obras Civiles & Construcción</h4>
              <p>Dotaciones completas de EPP, camillas rígidas para emergencias en obra, botiquines trauma tipo A/B y conos reflectivos viales.</p>
            </div>

            <div className="sectorCard">
              <div className="sectorIconBox"><Truck size={26} /></div>
              <h4>Transporte & Flotas</h4>
              <p>Extintores vehiculares de 5 y 10 lbs reglamentarios, kits de carretera completos exigidos por el Código Nacional de Tránsito y tacos bloqueadores.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. MARCO NORMATIVO Y CERTIFICACIONES (TARJETA BLANCA CON BORDE GRIS)
         ========================================================================= */}
      <section className="normativeFrameworkSection">
        <div className="container">
          <div className="normativeCardWhite">
            <div className="normativeLeft">
              <div className="normativeIconBadge">
                <Shield size={28} className="textRed" />
              </div>
              <span className="sectionPreTitle">— RESPALDO TÉCNICO</span>
              <h2>Certificación y Cumplimiento de <span className="textRed">Normas Oficiales</span></h2>
              <p>
                Nuestros procesos técnicos y productos están alineados con las regulaciones de los organismos más exigentes del sector de seguridad en Colombia y el mundo:
              </p>
            </div>

            <div className="normativeBadgesList">
              <div className="nBadgeItem">
                <FileCheck2 size={20} className="textRed" />
                <div>
                  <strong>NTC 2885 (Colombia)</strong>
                  <span>Norma técnica obligatoria para selección, mantenimiento y recarga de extintores.</span>
                </div>
              </div>

              <div className="nBadgeItem">
                <FileCheck2 size={20} className="textRed" />
                <div>
                  <strong>NFPA 10 (USA / Global)</strong>
                  <span>Estándar de la National Fire Protection Association para extintores portátiles.</span>
                </div>
              </div>

              <div className="nBadgeItem">
                <FileCheck2 size={20} className="textRed" />
                <div>
                  <strong>Resolución 0312 de 2019</strong>
                  <span>Estándares mínimos del Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST).</span>
                </div>
              </div>

              <div className="nBadgeItem">
                <FileCheck2 size={20} className="textRed" />
                <div>
                  <strong>Cuerpo de Bomberos Cali</strong>
                  <span>Cumplimiento pleno de los lineamientos de prevención para concepto favorable de inspección.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. PREGUNTAS FRECUENTES (FAQ ACORDEÓN EN FONDO GRIS CLARO)
         ========================================================================= */}
      <section className="aboutFaqSection">
        <div className="container">
          <div className="sectionHeaderCenter">
            <span className="sectionPreTitle">— RESOLVEMOS TUS DUDAS</span>
            <h2>Preguntas Frecuentes <span className="textRed">sobre Preveseg</span></h2>
            <div className="redDivider"></div>
          </div>

          <div className="faqListWrapper">
            {faqs.map((item, idx) => (
              <div 
                key={idx} 
                className={`faqItemCardWhite ${openFaq === idx ? 'open' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faqQuestionRow">
                  <div className="faqQTitle">
                    <HelpCircle size={18} className="textRed" />
                    <h4>{item.q}</h4>
                  </div>
                  <ChevronDown size={18} className="faqChevron" />
                </div>
                {openFaq === idx && (
                  <div className="faqAnswerContent">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. CTA FINAL (BLOQUE ELEGANTE EN FONDO OSCURO INDUSTRIAL)
         ========================================================================= */}
      <section className="aboutFinalCtaSection">
        <div className="container">
          <div className="aboutFinalCtaCard">
            <div className="ctaLeftContent">
              <span className="sectionPreTitle">— PREVESEG CALI</span>
              <h2>¿Listo para blindar la seguridad de tus instalaciones?</h2>
              <p>Agenda una inspección técnica o solicita la cotización inmediata de tus recargas y dotaciones con nuestros asesores.</p>
              
              <div className="ctaDetails">
                <div className="ctaDetail"><MapPin size={16} className="textRed" /> Sede: Cra 28D 72f-79, Cali</div>
                <div className="ctaDetail"><Clock size={16} className="textRed" /> Lun a Vie 8am - 6pm | Sáb 8am - 4pm</div>
              </div>
            </div>

            <div className="ctaRightActions">
              <a 
                href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20quisiera%20solicitar%20una%20cotizaci%C3%B3n%20formal%20para%20mi%20empresa." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btnRedPillSolid"
              >
                <Phone size={18} /> Chatear al 304 629 6285
              </a>
              <Link to="/contacto" className="btnDarkOutline">
                Ver Mapa y Formulario
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
