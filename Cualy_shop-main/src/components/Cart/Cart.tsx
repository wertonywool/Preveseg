import React from 'react';
import { useCart } from '../../context/CartContext';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag } from 'lucide-react';
import './Cart.css';
import logoImgFile from '../../assets/logo.png';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, total, itemCount } = useCart();
  const WHATSAPP_NUMBER = '573189029468';

  const handleCheckout = () => {
    let message = `*Hola Cualy Shop, me gustaría realizar el siguiente pedido:*%0A%0A`;
    const shippingCost = 8000;
    
    cart.forEach(item => {
      const priceText = item.precio_normal && item.precio_normal > item.precio 
        ? `$${item.precio.toLocaleString()} (Antes: $${item.precio_normal.toLocaleString()})`
        : `$${item.precio.toLocaleString()}`;
      
      message += `• *${item.nombre}* x${item.cantidad} - ${priceText}%0A`;
    });

    const finalTotal = total + shippingCost;

    message += `%0A*Subtotal: $${total.toLocaleString()}*`;
    message += `%0A*Envío (Cali): $${shippingCost.toLocaleString()}*`;
    message += `%0A*Total a Pagar: $${finalTotal.toLocaleString()}*%0A%0A¿Me podrían confirmar disponibilidad?`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="cartOverlay" onClick={onClose}>
      <div className="cartContent" onClick={e => e.stopPropagation()}>
        <div className="cartHeader">
          <div className="cartBrand">
            <img src={logoImgFile} alt="Cualy Shop" className="cartLogo" />
            <div className="brandText">
              <h3>Cualy Shop</h3>
              <p>Tu Carrito ({itemCount})</p>
            </div>
          </div>
          <button className="closeBtn" onClick={onClose} aria-label="Cerrar"><X size={24} /></button>
        </div>

        <div className="cartItems">
          {cart.length === 0 ? (
            <div className="emptyCart">
              <div className="emptyIcon"><ShoppingBag size={64} /></div>
              <h3>Tu carrito está vacío</h3>
              <p>Parece que aún no has añadido nada al carrito.</p>
              <button className="continueBtn" onClick={onClose}>Ir a la Tienda</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cartItem">
                <div className="itemImgWrapper">
                  <img src={item.imagen} alt={item.nombre} />
                </div>
                <div className="itemDetails">
                  <h3 className="itemName">{item.nombre}</h3>
                  <div className="itemPriceRow">
                    <span className="itemPriceActual">${item.precio.toLocaleString()}</span>
                    {item.precio_normal && item.precio_normal > item.precio && (
                      <span className="itemPriceOld">${item.precio_normal.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="itemActions">
                    <div className="qtyControls">
                      <button onClick={() => updateQuantity(item.id, item.cantidad - 1)} disabled={item.cantidad <= 1}>
                        <Minus size={14} />
                      </button>
                      <span className="qtyValue">{item.cantidad}</span>
                      <button onClick={() => updateQuantity(item.id, item.cantidad + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <button className="deleteBtn" onClick={() => removeFromCart(item.id)} title="Eliminar">
                      <Trash2 size={18} />
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
                <span>Subtotal</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div className="summaryRow shipping">
                <span>Envío (Cali)</span>
                <span>$8,000</span>
              </div>
              <div className="divider"></div>
              <div className="summaryRow total">
                <span>Total Estimado</span>
                <span className="totalValue">${(total + 8000).toLocaleString()}</span>
              </div>
            </div>
            
            <button className="checkoutBtn" onClick={handleCheckout}>
              <MessageCircle size={22} />
              <span>Realizar Pedido por WhatsApp</span>
            </button>
            <p className="footerHint">Confirmaremos stock y envío por WhatsApp.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
