import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Play, Loader2, ArrowLeft, ShoppingCart, Check, Info, ListChecks, Package, Share2, X, AlertCircle, ShieldCheck, Truck, Zap } from 'lucide-react';
import { useProductDetail, Variant } from '../../hooks/useProductDetail';
import './ProductDetail.css';

const ProductDetail = () => {
  const {
    product,
    loading,
    activeMedia,
    setActiveMedia,
    selectedVariants,
    showYoutube,
    setShowYoutube,
    handleVariantSelect,
    handleAddToCart,
    handleWhatsAppInquiry,
    getYoutubeEmbedUrl,
    groupedVariants,
    currentOfferPrice,
    currentNormalPrice,
    recommendedProducts,
    navigate
  } = useProductDetail();

  const [pricePop, setPricePop] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [toast, setToast] = useState<{ show: boolean, message: string }>({ show: false, message: '' });
  
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const variantsRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const scrollToVariants = () => {
    if (variantsRef.current) {
      variantsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      variantsRef.current.classList.add('pulse-highlight');
      setTimeout(() => variantsRef.current?.classList.remove('pulse-highlight'), 1000);
    }
  };

  const handleCustomAddToCart = () => {
    const requiredTypes = Object.keys(groupedVariants);
    const missing = requiredTypes.filter(type => !selectedVariants[type]);
    if (missing.length > 0) {
      showToast(`Por favor selecciona: ${missing.join(', ')}`);
      scrollToVariants();
      return;
    }
    handleAddToCart();
    showToast('¡Producto agregado al carrito!');
  };

  const handleCustomWhatsApp = () => {
    const requiredTypes = Object.keys(groupedVariants);
    const missing = requiredTypes.filter(type => !selectedVariants[type]);
    if (missing.length > 0) {
      showToast(`Por favor selecciona: ${missing.join(', ')}`);
      scrollToVariants();
      return;
    }
    handleWhatsAppInquiry();
  };

  const pauseAutoplay = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 120000);
  };

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      pauseAutoplay();
      if (!product || !product.imagenes) return;
      
      const totalImages = product.imagenes.length;
      if (totalImages <= 1) return;

      const currentIndex = activeMedia.type === 'image' 
        ? product.imagenes.indexOf(activeMedia.url)
        : -1;

      setAnimating(true);
      setTimeout(() => {
        if (isLeftSwipe) {
          const nextIndex = (currentIndex + 1) % totalImages;
          setActiveMedia({ type: 'image', url: product.imagenes[nextIndex] });
        } else {
          const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
          setActiveMedia({ type: 'image', url: product.imagenes[prevIndex] });
        }
        setShowYoutube(false);
        setAnimating(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (!product || !product.imagenes || product.imagenes.length <= 1 || showYoutube || isPaused) return;
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActiveMedia(current => {
          if (current.type !== 'image') return current;
          const currentIndex = product.imagenes.indexOf(current.url);
          const nextIndex = (currentIndex + 1) % product.imagenes.length;
          return { type: 'image', url: product.imagenes[nextIndex] };
        });
        setAnimating(false);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, [product, showYoutube, setActiveMedia, isPaused]);

  const handleMediaChange = (media: { type: string; url: string }) => {
    pauseAutoplay();
    setAnimating(true);
    setTimeout(() => {
      setActiveMedia(media);
      setShowYoutube(false);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    if (product?.id) window.scrollTo(0, 0);
  }, [product?.id]);

  useEffect(() => {
    setPricePop(true);
    const timer = setTimeout(() => setPricePop(false), 400);
    return () => clearTimeout(timer);
  }, [currentOfferPrice]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.nombre,
        text: product?.descripcion,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Enlace copiado al portapapeles');
    }
  };

  if (loading) return <div className="loadingContainer"><Loader2 className="animate-spin" size={48} color="#0066ff" /></div>;

  if (!product) return (
    <div className="errorContainer">
      <Info size={48} color="#94a3b8" />
      <h2>Producto no encontrado</h2>
      <button onClick={() => navigate('/productos')} className="backHomeBtn">Ver catálogo EPP</button>
    </div>
  );

  const discountPercent = currentNormalPrice > currentOfferPrice
    ? Math.round((1 - currentOfferPrice / currentNormalPrice) * 100)
    : 0;

  const categoryName = Array.isArray(product.categoria) ? product.categoria[0] : (product.categoria || 'Seguridad Industrial');

  return (
    <div className="productDetailPage page-transition">
      {/* FULLSCREEN IMAGE MODAL */}
      {isModalOpen && (
        <div className="imageModal" onClick={() => setIsModalOpen(false)}>
          <div className="modalClose"><X size={24} /></div>
          <img src={modalImage} alt="Vista completa" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* TOP COMPACT BAR */}
      <div className="detailTopNav">
        <button onClick={() => navigate(-1)} className="topNavBtn backBtn" aria-label="Volver">
          <ArrowLeft size={16} />
          <span>Catálogo</span>
        </button>
        <div className="topNavCategory">
          <span className="categoryDot"></span>
          <span>{categoryName}</span>
        </div>
        <button onClick={handleShare} className="topNavBtn shareBtn" aria-label="Compartir">
          <Share2 size={16} />
        </button>
      </div>

      <div className="detailGrid">
        {/* GALERÍA MULTIMEDIA */}
        <div className="mediaGallery">
          <div 
            className={`mainPreview ${animating ? 'is-switching' : ''}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={() => {
              if (activeMedia.type === 'image') {
                setModalImage(activeMedia.url);
                setIsModalOpen(true);
                pauseAutoplay();
              }
            }}
          >
            {discountPercent > 0 && (
              <span className="imageOfferBadge">-{discountPercent}% OFF</span>
            )}

            {activeMedia.type === 'image' ? (
              <img src={activeMedia.url} alt={product.nombre} className="mainImg" />
            ) : (
              <div className="videoWrapper" onClick={() => product.youtube_url && setShowYoutube(true)}>
                {!showYoutube ? (
                  <>
                    <img src={`https://img.youtube.com/vi/${product.youtube_url?.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/)?.[2] || ''}/hqdefault.jpg`} alt="Vista previa" className="mainImg" />
                    <div className="playBtnOverlay"><Play size={36} fill="white" /></div>
                  </>
                ) : (
                  <iframe src={getYoutubeEmbedUrl(product.youtube_url || '')} frameBorder="0" allowFullScreen title="Video producto"></iframe>
                )}
              </div>
            )}
          </div>

          {/* MINIATURAS HORIZONTALES */}
          {((product.imagenes && product.imagenes.length > 1) || product.youtube_url) && (
            <div className="thumbGrid scrollbar-hide">
              {product.imagenes?.map((img: string, i: number) => (
                <div 
                  key={i} 
                  className={`thumbBox ${activeMedia.url === img ? 'active' : ''}`} 
                  onClick={() => handleMediaChange({ type: 'image', url: img })}
                >
                  <img src={img} alt={`Miniatura ${i}`} />
                </div>
              ))}
              {product.youtube_url && (
                <div 
                  className={`thumbBox ${activeMedia.type === 'video' ? 'active' : ''}`} 
                  onClick={() => handleMediaChange({ type: 'video', url: product.youtube_url || '' })}
                >
                  <Play size={16} className="vIcon" />
                  <img src={`https://img.youtube.com/vi/${product.youtube_url?.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/)?.[2] || ''}/hqdefault.jpg`} alt="Video" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* INFORMACIÓN Y ACCIÓN */}
        <div className="productInfoPanel">
          <header className="infoMain">
            <h1 className="infoTitle">{product.nombre}</h1>
            
            {/* TARJETA DE PRECIO */}
            <div className="infoPriceCard">
              <div className="priceRow">
                <div className="priceMainValue">
                  <span className={`infoPrice ${pricePop ? 'pop' : ''}`}>
                    ${currentOfferPrice?.toLocaleString()}
                  </span>
                  <span className="priceCurrency">COP</span>
                </div>
                {discountPercent > 0 && (
                  <span className="saveBadge">
                    Ahorras {discountPercent}%
                  </span>
                )}
              </div>
              {currentNormalPrice > currentOfferPrice && (
                <span className="oldVal">Precio de lista: ${currentNormalPrice?.toLocaleString()} COP</span>
              )}
            </div>

            {/* TRUST BADGES COMPACTOS */}
            <div className="trustBadgesGrid">
              <div className="trustTag"><ShieldCheck size={14} /> Certificado</div>
              <div className="trustTag"><Truck size={14} /> Envío Nacional</div>
              <div className="trustTag"><Zap size={14} /> Despacho Hoy</div>
            </div>
          </header>

          {/* VARIANTES (COLOR / TALLA / CAPACIDAD) */}
          {Object.keys(groupedVariants).length > 0 && (
            <div className="infoVariants" ref={variantsRef}>
              {Object.entries(groupedVariants).map(([tipo, items]: [string, Variant[]]) => (
                <div key={tipo} className="varRow">
                  <span className="varLabel">{tipo}: <strong className="varSelectedValue">{selectedVariants[tipo] || 'Seleccionar'}</strong></span>
                  <div className="varOptions">
                    {tipo.toLowerCase() === 'color' ? (
                      <div className="colorSet">
                        {items.map((c: Variant, i: number) => {
                          const isActive = selectedVariants['color'] === c.valor;
                          return (
                            <div 
                              key={i} 
                              className={`colorOptionChip ${isActive ? 'active' : ''}`}
                              onClick={() => { handleVariantSelect('color', c.valor, c.imagenUrl); pauseAutoplay(); }}
                            >
                              <span 
                                className="colorDot" 
                                style={{ backgroundColor: c.color || '#333' }}
                              >
                                {isActive && <Check size={10} color={c.color?.toLowerCase() === '#ffffff' ? '#000' : '#fff'} />}
                              </span>
                              <span className="variantName">{c.valor}</span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="chipSet">
                        {items.map((c: Variant, i: number) => {
                          const isActive = selectedVariants[tipo] === c.valor;
                          return (
                            <button 
                              key={i}
                              className={`chipBtn ${isActive ? 'active' : ''}`}
                              onClick={() => { handleVariantSelect(tipo, c.valor, c.imagenUrl); pauseAutoplay(); }}
                            >
                              <span>{c.valor}</span>
                              {isActive && <Check size={12} className="chipCheck" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ACCIONES DESKTOP */}
          <div className="infoActions hide-mobile">
            <button className="btnBuy" onClick={handleCustomWhatsApp}>
              <MessageCircle size={20} />
              <span>Cotizar / Comprar por WhatsApp</span>
            </button>
            <button className="btnCart" onClick={handleCustomAddToCart} title="Añadir al Carrito">
              <ShoppingCart size={20} />
              <span>Agregar</span>
            </button>
          </div>

          {/* DESCRIPCIÓN */}
          <div className="productDescription">
            <h3 className="sectionSubtitle">Descripción</h3>
            <p className="infoDesc">{product.descripcion}</p>
          </div>

          {/* BENTO GRID DE ESPECIFICACIONES */}
          <div className="bentoGrid">
            {product.caracteristicas && product.caracteristicas.length > 0 && (
              <div className="bentoCell">
                <h4 className="bentoTitle"><ListChecks size={16} /> Características</h4>
                <ul className="bentoList">
                  {product.caracteristicas.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.lo_que_incluye && product.lo_que_incluye.length > 0 && (
              <div className="bentoCell">
                <h4 className="bentoTitle"><Package size={16} /> Incluye</h4>
                <div className="bentoTagCloud">
                  {product.lo_que_incluye.map((item, i) => (
                    <span key={i} className="bentoTag">{item}</span>
                  ))}
                </div>
              </div>
            )}

            {product.detalles && product.detalles.length > 0 && (
              <div className="bentoCell bentoFull">
                <h4 className="bentoTitle"><Info size={16} /> Ficha Técnica</h4>
                <div className="specsTable">
                  {product.detalles.map((det, i) => (
                    <div key={i} className="specRow">
                      <span className="specK">{det.clave}</span>
                      <span className="specV">{det.valor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {recommendedProducts.length > 0 && (
              <div className="bentoCell bentoFull bentoRec">
                <h4 className="bentoTitle">Recomendados</h4>
                <div className="recSlider scrollbar-hide">
                  {recommendedProducts.map((p) => (
                    <div key={p.id} className="recMini" onClick={() => navigate(`/producto/${p.id}`)}>
                      <div className="recImgWrapper">
                        <img src={p.imagenes[0]} alt={p.nombre} />
                      </div>
                      <div className="recMeta">
                        <span className="recName">{p.nombre}</span>
                        <span className="recPrice">${p.precio_oferta?.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BARRA INFERIOR FIJA MÓVIL (Con visualización de precio y botones táctiles) */}
      <div className="mobileStickyActions">
        <div className="mobilePricePreview">
          <span className="mPriceLabel">Precio Total</span>
          <span className="mPriceVal">${currentOfferPrice?.toLocaleString()}</span>
        </div>
        <div className="mobileActionBtns">
          <button className="mobileBtnCart" onClick={handleCustomAddToCart} title="Añadir al carrito">
            <ShoppingCart size={19} />
          </button>
          <button className="mobileBtnBuy" onClick={handleCustomWhatsApp}>
            <MessageCircle size={19} />
            <span>Comprar</span>
          </button>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {toast.show && (
        <div className="customToast animate-in-up">
          <AlertCircle size={16} />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;


