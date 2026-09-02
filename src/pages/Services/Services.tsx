import { Flame, Wrench, HardHat, FileCheck2, ShieldCheck, CheckCircle2, Phone, Clock, MapPin, Award } from 'lucide-react';
import './Services.css';

const Services = () => {
  const getWhatsAppUrl = (serviceName: string) => {
    const text = `Hola Preveseg Cali, solicito información y cotización formal para el servicio de: *${serviceName}*.`;
    return `https://wa.me/573046296285?text=${encodeURIComponent(text)}`;
  };

  const servicesList = [
    {
      id: 'recarga',
      icon: <Flame size={32} />,
      title: 'Recarga Certificada de Extintores',
      subtitle: 'Polvo Químico Seco (PQS) ABC, CO₂, Agente Limpio Solkaflam y Agua Presurizada',
      description: 'Realizamos el servicio de recarga bajo estrictos estándares de la norma NTC 2885 y NFPA 10. Empleamos agente extintor con certificación de pureza, cambio de sellos, pasador de seguridad y anillo de verificación de año vigente.',
      benefits: [
        'Prueba de manómetro y presión de trabajo',
        'Sello de seguridad y pasador original',
        'Collarín de verificación del año en curso',
        'Etiqueta reglamentaria con fecha de vencimiento e instrucciones'
      ]
    },
    {
      id: 'mantenimiento',
      icon: <Wrench size={32} />,
      title: 'Mantenimiento Preventivo, Correctivo & Pruebas Hidrostáticas',
      subtitle: 'Inspección técnica integral para garantizar operatividad al 100%',
      description: 'Inspeccionamos el estado interno y externo del cilindro, válvula, manguera, tobera y manómetro. Realizamos pruebas hidrostáticas de baja y alta presión para verificar la resistencia del cilindro y prevenir accidentes por fatiga del metal.',
      benefits: [
        'Desarme y limpieza técnica interna',
        'Reemplazo de empaques o ring y vástagos desgastados',
        'Pruebas hidrostáticas certificadas',
        'Pintura electrostática y restauración estética del cilindro'
      ]
    },
    {
      id: 'capacitacion',
      icon: <Award size={32} />,
      title: 'Capacitación en Manejo de Extintores & Brigadas',
      subtitle: 'Formación teórico-práctica para personal corporativo y brigadistas',
      description: 'Talleres diseñados para entrenar a los colaboradores de tu empresa en la identificación de clases de fuego (A, B, C, D, K), uso correcto del extintor (técnica PASS/TAPE) y protocolos de evacuación segura ante conatos de incendio.',
      benefits: [
        'Práctica real de extinción de fuego controlado',
        'Certificado de capacitación para el SG-SST',
        'Técnicas de prevención y detección temprana',
        'Horarios adaptados a la jornada de tu empresa'
      ]
    },
    {
      id: 'instalacion',
      icon: <ShieldCheck size={32} />,
      title: 'Instalación, Codificación & Reubicación Técnica',
      subtitle: 'Montaje normativo y trazabilidad total en instalaciones',
      description: 'Instalamos soportes de pared, pedestales y gabinetes contra incendio a la altura reglamentaria. Implementamos codificación por número y color para hojas de vida de extintores y realizamos reubicación estratégica según el análisis de carga de fuego.',
      benefits: [
        'Instalación a la altura reglamentaria (NTC 2885)',
        'Codificación técnica para inspecciones de bomberos',
        'Demarcación de piso y señal fotoluminiscente',
        'Hoja de vida digital de extintores'
      ]
    },
    {
      id: 'epp',
      icon: <HardHat size={32} />,
      title: 'Suministro y Asesoría en Dotaciones & EPP',
      subtitle: 'Protección integral para trabajadores e industrias',
      description: 'Asesoramos y suministramos elementos de protección personal certificados: cascos dieléctricos, gafas de seguridad, protección auditiva, guantes de vaqueta y nitrilo, botas de seguridad con puntera y chalecos reflectivos de alta visibilidad.',
      benefits: [
        'Cumplimiento con normas ANSI y OSHA',
        'Tallas completas y fichas técnicas disponibles',
        'Dotaciones completas para brigadas de emergencia',
        'Descuentos por volumen para empresas'
      ]
    },
    {
      id: 'normatividad',
      icon: <FileCheck2 size={32} />,
      title: 'Auditoría & Asesoría en Normatividad Bomberil',
      subtitle: 'Preparación para visitas de inspección técnica y SG-SST',
      description: 'Auditamos tus instalaciones para verificar si cuentas con la cantidad, capacidad y tipo de extintores requeridos por la ley colombiana. Te entregamos un informe técnico detallado para que obtengas el visto bueno de Bomberos Cali sin contratiempos.',
      benefits: [
        'Cálculo de carga de fuego por metro cuadrado',
        'Revisión de rutas de evacuación y señalización',
        'Concepto técnico previo a inspección oficial',
        'Acompañamiento personalizado'
      ]
    }
  ];

  return (
    <div className="servicesPage page-transition">
      {/* HERO HEADER */}
      <section className="servicesHero">
        <div className="container">
          <div className="servicesHeroContent">
            <span className="pageTagRed">— SERVICIOS TÉCNICOS OFICIALES</span>
            <h1>Mantenimiento y Recarga de <span className="textRed">Equipos Contra Incendio</span></h1>
            <p className="heroLead">
              Atención directa en Cali y el Valle del Cauca. Certificamos tus equipos con tecnología de punta, repuestos originales y cumplimiento estricto de las normas NTC 2885 y NFPA 10.
            </p>
            <div className="servicesHeroActions">
              <a 
                href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20solicito%20cotizaci%C3%B3n%20para%20servicio%20t%C3%A9cnico%20de%20extintores." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btnRedPill"
              >
                <Phone size={18} /> Solicitar Cotización de Servicio (304 629 6285)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK TRUST BAR */}
      <section className="servicesTrustBar">
        <div className="container">
          <div className="trustBarGrid">
            <div className="trustItem">
              <Clock size={20} className="textRed" />
              <div>
                <strong>Entrega Rápida</strong>
                <span>Recargas en tiempo récord con extintores de préstamo</span>
              </div>
            </div>
            <div className="trustItem">
              <MapPin size={20} className="textRed" />
              <div>
                <strong>Sede en Cali</strong>
                <span>Cra 28D 72f-79, con recolección a empresas</span>
              </div>
            </div>
            <div className="trustItem">
              <Award size={20} className="textRed" />
              <div>
                <strong>Garantía Escrita</strong>
                <span>Certificado de prueba y póliza de cumplimiento</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="servicesListSection">
        <div className="container">
          <div className="servicesGrid">
            {servicesList.map((srv, idx) => (
              <div key={srv.id} className="serviceDetailCard">
                <div className="serviceCardTop">
                  <div className="serviceIconWrapper">{srv.icon}</div>
                  <span className="serviceNumber">0{idx + 1}</span>
                </div>
                <h3>{srv.title}</h3>
                <h4 className="serviceSubtitle">{srv.subtitle}</h4>
                <p className="serviceDesc">{srv.description}</p>
                
                <div className="serviceBenefits">
                  <strong>Incluye y garantiza:</strong>
                  <ul>
                    {srv.benefits.map((b, bIdx) => (
                      <li key={bIdx}>
                        <CheckCircle2 size={16} className="textRed" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a 
                  href={getWhatsAppUrl(srv.title)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="serviceWhatsAppBtn"
                >
                  <Phone size={16} /> Cotizar este Servicio por WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO DE ATENCIÓN */}
      <section className="servicesProcessSection">
        <div className="container">
          <div className="sectionHeader center">
            <span className="pageTagRed">— CÓMO FUNCIONA NUESTRO SERVICIO</span>
            <h2>Proceso de Recarga y <span className="textRed">Mantenimiento</span></h2>
            <div className="headerDivider"></div>
          </div>

          <div className="processStepsGrid">
            <div className="stepCard">
              <span className="stepBadge">PASO 1</span>
              <h4>Solicitud o Recolección</h4>
              <p>Nos contactas por WhatsApp indicando la cantidad y tipo de extintores o agendamos la recolección en tu empresa.</p>
            </div>
            <div className="stepCard">
              <span className="stepBadge">PASO 2</span>
              <h4>Inspección Técnica</h4>
              <p>Verificamos cilindros, válvulas, empaques y pruebas hidrostáticas para asegurar total integridad física.</p>
            </div>
            <div className="stepCard">
              <span className="stepBadge">PASO 3</span>
              <h4>Recarga & Certificación</h4>
              <p>Cargamos con agente certificado a la presión reglamentaria, instalamos sellos de seguridad y anillo del año.</p>
            </div>
            <div className="stepCard">
              <span className="stepBadge">PASO 4</span>
              <h4>Entrega con Certificado</h4>
              <p>Entregamos los equipos listos para operar junto con el certificado oficial de recarga para tu SG-SST y Bomberos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="servicesCtaSection">
        <div className="container">
          <div className="servicesCtaCard">
            <h2>¿Tienes extintores vencidos o por inspeccionar?</h2>
            <p>Evita sanciones de Bomberos y protege a tu personal. Cotiza hoy mismo la recarga o mantenimiento en Cali.</p>
            <a 
              href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20tengo%20extintores%20pendientes%20por%20recargar%2C%20solicito%20cotizaci%C3%B3n." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btnRedPill"
            >
              <Phone size={18} /> Cotizar Ahora por WhatsApp (304 629 6285)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
