import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, MessageCircle, MapPin, X, Clock, Phone, Mail, Navigation, ChevronDown, Menu } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Cart from '../Cart/Cart';
import PrevesegLogo from './PrevesegLogo';
import './Navbar.css';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const { itemCount } = useCart();
  const location = useLocation();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbarContainer">
          {/* LOGO */}
          <Link to="/" className="logoLink" aria-label="Preveseg Inicio" onClick={closeMobileMenu}>
            <PrevesegLogo showTagline={true} tagline="SOLUCIONES QUE PROTEGEN" size="md" />
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="navLinks">
            <Link to="/" className={`navLink ${location.pathname === '/' ? 'active' : ''}`}>
              INICIO
              {location.pathname === '/' && <span className="activeIndicator"></span>}
            </Link>

            <Link to="/nosotros" className={`navLink ${location.pathname === '/nosotros' ? 'active' : ''}`}>
              NOSOTROS
              {location.pathname === '/nosotros' && <span className="activeIndicator"></span>}
            </Link>

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

            <Link to="/servicios" className={`navLink ${location.pathname === '/servicios' ? 'active' : ''}`}>
              SERVICIOS
              {location.pathname === '/servicios' && <span className="activeIndicator"></span>}
            </Link>

            <Link to="/contacto" className={`navLink ${location.pathname === '/contacto' ? 'active' : ''}`}>
              CONTACTO
              {location.pathname === '/contacto' && <span className="activeIndicator"></span>}
            </Link>
          </div>

          {/* ACTIONS */}
          <div className="navActions">
            {/* WHATSAPP PILL BUTTON */}
            <a 
              href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20quisiera%20solicitar%20asesor%C3%ADa%20o%20cotizaci%C3%B3n." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="navPhonePill desktopOnlyAction"
              title="Contactar por WhatsApp"
            >
              <MessageCircle size={16} className="phonePillIcon" />
              <span className="phonePillText">304 629 6285</span>
            </a>

            {/* LOCATION BUTTON (OPENS QUICK INFO MODAL) */}
            <button 
              className="locationNavBtn desktopOnlyAction"
              onClick={() => setIsLocationModalOpen(true)}
              title="Ubicación y Horarios en Cali"
              aria-label="Ver Ubicación en Cali"
            >
              <MapPin size={18} className="locBtnIcon" />
              <span className="locBtnLabel">Cali</span>
            </button>
            
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

            {/* MOBILE MENU TOGGLE */}
            <button 
              className="mobileMenuToggleBtn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {isMobileMenuOpen && (
          <div className="mobileNavDrawer animate-in">
            <div className="mobileNavLinks">
              <Link to="/" className={`mobileNavLink ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMobileMenu}>
                INICIO
              </Link>
              <Link to="/nosotros" className={`mobileNavLink ${location.pathname === '/nosotros' ? 'active' : ''}`} onClick={closeMobileMenu}>
                NOSOTROS
              </Link>
              <Link to="/productos" className={`mobileNavLink ${location.pathname.startsWith('/producto') ? 'active' : ''}`} onClick={closeMobileMenu}>
                PRODUCTOS & EQUIPOS
              </Link>
              <Link to="/servicios" className={`mobileNavLink ${location.pathname === '/servicios' ? 'active' : ''}`} onClick={closeMobileMenu}>
                SERVICIOS DE RECARGA
              </Link>
              <Link to="/contacto" className={`mobileNavLink ${location.pathname === '/contacto' ? 'active' : ''}`} onClick={closeMobileMenu}>
                CONTACTO & SEDE
              </Link>
            </div>

            <div className="mobileDrawerActions">
              <button 
                onClick={() => { setIsLocationModalOpen(true); closeMobileMenu(); }} 
                className="mobileLocBtn"
              >
                <MapPin size={16} /> Ver Sede Cali & Horarios (Cra 28D 72f-79)
              </button>
              
              <a 
                href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20quisiera%20solicitar%20asesor%C3%ADa%20o%20cotizaci%C3%B3n." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mobileWhatsAppBtn"
              >
                <MessageCircle size={17} /> Cotizar por WhatsApp (304 629 6285)
              </a>
            </div>
          </div>
        )}
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
                <Link 
                  to="/contacto" 
                  className="locWhatsAppBtn" 
                  onClick={() => setIsLocationModalOpen(false)}
                >
                  Ir a Página de Contacto →
                </Link>
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
