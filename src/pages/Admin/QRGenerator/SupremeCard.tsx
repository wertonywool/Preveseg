import React from 'react';
import { Phone, Instagram, Globe, ShieldCheck, Award, Package, Flame } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import logoImg from '../../../assets/logo.png';

interface SupremeCardProps {
  customerName: string;
  products: { nombre: string, imagen: string, scale?: number }[];
  message: string;
  showImages: boolean;
  isPreview?: boolean;
}

const SupremeCard: React.FC<SupremeCardProps> = ({ 
  customerName, 
  products = [], 
  message, 
  showImages,
  isPreview = false 
}) => {
  const currentDate = new Date().toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const iconSize = isPreview ? 14 : 11;
  const qrSize = isPreview ? 120 : 130;

  return (
    <div className={`supreme-card ${isPreview ? 'is-preview' : 'is-final'}`}>
      {/* CINTA SUPERIOR DUAL PREVESEG (AZUL REAL & ROJO FUEGO) */}
      <div className="card-top-accent-bar"></div>
      
      {/* MARCO INDUSTRIAL DE SEGURIDAD */}
      <div className="card-security-frame">
        <div className="frame-corner top-left"></div>
        <div className="frame-corner top-right"></div>
        <div className="frame-corner bottom-left"></div>
        <div className="frame-corner bottom-right"></div>
      </div>
      
      <div className="supreme-card-content">
        
        {/* =========================================================================
            1. ENCABEZADO OFICIAL PREVESEG
           ========================================================================= */}
        <header className="supreme-header">
          <div className="header-left">
            <img src={logoImg} alt="Preveseg Logo" className="main-logo" />
            <div className="brand-titles">
              <h2 className="brand-name">
                <span className="brand-navy">PREVE</span><span className="brand-red">SEG</span>
              </h2>
              <span className="brand-motto">PREVENCIÓN Y SEGURIDAD INDUSTRIAL</span>
            </div>
          </div>
          
          <div className="header-right">
            <div className="security-seal-badge">
              <ShieldCheck size={14} className="seal-icon" />
              <span>CERTIFICADO DE ENTREGA</span>
            </div>
            <div className="date-badge">{currentDate}</div>
          </div>
        </header>

        {/* =========================================================================
            2. CUERPO DE LA CARTA
           ========================================================================= */}
        <main className="supreme-body">
          {/* DISTINCIÓN Y DESTINATARIO */}
          <div className="recipient-zone">
            <div className="gratitude-pill">
              <Award size={13} className="gratitude-icon" />
              <span>CON APRECIO PARA</span>
            </div>
            <h1 className="customer-display">{customerName || 'Nuestro Distinguido Cliente'}</h1>
            <div className="dual-brand-divider">
              <span className="div-blue"></span>
              <span className="div-red"></span>
            </div>
          </div>

          {/* ÁREA DE PRODUCTOS ADQUIRIDOS */}
          <div className="product-presentation-container">
            {products.length > 0 ? (
              <div className={`product-showcase-grid ${products.length > 1 ? 'is-multi' : 'is-single'}`}>
                {products.map((p, idx) => (
                  <div key={idx} className="supreme-product-card">
                    {showImages && p.imagen && (
                      <div className="p-img-box">
                        <img 
                          src={p.imagen} 
                          alt={p.nombre} 
                          style={{ transform: `scale(${p.scale || 1})` }}
                        />
                      </div>
                    )}
                    <div className="p-info-box">
                      <div className="p-tag-row">
                        <span className="p-tag-badge">
                          <Package size={11} /> EQUIPO CERTIFICADO
                        </span>
                      </div>
                      <h3 className="p-name">{p.nombre}</h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="supreme-product-card fallback-single">
                <div className="fallback-icon-wrap">
                  <ShieldCheck size={42} className="fallback-shield" />
                </div>
                <div className="p-info-box">
                  <span className="p-tag-badge"><Package size={11} /> EQUIPOS DE PROTECCIÓN</span>
                  <h3 className="p-name">Dotación y Seguridad Industrial</h3>
                  <span className="p-subnorm">Cumplimiento Normativo ANSI / OSHA</span>
                </div>
              </div>
            )}
          </div>

          {/* MENSAJE DE AGRADECIMIENTO */}
          <div className="supreme-message-card">
            <div className="quote-mark">“</div>
            <p className="message-text">
              {message || 'Gracias por confiar en nosotros. Esperamos que disfrutes al máximo tu equipo de seguridad y prevención.'}
            </p>
            <div className="quote-mark end">”</div>
          </div>
        </main>

        {/* =========================================================================
            3. PIE DE PÁGINA: CONTACTO Y QR OFICIAL
           ========================================================================= */}
        <footer className="supreme-footer">
          <div className="footer-left-info">
            <div className="contact-pillars-grid">
              <div className="contact-pillar">
                <div className="pillar-label">
                  <span className="dot-blue"></span> LÍNEA DE ATENCIÓN
                </div>
                <div className="pillar-val">
                  <div className="val-icon-box blue"><Phone size={iconSize} /></div>
                  <span>+57 304 629 6285</span>
                </div>
              </div>

              <div className="contact-pillar">
                <div className="pillar-label">
                  <span className="dot-red"></span> CATÁLOGO EN LÍNEA
                </div>
                <div className="pillar-val">
                  <div className="val-icon-box red"><Globe size={iconSize} /></div>
                  <span>preveseg.com</span>
                </div>
              </div>

              <div className="contact-pillar">
                <div className="pillar-label">
                  <span className="dot-blue"></span> SEDE CALI
                </div>
                <div className="pillar-val">
                  <div className="val-icon-box navy"><Instagram size={iconSize} /></div>
                  <span>Cra 28D 72f-79</span>
                </div>
              </div>
            </div>

            <div className="footer-guarantee-note">
              <ShieldCheck size={13} className="note-icon" />
              <span>Garantía directa, mantenimiento e inspección técnica reglamentaria.</span>
            </div>
          </div>

          {/* ZONA DE CÓDIGO QR */}
          <div className="qr-master-zone">
            <div className="qr-card-frame">
              <QRCodeSVG 
                value="https://preveseg.com/"
                size={qrSize}
                level="H"
                includeMargin={false}
                className="qr-svg-render"
                imageSettings={{
                  src: logoImg,
                  height: qrSize * 0.24,
                  width: qrSize * 0.24,
                  excavate: true,
                }}
              />
              <div className="qr-instructions-badge">
                <Flame size={11} className="qr-badge-flame" />
                <span>ESCANEA PARA MÁS</span>
              </div>
            </div>
          </div>
        </footer>

        {/* MICRO-PIE INSTITUCIONAL */}
        <div className="card-micro-legal">
          <span>PREVESEG • Venta y Mantenimiento de Equipos Contra Incendio • Cra 28D 72f-79, Cali • prevesegcali@gmail.com</span>
        </div>

      </div>
    </div>
  );
};

export default SupremeCard;
