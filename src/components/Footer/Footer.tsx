import { Phone, Mail, MapPin, ShieldCheck, ArrowUpRight, MessageCircle, Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';
import logoImgFile from '../../assets/logo.png';

const Footer = () => {
  const location = useLocation();
  const isProductSection = location.pathname.toLowerCase().startsWith('/producto');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`footer ${isProductSection ? 'hideOnMobileProduct' : ''}`}>
      <div className="footerContainer">
        <div className="footerTopGrid">
          {/* COL 1: BRAND INFO */}
          <div className="footerCol footerBrandCol">
            <div className="footerBrandHeader" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
              <div className="footerLogoWrap">
                <img 
                  src={logoImgFile} 
                  alt="Preveseg Logo" 
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div className="footerBrandNames">
                <span className="footerBrandTitle">PREVE<span>SEG</span></span>
                <span className="footerBrandTagline"><ShieldCheck size={12} className="inlineTagIcon" /> SEGURIDAD INDUSTRIAL CALI</span>
              </div>
            </div>

            <p className="footerBrandDesc">
              Venta, recarga certificada y mantenimiento de extintores y equipos contra incendio. Suministro integral de señalización, botiquines, camillas y dotaciones EPP con cobertura en Cali y el Valle.
            </p>

            <a 
              href="https://wa.me/573046296285?text=Hola%20Preveseg%20Cali%2C%20quisiera%20recibir%20asesor%C3%ADa%20t%C3%A9cnica%20y%20cotizaci%C3%B3n." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footerWhatsAppBtn"
            >
              <MessageCircle size={18} />
              <span>Chatear por WhatsApp (304 629 6285)</span>
            </a>
          </div>

          {/* COL 2 & 3: LINKS GROUP (2 columns on tablet/mobile) */}
          <div className="footerLinksGroup">
            {/* PRODUCT LINES */}
            <div className="footerCol">
              <h4 className="footerColHeading">Líneas de Productos</h4>
              <ul className="footerLinkList">
                <li>
                  <Link to="/productos?categoria=Extintores y Equipos Contra Incendio">
                    Extintores & Recargas <ArrowUpRight size={13} />
                  </Link>
                </li>
                <li>
                  <Link to="/productos?categoria=Camillas y Botiquines">
                    Camillas & Botiquines <ArrowUpRight size={13} />
                  </Link>
                </li>
                <li>
                  <Link to="/productos?categoria=Kits de Carretera y Vehiculares">
                    Kits de Carretera <ArrowUpRight size={13} />
                  </Link>
                </li>
                <li>
                  <Link to="/productos?categoria=Conos y Seguridad Vial">
                    Conos & Viales <ArrowUpRight size={13} />
                  </Link>
                </li>
                <li>
                  <Link to="/productos?categoria=Señalización Industrial">
                    Señalización <ArrowUpRight size={13} />
                  </Link>
                </li>
                <li>
                  <Link to="/productos?categoria=EPP (Protección Personal)">
                    EPP & Dotaciones <ArrowUpRight size={13} />
                  </Link>
                </li>
                <li>
                  <Link to="/productos" className="highlightLink">
                    Ver Todo el Catálogo →
                  </Link>
                </li>
              </ul>
            </div>

            {/* SERVICES */}
            <div className="footerCol">
              <h4 className="footerColHeading">Nuestros Servicios</h4>
              <ul className="footerLinkList">
                <li>
                  <Link to="/servicios">
                    Mantenimiento de Extintores <ArrowUpRight size={13} />
                  </Link>
                </li>
                <li>
                  <Link to="/servicios">
                    Inspección & Codificación <ArrowUpRight size={13} />
                  </Link>
                </li>
                <li>
                  <Link to="/servicios">
                    Instalación & Reubicación <ArrowUpRight size={13} />
                  </Link>
                </li>
                <li>
                  <Link to="/servicios">
                    Capacitación y Manejo <ArrowUpRight size={13} />
                  </Link>
                </li>
                <li>
                  <Link to="/servicios" className="highlightLink">
                    Ver Todos los Servicios →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* COL 4: CONTACT & LOCATION */}
          <div className="footerCol footerContactCol">
            <h4 className="footerColHeading">Contacto & Ubicación</h4>
            <div className="footerContactList">
              <div className="footerContactItem">
                <MapPin size={18} className="contactIcon red" />
                <div className="contactDetails">
                  <span className="contactStrong">Cra 28D 72f-79</span>
                  <span className="contactSub">Cali, Colombia</span>
                </div>
              </div>

              <a 
                href="https://wa.me/573046296285" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footerContactItem linkItem"
              >
                <Phone size={18} className="contactIcon green" />
                <div className="contactDetails">
                  <span className="contactLabel">Teléfono / WhatsApp:</span>
                  <span className="contactStrong">+57 304 629 6285</span>
                </div>
              </a>

              <a href="mailto:prevesegcali@gmail.com" className="footerContactItem linkItem">
                <Mail size={18} className="contactIcon red" />
                <div className="contactDetails">
                  <span className="contactLabel">Correo Electrónico:</span>
                  <span className="contactStrong">prevesegcali@gmail.com</span>
                </div>
              </a>

              <div className="footerContactItem">
                <Clock size={18} className="contactIcon blue" />
                <div className="contactDetails">
                  <span className="contactLabel">Horario de Atención:</span>
                  <span className="contactSub">Lun a Vie 8am - 6pm | Sáb 8am - 4pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="footerBottomBar">
          <p className="copyrightText">
            © {new Date().getFullYear()} PREVESEG. Venta y Mantenimiento de Equipos Contra Incendio y Seguridad Industrial. Cali, Colombia.
          </p>
          <div className="footerBottomBadges">
            <span className="bottomBadge">Cra 28D 72f-79</span>
            <span className="bottomBadge">Taller Autorizado</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
