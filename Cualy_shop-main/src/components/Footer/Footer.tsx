import { Instagram, MessageCircle } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const WHATSAPP_NUMBER = '573189029468';

  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="footerSection">
          <div className="footerLogo">
            <img 
              src="/logo.png" 
              alt="Cualy Shop Logo" 
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            <h3>Cualy Shop</h3>
          </div>

          <p>Tu tienda de confianza para lo último en tecnología. Calidad, garantía y los mejores precios del mercado.</p>
        </div>
        
        <div className="footerSection">
          <h3>Contacto</h3>
          <p>WhatsApp: +57 318 902 9468</p>
        </div>
        
        <div className="footerSection">
          <h3>Síguenos</h3>
          <div className="socialLinks">
            <a href="https://instagram.com/cualy_shop" target="_blank" rel="noopener noreferrer" className="socialIcon">
              <Instagram size={20} />
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="socialIcon">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="copyright">
        © {new Date().getFullYear()} Cualy Shop. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
