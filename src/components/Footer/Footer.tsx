import { Phone, Mail, MapPin, ShieldCheck, ArrowUpRight, MessageCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logoImgFile from '../../assets/logo.png';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footerContent">
        {/* BRAND INFO */}
        <div className="footerSection brandSection">
          <div className="footerLogo" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
            <div className="footerLogoIcon">
              <img 
                src={logoImgFile} 
                alt="Preveseg Logo" 
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <div>
              <h3>PREVESEG</h3>
              <p className="brandTagline"><ShieldCheck size={12} className="inline-icon" /> SEGURIDAD INDUSTRIAL CALI</p>
            </div>
          </div>

          <p className="footerDescription">
            Somos una empresa dedicada a la venta y mantenimiento de equipos contra incendio y seguridad industrial. Suministramos extintores, camillas, botiquines, señalización, conos viales y EPP con certificación de calidad.
          </p>

          <a 
            href="https://wa.me/573046296285?text=Hola%20Preveseg%20Cali%2C%20quisiera%20recibir%20asesor%C3%ADa%20t%C3%A9cnica%20y%20cotizaci%C3%B3n." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footerWhatsAppBtn"
          >
            <MessageCircle size={18} /> Chatear por WhatsApp (304 629 6285)
          </a>
        </div>
        
        {/* PRODUCT LINES */}
        <div className="footerSection">
          <h3>Líneas de Productos</h3>
          <ul className="footerLinks">
            <li>
              <Link to="/productos?categoria=Extintores y Equipos Contra Incendio">
                Extintores & Recargas <ArrowUpRight size={14} />
              </Link>
            </li>
            <li>
              <Link to="/productos?categoria=Camillas y Botiquines">
                Camillas & Botiquines <ArrowUpRight size={14} />
              </Link>
            </li>
            <li>
              <Link to="/productos?categoria=Kits de Carretera y Vehiculares">
                Kits de Carretera <ArrowUpRight size={14} />
              </Link>
            </li>
            <li>
              <Link to="/productos?categoria=Conos y Seguridad Vial">
                Conos & Seguridad Vial <ArrowUpRight size={14} />
              </Link>
            </li>
            <li>
              <Link to="/productos?categoria=Señalización Industrial">
                Señalización Industrial <ArrowUpRight size={14} />
              </Link>
            </li>
            <li>
              <Link to="/productos?categoria=EPP (Protección Personal)">
                EPP & Dotaciones <ArrowUpRight size={14} />
              </Link>
            </li>
            <li>
              <Link to="/productos">
                Ver Catálogo Completo <ArrowUpRight size={14} />
              </Link>
            </li>
          </ul>
        </div>

        {/* SERVICES */}
        <div className="footerSection">
          <h3>Nuestros Servicios</h3>
          <ul className="footerLinks">
            <li>
              <a href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20requiero%20mantenimiento%20de%20extintores." target="_blank" rel="noopener noreferrer">
                Mantenimiento de Extintores <ArrowUpRight size={14} />
              </a>
            </li>
            <li>
              <a href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20requiero%20inspeccion%20y%20codificacion." target="_blank" rel="noopener noreferrer">
                Inspección & Codificación <ArrowUpRight size={14} />
              </a>
            </li>
            <li>
              <a href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20requiero%20instalacion%20y%20reubicacion." target="_blank" rel="noopener noreferrer">
                Instalación & Reubicación <ArrowUpRight size={14} />
              </a>
            </li>
            <li>
              <a href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20requiero%20capacitacion%20para%20mi%20empresa." target="_blank" rel="noopener noreferrer">
                Capacitación y Manejo <ArrowUpRight size={14} />
              </a>
            </li>
          </ul>
        </div>
        
        {/* CONTACT INFO */}
        <div className="footerSection">
          <h3>Contacto & Ubicación</h3>
          <div className="contactInfo">
            <div className="contactItem">
              <MapPin size={16} className="contactIcon red" />
              <span><strong>Cra 28D 72f-79</strong>, Cali, Colombia</span>
            </div>

            <a 
              href="https://wa.me/573046296285" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contactLink"
            >
              <Phone size={16} className="contactIcon green" />
              <span>Teléfono / WhatsApp: <strong>+57 304 629 6285</strong></span>
            </a>
            
            <a href="mailto:prevesegcali@gmail.com" className="contactLink">
              <Mail size={16} className="contactIcon blue" />
              <span>prevesegcali@gmail.com</span>
            </a>

            <div className="contactItem">
              <Clock size={16} className="contactIcon blue" />
              <span>Lun a Vie 8am - 6pm | Sáb 8am - 4pm</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="copyright">
        <p>© {new Date().getFullYear()} PREVESEG - Venta y Mantenimiento de Equipos Contra Incendio y Seguridad Industrial. Cali, Colombia.</p>
      </div>
    </footer>
  );
};

export default Footer;
