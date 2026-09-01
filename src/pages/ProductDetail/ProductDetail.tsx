import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, Play, Loader2, ArrowLeft, ShoppingCart, Check, Info, ListChecks, Package, Share2, X, AlertCircle, ShieldCheck, Truck, Zap, Flame, Shield } from 'lucide-react';
import { useProductDetail, Variant } from '../../hooks/useProductDetail';
import './ProductDetail.css';
import logoImg from '../../assets/logo.png';

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
    recommendedProducts,
    navigate
  } = useProductDetail();

  const [animating, setAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'includes'>('desc');
  
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const variantsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

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
    showToast('¡Equipo añadido al carrito!');
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

  const minSwipeDistance = 40;

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
      if (!product || !product.imagenes || product.imagenes.length <= 1) return;
      
      const totalImages = product.imagenes.length;
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
      }, 250);
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
      }, 350);
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
    }, 250);
  };

  useEffect(() => {
    if (product?.id) window.scrollTo(0, 0);
  }, [product?.id]);

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

  if (loading) {
    return (
      <div className="productDetailPage loadingWrapper">
        <Loader2 className="animate-spin brandSpinner" size={44} />
        <p className="loadingText">Cargando producto certificado...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="productDetailPage errorWrapper">
        <Info size={48} color="#ee1b24" />
        <h2>Equipo no encontrado</h2>
        <p>El producto solicitado no está disponible o ha sido reubicado.</p>
        <button onClick={() => navigate('/productos')} className="brandBackBtn">
          Explorar Catálogo EPP
        </button>
      </div>
    );
  }

  const categoryName = Array.isArray(product.categoria) ? product.categoria[0] : (product.categoria || 'Seguridad Industrial');

  const isKit = Boolean(product.es_kit) || 
    (Array.isArray(product.categoria) && product.categoria.some(c => c.toLowerCase().includes('kit'))) ||
    product.nombre.toLowerCase().includes('kit') ||
    product.nombre.toLowerCase().includes('combo');

  return (
    <div className="productDetailPage page-transition">
      {/* FULLSCREEN IMAGE MODAL PORTAL (COVERS ENTIRE SCREEN & NAVBAR) */}
      {isModalOpen && typeof document !== 'undefined' && createPortal(
        <div className="imageModal" onClick={() => setIsModalOpen(false)}>
          <button 
            type="button" 
            className="modalClose" 
            onClick={() => setIsModalOpen(false)} 
            aria-label="Cerrar vista completa"
          >
            <X size={24} />
          </button>

          <div className="modalImgWrapper" onClick={(e) => e.stopPropagation()}>
            <img 
              src={modalImage} 
              alt="Vista completa del equipo" 
              className="modalImgTag"
              onError={(e) => { (e.target as HTMLImageElement).src = logoImg; }}
            />
          </div>
        </div>,
        document.body
      )}

      {/* TOP COMPACT BAR */}
      <div className="prevesegTopNav">
        <button onClick={() => navigate(-1)} className="topBackBtn" aria-label="Volver">
          <ArrowLeft size={16} />
          <span>Catálogo</span>
        </button>

        <div className="topCategoryPill">
          <span className="categoryGlowDot"></span>
          <span className="categoryLabel">{categoryName}</span>
        </div>

        <button onClick={handleShare} className="topShareBtn" aria-label="Compartir">
          <Share2 size={16} />
        </button>
      </div>

      <div className="prevesegDetailGrid">
        {/* =========================================================================
            1. SHOWCASE MULTIMEDIA (PREVESEG SHIELD GALLERY)
           ========================================================================= */}
        <div className="gallerySection">
          <div 
            className={`showcaseCard ${animating ? 'is-animating' : ''}`}
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
            <div className="flameDiscountBadge certBadge">
                <ShieldCheck size={12} className="flameIcon" />
                <span>CERTIFICADO</span>
              </div>

            {isKit && (
              <div className="kitFloatingBadge">
                <Package size={12} />
                <span>KIT COMBO</span>
              </div>
            )}

            {activeMedia.type === 'image' ? (
              <div className="showcaseImgContainer">
                <img 
                  src={activeMedia.url} 
                  alt={product.nombre} 
                  className="showcaseImg"
                  onError={(e) => { (e.target as HTMLImageElement).src = logoImg; }}
                />
              </div>
            ) : (
              <div className="videoContainer" onClick={() => product.youtube_url && setShowYoutube(true)}>
                {!showYoutube ? (
                  <>
                    <img 
                      src={`https://img.youtube.com/vi/${product.youtube_url?.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/)?.[2] || ''}/hqdefault.jpg`} 
                      alt="Vista previa video" 
                      className="showcaseImg"
                      onError={(e) => { (e.target as HTMLImageElement).src = logoImg; }}
                    />
                    <div className="playBtnOverlay"><Play size={36} fill="white" /></div>
                  </>
                ) : (
                  <iframe src={getYoutubeEmbedUrl(product.youtube_url || '')} frameBorder="0" allowFullScreen title="Video producto"></iframe>
                )}
              </div>
            )}

            {/* DOT INDICATORS FOR CAROUSEL */}
            {product.imagenes && product.imagenes.length > 1 && (
              <div className="carouselDots">
                {product.imagenes.map((img: string, i: number) => (
                  <span 
                    key={i} 
                    className={`carouselDot ${activeMedia.url === img ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMediaChange({ type: 'image', url: img });
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* MINIATURAS HORIZONTALES */}
          {((product.imagenes && product.imagenes.length > 1) || product.youtube_url) && (
            <div className="thumbnailRow scrollbar-hide">
              {product.imagenes?.map((img: string, i: number) => (
                <button 
                  key={i} 
                  className={`thumbnailBtn ${activeMedia.url === img ? 'active' : ''}`} 
                  onClick={() => handleMediaChange({ type: 'image', url: img })}
                  aria-label={`Ver imagen ${i + 1}`}
                >
                  <img 
                    src={img} 
                    alt={`Miniatura ${i + 1}`}
                    onError={(e) => { (e.target as HTMLImageElement).src = logoImg; }}
                  />
                </button>
              ))}
              {product.youtube_url && (
                <button 
                  className={`thumbnailBtn videoThumb ${activeMedia.type === 'video' ? 'active' : ''}`} 
                  onClick={() => handleMediaChange({ type: 'video', url: product.youtube_url || '' })}
                  aria-label="Ver video demostrativo"
                >
                  <Play size={14} className="videoPlayIcon" />
                  <img 
                    src={`https://img.youtube.com/vi/${product.youtube_url?.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/)?.[2] || ''}/hqdefault.jpg`} 
                    alt="Video demostrativo"
                    onError={(e) => { (e.target as HTMLImageElement).src = logoImg; }}
                  />
                </button>
              )}
            </div>
          )}
        </div>

        {/* =========================================================================
            2. PRODUCT DATA & ACTIONS
           ========================================================================= */}
        <div className="infoSection">
          {/* HEADER & TITLES */}
          <div className="productHeaderCard">
            {isKit && (
              <div className="kitHeaderPill">
                <Package size={14} className="kitPillIcon" />
                <span>KIT INDUSTRIAL COMPLETO • AHORRO EN COMBO</span>
              </div>
            )}

            <h1 className="productMainTitle">{product.nombre}</h1>
            
            {/* TARJETA DE PRECIO PREVESEG DUAL ARCS */}
            <div className="brandQuotationCard">
              <div className="quotationHeaderRow">
                <div className="quotationStatusPill">
                  <ShieldCheck size={14} className="qStatusIcon" />
                  <span>EQUIPO DISPONIBLE PARA COTIZACIÓN</span>
                </div>
                <span className="quotationLocationPill">Cali • Cra 28D 72f-79</span>
              </div>
              <p className="quotationSubtitle">
                Venta por unidad y al por mayor para empresas, obras e industrias. Asesoría técnica y despacho inmediato.
              </p>
            </div>

            {/* TRUST BADGES: 3 SEALS OF PREVESEG */}
            <div className="brandTrustRow">
              <div className="trustBadgeItem">
                <ShieldCheck size={15} className="trustIcon blue" />
                <div className="trustItemText">
                  <strong>Certificado</strong>
                  <span>Normas ANSI / OSHA</span>
                </div>
              </div>
              <div className="trustBadgeItem">
                <Truck size={15} className="trustIcon green" />
                <div className="trustItemText">
                  <strong>Envío Seguro</strong>
                  <span>Cobertura Nacional</span>
                </div>
              </div>
              <div className="trustBadgeItem">
                <Zap size={15} className="trustIcon red" />
                <div className="trustItemText">
                  <strong>Despacho</strong>
                  <span>Inmediato</span>
                </div>
              </div>
            </div>
          </div>

          {/* VARIANTES (COLOR / TALLA / CAPACIDAD) */}
          {Object.keys(groupedVariants).length > 0 && (
            <div className="variantsCard" ref={variantsRef}>
              {Object.entries(groupedVariants).map(([tipo, items]: [string, Variant[]]) => (
                <div key={tipo} className="variantGroup">
                  <div className="variantTitleRow">
                    <span className="variantLabel">{tipo}:</span>
                    <span className="variantSelectedText">{selectedVariants[tipo] || 'Selecciona una opción'}</span>
                  </div>

                  <div className="variantOptionsWrap">
                    {tipo.toLowerCase() === 'color' ? (
                      <div className="colorPaletteGrid">
                        {items.map((c: Variant, i: number) => {
                          const isActive = selectedVariants['color'] === c.valor;
                          return (
                            <button 
                              key={i} 
                              type="button"
                              className={`colorChipButton ${isActive ? 'active' : ''}`}
                              onClick={() => { handleVariantSelect('color', c.valor, c.imagenUrl); pauseAutoplay(); }}
                            >
                              <span 
                                className="colorDotPreview" 
                                style={{ backgroundColor: c.color || '#333' }}
                              >
                                {isActive && <Check size={11} color={c.color?.toLowerCase() === '#ffffff' ? '#000' : '#fff'} />}
                              </span>
                              <span className="colorTextLabel">{c.valor}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="sizeChipGrid">
                        {items.map((c: Variant, i: number) => {
                          const isActive = selectedVariants[tipo] === c.valor;
                          return (
                            <button 
                              key={i} 
                              type="button"
                              className={`sizeOptionButton ${isActive ? 'active' : ''}`}
                              onClick={() => { handleVariantSelect(tipo, c.valor, c.imagenUrl); pauseAutoplay(); }}
                            >
                              <span>{c.valor}</span>
                              {isActive && <Check size={13} className="activeCheckIcon" />}
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

          {/* DESKTOP ACTION BUTTONS */}
          <div className="desktopActionsRow">
            <button className="desktopBtnBuy" onClick={handleCustomWhatsApp}>
              <MessageCircle size={20} />
              <span>Solicitar Cotización por WhatsApp</span>
            </button>
            <button className="desktopBtnCart" onClick={handleCustomAddToCart} title="Añadir al Carrito">
              <ShoppingCart size={20} />
              <span>Añadir a mi Cotización</span>
            </button>
          </div>

          {/* =========================================================================
              INTERACTIVE TABS: DESCRIPCIÓN / KIT PIECES | ESPECIFICACIONES | INCLUYE
             ========================================================================= */}
          <div className="productDetailTabsWrapper">
            <div className="tabsHeaderBar">
              <button 
                type="button"
                className={`tabHeaderBtn ${activeTab === 'desc' ? 'active' : ''}`}
                onClick={() => setActiveTab('desc')}
              >
                {isKit ? <Package size={15} /> : <Shield size={15} />}
                <span>{isKit ? 'Piezas del Kit' : 'Descripción'}</span>
              </button>

              <button 
                type="button"
                className={`tabHeaderBtn ${activeTab === 'specs' ? 'active' : ''}`}
                onClick={() => setActiveTab('specs')}
              >
                <ListChecks size={15} />
                <span>Especificaciones</span>
              </button>

              {product.lo_que_incluye && product.lo_que_incluye.length > 0 && !isKit && (
                <button 
                  type="button"
                  className={`tabHeaderBtn ${activeTab === 'includes' ? 'active' : ''}`}
                  onClick={() => setActiveTab('includes')}
                >
                  <Package size={15} />
                  <span>Incluye</span>
                </button>
              )}
            </div>

            {/* TAB CONTENT PANEL */}
            <div className="tabContentPanel">
              {activeTab === 'desc' && (
                <div className="tabPane animate-fade-in">
                  {isKit && product.lo_que_incluye && product.lo_que_incluye.length > 0 && (
                    <div className="kitComponentsBreakdown">
                      <h4 className="kitBreakdownTitle">Componentes Incluidos en este Combo:</h4>
                      <div className="kitItemsList">
                        {product.lo_que_incluye.map((item, i) => (
                          <div key={i} className="kitComponentRow">
                            <div className="kitCheckBadge"><Check size={13} /></div>
                            <span className="kitComponentText">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="tabDescParagraph">{product.descripcion}</p>

                  <div className="brandQualityCallout">
                    <ShieldCheck size={16} className="qualityIcon" />
                    <span>{isKit ? 'Kit completo certificado listo para operación y licitaciones.' : 'Equipo 100% original con respaldo y garantía directa Preveseg.'}</span>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="tabPane animate-fade-in">
                  {product.caracteristicas && product.caracteristicas.length > 0 && (
                    <ul className="cleanSpecsList">
                      {product.caracteristicas.map((item, i) => (
                        <li key={i}>
                          <span className="specBulletDot"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {product.detalles && product.detalles.length > 0 && (
                    <div className="specsTableGrid">
                      {product.detalles.map((det, i) => (
                        <div key={i} className="specItem">
                          <span className="specKey">{det.clave}</span>
                          <span className="specValue">{det.valor}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'includes' && product.lo_que_incluye && (
                <div className="tabPane animate-fade-in">
                  <div className="includesTagsGrid">
                    {product.lo_que_incluye.map((item, i) => (
                      <div key={i} className="includeTagItem">
                        <Check size={14} className="includeCheck" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* EQUIPOS RECOMENDADOS (COMPACT CAROUSEL) */}
          {recommendedProducts.length > 0 && (
            <div className="recommendedSection">
              <div className="recSectionHeader">
                <Flame size={16} className="recHeaderIcon" />
                <h4>Equipos Relacionados</h4>
              </div>
              <div className="recScrollRow scrollbar-hide">
                {recommendedProducts.map((p) => (
                  <div key={p.id} className="recProductCard" onClick={() => navigate(`/producto/${p.id}`)}>
                    <div className="recImgBox">
                      <img 
                        src={p.imagenes[0]} 
                        alt={p.nombre}
                        onError={(e) => { (e.target as HTMLImageElement).src = logoImg; }}
                      />
                    </div>
                    <span className="recCardName">{p.nombre}</span>
                    <span className="recCardPrice quoteTag">Cotizar Equipo</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          3. BARRA INFERIOR FIJA MÓVIL (PREVESEG BRANDED)
         ========================================================================= */}
      <div className="mobileBottomActionBar">
        <div className="mobilePriceBlock">
          <span className="mobilePriceLabel">Cotización Directa</span>
          <span className="mobilePriceAmount">Preveseg Cali</span>
        </div>

        <div className="mobileButtonsGroup">
          <button 
            type="button" 
            className="mobileCartButton" 
            onClick={handleCustomAddToCart} 
            title="Añadir al carrito"
            aria-label="Añadir al carrito"
          >
            <ShoppingCart size={20} />
          </button>
          
          <button 
            type="button" 
            className="mobileWhatsAppButton" 
            onClick={handleCustomWhatsApp}
          >
            <MessageCircle size={18} />
            <span>Cotizar por WhatsApp</span>
          </button>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {toast.show && (
        <div className="brandToastNotification animate-in-up">
          <AlertCircle size={16} />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;


