import React, { createContext, useContext, useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  precio_normal?: number;
  imagen: string;
  cantidad: number;
}

export interface ProductToAdd {
  id: string;
  nombre: string;
  precio_oferta: number;
  precio_normal: number;
  imagenes: string[];
  cantidad?: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: ProductToAdd) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<{ visible: boolean, product?: string } | null>({ visible: false });

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cualy-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error cargando el carrito", e);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cualy-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductToAdd) => {
    setCart(prevCart => {
      const addedQty = product.cantidad || 1;
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + addedQty } : item
        );
      }
      
      const price = product.precio_oferta || product.precio_normal || 0;
      const imagen = Array.isArray(product.imagenes) && product.imagenes.length > 0 
        ? product.imagenes[0] 
        : '';

      return [...prevCart, {
        id: product.id,
        nombre: product.nombre || 'Producto',
        precio: price,
        precio_normal: product.precio_normal,
        imagen: imagen,
        cantidad: addedQty
      }];
    });

    // Mostrar notificación bonita
    setNotification({ visible: true, product: product.nombre });
    setTimeout(() => setNotification({ visible: false }), 3000);
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item => item.id === id ? { ...item, cantidad: quantity } : item)
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const itemCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
      {children}
      
      {/* NOTIFICACIÓN FLOTANTE */}
      {notification?.visible && (
        <div className="cartNotification animate-in">
          <div className="notifIcon">
            <CheckCircle2 size={24} color="#10b981" />
          </div>
          <div className="notifContent">
            <h4>¡Añadido con éxito!</h4>
            <p>{notification.product}</p>
          </div>
          <button className="notifClose" onClick={() => setNotification({ visible: false })}>
            <X size={18} />
          </button>
          
          <style>{`
            .cartNotification {
              position: fixed;
              bottom: 30px;
              right: 30px;
              background: #1e293b;
              border: 1px solid rgba(255, 255, 255, 0.1);
              padding: 16px 20px;
              border-radius: 20px;
              display: flex;
              align-items: center;
              gap: 15px;
              z-index: 10000;
              box-shadow: 0 20px 40px rgba(0,0,0,0.4);
              min-width: 300px;
              backdrop-filter: blur(10px);
            }
            .notifIcon {
              width: 44px;
              height: 44px;
              background: rgba(16, 185, 129, 0.1);
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            }
            .notifContent h4 { font-size: 0.95rem; font-weight: 800; color: white; margin-bottom: 2px; }
            .notifContent p { font-size: 0.8rem; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 180px; }
            .notifClose { background: transparent; border: none; color: #64748b; cursor: pointer; padding: 5px; margin-left: auto; }
            .notifClose:hover { color: white; }
            
            .animate-in {
              animation: slideInNotif 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            
            @keyframes slideInNotif {
              from { opacity: 0; transform: translateX(50px) scale(0.9); }
              to { opacity: 1; transform: translateX(0) scale(1); }
            }
            
            @media (max-width: 600px) {
              .cartNotification {
                bottom: 20px;
                right: 20px;
                left: 20px;
                min-width: auto;
              }
            }
          `}</style>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
  return context;
};
