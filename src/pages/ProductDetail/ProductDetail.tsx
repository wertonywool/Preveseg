import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Play, Loader2, ArrowLeft, ShoppingCart, Check, Info, ListChecks, Package, Share2, X, AlertCircle, ShieldCheck, Truck, Clock } from 'lucide-react';
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

  return (
    <div className="productDetailPage page-transition">
      {/* MODAL PARA VER IMAGEN COMPLETA */}
      {isModalOpen && (
        <div className="imageModal" onClick={() => setIsModalOpen(false)}>
          <div className="modalClose"><X size={28} /></div>
          <img src={modalImage} alt="Vista completa" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* TOP NAVIGATION BAR */}
      <div className="detailTopNav">
        <button onClick={() => navigate(-1)} className="topNavBtn backBtn" aria-label="Volver">
          <ArrowLeft size={18} />
          <span>Volver al Catálogo</span>
        </button>
        <button onClick={handleShare} className="topNavBtn shareBtn" aria-label="Compartir">
          <Share2 size={18} />
          <span>Compartir</span>
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
                    <div className="playBtnOverlay"><Play size={44} fill="white" /></div>
                  </>
                ) : (
                  <iframe src={getYoutubeEmbedUrl(product.youtube_url || '')} frameBorder="0" allowFullScreen title="Video producto"></iframe>
                )}
              </div>
            )}
          </div>

          {/* MINIATURAS */}
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
                  <Play size={18} className="vIcon" />
                  <img src={`https://img.youtube.com/vi/${product.youtube_url?.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/)?.[2] || ''}/hqdefault.jpg`} alt="Video" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* INFORMACIÓN Y ACCIÓN */}
        <div className="productInfoPanel">
          <header className="infoMain">
            <div className="infoCatPill">
              <span className="catDot"></span>
              <span>{Array.isArray(product.categoria) ? product.categoria[0] : product.categoria}</span>
            </div>

            <h1 className="infoTitle">{product.nombre}</h1>
            
            {/* PRECIOS */}
            <div className="infoPriceCard">
              <div className="priceMainCol">
                <span className="priceLabel">Precio Oficial:</span>
                <div className="priceRow">
                  <span className={`infoPrice ${pricePop ? 'pop' : ''}`}>
                    <small>$</small>{currentOfferPrice?.toLocaleString()}
                  </span>
                  {discountPercent > 0 && (
                    <span className="saveBadge">
                      Ahorras {discountPercent}%
                    </span>
                  )}
                </div>
                {currentNormalPrice > currentOfferPrice && (
                  <span className="oldVal">Antes: ${currentNormalPrice?.toLocaleString()} COP</span>
                )}
              </div>
            </div>

            {/* TRUST BADGES */}
            <div className="trustBadgesGrid">
              <div className="trustTag"><ShieldCheck size={16} /> Certificación Oficial</div>
              <div className="trustTag"><Truck size={16} /> Envíos a Todo el País</div>
              <div className="trustTag"><Clock size={16} /> Despacho Inmediato</div>
            </div>
          </header>

          {/* VARIANTES */}
          {Object.keys(groupedVariants).length > 0 && (
            <div className="infoVariants" ref={variantsRef}>
              <h3 className="sectionSubtitle">Selecciona Opciones</h3>
              {Object.entries(groupedVariants).map(([tipo, items]: [string, Variant[]]) => (
                <div key={tipo} className="varRow">
                  <span className="varLabel">{tipo}: <strong className="varSelectedValue">{selectedVariants[tipo] || 'Elige una opción'}</strong></span>
                  <div className="varOptions">
                    {tipo.toLowerCase() === 'color' ? (
                      <div className="colorSet">
                        {items.map((c: Variant, i: number) => {
                          const isActive = selectedVariants['color'] === c.valor;
                          return (
                            <div 
                              key={i} 
                              className={`variantOptionWrapper colorWrapper ${isActive ? 'active' : ''}`}
                              onClick={() => { handleVariantSelect('color', c.valor, c.imagenUrl); pauseAutoplay(); }}
                            >
                              <button 
                                className={`colorDot ${isActive ? 'active' : ''}`} 
                                style={{ backgroundColor: c.color || '#333' }} 
                                title={c.valor}
                                onClick={(e) => { e.stopPropagation(); handleVariantSelect('color', c.valor, c.imagenUrl); pauseAutoplay(); }}
                              >
                                {isActive && <Check size={12} color={c.color?.toLowerCase() === '#ffffff' ? '#000' : '#fff'} />}
                              </button>
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
                              {c.valor}
                              {isActive && <Check size={13} className="chipCheck" />}
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
              <MessageCircle size={22} />
              <span>Cotizar / Comprar por WhatsApp</span>
            </button>
            <button className="btnCart" onClick={handleCustomAddToCart} title="Añadir al Carrito">
              <ShoppingCart size={22} />
              <span>Agregar</span>
            </button>
          </div>

          {/* DESCRIPCIÓN */}
          <div className="productDescription">
            <h3 className="sectionSubtitle">Descripción del Equipo</h3>
            <p className="infoDesc">{product.descripcion}</p>
          </div>

          {/* BENTO GRID DE ESPECIFICACIONES */}
          <div className="bentoGrid">
            {product.caracteristicas && product.caracteristicas.length > 0 && (
              <div className="bentoCell">
                <h4 className="bentoTitle"><ListChecks size={18} /> Características Técnicas</h4>
                <ul className="bentoList">
                  {product.caracteristicas.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.lo_que_incluye && product.lo_que_incluye.length > 0 && (
              <div className="bentoCell">
                <h4 className="bentoTitle"><Package size={18} /> ¿Qué incluye?</h4>
                <div className="bentoTagCloud">
                  {product.lo_que_incluye.map((item, i) => (
                    <span key={i} className="bentoTag">{item}</span>
                  ))}
                </div>
              </div>
            )}

            {product.detalles && product.detalles.length > 0 && (
              <div className="bentoCell bentoFull">
                <h4 className="bentoTitle"><Info size={18} /> Ficha Técnica</h4>
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
                <h4 className="bentoTitle">Equipos Recomendados</h4>
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

      {/* BARRA DE ACCIONES FIJA PARA MÓVIL (Con vista de precio y botones táctiles) */}
      <div className="mobileStickyActions">
        <div className="mobilePricePreview">
          <span className="mPriceLabel">Total:</span>
          <span className="mPriceVal">${currentOfferPrice?.toLocaleString()}</span>
        </div>
        <div className="mobileActionBtns">
          <button className="mobileBtnCart" onClick={handleCustomAddToCart} title="Añadir al carrito">
            <ShoppingCart size={20} />
          </button>
          <button className="mobileBtnBuy" onClick={handleCustomWhatsApp}>
            <MessageCircle size={20} />
            <span>Comprar</span>
          </button>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {toast.show && (
        <div className="customToast animate-in-up">
          <AlertCircle size={18} />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

