import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Play, Loader2, ArrowLeft, ShoppingCart, Check, Info, ListChecks, Package, Share2, X, AlertCircle } from 'lucide-react';
import { useProductDetail, Variant } from '../../hooks/useProductDetail';
import './ProductDetail.css';

const ProductDetail = () => {
  useEffect(() => {
    console.log("Preveseg: ProductDetail component mounted");
  }, []);

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
  
  // Autoplay pause state
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
      // Add a small pulse effect to highlight it
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
    }, 120000); // 120 segundos
  };

  // Mínima distancia en píxeles para considerar un swipe
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
          // Siguiente imagen
          const nextIndex = (currentIndex + 1) % totalImages;
          setActiveMedia({ type: 'image', url: product.imagenes[nextIndex] });
        } else {
          // Anterior imagen
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
      alert('Enlace copiado al portapapeles');
    }
  };

  useEffect(() => {
    if (product) {
      (window as any).prevesegShop = {
        addToCart: handleAddToCart,
        whatsapp: handleWhatsAppInquiry,
        openImage: (url: string) => {
          setModalImage(url);
          setIsModalOpen(true);
        }
      };
    }
    return () => {
      delete (window as any).prevesegShop;
    };
  }, [product, handleAddToCart, handleWhatsAppInquiry]);

  if (loading) return <div className="loadingContainer"><Loader2 className="animate-spin" size={48} color="#0047AB" /></div>;

  if (!product) return (
    <div className="errorContainer">
      <Info size={48} color="#94a3b8" />
      <h2>Ups! Producto no encontrado</h2>
      <button onClick={() => navigate('/productos')} className="backHomeBtn">Ver catálogo</button>
    </div>
  );

  // Custom HTML handling
  if (product.custom_html) {
    return (
      <div className="customProductDetail">
        {product.custom_css && <style>{product.custom_css}</style>}
        
        {/* MODAL PARA VER IMAGEN COMPLETA (También disponible para HTML personalizado) */}
        {isModalOpen && (
          <div className="imageModal" onClick={() => setIsModalOpen(false)}>
            <div className="modalClose"><X size={32} /></div>
            <img src={modalImage} alt="Vista completa" onClick={(e) => e.stopPropagation()} />
          </div>
        )}

        <div dangerouslySetInnerHTML={{ __html: product.custom_html }} />
        <button onClick={() => navigate(-1)} className="mobileBackBtn"><ArrowLeft size={24} /></button>
        <div className="mobileStickyActions">
          <button className="mobileBtnCart" onClick={handleCustomAddToCart}>
            <ShoppingCart size={26} />
          </button>
          <button className="mobileBtnBuy" onClick={handleCustomWhatsApp}>
            <MessageCircle size={26} /> <span>Comprar ahora</span>
          </button>
        </div>

        {/* TOAST NOTIFICATION */}
        {toast.show && (
          <div className="customToast animate-in-up">
            <AlertCircle size={20} />
            <span>{toast.message}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="productDetailPage">
      {/* Background Effects */}
      <div className="liquid-bg">
        <div className="bubble-layer"></div>
      </div>

      {/* MODAL PARA VER IMAGEN COMPLETA */}
      {isModalOpen && (
        <div className="imageModal" onClick={() => setIsModalOpen(false)}>
          <div className="modalClose"><X size={32} /></div>
          <img src={modalImage} alt="Vista completa" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <div className="detailGrid">
        {/* GALERÍA MULTIMEDIA */}
        <div className="mediaGallery">
          {/* Botones de acción flotantes sobre la imagen */}
          <div className="floatingActions">
            <button onClick={() => navigate(-1)} className="floatBtn backFloat" title="Volver">
              <ArrowLeft size={20} />
            </button>
            <button onClick={handleShare} className="floatBtn shareFloat" title="Compartir">
              <Share2 size={20} />
            </button>
          </div>

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
            {activeMedia.type === 'image' ? (
              <img src={activeMedia.url} alt={product.nombre} className="mainImg" />
            ) : (
              <div className="videoWrapper" onClick={() => product.youtube_url && setShowYoutube(true)}>
                {!showYoutube ? (
                  <>
                    <img src={`https://img.youtube.com/vi/${product.youtube_url?.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/)?.[2] || ''}/hqdefault.jpg`} alt="Vista previa" className="mainImg" />
                    <div className="playBtnOverlay"><Play size={48} fill="white" /></div>
                  </>
                ) : (
                  <iframe src={getYoutubeEmbedUrl(product.youtube_url || '')} frameBorder="0" allowFullScreen></iframe>
                )}
              </div>
            )}
          </div>
          <div className="thumbGrid">
            {product.imagenes?.map((img: string, i: number) => (
              <div key={i} className={`thumbBox ${activeMedia.url === img ? 'active' : ''}`} onClick={() => handleMediaChange({ type: 'image', url: img })}>
                <img src={img} alt={`Miniatura ${i}`} />
              </div>
            ))}
            {product.youtube_url && (
              <div className={`thumbBox ${activeMedia.type === 'video' ? 'active' : ''}`} onClick={() => handleMediaChange({ type: 'video', url: product.youtube_url || '' })}>
                <Play size={20} className="vIcon" />
                <img src={`https://img.youtube.com/vi/${product.youtube_url?.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/)?.[2] || ''}/hqdefault.jpg`} alt="Video" />
              </div>
            )}
          </div>
        </div>

        {/* INFORMACIÓN Y ACCIÓN */}
        <div className="productInfoPanel">
          <header className="infoMain">
            <span className="infoCat">{Array.isArray(product.categoria) ? product.categoria[0] : product.categoria}</span>
            <h1 className="infoTitle">{product.nombre}</h1>
            
            <div className="infoPriceRow">
              <div className="priceMain">
                <span className={`infoPrice ${pricePop ? 'pop' : ''}`}>${currentOfferPrice?.toLocaleString()}</span>
                {currentNormalPrice > currentOfferPrice && (
                  <span className="saveBadge">
                    -{Math.round((1 - currentOfferPrice/currentNormalPrice) * 100)}%
                  </span>
                )}
              </div>
              {currentNormalPrice > currentOfferPrice && (
                <span className="oldVal">${currentNormalPrice?.toLocaleString()}</span>
              )}
            </div>

            <div className="trustBadges">
              <div className="trustTag"><Check size={14} /> Garantía Oficial</div>
              <div className="trustTag"><Check size={14} /> Envío Inmediato</div>
            </div>
          </header>

          <div className="productDescription">
            <h3 className="sectionTitle">Descripción</h3>
            <p className="infoDesc">{product.descripcion}</p>
          </div>

          <div className="infoVariants" ref={variantsRef}>
            {Object.entries(groupedVariants).map(([tipo, items]: [string, Variant[]]) => (
              <div key={tipo} className="varRow">
                <span className="varLabel">{tipo}:</span>
                <div className="varOptions">
                  {tipo.toLowerCase() === 'color' ? (
                    <div className="colorSet">
                      {items.map((c: Variant, i: number) => {
                        const isActive = selectedVariants['color'] === c.valor;
                        return (
                          <div 
                            key={i} 
                            className={`variantOptionWrapper ${isActive ? 'active' : ''}`}
                            onClick={() => { handleVariantSelect('color', c.valor, c.imagenUrl); pauseAutoplay(); }}
                          >
                            <button 
                              className={`colorDot ${isActive ? 'active' : ''}`} 
                              style={{ backgroundColor: c.color }} 
                              title={c.valor}
                              onClick={(e) => { e.stopPropagation(); handleVariantSelect('color', c.valor, c.imagenUrl); pauseAutoplay(); }}
                            >
                              {isActive && <Check size={12} color={c.color?.toLowerCase() === '#ffffff' ? 'black' : 'white'} />}
                            </button>
                            {c.imagenUrl && (
                              <div className={`variantThumb ${isActive ? 'active' : ''}`}>
                                <img src={c.imagenUrl} alt={c.valor} />
                              </div>
                            )}
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
                          <div 
                            key={i} 
                            className={`variantOptionWrapper ${isActive ? 'active' : ''}`}
                            onClick={() => { handleVariantSelect(tipo, c.valor, c.imagenUrl); pauseAutoplay(); }}
                          >
                            <button 
                              className={`chipBtn ${isActive ? 'active' : ''}`}
                              onClick={(e) => { e.stopPropagation(); handleVariantSelect(tipo, c.valor, c.imagenUrl); pauseAutoplay(); }}
                            >
                              {c.valor}
                            </button>
                            {c.imagenUrl && (
                              <div className={`variantThumb ${isActive ? 'active' : ''}`}>
                                <img src={c.imagenUrl} alt={c.valor} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="infoActions">
            <button className="btnBuy" onClick={handleCustomWhatsApp}>
              <MessageCircle size={20} /> <span>Comprar Ahora</span>
            </button>
            <button className="btnCart" onClick={handleCustomAddToCart} title="Añadir al Carrito">
              <ShoppingCart size={22} />
            </button>
          </div>

          {/* BENTO GRID DE INFO EXTRA */}
          <div className="bentoGrid">
            {product.lo_que_incluye && product.lo_que_incluye.length > 0 && (
              <div className="bentoCell bentoHalf">
                <h4 className="bentoTitle"><Package size={16} /> Contenido</h4>
                <div className="bentoContent listRow">
                  {product.lo_que_incluye.map((item, i) => (
                    <span key={i} className="bentoTag">{item}</span>
                  ))}
                </div>
              </div>
            )}
            
            {product.caracteristicas && product.caracteristicas.length > 0 && (
              <div className="bentoCell bentoHalf">
                <h4 className="bentoTitle"><ListChecks size={16} /> Destacado</h4>
                <ul className="bentoList">
                  {product.caracteristicas.slice(0, 4).map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}

            {product.detalles && product.detalles.length > 0 && (
              <div className="bentoCell bentoFull">
                <h4 className="bentoTitle"><Info size={16} /> Especificaciones</h4>
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
                <h4 className="bentoTitle">Te recomendamos</h4>
                <div className="recSlider">
                  {recommendedProducts.map((p) => (
                    <div key={p.id} className="recMini" onClick={() => navigate(`/producto/${p.id}`)}>
                      <img src={p.imagenes[0]} alt={p.nombre} />
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

      {/* BARRA DE ACCIONES FIJA PARA MÓVIL */}
      <div className="mobileStickyActions">
        <button className="mobileBtnCart" onClick={handleCustomAddToCart} title="Añadir al carrito">
          <ShoppingCart size={26} />
        </button>
        <button className="mobileBtnBuy" onClick={handleCustomWhatsApp}>
          <MessageCircle size={26} /> <span>Comprar ahora</span>
        </button>
      </div>

      {/* TOAST NOTIFICATION */}
      {toast.show && (
        <div className="customToast animate-in-up">
          <AlertCircle size={20} />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
