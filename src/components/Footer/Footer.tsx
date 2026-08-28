import { Phone, Mail, MapPin, ShieldCheck, ArrowUpRight, MessageCircle } from 'lucide-react';
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
              <p className="brandTagline"><ShieldCheck size={12} className="inline-icon" /> SEGURIDAD INDUSTRIAL</p>
            </div>
          </div>

          <p className="footerDescription">
            Líderes en suministro de Equipos de Protección Personal (EPP), sistemas contra incendios y señalización industrial con certificación de calidad.
          </p>

          <a 
            href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20quisiera%20recibir%20asesor%C3%ADa%20t%C3%A9cnica." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footerWhatsAppBtn"
          >
            <MessageCircle size={18} /> Chatear con un Asesor EPP
          </a>
        </div>
        
        <div className="footerSection">
          <h3>Líneas de Protección</h3>
          <ul className="footerLinks">
            <li>
              <Link to="/productos?categoria=Protección Craneal y Facial">
                Protección Craneal y Facial <ArrowUpRight size={14} />
              </Link>
            </li>
            <li>
              <Link to="/productos?categoria=Protección Respiratoria">
                Protección Respiratoria <ArrowUpRight size={14} />
              </Link>
            </li>
            <li>
              <Link to="/productos?categoria=Calzado Industrial">
                Calzado Dieléctrico & Botas <ArrowUpRight size={14} />
              </Link>
            </li>
            <li>
              <Link to="/productos?categoria=Extintores">
                Extintores y Control de Fuego <ArrowUpRight size={14} />
              </Link>
            </li>
            <li>
              <Link to="/productos">
                Ver Catálogo Completo <ArrowUpRight size={14} />
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="footerSection">
          <h3>Contacto & Asesoría</h3>
          <div className="contactInfo">
            <a 
              href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20requiero%20informaci%C3%B3n." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contactLink"
            >
              <Phone size={16} className="contactIcon" />
              <span>WhatsApp: <strong>+57 304 629 6285</strong></span>
            </a>
            
            <a href="mailto:ventas@preveseg.com" className="contactLink">
              <Mail size={16} className="contactIcon" />
              <span>ventas@preveseg.com</span>
            </a>

            <div className="contactItem">
              <MapPin size={16} className="contactIcon" />
              <span>Envíos y Despachos a Nivel Nacional</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="copyright">
        <p>© {new Date().getFullYear()} PREVESEG - Prevención y Seguridad Industrial. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
