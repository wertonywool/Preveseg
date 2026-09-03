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
  const { cart, removeFromCart, updateQuantity, clearCart, itemCount } = useCart();
  const navigate = useNavigate();
  const WHATSAPP_NUMBER = '573046296285';

  const handleCheckout = () => {
    let message = `*SOLICITUD DE COTIZACIÓN FORMAL - PREVESEG CALI*%0A`;
    message += `Ubicación: Cra 28D 72f-79, Cali%0A`;
    message += `Contacto: 3046296285%0A%0A`;
    message += `*Equipos a Cotizar:*%0A`;
    
    cart.forEach(item => {
      message += `• *${item.nombre}* (Cantidad: ${item.cantidad})%0A`;
    });

    message += `%0A*Total de referencias:* ${itemCount} equipos%0A`;
    message += `¿Me confirman disponibilidad, cotización y tiempos de entrega?`;

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
        {/* MOBILE DRAG HANDLE */}
        <div className="mobileDragHandle"></div>

        {/* HEADER */}
        <div className="cartHeader">
          <div className="cartBrand">
            <div className="cartLogoWrapper">
              <img src={logoImgFile} alt="Preveseg Logo" className="cartLogo" />
            </div>
            <div className="brandText">
              <div className="brandTitleRow">
                <h3>PREVE<span>SEG</span></h3>
                <span className="cartCountBadge">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
              </div>
              <p>Lista de Cotización • Cali</p>
            </div>
          </div>
          <button className="closeBtn" onClick={onClose} aria-label="Cerrar Lista">
            <X size={18} />
          </button>
        </div>

        {/* ITEMS LIST */}
        <div className="cartItems">
          {cart.length === 0 ? (
            <div className="emptyCart">
              <div className="emptyIcon">
                <ShoppingBag size={44} />
              </div>
              <h3>Tu lista de cotización está vacía</h3>
              <p>Agrega extintores, gabinetes, camillas, botiquines, señalización y dotaciones EPP para solicitar tu cotización formal.</p>
              <button className="continueBtn" onClick={handleExplore}>
                <span>Explorar Catálogo</span> <ArrowRight size={16} />
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
                    <span className="quoteItemTag">
                      <ShieldCheck size={12} className="inline-icon" /> Certificado NTC
                    </span>
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
                      title="Eliminar de la lista"
                      aria-label="Eliminar de la lista"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="cartFooter">
            <div className="summaryInfo">
              <div className="summaryRow">
                <span>Total de Referencias:</span>
                <strong className="subtotalVal">{itemCount} {itemCount === 1 ? 'equipo seleccionado' : 'equipos seleccionados'}</strong>
              </div>
              <div className="summaryRow shipping">
                <span>Sede Principal:</span>
                <span className="shippingBadge">Cra 28D 72f-79, Cali</span>
              </div>
              <div className="divider"></div>
              <div className="summaryRow total">
                <span>Respuesta:</span>
                <span className="totalValue">Inmediata vía WhatsApp</span>
              </div>
            </div>
            
            <button className="checkoutBtn" onClick={handleCheckout}>
              <MessageCircle size={19} />
              <span>Enviar Cotización por WhatsApp</span>
            </button>

            <div className="cartFooterActions">
              <button className="clearCartBtn" onClick={() => clearCart && clearCart()}>
                Vaciar Lista
              </button>
              <button className="continueShoppingLink" onClick={onClose}>
                Seguir Explorando →
              </button>
            </div>

            <p className="footerHint">
              <ShieldCheck size={14} className="inline-icon" /> Preveseg: Asesoría técnica en seguridad y cotizaciones oficiales sin compromiso.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
