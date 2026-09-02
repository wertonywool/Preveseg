import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Send, CheckCircle2 } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    servicio: 'Recarga de Extintores',
    mensaje: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola Preveseg Cali!\n*Nueva Solicitud desde la Web:*\n- *Nombre:* ${formData.nombre}\n- *Empresa:* ${formData.empresa || 'Particular'}\n- *Teléfono:* ${formData.telefono}\n- *Servicio / Equipo:* ${formData.servicio}\n- *Detalle:* ${formData.mensaje}`;
    const url = `https://wa.me/573046296285?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="contactPage page-transition">
      {/* HERO HEADER */}
      <section className="contactHero">
        <div className="container">
          <div className="contactHeroContent">
            <span className="pageTagRed">— ATENCIÓN Y UBICACIÓN OFICIAL</span>
            <h1>Contáctanos en <span className="textRed">Cali</span></h1>
            <p className="heroLead">
              Estamos a tu disposición para asesorarte en la compra, recarga e inspección de equipos contra incendio y seguridad industrial. Atención personalizada para empresas e independientes.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT: INFO CARDS & CONTACT FORM */}
      <section className="contactMainSection">
        <div className="container">
          <div className="contactGrid">
            {/* LEFT: INFORMATION CARDS */}
            <div className="contactInfoCol">
              <h2>Canales Directos de Atención</h2>
              <p className="colSubtitle">Visítanos en nuestra sede principal o comunícate directamente con nuestro equipo técnico.</p>

              <div className="infoCardList">
                <div className="contactInfoCard">
                  <div className="cardIcon red"><MapPin size={24} /></div>
                  <div className="cardDetails">
                    <strong>Dirección Sede Principal</strong>
                    <p>Cra 28D 72f-79, Cali, Valle del Cauca</p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Cra+28D+72f-79+Cali" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="cardLink"
                    >
                      Ver en Google Maps →
                    </a>
                  </div>
                </div>

                <div className="contactInfoCard">
                  <div className="cardIcon green"><Phone size={24} /></div>
                  <div className="cardDetails">
                    <strong>Teléfono & WhatsApp</strong>
                    <p>+57 304 629 6285</p>
                    <a 
                      href="https://wa.me/573046296285?text=Hola%20Preveseg%2C%20quisiera%20solicitar%20asesor%C3%ADa." 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="cardLink"
                    >
                      Chatear por WhatsApp →
                    </a>
                  </div>
                </div>

                <div className="contactInfoCard">
                  <div className="cardIcon blue"><Clock size={24} /></div>
                  <div className="cardDetails">
                    <strong>Horarios de Atención</strong>
                    <p><strong>Lunes a Viernes:</strong> 8:00 am – 6:00 pm</p>
                    <p><strong>Sábados:</strong> 8:00 am – 4:00 pm</p>
                    <span className="emergencyTag">Emergencias empresariales atendidas por WhatsApp</span>
                  </div>
                </div>

                <div className="contactInfoCard">
                  <div className="cardIcon gray"><Mail size={24} /></div>
                  <div className="cardDetails">
                    <strong>Correo Electrónico</strong>
                    <p>prevesegcali@gmail.com</p>
                    <a href="mailto:prevesegcali@gmail.com" className="cardLink">Enviar un correo →</a>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: INTERACTIVE FORM */}
            <div className="contactFormCol">
              <div className="contactFormCard">
                <h3>Solicitud Rápida de Cotización</h3>
                <p>Completa el formulario y te enviaremos la propuesta técnica de inmediato.</p>

                <form onSubmit={handleSubmit} className="quickForm">
                  <div className="formGroup">
                    <label>Nombre Completo *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Tu nombre o responsable de compras"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    />
                  </div>

                  <div className="formRow">
                    <div className="formGroup">
                      <label>Empresa / Razón Social</label>
                      <input 
                        type="text" 
                        placeholder="Nombre de la empresa (opcional)"
                        value={formData.empresa}
                        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      />
                    </div>
                    <div className="formGroup">
                      <label>Teléfono o WhatsApp *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="Ej. 3046296285"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="formGroup">
                    <label>Servicio o Equipos Requeridos *</label>
                    <select 
                      value={formData.servicio}
                      onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                    >
                      <option value="Recarga de Extintores">Recarga de Extintores</option>
                      <option value="Mantenimiento y Pruebas Hidrostáticas">Mantenimiento y Pruebas Hidrostáticas</option>
                      <option value="Compra de Extintores Nuevos">Compra de Extintores Nuevos</option>
                      <option value="Camillas y Botiquines">Camillas y Botiquines</option>
                      <option value="Kits de Carretera y Seguridad Vial">Kits de Carretera y Seguridad Vial</option>
                      <option value="Dotaciones y EPP">Dotaciones y EPP</option>
                      <option value="Capacitaciones y Brigadas">Capacitaciones y Brigadas</option>
                      <option value="Inspección y Codificación Bomberil">Inspección y Codificación Bomberil</option>
                      <option value="Otro Requerimiento">Otro Requerimiento</option>
                    </select>
                  </div>

                  <div className="formGroup">
                    <label>Detalles de la Solicitud</label>
                    <textarea 
                      rows={3} 
                      placeholder="Indica cantidades aproximadas, tipo de extintores o dudas específicas..."
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="formSubmitBtn">
                    <Send size={18} /> Enviar Solicitud por WhatsApp
                  </button>

                  <div className="formGuarantee">
                    <CheckCircle2 size={16} className="textRed" />
                    <span>Respuesta en menos de 15 minutos en horario hábil.</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOOGLE MAPS EMBED */}
      <section className="contactMapSection">
        <div className="container">
          <div className="mapContainerCard">
            <div className="mapHeader">
              <div className="mapTitle">
                <Navigation size={22} className="textRed" />
                <div>
                  <h4>Sede Principal en Cali</h4>
                  <span>Cra 28D 72f-79, Cali, Valle del Cauca</span>
                </div>
              </div>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Cra+28D+72f-79+Cali" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btnRedPill"
              >
                Abrir en Google Maps
              </a>
            </div>
            
            <div className="mapIframeWrapper">
              <iframe
                title="Ubicación Preveseg Cali"
                src="https://maps.google.com/maps?q=Cra%2028D%2072f-79%20Cali&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="380"
                style={{ border: 0, display: 'block' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
