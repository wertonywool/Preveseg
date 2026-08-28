import { useState, useEffect } from 'react';
import { Mail, Users, Send, Trash2, Search, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../../../services/supabaseClient';

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

const NewsletterManager = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState({ subject: '', content: '' });
  const [status, setStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSubscribers(data);
    }
    setLoading(false);
  };

  const deleteSubscriber = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este suscriptor?')) return;

    const { error } = await supabase
      .from('newsletter_subscriptions')
      .delete()
      .eq('id', id);

    if (!error) {
      setSubscribers(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.subject || !message.content) {
      alert('Por favor completa el asunto y el mensaje.');
      return;
    }

    if (subscribers.length === 0) {
      alert('No hay suscriptores a quienes enviar.');
      return;
    }

    setSending(true);
    setStatus(null);

    try {
      const { error } = await supabase.functions.invoke('send-newsletter', {
        body: {
          subject: message.subject,
          content: message.content,
          recipients: subscribers.map(s => s.email)
        }
      });

      if (error) throw error;

      setStatus({ 
        type: 'success', 
        text: `Mensaje enviado correctamente a ${subscribers.length} suscriptores.` 
      });
      setMessage({ subject: '', content: '' });
    } catch (err: any) {
      console.error('Error sending newsletter:', err);
      setStatus({ 
        type: 'error', 
        text: err.message || 'Hubo un error al intentar enviar los correos.' 
      });
    } finally {
      setSending(false);
    }
  };

  const filteredSubscribers = subscribers.filter(s => 
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="newsletterManager animate-in">
      <div className="nmGrid">
        {/* COMPONER MENSAJE */}
        <div className="nmSection composeSection">
          <div className="sectionHeader">
            <Mail className="headerIcon" />
            <div>
              <h3>Redactar Boletín</h3>
              <p>Envía una novedad a todos tus suscriptores</p>
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="nmForm">
            <div className="formGroup">
              <label>Asunto del correo</label>
              <input 
                type="text" 
                placeholder="Ej: ¡Nuevos Gadgets Disponibles!" 
                value={message.subject}
                onChange={e => setMessage({ ...message, subject: e.target.value })}
                required
              />
            </div>
            <div className="formGroup">
              <label>Mensaje (HTML permitido)</label>
              <textarea 
                placeholder="Escribe aquí el contenido de tu boletín..." 
                rows={10}
                value={message.content}
                onChange={e => setMessage({ ...message, content: e.target.value })}
                required
              ></textarea>
            </div>

            {status && (
              <div className={`statusBanner ${status.type}`}>
                {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span>{status.text}</span>
              </div>
            )}

            <button type="submit" className="sendBtn" disabled={sending || subscribers.length === 0}>
              {sending ? (
                <> <Loader2 className="animate-spin" size={20} /> Enviando... </>
              ) : (
                <> <Send size={20} /> Enviar a {subscribers.length} personas </>
              )}
            </button>
            {subscribers.length === 0 && (
              <p className="emptyHint">No hay suscriptores registrados aún.</p>
            )}
          </form>
        </div>

        {/* LISTA DE SUSCRIPTORES */}
        <div className="nmSection listSection">
          <div className="sectionHeader">
            <Users className="headerIcon" />
            <div>
              <h3>Suscriptores ({subscribers.length})</h3>
              <p>Lista completa de correos registrados</p>
            </div>
          </div>

          <div className="nmSearch">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Buscar correo..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="subList">
            {loading ? (
              <div className="nmLoading"><Loader2 className="animate-spin" /></div>
            ) : filteredSubscribers.length > 0 ? (
              filteredSubscribers.map(sub => (
                <div key={sub.id} className="subItem">
                  <div className="subInfo">
                    <span className="subEmail">{sub.email}</span>
                    <span className="subDate">Unido el {new Date(sub.created_at).toLocaleDateString()}</span>
                  </div>
                  <button onClick={() => deleteSubscriber(sub.id)} className="deleteSubBtn" title="Eliminar">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className="emptyList">
                <Users size={32} />
                <p>No se encontraron suscriptores</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .newsletterManager { display: flex; flex-direction: column; gap: 1.5rem; width: 100%; }
        .nmGrid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 1.5rem; }
        
        .nmSection { 
          background: #070b14; 
          border-radius: 18px; 
          padding: 1.5rem; 
          border: 1px solid rgba(255,255,255,0.08); 
          display: flex; 
          flex-direction: column; 
          gap: 1.25rem;
        }

        .sectionHeader { display: flex; align-items: center; gap: 14px; }
        .headerIcon { color: #60a5fa; }
        .sectionHeader h3 { font-size: 1.15rem; color: white; margin: 0; font-weight: 800; }
        .sectionHeader p { font-size: 0.82rem; color: #94a3b8; margin: 2px 0 0 0; }

        .nmForm { display: flex; flex-direction: column; gap: 1.25rem; }
        .formGroup { display: flex; flex-direction: column; gap: 6px; }
        .formGroup label { font-size: 0.88rem; color: #cbd5e1; font-weight: 700; }
        .formGroup input, .formGroup textarea {
          background: #0d1527;
          border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 12px 15px;
          color: white;
          outline: none;
          font-size: 0.95rem;
          font-family: inherit;
          transition: border-color 0.25s;
        }
        .formGroup input:focus, .formGroup textarea:focus { border-color: #0066ff; }

        .sendBtn {
          background: linear-gradient(135deg, #0066ff 0%, #0047cc 100%);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          padding: 14px;
          font-weight: 800;
          font-size: 0.92rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.25s;
          box-shadow: 0 4px 15px rgba(0, 102, 255, 0.35);
        }
        .sendBtn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0, 102, 255, 0.5); }
        .sendBtn:disabled { opacity: 0.5; cursor: not-allowed; }

        .nmSearch {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #0d1527;
          border-radius: 12px;
          padding: 10px 14px;
          border: 1.5px solid rgba(255,255,255,0.08);
        }
        .nmSearch input { background: none; border: none; color: white; outline: none; width: 100%; font-size: 0.9rem; }
        .nmSearch svg { color: #64748b; }

        .subList { display: flex; flex-direction: column; gap: 8px; max-height: 450px; overflow-y: auto; padding-right: 4px; }
        .subList::-webkit-scrollbar { width: 5px; }
        .subList::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

        .subItem {
          background: #0d1527;
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .subInfo { display: flex; flex-direction: column; }
        .subEmail { color: white; font-size: 0.88rem; font-weight: 700; }
        .subDate { color: #64748b; font-size: 0.72rem; }

        .deleteSubBtn { background: rgba(238, 27, 36, 0.1); border: 1px solid rgba(238, 27, 36, 0.2); color: #ff6b6b; cursor: pointer; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .deleteSubBtn:hover { background: #ee1b24; color: white; }

        .statusBanner { padding: 12px; border-radius: 12px; display: flex; align-items: center; gap: 10px; font-size: 0.9rem; font-weight: 700; }
        .statusBanner.success { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.25); }
        .statusBanner.error { background: rgba(238, 27, 36, 0.15); color: #ff6b6b; border: 1px solid rgba(238, 27, 36, 0.25); }

        .nmLoading, .emptyList { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem 1rem; color: #64748b; gap: 10px; }
        .emptyHint { text-align: center; color: #64748b; font-size: 0.85rem; }

        @media (max-width: 1024px) {
          .nmGrid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default NewsletterManager;
