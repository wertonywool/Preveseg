import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Cart from '../Cart/Cart';
import './Navbar.css';

import logoImgFile from '../../assets/logo.png';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <>
      <nav className="navbar">
        <div className="navbarContainer">
          <Link to="/" className="logo">
            <img 
              src={logoImgFile} 
              alt="Cualy Shop Logo" 
              className="logoImg" 
            />
            <span>Cualy Shop</span>
          </Link>

          <div className="navLinks">
            <Link to="/" className="navLink">Inicio</Link>
            <Link to="/productos" className="navLink">Productos</Link>
          </div>

          <div className="navActions">
            <Link to="/productos" className="mobileMarketplace" aria-label="Marketplace">
              <Store size={24} />
            </Link>
            <button className="cartBtn" onClick={() => { setIsCartOpen(true); }}>
              <ShoppingCart size={24} />
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
