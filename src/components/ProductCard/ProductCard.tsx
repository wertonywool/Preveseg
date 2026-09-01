import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, ChevronRight, MessageCircle, X, Minus, Plus, Package, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

interface Variant {
  tipo: string;
  valor: string;
  imagenUrl?: string;
  precio_oferta?: string;
  precio_normal?: string;
  color?: string;
}

interface ProductCardProps {
  id: string;
  nombre: string;
  categoria: string;
  precioNormal?: number;
  precioOferta?: number;
  imagenes: string[];
  youtubeUrl?: string;
  variantes?: Variant[];
  enOferta?: boolean;
  esKit?: boolean;
}

const ProductCard = ({ id, nombre, categoria, precioNormal = 0, precioOferta = 0, imagenes, youtubeUrl, variantes = [], enOferta = false, esKit = false }: ProductCardProps) => {
  const isKitProduct = esKit || (typeof categoria === 'string' && categoria.toLowerCase().includes('kit'));
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Quick Select State
  const [showQuickSelect, setShowQuickSelect] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quickSelectMode, setQuickSelectMode] = useState<'cart' | 'buy'>('buy');
  const [quantity, setQuantity] = useState(1);

  const handleCardClick = () => {
    navigate(`/producto/${id}`);
  };

  const getYoutubeEmbedUrl = (url: string) => {
    let videoId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null;
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % imagenes.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  const toggleVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVideo(!showVideo);
  };

  const embedUrl = youtubeUrl ? getYoutubeEmbedUrl(youtubeUrl) : null;

  const getOptimizedImageUrl = (url: string) => {
    if (!url || typeof url !== 'string') return 'https://via.placeholder.com/400x300?text=Preveseg';
    return url;
  };

  const handleAction = (e: React.MouseEvent, mode: 'cart' | 'buy') => {
    e.stopPropagation();
    if (mode === 'buy' && variantes.length === 0) {
      const WHATSAPP_NUMBER = '573046296285';
      const message = `Hola Preveseg Cali, solicito cotización formal para el siguiente equipo:\n\n• *${nombre}*\n• Ubicación: Cra 28D 72f-79, Cali / A coordinar\nLink: ${window.location.origin}/producto/${id}`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
      return;
    }

    setQuickSelectMode(mode);
    setSelectedVariants({});
    setShowQuickSelect(true);
  };

  const executeAction = (mode: 'cart' | 'buy', selected: Record<string, string>) => {
    const requiredTypes = Object.keys(groupedVariants);
    const missing = requiredTypes.filter(type => !selected[type]);
    
    if (missing.length > 0) {
      alert(`Por favor, selecciona: ${missing.join(', ')}`);
      return;
    }

    const variantSuffix = Object.values(selected).join(' / ');
    const finalName = variantSuffix ? `${nombre} (${variantSuffix})` : nombre;

    if (mode === 'buy') {
      const WHATSAPP_NUMBER = '573046296285';
      const message = `Hola Preveseg Cali, solicito cotización formal para el siguiente equipo:\n\n• *${finalName}* (Cantidad: ${quantity})\n• Ubicación: Cra 28D 72f-79, Cali / A coordinar\nLink: ${window.location.origin}/producto/${id}`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
      setShowQuickSelect(false);
      return;
    }

    if (mode === 'cart') {
      addToCart({
        id,
        nombre: finalName,
        precio_oferta: precioOferta,
        precio_normal: precioNormal,
        imagenes,
        cantidad: quantity
      });
      setShowQuickSelect(false);
      setQuantity(1);
    }
  };

  let activePreviewImage = imagenes[0];
  Object.entries(selectedVariants).forEach(([tipo, valor]) => {
    const match = variantes.find(v => v.tipo === tipo && v.valor === valor);
    if (match && match.imagenUrl) {
      activePreviewImage = match.imagenUrl;
    }
  });

  const groupedVariants = variantes.reduce((acc: Record<string, Variant[]>, v: Variant) => {
    if (v && v.tipo && v.valor) {
      if (!acc[v.tipo]) acc[v.tipo] = [];
      acc[v.tipo].push(v);
    }
    return acc;
  }, {});

  return (
    <div className={`card ${showQuickSelect ? 'modal-open' : ''}`} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="imageContainer">
        {showVideo && embedUrl ? (
          <div className="videoWrapper">
            <iframe
              src={embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button onClick={toggleVideo} className="closeVideo">×</button>
          </div>
        ) : (
          <>
            {imagenes && imagenes.length > 0 ? (
              <>
                {!imageLoaded && <div className="skeleton imageSkeleton" />}
                <img 
                  src={getOptimizedImageUrl(imagenes[currentImageIndex])} 
                  alt={nombre} 
                  loading="lazy"
                  className={imageLoaded ? 'loaded' : 'loading'}
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Preveseg+Cali';
                    setImageLoaded(true);
                  }}
                />
              </>
            ) : (
              <div className="skeleton imageSkeleton" />
            )}

            {imagenes && imagenes.length > 1 && (
              <div className="imageNav">
                <button onClick={prevImage} className="navBtn"><ChevronLeft size={20} /></button>
                <button onClick={nextImage} className="navBtn"><ChevronRight size={20} /></button>
              </div>
            )}

            {isKitProduct ? (
              <div className="kitBadge">
                <Package size={11} />
                <span>KIT COMBO</span>
              </div>
            ) : enOferta ? (
              <div className="badge">CERTIFICADO</div>
            ) : null}
            
            {imagenes && imagenes.length > 1 && (
              <div className="imageDots">
                {imagenes.map((_, i) => (
                  <span key={i} className={`dot ${i === currentImageIndex ? 'active' : ''}`} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="content">
        <span className="category">
          {Array.isArray(categoria) ? categoria[0] : (categoria || 'Seguridad Industrial')}
        </span>
        <h3 className="title">{nombre}</h3>
        
        {/* BADGE DE COTIZACIÓN INDUSTRIAL */}
        <div className="quoteBadgeRow">
          <span className="quoteBadge">
            <ShieldCheck size={13} className="quoteBadgeIcon" /> Disponible para Cotizar
          </span>
        </div>

        <div className="cardActions">
          <button className="secondaryBtn" title="Añadir a mi Cotización" onClick={(e) => handleAction(e, 'cart')}>
            <ShoppingBag size={18} />
          </button>
          <button className="primaryBtn" onClick={(e) => handleAction(e, 'buy')}>
            <MessageCircle size={16} /> COTIZAR
          </button>
        </div>
      </div>

      {/* Quick Select Modal */}
      {showQuickSelect && createPortal(
        <div className="quickSelectOverlay" onClick={(e) => { e.stopPropagation(); setShowQuickSelect(false); }}>
          <div className="quickSelectModal" onClick={(e) => e.stopPropagation()}>
            <div className="modalHandle"></div>
            <button className="closeQuickSelect" onClick={() => setShowQuickSelect(false)}><X size={20} /></button>
            
            <div className="quickSelectHeader">
              <div className="quickPreviewWrapper">
                <img 
                  src={getOptimizedImageUrl(activePreviewImage)} 
                  alt="Preview" 
                  className="quickPreviewImg"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=Preveseg'; }}
                />
              </div>
              <div className="quickSelectInfo">
                <div className="quickQuoteStatus">
                  <ShieldCheck size={15} className="quickQuoteIcon" />
                  <span>Equipo Disponible para Cotización</span>
                </div>
                <p className="qStockInfo">✓ Asesoría técnica en Cali (Cra 28D 72f-79)</p>
                <p className="qSelectedLabel">
                  {Object.values(selectedVariants).length > 0 
                    ? `Seleccionado: ${Object.values(selectedVariants).join(', ')}` 
                    : 'Seleccione opciones para cotizar'}
                </p>
              </div>
            </div>

            <div className="quickScrollContent scrollbar-hide">
              <h4 className="qProductTitle">{nombre}</h4>
              <div className="quickVariants">
                {Object.entries(groupedVariants).map(([tipo, items]) => (
                  <div key={tipo} className="qVariantRow">
                    <span className="qVariantLabel">{tipo}</span>
                    <div className="qVariantOptions">
                      {items.map((v, i) => (
                        <button 
                          key={i} 
                          className={`qOptionPill ${selectedVariants[tipo] === v.valor ? 'active' : ''}`}
                          onClick={() => setSelectedVariants(prev => ({...prev, [tipo]: v.valor}))}
                        >
                          {v.valor}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="qQuantitySection">
                <span className="qVariantLabel">Cantidad a Cotizar</span>
                <div className="qQuantityControls">
                  <button 
                    className="qQtyBtn" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="qQtyValue">{quantity}</span>
                  <button 
                    className="qQtyBtn" 
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="quickModalFooter">
              <button 
                className={`confirmQuickAction ${quickSelectMode === 'buy' ? 'is-buy' : ''}`}
                onClick={() => executeAction(quickSelectMode, selectedVariants)}
              >
                {quickSelectMode === 'buy' ? <MessageCircle size={20} /> : <ShoppingBag size={20} />}
                {quickSelectMode === 'buy' ? 'COTIZAR POR WHATSAPP' : 'AÑADIR A MI COTIZACIÓN'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ProductCard;
