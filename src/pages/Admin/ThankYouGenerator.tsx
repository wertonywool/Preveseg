import { useState, useEffect } from 'react';
import { ArrowLeft, Printer, RefreshCw, Instagram, Globe, Palette, Search, Package, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import './ThankYouGenerator.css';

import logoImg from '../../assets/logo.png';
import qrImg from '../../assets/qr_cualy_shop.png';

const THANK_YOU_MESSAGES = [
  "¡Gracias por confiar en nosotros! Esperamos que disfrutes al máximo tu nuevo {producto}.",
  "¡Es oficial! Ya tienes lo mejor en prevención. Gracias por elegir PREVESEG para tu {producto}.",
  "Tu preferencia nos impulsa a seguir mejorando. ¡Disfruta tu {producto}!",
  "¡Qué gran elección! El {producto} es de nuestros favoritos en EPP. Gracias por tu compra.",
  "Gracias por permitirnos ser parte de tu seguridad industrial con este {producto}."
];

const COLORS = [
  { name: 'Preveseg Blue', hex: '#0047AB' },
  { name: 'Safety Red', hex: '#E31B23' },
  { name: 'Elite Dark', hex: '#0f172a' },
  { name: 'Success Green', hex: '#10b981' },
  { name: 'Industrial Steel', hex: '#475569' }
];

const DESIGNS = [
  { id: 1, name: 'Elite Executive' },
  { id: 2, name: 'Tech Modern' },
  { id: 3, name: 'Minimal Zen' },
  { id: 4, name: 'Luxury Gold' },
  { id: 5, name: 'Bold Gradient' }
];

interface ThankYouGeneratorProps {
  isSubComponent?: boolean;
}

const ThankYouGenerator = ({ isSubComponent = false }: ThankYouGeneratorProps) => {
  const navigate = useNavigate();
  
  const [customerName, setCustomerName] = useState('');
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [message, setMessage] = useState('');
  const [accentColor, setAccentColor] = useState('#00AEEF');
  const [designId, setDesignId] = useState(1);
  const [showProductImg, setShowProductImg] = useState(true);
  
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchProducts();
    handleRandomMessage();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from('productos').select('nombre, imagenes').order('nombre');
      if (error) throw error;
      if (data) {
        setProducts(data.map(p => ({
          ...p,
          imagenes: Array.isArray(p.imagenes) ? p.imagenes : JSON.parse(p.imagenes || '[]')
        })));
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleRandomMessage = () => {
    const random = THANK_YOU_MESSAGES[Math.floor(Math.random() * THANK_YOU_MESSAGES.length)];
    setMessage(random);
  };

  const selectProduct = (p: any) => {
    setProductName(p.nombre);
    setProductImage(p.imagenes[0] || '');
    setSearchTerm('');
    setIsSearching(false);
  };

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 174;
    const b = parseInt(hex.slice(5, 7), 16) || 239;
    return `${r}, ${g}, ${b}`;
  };

  const MasterCard = ({ isPreview = false }) => (
    <div 
      className={`thank-you-card v-${designId} ${isPreview ? 'is-preview' : ''}`}
      style={{ '--accent': accentColor, '--accent-rgb': hexToRgb(accentColor) } as any}
    >
      <div className="bg-decoration"></div>
      
      <div className="card-main-content">
        <header className="master-header">
          <div className="master-logo-group">
            <img src={logoImg} alt="Logo" />
            <div className="master-brand-info">
              <span className="master-brand-name">PREVESEG</span>
              <div className="master-tagline">PREVENCIÓN Y SEGURIDAD INDUSTRIAL</div>
            </div>
          </div>
          <div className="date-text">{new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
        </header>

        <main className="master-body">
          <div className="big-thanks-text">¡Gracias por tu compra!</div>

          {showProductImg && (
            <div className="master-product-frame">
              {productImage ? <img src={productImage} alt="Product" /> : <Package size={120} color="#cbd5e1" />}
            </div>
          )}

          <div className="master-text-content">
            <h1 className="master-greeting">¡Hola, {customerName || 'Cliente'}!</h1>
            <p className="master-message">{message.replace('{producto}', productName || 'tu producto')}</p>
          </div>
        </main>

        <footer className="master-footer">
          <div className="contact-blocks">
            <div className="c-block">
              <div className="c-title">Atención al Cliente</div>
              <div className="c-val"><Phone size={22} color={accentColor} /> +57 304 629 6285</div>
            </div>
            <div className="c-block">
              <div className="c-title">Nuestra Comunidad</div>
              <div className="social-grid">
                <div className="s-item"><Instagram size={22} color={accentColor} /> @preveseg</div>
                <div className="s-item"><Globe size={22} color={accentColor} /> preveseg.com</div>
              </div>
            </div>
          </div>
          <div className="master-qr-box">
            <img src={qrImg} alt="QR" />
            <div className="qr-legend">SÍGUENOS</div>
          </div>
        </footer>
      </div>
    </div>
  );

  return (
    <div className={`thankYouPage ${isSubComponent ? 'is-sub' : ''}`}>
      <div className="no-print generator-container-v2">
        {!isSubComponent && (
          <header className="v2-header">
            <button onClick={() => navigate('/Admin_panel')} className="v2-back">
              <ArrowLeft size={20} /> Volver al Panel
            </button>
            <h1>Generador de Cartas <span>QR Premium</span></h1>
          </header>
        )}

        <div className="generator-layout">
          <div className="form-pane">
            <div className="form-card">
              <h3><Palette size={24} /> Configuración de la Carta</h3>
              
              <div className="input-group">
                <label>Nombre del Cliente</label>
                <input type="text" placeholder="Nombre completo" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
              </div>

              <div className="input-group relative">
                <label>Producto</label>
                <div className="search-box-v2">
                  <Search size={18} className="search-icon" />
                  <input type="text" placeholder="Buscar producto..." value={searchTerm || productName} onChange={(e) => {setSearchTerm(e.target.value); setProductName(e.target.value); setIsSearching(true);}} />
                </div>
                {isSearching && searchTerm && (
                  <div className="dropdown-v2">
                    {products.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((p, i) => (
                      <div key={i} className="opt-v2" onClick={() => selectProduct(p)}>
                        {p.imagenes[0] && <img src={p.imagenes[0]} alt="" />}
                        <span>{p.nombre}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="input-group">
                <div className="flex-between">
                  <label>Mensaje</label>
                  <button onClick={handleRandomMessage} className="v2-refresh"><RefreshCw size={14} /> Cambiar mensaje</button>
                </div>
                <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>

              <div className="style-section">
                <label>Diseño Maestro</label>
                <div className="design-grid-v2">
                  {DESIGNS.map(d => (
                    <button key={d.id} className={`design-btn-v2 ${designId === d.id ? 'active' : ''}`} onClick={() => setDesignId(d.id)}>{d.name}</button>
                  ))}
                </div>
              </div>

              <div className="style-section mt-2">
                <label>Color de Identidad</label>
                <div className="color-palette-v2">
                  {COLORS.map(c => (
                    <div key={c.hex} className={`color-swatch ${accentColor === c.hex ? 'active' : ''}`} style={{ background: c.hex }} onClick={() => setAccentColor(c.hex)} />
                  ))}
                  <input type="color" className="v2-picker" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
                </div>
              </div>

              <div className="check-row">
                <input type="checkbox" id="showImg" checked={showProductImg} onChange={() => setShowProductImg(!showProductImg)} />
                <label htmlFor="showImg">Mostrar imagen del producto</label>
              </div>

              <button onClick={() => window.print()} className="print-main-btn">
                <Printer size={24} /> GENERAR E IMPRIMIR CARTA
              </button>
            </div>
          </div>

          <div className="preview-pane">
            <span className="preview-title">VISTA PREVIA REAL (HOJA CARTA)</span>
            <div className="preview-box">
              <div className="preview-scaler">
                <MasterCard isPreview={true} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="print-only">
        <MasterCard isPreview={false} />
      </div>

      <style>{`
        .generator-container-v2 { padding: 2rem; max-width: 1600px; margin: 0 auto; }
        .v2-header { margin-bottom: 3rem; }
        .v2-header h1 { font-size: 2.5rem; font-weight: 900; color: white; margin-top: 1rem; }
        .v2-header h1 span { color: var(--tech-blue); }
        .v2-back { background: none; border: none; color: #64748b; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        
        .search-box-v2 { position: relative; display: flex; align-items: center; }
        .search-box-v2 .search-icon { position: absolute; left: 15px; color: #64748b; }
        .search-box-v2 input { padding-left: 45px !important; }
        
        .dropdown-v2 { position: absolute; top: 100%; left: 0; right: 0; background: #1e293b; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1); z-index: 1000; margin-top: 5px; max-height: 250px; overflow-y: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .opt-v2 { display: flex; align-items: center; gap: 15px; padding: 12px; cursor: pointer; transition: all 0.2s; }
        .opt-v2:hover { background: rgba(255,255,255,0.05); }
        .opt-v2 img { width: 40px; height: 40px; border-radius: 10px; object-fit: cover; }
        .opt-v2 span { font-size: 0.9rem; color: white; }
        
        .flex-between { display: flex; justify-content: space-between; align-items: center; }
        .v2-refresh { background: none; border: none; color: var(--tech-blue); font-size: 0.75rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 5px; }
        
        .mt-2 { margin-top: 2rem; }
        .v2-picker { width: 40px; height: 40px; border: none; background: none; cursor: pointer; padding: 0; }
        
        .check-row { display: flex; align-items: center; gap: 12px; margin-top: 2rem; cursor: pointer; }
        .check-row input { width: 22px; height: 22px; cursor: pointer; }
        .check-row label { font-weight: 700; color: #cbd5e1; cursor: pointer; }
        
        @media print {
          .print-only { display: block !important; }
        }
      `}</style>
    </div>
  );
};

export default ThankYouGenerator;
