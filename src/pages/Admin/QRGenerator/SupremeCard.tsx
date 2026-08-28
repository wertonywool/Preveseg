import React from 'react';
import { Phone, Instagram, Globe } from 'lucide-react';
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

  // Ajustes de tamaño: Iconos más pequeños, QR más grande
  const iconSize = isPreview ? 14 : 10;
  const qrSize = isPreview ? 120 : 135;

  return (
    <div className={`supreme-card ${isPreview ? 'is-preview' : 'is-final'}`}>
      {/* Marco de Lujo AZUL */}
      <div className="card-border-frame"></div>
      
      <div className="supreme-card-content">
        
        {/* Header */}
        <header className="supreme-header">
          <div className="header-left">
            <img src={logoImg} alt="Preveseg Logo" className="main-logo" />
            <div className="brand-titles">
              <h2 className="brand-name">PREVESEG</h2>
              <span className="brand-motto">PREVENCIÓN Y SEGURIDAD INDUSTRIAL</span>
            </div>
          </div>
          <div className="header-right">
            <div className="date-badge">{currentDate}</div>
          </div>
        </header>

        {/* Body */}
        <main className="supreme-body">
          <div className="gratitude-line">CON APRECIO PARA</div>
          <h1 className="customer-display">{customerName || 'Nuestro Distinguido Cliente'}</h1>
          
          <div className="divider-glow"></div>

          <div className={`product-area ${products.length > 1 ? 'is-grid' : ''}`}>
            {products.length > 0 ? (
              products.map((p, idx) => (
                <div key={idx} className="supreme-product-card">
                  {showImages && p.imagen && (
                    <div className="p-img-box">
                      <img src={p.imagen} alt={p.nombre} />
                    </div>
                  )}
                  <div className="p-info-box">
                    <span className="p-tag">EQUIPO ADQUIRIDO</span>
                    <h3 className="p-name">{p.nombre}</h3>
                  </div>
                </div>
              ))
            ) : (
              <div className="supreme-product-card fallback">
                <div className="p-info-box">
                  <span className="p-tag">SU COMPRA</span>
                  <h3 className="p-name">Equipos de Seguridad Industrial</h3>
                </div>
              </div>
            )}
          </div>

          <div className="supreme-message-quote">
            <p>"{message || 'Gracias por tu compra. Estamos para servirte.'}"</p>
          </div>
        </main>

        {/* Footer */}
        <footer className="supreme-footer">
          <div className="footer-left-info">
            <div className="contact-row">
              <div className="contact-item">
                <span className="c-label">SERVICIO AL CLIENTE</span>
                <span className="c-value"><Phone size={iconSize} color="#0047AB" className="print-icon" /> +57 304 629 6285</span>
              </div>
              <div className="contact-item">
                <span className="c-label">NUESTRA WEB</span>
                <span className="c-value"><Globe size={iconSize} color="#0047AB" className="print-icon" /> preveseg.com</span>
              </div>
            </div>
            <div className="social-presence">
              <Instagram size={iconSize} color="#0047AB" className="print-icon" /> <span>@preveseg</span>
            </div>
          </div>

          <div className="qr-master-zone">
            <div className="qr-wrapper-premium">
              <QRCodeSVG 
                value="https://preveseg.com/"
                size={qrSize}
                level="H"
                includeMargin={false}
                className="qr-svg-render"
                imageSettings={{
                  src: logoImg,
                  height: qrSize * 0.22,
                  width: qrSize * 0.22,
                  excavate: true,
                }}
              />
              <div className="qr-instructions">ESCANEA PARA MÁS</div>
            </div>
          </div>
        </footer>

      </div>

      <style>{`
        .product-area.is-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin: 10px 0;
        }
        .product-item-supreme {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }
        .image-presentation img, .image-presentation svg {
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .is-grid .image-presentation {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .is-grid .product-name-label {
          font-size: 0.6rem;
          max-height: 2.4em;
          overflow: hidden;
          text-align: center;
        }
        .supreme-card.is-final .is-grid .image-presentation {
          width: 60px;
          height: 60px;
        }
      `}</style>
    </div>
  );
};

export default SupremeCard;
