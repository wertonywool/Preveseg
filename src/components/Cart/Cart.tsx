import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import './Cart.css';
import logoImgFile from '../../assets/logo.png';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, total, itemCount } = useCart();
  const navigate = useNavigate();
  const WHATSAPP_NUMBER = '573046296285';

  const handleCheckout = () => {
    let message = `*Hola Preveseg, me gustaría solicitar una cotización / pedido para los siguientes equipos:*%0A%0A`;
    
    cart.forEach(item => {
      const priceText = item.precio_normal && item.precio_normal > item.precio 
        ? `$${item.precio.toLocaleString()} (Antes: $${item.precio_normal.toLocaleString()})`
        : `$${item.precio.toLocaleString()}`;
      
      message += `• *${item.nombre}* x${item.cantidad} - ${priceText}%0A`;
    });

    message += `%0A*Subtotal Estimado: $${total.toLocaleString()}*`;
    message += `%0A%0A¿Me confirman disponibilidad y tiempos de entrega?`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleExplore = () => {
    onClose();
    navigate('/productos');
  };

  if (!isOpen) return null;

  return (
    <div className="cartOverlay" onClick={onClose}>
      <div className="cartContent" onClick={e => e.stopPropagation()}>
        <div className="cartHeader">
          <div className="cartBrand">
            <div className="cartLogoWrapper">
              <img src={logoImgFile} alt="Preveseg Logo" className="cartLogo" />
            </div>
            <div className="brandText">
              <h3>PREVESEG</h3>
              <p>Tu Carrito ({itemCount} {itemCount === 1 ? 'ítem' : 'ítems'})</p>
            </div>
          </div>
          <button className="closeBtn" onClick={onClose} aria-label="Cerrar Carrito"><X size={20} /></button>
        </div>

        <div className="cartItems">
          {cart.length === 0 ? (
            <div className="emptyCart">
              <div className="emptyIcon"><ShoppingBag size={52} /></div>
              <h3>Tu carrito está vacío</h3>
              <p>Explora nuestro catálogo de equipos de protección personal y seguridad industrial.</p>
              <button className="continueBtn" onClick={handleExplore}>
                Explorar Catálogo EPP <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cartItem">
                <div className="itemImgWrapper">
                  <img 
                    src={item.imagen || 'https://via.placeholder.com/90x90?text=Preveseg'} 
                    alt={item.nombre}
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/90x90?text=Preveseg'; }}
                  />
                </div>
                <div className="itemDetails">
                  <h4 className="itemName">{item.nombre}</h4>
                  <div className="itemPriceRow">
                    <span className="itemPriceActual">${item.precio.toLocaleString()}</span>
                    {item.precio_normal && item.precio_normal > item.precio && (
                      <span className="itemPriceOld">${item.precio_normal.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="itemActions">
                    <div className="qtyControls">
                      <button 
                        onClick={() => updateQuantity(item.id, item.cantidad - 1)} 
                        disabled={item.cantidad <= 1}
                        aria-label="Disminuir cantidad"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="qtyValue">{item.cantidad}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                        aria-label="Aumentar cantidad"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <button 
                      className="deleteBtn" 
                      onClick={() => removeFromCart(item.id)} 
                      title="Eliminar ítem"
                      aria-label="Eliminar ítem"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cartFooter">
            <div className="summaryInfo">
              <div className="summaryRow">
                <span>Subtotal ({itemCount} ítems)</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div className="summaryRow shipping">
                <span>Envíos</span>
                <span className="shippingBadge">A cotizar a nivel nacional</span>
              </div>
              <div className="divider"></div>
              <div className="summaryRow total">
                <span>Total Estimado</span>
                <span className="totalValue">${total.toLocaleString()}</span>
              </div>
            </div>
            
            <button className="checkoutBtn" onClick={handleCheckout}>
              <MessageCircle size={20} />
              <span>Realizar Pedido por WhatsApp</span>
            </button>
            <p className="footerHint">
              <ShieldCheck size={14} className="inline-icon" /> Atención directa con asesor comercial por WhatsApp.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
