import { useState, useEffect } from 'react';
import { ArrowLeft, Printer, Search, Dice5, Plus, Minus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../services/supabaseClient';
import SupremeCard from './SupremeCard';
import './QRGenerator.css';

const MESSAGES = [
  "¡Gracias por confiar en nosotros! Esperamos que disfrutes al máximo {productos}.",
  "¡Es oficial! Ya tienes lo mejor en prevención. Gracias por elegir PREVESEG para {productos}.",
  "Tu preferencia nos impulsa a seguir mejorando. ¡Disfruta {productos}!",
  "¡Qué gran elección! {productos} es de nuestros favoritos. Gracias por tu compra.",
  "Gracias por permitirnos ser parte de tu seguridad con {productos}."
];

const QRGenerator = ({ isSubComponent = false }) => {
  const navigate = useNavigate();
  
  // Editor State
  const [customerName, setCustomerName] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [showProductImg, setShowProductImg] = useState(true);
  const [previewZoom, setPreviewZoom] = useState(0.45);
  
  // Data State
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchProducts();
    handleRandomMessage();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from('productos').select('nombre, imagenes, categoria').order('nombre');
      if (error) throw error;
      if (data) {
        setProducts(data.map(p => ({
          ...p,
          imagenes: Array.isArray(p.imagenes) ? p.imagenes : JSON.parse(p.imagenes || '[]')
        })));
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleRandomMessage = () => {
    const random = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    setMessage(random);
  };

  const addProduct = (p: any) => {
    if (selectedProducts.length >= 6) {
      alert('Máximo 6 productos por carta');
      return;
    }
    if (selectedProducts.find(item => item.nombre === p.nombre)) {
      alert('Este producto ya está en la lista');
      return;
    }
    setSelectedProducts([...selectedProducts, { 
      nombre: p.nombre, 
      imagen: p.imagenes[0] || '',
      imagenes: p.imagenes || [],
      currentImgIdx: 0,
      scale: 1 
    }]);
    setSearchTerm('');
    setIsSearching(false);
  };

  const nextImage = (idx: number) => {
    const p = selectedProducts[idx];
    if (!p.imagenes || p.imagenes.length <= 1) return;
    const nextIdx = (p.currentImgIdx + 1) % p.imagenes.length;
    const newProducts = [...selectedProducts];
    newProducts[idx] = { ...p, currentImgIdx: nextIdx, imagen: p.imagenes[nextIdx] };
    setSelectedProducts(newProducts);
  };

  const prevImage = (idx: number) => {
    const p = selectedProducts[idx];
    if (!p.imagenes || p.imagenes.length <= 1) return;
    const prevIdx = (p.currentImgIdx - 1 + p.imagenes.length) % p.imagenes.length;
    const newProducts = [...selectedProducts];
    newProducts[idx] = { ...p, currentImgIdx: prevIdx, imagen: p.imagenes[prevIdx] };
    setSelectedProducts(newProducts);
  };

  const updateProduct = (idx: number, field: string, value: any) => {
    const newProducts = [...selectedProducts];
    newProducts[idx] = { ...newProducts[idx], [field]: value };
    setSelectedProducts(newProducts);
  };

  const removeProduct = (idx: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== idx));
  };

  const getDynamicMessage = () => {
    if (selectedProducts.length === 0) return message.replace('{productos}', 'tu nueva adquisición');
    
    let productText = '';
    if (selectedProducts.length === 1) {
      productText = `tu ${selectedProducts[0].nombre}`;
    } else if (selectedProducts.length > 1) {
      productText = `estos ${selectedProducts.length} productos`;
      if (selectedProducts.length >= 4) {
        return `¡Wow! Gracias por confiar en nosotros para toda esta tecnología. Disfruta al máximo tus ${selectedProducts.length} nuevos productos.`;
      }
    }
    
    return message.replace('{productos}', productText);
  };

  return (
    <div className={`qr-page-container ${isSubComponent ? 'is-sub' : ''}`}>
      <div className="no-print qr-admin-layout">
        
        {/* Sidebar de Configuración */}
        <aside className="qr-sidebar-panel animate-in">
          <div className="sidebar-header">
            {!isSubComponent && (
              <button onClick={() => navigate('/Admin_panel')} className="qr-back-link">
                <ArrowLeft size={18} /> Volver al Panel
              </button>
            )}
            <h2><span>Preveseg</span> Supreme</h2>
            <p className="sidebar-subtitle">Editor de Cartas de Lujo</p>
          </div>

          <div className="qr-form-sections">
            <div className="qr-input-group">
              <label>Identidad del Cliente</label>
              <div className="input-with-icon">
                <input 
                  type="text" 
                  placeholder="Nombre del destinatario..." 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
            </div>

            <div className="qr-input-group">
              <label>Productos Adquiridos ({selectedProducts.length}/6)</label>
              <div className="qr-search-wrap">
                <input 
                  type="text" 
                  placeholder="Busca y agrega productos..." 
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsSearching(true);
                  }}
                  onFocus={() => setIsSearching(true)}
                />
                <Search size={18} className="qr-s-icon" />
                {isSearching && searchTerm && (
                  <div className="qr-dropdown-list shadow-2xl">
                    {products.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((p, i) => (
                      <div key={i} className="qr-item-opt" onClick={() => addProduct(p)}>
                        <div className="opt-img-wrap">
                          {p.imagenes[0] && <img src={p.imagenes[0]} alt="" />}
                        </div>
                        <div className="opt-info">
                          <span className="opt-name">{p.nombre}</span>
                        </div>
                        <Dice5 size={14} className="add-icon" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Lista Detallada de productos seleccionados */}
              <div className="selected-products-list-admin">
                {selectedProducts.map((p, i) => (
                  <div key={i} className="p-item-edit-box">
                    <div className="p-edit-top">
                      <div className="p-edit-img-wrap">
                        <div className="p-edit-img">
                          <img src={p.imagen} alt="" />
                        </div>
                        {p.imagenes && p.imagenes.length > 1 && (
                          <div className="img-nav-mini">
                            <button onClick={() => prevImage(i)}><ChevronLeft size={10} /></button>
                            <span className="img-count">{p.currentImgIdx + 1}/{p.imagenes.length}</span>
                            <button onClick={() => nextImage(i)}><ChevronRight size={10} /></button>
                          </div>
                        )}
                      </div>
                      <input 
                        type="text" 
                        value={p.nombre} 
                        onChange={(e) => updateProduct(i, 'nombre', e.target.value)}
                        className="p-name-input"
                      />
                      <button onClick={() => removeProduct(i)} className="p-del-btn" title="Eliminar">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="p-edit-controls">
                      <span className="control-label">Tamaño Imagen:</span>
                      <div className="scale-btns">
                        <button onClick={() => updateProduct(i, 'scale', Math.max(0.1, p.scale - 0.1))}><Minus size={14} /></button>
                        <span className="scale-val">{Math.round(p.scale * 100)}%</span>
                        <button onClick={() => updateProduct(i, 'scale', Math.min(5, p.scale + 0.1))}><Plus size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="qr-input-group">
              <label>Zoom Vista Previa</label>
              <div className="scale-btns full-width">
                <button onClick={() => setPreviewZoom(Math.max(0.1, previewZoom - 0.05))}><Minus size={16} /></button>
                <div className="zoom-slider-wrap">
                  <input 
                    type="range" 
                    min="0.1" 
                    max="1.5" 
                    step="0.01" 
                    value={previewZoom} 
                    onChange={(e) => setPreviewZoom(parseFloat(e.target.value))}
                    className="zoom-range-input"
                  />
                </div>
                <button onClick={() => setPreviewZoom(Math.min(1.5, previewZoom + 0.05))}><Plus size={16} /></button>
                <span className="scale-val">{Math.round(previewZoom * 100)}%</span>
              </div>
            </div>

            <div className="qr-input-group">
              <div className="label-flex">
                <label>Mensaje Personalizado</label>
                <button onClick={handleRandomMessage} className="qr-btn-text">
                  <Dice5 size={14} /> Sugerir otro
                </button>
              </div>
              <textarea 
                rows={4} 
                className="pro-textarea"
                placeholder="Escribe algo especial para tu cliente..."
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
              />
              <p className="msg-preview-hint">Se usará: "{getDynamicMessage()}"</p>
            </div>

            <div className="qr-options-box">
              <label className="qr-toggle-premium">
                <span>Mostrar Imágenes</span>
                <input 
                  type="checkbox" 
                  checked={showProductImg} 
                  onChange={() => setShowProductImg(!showProductImg)} 
                />
                <div className="toggle-display">
                  <div className="toggle-knob"></div>
                </div>
              </label>
            </div>

            <button onClick={() => window.print()} className="qr-primary-btn">
              <Printer size={24} /> GENERAR E IMPRIMIR
            </button>
          </div>
        </aside>

        {/* Área de Visualización */}
        <main className="qr-main-preview">
          <div className="preview-header-label">Vista Previa Real</div>
          <div className="qr-scaler-container">
            <div className="qr-scaler" style={{ transform: `scale(${previewZoom})` }}>
              <SupremeCard 
                customerName={customerName}
                products={selectedProducts}
                message={getDynamicMessage()}
                showImages={showProductImg}
                isPreview={true}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Capa Exclusiva de Impresión */}
      <div className="print-exclusive">
        <SupremeCard 
          customerName={customerName}
          products={selectedProducts}
          message={getDynamicMessage()}
          showImages={showProductImg}
          isPreview={false}
        />
      </div>

      <style>{`
        .selected-products-list-admin { display: flex; flex-direction: column; gap: 10px; margin-top: 15px; }
        .p-item-edit-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 10px; }
        .p-edit-top { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        
        .p-edit-img-wrap { position: relative; display: flex; flex-direction: column; gap: 4px; align-items: center; }
        .p-edit-img { width: 45px; height: 45px; border-radius: 8px; overflow: hidden; background: #000; flex-shrink: 0; border: 1px solid rgba(255,255,255,0.1); }
        .p-edit-img img { width: 100%; height: 100%; object-fit: cover; }
        
        .img-nav-mini { display: flex; align-items: center; gap: 4px; background: rgba(0,0,0,0.4); border-radius: 4px; padding: 1px 4px; }
        .img-nav-mini button { background: none; border: none; color: white; cursor: pointer; display: flex; align-items: center; opacity: 0.7; }
        .img-nav-mini button:hover { opacity: 1; color: var(--tech-blue); }
        .img-count { font-size: 0.6rem; color: #94a3b8; font-weight: 800; min-width: 25px; text-align: center; }

        .p-name-input { flex: 1; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 4px 8px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; outline: none; }
        .p-name-input:focus { border-color: var(--tech-blue); }
        .p-del-btn { background: none; border: none; color: #ef4444; opacity: 0.6; cursor: pointer; padding: 4px; transition: 0.2s; }
        .p-del-btn:hover { opacity: 1; transform: scale(1.1); }
        
        .p-edit-controls { display: flex; align-items: center; justify-content: space-between; padding-top: 5px; border-top: 1px solid rgba(255,255,255,0.05); }
        .control-label { font-size: 0.7rem; color: #64748b; font-weight: 700; }
        .scale-btns { display: flex; align-items: center; gap: 10px; }
        .scale-btns button { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
        .scale-btns button:hover { background: var(--tech-blue); border-color: var(--tech-blue); }
        .scale-val { font-size: 0.75rem; font-weight: 800; color: var(--tech-blue); min-width: 40px; text-align: center; }

        .add-icon { color: var(--tech-blue); opacity: 0.5; }
        .msg-preview-hint { font-size: 0.7rem; color: #64748b; margin-top: 8px; font-style: italic; }

        .qr-scaler-container { 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          width: 100%; 
          height: 100%; 
          overflow: auto;
          padding: 100px;
          scrollbar-width: thin;
          scrollbar-color: var(--tech-blue) transparent;
        }
        .qr-scaler-container::-webkit-scrollbar { width: 6px; height: 6px; }
        .qr-scaler-container::-webkit-scrollbar-thumb { background: var(--tech-blue); border-radius: 10px; }

        .zoom-slider-wrap { flex: 1; display: flex; align-items: center; }
        .zoom-range-input { width: 100%; cursor: pointer; accent-color: var(--tech-blue); }
        .scale-btns.full-width { background: rgba(0,0,0,0.2); padding: 12px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.05); }
      `}</style>
    </div>
  );
};

export default QRGenerator;
