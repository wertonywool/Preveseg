import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronLeft, ChevronRight, Zap, X, Minus, Plus } from 'lucide-react';
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
  precioNormal: number;
  precioOferta: number;
  imagenes: string[];
  youtubeUrl?: string;
  variantes?: Variant[];
  enOferta?: boolean;
}

const ProductCard = ({ id, nombre, categoria, precioNormal, precioOferta, imagenes, youtubeUrl, variantes = [], enOferta = false }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Quick Select State
  const [showQuickSelect, setShowQuickSelect] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quickSelectMode, setQuickSelectMode] = useState<'cart' | 'buy'>('cart');
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
    
    // Supabase image transformation
    if (url.includes('supabase.co/storage/v1/object/public/')) {
      return url;
    }
    return url;
  };

  const handleAction = (e: React.MouseEvent, mode: 'cart' | 'buy') => {
    e.stopPropagation();
    if (mode === 'buy' && variantes.length === 0) {
      // Direct to WhatsApp for "Buy Now" only if no variants
      const WHATSAPP_NUMBER = '573046296285';
      const priceText = precioNormal > precioOferta 
        ? `\nPrecio: *$${precioOferta.toLocaleString()}* (Antes: $${precioNormal.toLocaleString()})`
        : `\nPrecio: *$${precioOferta.toLocaleString()}*`;
      
      const message = `Hola Preveseg, estoy interesado en comprar: *${nombre}*${priceText}\nLink: ${window.location.origin}/producto/${id}`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
      return;
    }

    setQuickSelectMode(mode);
    setSelectedVariants({});
    setShowQuickSelect(true);
  };

  const executeAction = (mode: 'cart' | 'buy', selected: Record<string, string>, priceO: number, priceN: number) => {
    // Validation: Check if all variants are selected
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
      const priceText = priceN > priceO 
        ? `\nPrecio: *$${priceO.toLocaleString()}* (Antes: $${priceN.toLocaleString()})`
        : `\nPrecio: *$${priceO.toLocaleString()}*`;
      
      const message = `Hola Preveseg, estoy interesado en comprar: *${finalName}* (x${quantity})${priceText}\nLink: ${window.location.origin}/producto/${id}`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
      setShowQuickSelect(false);
      return;
    }

    if (mode === 'cart') {
      addToCart({
        id,
        nombre: finalName,
        precio_oferta: priceO,
        precio_normal: priceN,
        imagenes,
        cantidad: quantity
      });
      setShowQuickSelect(false);
      setQuantity(1);
    }
  };

  // Calculate current price based on selection
  let currentOfferPrice = precioOferta;
  let currentNormalPrice = precioNormal;
  let activePreviewImage = imagenes[0];

  Object.entries(selectedVariants).forEach(([tipo, valor]) => {
    const match = variantes.find(v => v.tipo === tipo && v.valor === valor);
    if (match) {
      if (match.precio_oferta) currentOfferPrice = parseFloat(match.precio_oferta);
      if (match.precio_normal) currentNormalPrice = parseFloat(match.precio_normal);
      if (match.imagenUrl) activePreviewImage = match.imagenUrl;
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
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Error+al+cargar';
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

            {enOferta && (
              <div className="badge">OFERTA</div>
            )}
            
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
          {Array.isArray(categoria) ? categoria[0] : (categoria || 'Tecnología')}
        </span>
        <h3 className="title">{nombre}</h3>
        
        <div className="priceContainer">
          <span className="oldPrice">${precioNormal?.toLocaleString()}</span>
          <div className="newPrice">
            <span>$</span>{precioOferta?.toLocaleString()}
          </div>
        </div>

        <div className="cardActions">
          <button className="secondaryBtn" title="Añadir al carrito" onClick={(e) => handleAction(e, 'cart')}>
            <ShoppingCart size={20} />
          </button>
          <button className="primaryBtn" onClick={(e) => handleAction(e, 'buy')}>
            <Zap size={18} /> COMPRAR
          </button>
        </div>
      </div>

      {/* Quick Select Modal (AliExpress Style) - Using Portal to avoid parent overflow/transform clipping */}
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
                <div className="quickPrice">
                  <span className="qPriceActual">${currentOfferPrice.toLocaleString()}</span>
                  {currentNormalPrice > currentOfferPrice && (
                    <span className="qPriceOld">${currentNormalPrice.toLocaleString()}</span>
                  )}
                </div>
                <p className="qStockInfo">✓ Disponible en stock</p>
                <p className="qSelectedLabel">
                  {Object.values(selectedVariants).length > 0 
                    ? `Seleccionado: ${Object.values(selectedVariants).join(', ')}` 
                    : 'Por favor seleccione variaciones'}
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
                <span className="qVariantLabel">Cantidad</span>
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
                onClick={() => executeAction(quickSelectMode, selectedVariants, currentOfferPrice, currentNormalPrice)}
              >
                {quickSelectMode === 'buy' ? <Zap size={20} /> : <ShoppingCart size={20} />}
                {quickSelectMode === 'buy' ? 'COMPRAR AHORA' : 'AÑADIR AL CARRITO'}
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
