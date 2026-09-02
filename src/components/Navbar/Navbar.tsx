import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, MessageCircle, MapPin, X, Clock, Phone, Mail, Navigation, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Cart from '../Cart/Cart';
import PrevesegLogo from './PrevesegLogo';
import './Navbar.css';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

  const handleNavScroll = (elementId: string) => {
    if (location.pathname !== '/') {
      window.location.href = '/#' + elementId;
      return;
    }
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbarContainer">
          {/* LOGO */}
          <Link to="/" className="logoLink" aria-label="Preveseg Inicio">
            <PrevesegLogo showTagline={true} tagline="SOLUCIONES QUE PROTEGEN" size="md" />
          </Link>

          {/* MAIN NAV LINKS */}
          <div className="navLinks">
            <Link to="/" className={`navLink ${location.pathname === '/' ? 'active' : ''}`}>
              INICIO
              {location.pathname === '/' && <span className="activeIndicator"></span>}
            </Link>

            <button onClick={() => handleNavScroll('nosotros')} className="navLink navBtnLink">
              NOSOTROS
            </button>

            <div 
              className="navDropdownContainer"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <Link to="/productos" className={`navLink ${location.pathname.startsWith('/producto') ? 'active' : ''}`}>
                <span>PRODUCTOS</span>
                <ChevronDown size={14} className="dropdownChevron" />
                {location.pathname.startsWith('/producto') && <span className="activeIndicator"></span>}
              </Link>

              {isProductsDropdownOpen && (
                <div className="navDropdownMenu">
                  <Link to="/productos?categoria=Extintores y Equipos Contra Incendio" className="dropdownItem">
                    Extintores y Equipos Contra Incendio
                  </Link>
                  <Link to="/productos?categoria=Camillas y Botiquines" className="dropdownItem">
                    Camillas y Botiquines
                  </Link>
                  <Link to="/productos?categoria=Kits de Carretera y Vehiculares" className="dropdownItem">
                    Kits de Carretera y Vehiculares
                  </Link>
                  <Link to="/productos?categoria=Conos y Seguridad Vial" className="dropdownItem">
                    Conos y Seguridad Vial
                  </Link>
                  <Link to="/productos?categoria=Señalización Industrial" className="dropdownItem">
                    Señalización Industrial
                  </Link>
                  <Link to="/productos?categoria=EPP (Protección Personal)" className="dropdownItem">
                    EPP (Protección Personal)
                  </Link>
                  <Link to="/productos?categoria=Kits %26 Combos de Seguridad" className="dropdownItem">
                    Kits & Combos de Seguridad
                  </Link>
                  <div className="dropdownDivider"></div>
                  <Link to="/productos" className="dropdownItem highlight">
                    Ver Catálogo Completo →
                  </Link>
                </div>
              )}
            </div>

            <button onClick={() => handleNavScroll('servicios')} className="navLink navBtnLink">
              SERVICIOS
            </button>

            <button onClick={() => setIsLocationModalOpen(true)} className="navLink navBtnLink">
              CONTACTO
            </button>
          </div>

          {/* ACTIONS */}
          <div className="navActions">
            {/* WHATSAPP PILL BUTTON (LIKE IN MOCKUP) */}
            <a 
              href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20quisiera%20solicitar%20asesor%C3%ADa%20o%20cotizaci%C3%B3n." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="navPhonePill"
              title="Contactar por WhatsApp"
            >
              <span className="phonePillDot"></span>
              <MessageCircle size={16} className="phonePillIcon" />
              <span className="phonePillText">304 629 6285</span>
            </a>

            {/* LOCATION BUTTON */}
            <button 
              className="locationNavBtn"
              onClick={() => setIsLocationModalOpen(true)}
              title="Ubicación y Horarios en Cali"
              aria-label="Ver Ubicación en Cali"
            >
              <MapPin size={18} className="locBtnIcon" />
              <span className="locBtnLabel">Cali</span>
            </button>

            {/* MOBILE CATALOG BUTTON */}
            <Link 
              to="/productos" 
              className={`mobileCatalogBtn ${location.pathname === '/productos' ? 'active' : ''}`} 
              aria-label="Ver Catálogo"
            >
              <span>Catálogo</span>
            </Link>
            
            {/* QUOTATION LIST CART BUTTON */}
            <button 
              className="cartBtn" 
              onClick={() => setIsCartOpen(true)} 
              aria-label="Abrir lista de cotización"
              title="Mi Lista de Cotización"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && <span className="cartBadge">{itemCount}</span>}
            </button>
          </div>
        </div>
      </nav>
      
      {/* MODAL DE UBICACIÓN & HORARIOS */}
      {isLocationModalOpen && (
        <div className="locationModalOverlay" onClick={() => setIsLocationModalOpen(false)}>
          <div className="locationModalCard" onClick={(e) => e.stopPropagation()}>
            <div className="locationModalHeader">
              <div className="locHeaderTitle">
                <div className="locIconBadge">
                  <MapPin size={22} className="locPinIcon" />
                </div>
                <div>
                  <h3>PREVESEG CALI</h3>
                  <span className="locCityTag">Sede Principal & Despachos</span>
                </div>
              </div>
              <button 
                className="locCloseBtn" 
                onClick={() => setIsLocationModalOpen(false)} 
                aria-label="Cerrar ventana de ubicación"
              >
                <X size={20} />
              </button>
            </div>

            <div className="locationModalBody">
              <div className="locInfoRow">
                <div className="locRowIcon red"><MapPin size={18} /></div>
                <div className="locRowContent">
                  <strong>Dirección en Cali</strong>
                  <p>Cra 28D 72f-79, Cali, Valle del Cauca</p>
                </div>
              </div>

              <div className="locInfoRow">
                <div className="locRowIcon blue"><Clock size={18} /></div>
                <div className="locRowContent">
                  <strong>Horarios de Atención</strong>
                  <p>Lunes a Viernes: 8:00 am – 6:00 pm</p>
                  <p>Sábados: 8:00 am – 4:00 pm</p>
                </div>
              </div>

              <div className="locInfoRow">
                <div className="locRowIcon green"><Phone size={18} /></div>
                <div className="locRowContent">
                  <strong>Teléfono & WhatsApp</strong>
                  <a href="https://wa.me/573046296285" target="_blank" rel="noopener noreferrer">
                    +57 304 629 6285
                  </a>
                </div>
              </div>

              <div className="locInfoRow">
                <div className="locRowIcon navy"><Mail size={18} /></div>
                <div className="locRowContent">
                  <strong>Correo Electrónico</strong>
                  <a href="mailto:prevesegcali@gmail.com">prevesegcali@gmail.com</a>
                </div>
              </div>

              <div className="locActionButtons">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Cra+28D+72f-79+Cali" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="locMapBtn"
                >
                  <Navigation size={17} /> Cómo Llegar en Google Maps
                </a>
                <a 
                  href="https://wa.me/573046296285?text=Hola%20Preveseg%20Cali%2C%20quisiera%20consultar%20sobre%20la%20atenci%C3%B3n%20en%20sede%20Cra%2028D%2072f-79." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="locWhatsAppBtn"
                >
                  <MessageCircle size={17} /> Contactar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
