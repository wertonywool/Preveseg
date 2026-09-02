import { useState } from 'react';
import { 
  Flame, 
  Wrench, 
  HardHat, 
  FileCheck2, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  Clock, 
  MapPin, 
  Award, 
  Check, 
  Shield, 
  HelpCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Services.css';

interface ServiceItem {
  id: string;
  category: 'extintores' | 'mantenimiento' | 'epp' | 'normas';
  icon: JSX.Element;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  tag: string;
}

const servicesData: ServiceItem[] = [
  {
    id: 'recarga',
    category: 'extintores',
    icon: <Flame size={28} />,
    title: 'Recarga Certificada de Extintores',
    subtitle: 'Polvo Químico Seco (PQS) ABC, CO₂, Agente Limpio Solkaflam y Agua Presurizada',
    description: 'Servicio certificado bajo los rigurosos lineamientos de las normas NTC 2885 y NFPA 10. Empleamos agente químico puro certificado, cambio de empaques o-ring, pasadores originales y anillo de verificación del año en curso.',
    benefits: [
      'Presurización con nitrógeno seco al 99.9%',
      'Sello de seguridad inviolable fechado',
      'Collarín de verificación reglamentario',
      'Etiqueta reglamentaria con instrucciones de uso y fecha de vencimiento',
      'Certificado oficial de recarga para Bomberos y SG-SST'
    ],
    tag: 'Servicio Más Solicitado'
  },
  {
    id: 'mantenimiento',
    category: 'mantenimiento',
    icon: <Wrench size={28} />,
    title: 'Mantenimiento Técnico & Pruebas Hidrostáticas',
    subtitle: 'Inspección interna integral y ensayo de presión para máxima seguridad',
    description: 'Evaluamos la resistencia estructural del cilindro mediante banco de pruebas hidrostáticas de alta y baja presión para prevenir roturas por fatiga del metal. Restauramos válvulas, mangueras, toberas y manómetros.',
    benefits: [
      'Desarme completo, limpieza interna y eliminación de humedad',
      'Prueba hidrostática certificada según tipo de cilindro',
      'Sustitución de componentes mecánicos desgastados',
      'Pintura electrostática al horno de alta durabilidad',
      'Hoja de vida técnica del cilindro'
    ],
    tag: 'Seguridad Preventiva'
  },
  {
    id: 'capacitacion',
    category: 'normas',
    icon: <Award size={28} />,
    title: 'Capacitación en Manejo de Extintores & Brigadas',
    subtitle: 'Entrenamiento teórico-práctico para personal empresarial y brigadistas',
    description: 'Talleres diseñados para entrenar a tus colaboradores en la identificación de clases de fuego (A, B, C, D, K), técnica correcta de extinción (PASS/TAPE) y protocolos de evacuación segura ante conatos de incendio.',
    benefits: [
      'Práctica real con fuego controlado y extintores de entrenamiento',
      'Certificado de asistencia para el Sistema de Gestión (SG-SST)',
      'Identificación de riesgos y uso de botiquines y camillas',
      'Horarios flexibles adaptados a la jornada de tu empresa'
    ],
    tag: 'Normativa SG-SST'
  },
  {
    id: 'instalacion',
    category: 'mantenimiento',
    icon: <ShieldCheck size={28} />,
    title: 'Instalación, Codificación & Reubicación Técnica',
    subtitle: 'Montaje reglamentario y señalización fotoluminiscente en sede',
    description: 'Instalamos soportes de pared, pedestales metálicos y gabinetes contra incendio a las alturas normativas. Codificamos cada extintor con número de inventario y demarcamos zonas de piso según los estándares de Bomberos.',
    benefits: [
      'Fijación a la altura reglamentaria (1.50 m a la manija)',
      'Señalización fotoluminiscente de alta visibilidad',
      'Codificación numérica para control de inventario y auditorías',
      'Demarcación de suelo con pintura epóxica de tráfico pesado'
    ],
    tag: 'Cumplimiento en Sitio'
  },
  {
    id: 'epp',
    category: 'epp',
    icon: <HardHat size={28} />,
    title: 'Suministro y Asesoría en Dotaciones & EPP',
    subtitle: 'Protección integral certificada para trabajadores y brigadistas',
    description: 'Dotamos a tu personal con elementos de protección personal certificados bajo normas ANSI y OSHA: cascos dieléctricos, gafas de seguridad, guantes de vaqueta y nitrilo, botas con puntera de seguridad y camillas espinales.',
    benefits: [
      'Fichas técnicas y certificados de calidad de cada elemento',
      'Tallas completas y asesoría según la matriz de riesgos',
      'Kits de trauma para brigadas de emergencia',
      'Tarifas especiales por volumen para empresas'
    ],
    tag: 'Dotaciones Certificadas'
  },
  {
    id: 'normatividad',
    category: 'normas',
    icon: <FileCheck2 size={28} />,
    title: 'Auditoría & Asesoría en Normatividad Bomberil',
    subtitle: 'Preparación para visitas de inspección técnica de Bomberos Cali',
    description: 'Auditamos tus instalaciones para calcular la carga de fuego y verificar si cuentas con la cantidad, capacidad y tipo de extintores exigidos por ley. Te entregamos un informe técnico previo a la visita oficial.',
    benefits: [
      'Cálculo de potencial de extinción por metro cuadrado',
      'Revisión de rutas de evacuación, botiquines y camillas',
      'Acompañamiento en el cumplimiento del concepto técnico',
      'Evita multas y suspensiones de actividad comercial'
    ],
    tag: 'Asesoría Jurídico-Técnica'
  }
];

const Services = () => {
  const [activeTab, setActiveTab] = useState<'todos' | 'extintores' | 'mantenimiento' | 'epp' | 'normas'>('todos');

  const filteredServices = activeTab === 'todos' 
    ? servicesData 
    : servicesData.filter(s => s.category === activeTab);

  const getWhatsAppUrl = (serviceName: string) => {
    const text = `Hola Preveseg Cali, solicito cotización formal para el servicio de: *${serviceName}*.`;
    return `https://wa.me/573046296285?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="servicesPageBalanced page-transition">
      {/* =========================================================================
          1. HERO CORPORATIVO LUMINOSO (GRIS, BLANCO Y ROJO)
         ========================================================================= */}
      <section className="servicesHeroLight">
        <div className="container">
          <div className="servicesHeroGrid">
            <div className="servicesHeroText">
              <div className="heroTagBadge">
                <span className="badgeDotRed"></span>
                <span>TALLER TÉCNICO AUTORIZADO EN CALI</span>
              </div>

              <h1>
                Servicios Técnicos de <span className="textRed">Protección Contra Incendios</span>
              </h1>

              <p className="servicesLead">
                En <strong>PREVESEG</strong> garantizamos el funcionamiento óptimo y la certificación oficial de tus extintores y sistemas de seguridad. Cumplimiento estricto de las normas <strong>NTC 2885</strong> y <strong>NFPA 10</strong> con atención en Cali y el Valle del Cauca.
              </p>

              <div className="heroPillBadges">
                <div className="pillBadge"><CheckCircle2 size={16} className="textRed" /> Recargas en 24 Horas</div>
                <div className="pillBadge"><CheckCircle2 size={16} className="textRed" /> Extintores de Préstamo</div>
                <div className="pillBadge"><CheckCircle2 size={16} className="textRed" /> Certificado para Bomberos</div>
              </div>

              <div className="servicesHeroActions">
                <a 
                  href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20solicito%20cotizaci%C3%B3n%20para%20servicio%20t%C3%A9cnico%20de%20extintores." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btnRedPillSolid"
                >
                  <Phone size={17} /> Cotizar Servicio por WhatsApp (304 629 6285)
                </a>
                <Link to="/contacto" className="btnGrayOutline">
                  <MapPin size={16} /> Ubicación Sede Cali
                </Link>
              </div>
            </div>

            <div className="servicesHeroCardBox">
              <div className="guaranteeBannerCard">
                <div className="guaranteeIconHeader">
                  <Shield size={32} className="textRed" />
                  <div>
                    <h3>Garantía de Servicio Técnico</h3>
                    <span>100% Válido ante el SG-SST y Bomberos</span>
                  </div>
                </div>

                <div className="guaranteePointsList">
                  <div className="gPoint">
                    <Check size={16} className="textRed" />
                    <span>Agente químico certificado con análisis de pureza.</span>
                  </div>
                  <div className="gPoint">
                    <Check size={16} className="textRed" />
                    <span>Collarín fechado del año en curso con anillo de seguridad.</span>
                  </div>
                  <div className="gPoint">
                    <Check size={16} className="textRed" />
                    <span>Pruebas hidrostáticas computarizadas para cilindros.</span>
                  </div>
                  <div className="gPoint">
                    <Check size={16} className="textRed" />
                    <span>Recolección y entrega a domicilio para empresas de Cali.</span>
                  </div>
                </div>

                <div className="guaranteeFooterBadge">
                  <Clock size={16} />
                  <span>Sede Cra 28D 72f-79, Cali • Lun a Vie 8am - 6pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. GUÍA RÁPIDA DE TIPOS DE EXTINTORES (BLANCO & GRIS CLARO)
         ========================================================================= */}
      <section className="extinguisherGuideSection">
        <div className="container">
          <div className="sectionHeaderCenter">
            <span className="sectionPreTitle">— GUÍA TÉCNICA RÁPIDA</span>
            <h2>¿Qué Tipo de Extintor <span className="textRed">Requiere tu Empresa?</span></h2>
            <p className="sectionSubLead">Te asesoramos para instalar el equipo exacto según la clase de fuego y el nivel de riesgo de tus instalaciones.</p>
            <div className="redDivider"></div>
          </div>

          <div className="guideCardsGrid">
            <div className="guideCard yellow">
              <div className="guideCardTop">
                <span className="agentColorDot yellow"></span>
                <span className="agentCode">PQS ABC</span>
              </div>
              <h4>Polvo Químico Seco</h4>
              <p>El extintor más versátil. Sofoca fuegos en maderas, papeles (A), líquidos inflamables y solventes (B), y equipos energizados (C).</p>
              <div className="guideUsage">
                <strong>Ideal para:</strong> Almacenes, oficinas generales, talleres, vehículos y comercio.
              </div>
            </div>

            <div className="guideCard red">
              <div className="guideCardTop">
                <span className="agentColorDot red"></span>
                <span className="agentCode">CO₂ DIÓXIDO</span>
              </div>
              <h4>Dióxido de Carbono</h4>
              <p>Gas limpio que no deja residuos ni daña circuitos. Enfría y desplaza el oxígeno en conatos de fuego eléctrico y líquidos combustibles.</p>
              <div className="guideUsage">
                <strong>Ideal para:</strong> Tableros eléctricos, centros de cómputo, maquinaria y laboratorios.
              </div>
            </div>

            <div className="guideCard white">
              <div className="guideCardTop">
                <span className="agentColorDot white"></span>
                <span className="agentCode">SOLKAFLAM</span>
              </div>
              <h4>Agente Limpio HCFC-123</h4>
              <p>Agente limpio inodoro que reemplaza al halón. Es dieléctrico, no corrosivo y evapora instantáneamente sin dejar polvo contaminante.</p>
              <div className="guideUsage">
                <strong>Ideal para:</strong> Salas de servidores, telecomunicaciones, clínicas y equipos médicos.
              </div>
            </div>

            <div className="guideCard green">
              <div className="guideCardTop">
                <span className="agentColorDot green"></span>
                <span className="agentCode">AGUA CLASE A</span>
              </div>
              <h4>Agua Presurizada</h4>
              <p>Enfría profundamente el material combustible ordinario impidiendo que vuelva a encenderse por calor latente.</p>
              <div className="guideUsage">
                <strong>Ideal para:</strong> Fábricas textiles, carpinterías, bodegas de cartón y archivos de papel.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CATÁLOGO DETALLADO DE SERVICIOS CON FILTROS (FONDO GRIS SUAVE)
         ========================================================================= */}
      <section className="servicesListSection">
        <div className="container">
          <div className="sectionHeaderFlex">
            <div>
              <span className="sectionPreTitle">— PORTAFOLIO COMPLETO</span>
              <h2>Nuestros Servicios <span className="textRed">Especializados</span></h2>
            </div>

            {/* FILTER BUTTONS */}
            <div className="filterTabsGroup">
              <button 
                className={`filterBtn ${activeTab === 'todos' ? 'active' : ''}`}
                onClick={() => setActiveTab('todos')}
              >
                Todos
              </button>
              <button 
                className={`filterBtn ${activeTab === 'extintores' ? 'active' : ''}`}
                onClick={() => setActiveTab('extintores')}
              >
                Extintores
              </button>
              <button 
                className={`filterBtn ${activeTab === 'mantenimiento' ? 'active' : ''}`}
                onClick={() => setActiveTab('mantenimiento')}
              >
                Mantenimiento
              </button>
              <button 
                className={`filterBtn ${activeTab === 'epp' ? 'active' : ''}`}
                onClick={() => setActiveTab('epp')}
              >
                EPP
              </button>
              <button 
                className={`filterBtn ${activeTab === 'normas' ? 'active' : ''}`}
                onClick={() => setActiveTab('normas')}
              >
                Normas & Brigadas
              </button>
            </div>
          </div>

          <div className="servicesCardsGrid">
            {filteredServices.map((service) => (
              <div key={service.id} className="serviceWhiteCard">
                <div className="serviceCardHeader">
                  <div className="serviceIconCircleRed">
                    {service.icon}
                  </div>
                  <span className="serviceTagPill">{service.tag}</span>
                </div>

                <h3>{service.title}</h3>
                <h4 className="serviceSubHeadline">{service.subtitle}</h4>
                <p className="serviceCardDescription">{service.description}</p>

                <div className="serviceBenefitsBox">
                  <strong>Especificaciones y Garantías:</strong>
                  <ul>
                    {service.benefits.map((b, bIdx) => (
                      <li key={bIdx}>
                        <CheckCircle2 size={16} className="textRed" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="serviceCardFooter">
                  <a 
                    href={getWhatsAppUrl(service.title)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btnServiceCotizar"
                  >
                    <Phone size={16} /> Cotizar este Servicio por WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. PROCESO DE ATENCIÓN TÉCNICA (4 PASOS EN BLANCO Y GRIS)
         ========================================================================= */}
      <section className="processSectionLight">
        <div className="container">
          <div className="sectionHeaderCenter">
            <span className="sectionPreTitle">— CÓMO OPERAMOS</span>
            <h2>Proceso Técnico de <span className="textRed">Inspección y Recarga</span></h2>
            <p className="sectionSubLead">Protocolo transparente paso a paso para garantizar que tus equipos funcionen con 100% de fiabilidad.</p>
            <div className="redDivider"></div>
          </div>

          <div className="stepsFourGrid">
            <div className="stepBox">
              <div className="stepHeader">
                <span className="stepNumber">01</span>
                <span className="stepTag">RECOLECCIÓN</span>
              </div>
              <h4>Solicitud o Visita en Sede</h4>
              <p>Nos contactas por WhatsApp indicando cantidades o agendamos la recolección directamente en tu empresa en Cali con entrega de extintores de préstamo temporal.</p>
            </div>

            <div className="stepBox">
              <div className="stepHeader">
                <span className="stepNumber">02</span>
                <span className="stepTag">DIAGNÓSTICO</span>
              </div>
              <h4>Desarme & Inspección</h4>
              <p>Desarmamos el cilindro para inspeccionar válvula, manómetro, vástago, tubo sifón y realizamos prueba hidrostática para certificar resistencia estructural.</p>
            </div>

            <div className="stepBox">
              <div className="stepHeader">
                <span className="stepNumber">03</span>
                <span className="stepTag">RECARGA</span>
              </div>
              <h4>Carga & Sellado de Seguridad</h4>
              <p>Cargamos con agente químico certificado a la presión estipulada con nitrógeno seco, instalando anillo de verificación del año en curso y sello inviolable.</p>
            </div>

            <div className="stepBox">
              <div className="stepHeader">
                <span className="stepNumber">04</span>
                <span className="stepTag">ENTREGA</span>
              </div>
              <h4>Certificado Oficial</h4>
              <p>Entregamos tus equipos listos para operar junto con el Certificado Oficial de Inspección y Recarga válido para auditorías del SG-SST y Bomberos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. PREGUNTAS FRECUENTES SOBRE SERVICIOS (ACORDEÓN)
         ========================================================================= */}
      <section className="servicesFaqSection">
        <div className="container">
          <div className="sectionHeaderCenter">
            <span className="sectionPreTitle">— DUDAS FRECUENTES</span>
            <h2>Preguntas Frecuentes sobre <span className="textRed">Nuestros Servicios</span></h2>
            <div className="redDivider"></div>
          </div>

          <div className="faqServicesList">
            <div className="faqServiceItem">
              <div className="faqQ">
                <HelpCircle size={18} className="textRed" />
                <h4>¿Qué diferencia hay entre recarga y prueba hidrostática?</h4>
              </div>
              <p>La recarga consiste en cambiar el agente químico y presurizar anualmente el cilindro. La prueba hidrostática es un ensayo de presión de agua que se realiza cada 5 años (o según indique la norma para extintores de alta presión) para verificar que el cilindro metálico no tenga microfisuras ni fatiga estructural.</p>
            </div>

            <div className="faqServiceItem">
              <div className="faqQ">
                <HelpCircle size={18} className="textRed" />
                <h4>¿Qué incluye el certificado de recarga que entrega Preveseg?</h4>
              </div>
              <p>El certificado incluye: número de serie y collarín de cada extintor, tipo de agente (PQS, CO₂, Solkaflam, Agua), fecha de realización del servicio, fecha de próximo vencimiento, nombre de la empresa cliente, dirección de la sede y firma del técnico responsable autorizado.</p>
            </div>

            <div className="faqServiceItem">
              <div className="faqQ">
                <HelpCircle size={18} className="textRed" />
                <h4>¿Cuál es el tiempo de entrega de las recargas en Cali?</h4>
              </div>
              <p>El tiempo habitual de recarga es de 24 a 48 horas hábiles. Para empresas con requerimientos urgentes, contamos con servicio prioritario en el mismo día y facilitamos extintores de respaldo para que nunca queden desprotegidos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CTA FINAL (BLOQUE ELEGANTE GRIS, BLANCO Y ROJO)
         ========================================================================= */}
      <section className="servicesFinalCta">
        <div className="container">
          <div className="finalCtaCard">
            <div className="finalCtaLeft">
              <span className="sectionPreTitle">— SOLICITA TU ASESORÍA HOY</span>
              <h2>¿Tus extintores están próximos a vencer o necesitas certificar tu empresa?</h2>
              <p>Evita sanciones legales y mantén protegidas tus instalaciones con el taller técnico de mayor confianza en Cali.</p>
              
              <div className="finalCtaContacts">
                <div className="cItem"><MapPin size={16} className="textRed" /> Cra 28D 72f-79, Cali, Colombia</div>
                <div className="cItem"><Clock size={16} className="textRed" /> Lun - Vie: 8am - 6pm | Sáb: 8am - 4pm</div>
              </div>
            </div>

            <div className="finalCtaRight">
              <a 
                href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20quisiera%20solicitar%20cotizaci%C3%B3n%20para%20los%20extintores%20de%20mi%20empresa." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btnRedPillSolid"
              >
                <Phone size={18} /> Cotizar Ahora por WhatsApp (304 629 6285)
              </a>
              <Link to="/contacto" className="btnDarkOutline">
                Ver Formulario y Mapa →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
