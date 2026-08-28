import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Cart from '../Cart/Cart';
import './Navbar.css';

import logoImgFile from '../../assets/logo.png';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
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
              <span className="logoSubtitle"><ShieldCheck size={11} className="inline-icon" /> SEGURIDAD INDUSTRIAL</span>
            </div>
          </Link>

          <div className="navLinks">
            <Link to="/" className={`navLink ${location.pathname === '/' ? 'active' : ''}`}>
              Inicio
            </Link>
            <Link to="/productos" className={`navLink ${location.pathname === '/productos' ? 'active' : ''}`}>
              Catálogo EPP
            </Link>
            <a 
              href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20quisiera%20asesor%C3%ADa%20para%20mi%20empresa." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="navSupportLink"
            >
              <MessageCircle size={15} /> Asesoría Rápida
            </a>
          </div>

          <div className="navActions">
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
              aria-label="Abrir carrito de compras"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && <span className="cartBadge">{itemCount}</span>}
            </button>
          </div>
        </div>
      </nav>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
