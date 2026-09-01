import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, MessageCircle, MapPin, X, Clock, Phone, Mail, Navigation } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Cart from '../Cart/Cart';
import './Navbar.css';

import logoImgFile from '../../assets/logo.png';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

  return (
    <>
      <nav className="navbar">
        <div className="navbarContainer">
          <Link to="/" className="logo" aria-label="Preveseg Inicio">
            <div className="logoIconWrapper">
              <img 
                src={logoImgFile} 
                alt="Preveseg Logo" 
                className="logoImg" 
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <div className="logoText">
              <span className="logoMain">PREVESEG</span>
              <span className="logoSubtitle"><ShieldCheck size={11} className="inline-icon" /> SEGURIDAD INDUSTRIAL • CALI</span>
            </div>
          </Link>

          <div className="navLinks">
            <Link to="/" className={`navLink ${location.pathname === '/' ? 'active' : ''}`}>
              Inicio
            </Link>
            <Link to="/productos" className={`navLink ${location.pathname === '/productos' ? 'active' : ''}`}>
              Catálogo de Equipos
            </Link>
            <a 
              href="https://wa.me/573046296285?text=Hola%20Preveseg%20Cali%2C%20solicito%20asesor%C3%ADa%20y%20cotizaci%C3%B3n." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="navSupportLink"
            >
              <MessageCircle size={15} /> Cotizar por WhatsApp
            </a>
          </div>

          <div className="navActions">
            {/* BOTÓN DE UBICACIÓN CALI */}
            <button 
              className="locationNavBtn"
              onClick={() => setIsLocationModalOpen(true)}
              title="Ubicación y Horarios en Cali"
              aria-label="Ver Ubicación en Cali"
            >
              <MapPin size={18} className="locBtnIcon" />
              <span className="locBtnLabel">Sede Cali</span>
            </button>

            <Link 
              to="/productos" 
              className={`mobileCatalogBtn ${location.pathname === '/productos' ? 'active' : ''}`} 
              aria-label="Ver Catálogo"
            >
              <span>Catálogo</span>
            </Link>
            
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
