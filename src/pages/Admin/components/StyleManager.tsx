import React, { useState, useEffect } from 'react';
import { Palette, Edit3, Trash2, Layout, ExternalLink, Search, X, Save, Code } from 'lucide-react';
import { supabase } from '../../../services/supabaseClient';

interface StyleManagerProps {
  onEditProduct: (product: any) => void;
}

const StyleManager: React.FC<StyleManagerProps> = ({ onEditProduct }) => {
  const [themes, setThemes] = useState<any[]>([]);
  const [customProducts, setCustomProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [themeSearchTerm, setThemeSearchTerm] = useState('');
  
  // Estado para edición de temas
  const [editingTheme, setEditingTheme] = useState<any | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: themesData, error: themesError } = await supabase.from('temas').select('*').order('nombre');
      if (themesError) console.error('Error temas:', themesError);
      setThemes(themesData || []);

      const { data: productsData, error: productsError } = await supabase
        .from('productos')
        .select('id, nombre, categoria, imagenes, custom_html, custom_css')
        .not('custom_html', 'is', null)
        .neq('custom_html', '');
      
      if (productsError) console.error('Error productos:', productsError);
      setCustomProducts(productsData || []);
    } catch (err) {
      console.error('Error fetching styles:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTheme = async (id: number) => {
    if (confirm('¿Borrar este tema permanentemente?')) {
      await supabase.from('temas').delete().eq('id', id);
      fetchData();
    }
  };

  const handleUpdateTheme = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTheme) return;
    setSaveLoading(true);
    try {
      const { error } = await supabase
        .from('temas')
        .update({
          nombre: editingTheme.nombre,
          color: editingTheme.color,
          html: editingTheme.html,
          css: editingTheme.css
        })
        .eq('id', editingTheme.id);
      
      if (error) throw error;
      setEditingTheme(null);
      fetchData();
    } catch (err: any) {
      alert('Error al actualizar tema: ' + err.message);
    } finally {
      setSaveLoading(false);
    }
  };

  const filteredThemes = themes.filter(t => 
    t.nombre?.toLowerCase().includes(themeSearchTerm.toLowerCase())
  );

  const filteredProducts = customProducts.filter(p => 
    p.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoria?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="loadingState">
      <div className="spinner"></div>
      <p>Cargando estilos y temas...</p>
      <style>{`
        .loadingState { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem; gap: 20px; color: #64748b; }
        .spinner { width: 40px; height: 40px; border: 4px solid rgba(0, 174, 239, 0.1); border-top-color: var(--tech-blue); border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );

  return (
    <div className="styleManager animate-in">
      <div className="managerGrid">
        
        {/* Sección de Temas */}
        <section className="themesSection">
          <div className="sectionHeader">
            <div className="titleGroup">
              <Palette size={24} color="#00AEEF" />
              <div>
                <h2>Temas Guardados</h2>
                <p>Plantillas reutilizables para tus productos.</p>
              </div>
            </div>
          </div>

          <div className="searchBox mb-1">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Buscar tema..." 
              value={themeSearchTerm}
              onChange={(e) => setThemeSearchTerm(e.target.value)}
            />
          </div>

          <div className="themesGrid">
            {filteredThemes.map(theme => (
              <div key={theme.id} className="themeCard" style={{ borderLeft: `5px solid ${theme.color}` }}>
                <div className="themeBody">
                  <h3>{theme.nombre}</h3>
                  <div className="themeMeta">
                    <span className="colorDot" style={{ backgroundColor: theme.color }}></span>
                    <span>{theme.html?.length || 0} chars HTML</span>
                  </div>
                </div>
                <div className="themeActions">
                  <button onClick={() => setEditingTheme(theme)} className="actionBtn edit" title="Editar tema">
                    <Edit3 size={18} />
                  </button>
                  <button onClick={() => deleteTheme(theme.id)} className="actionBtn delete" title="Eliminar tema">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
            {filteredThemes.length === 0 && <div className="emptyMsg">No se encontraron temas.</div>}
          </div>
          </section>

          {/* Sección de Productos con Diseño */}
          <section className="productsSection">
          <div className="sectionHeader">
            <div className="titleGroup">
              <Layout size={24} color="#10B981" />
              <div>
                <h2>Productos con Diseño</h2>
                <p>Lista de productos que usan un estilo propio.</p>
              </div>
            </div>
            <div className="searchBox">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Buscar producto..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="customProductsList">
            {filteredProducts.map(p => (
              <div key={p.id} className="customProductItem">
                <div className="pInfo">
                  <img src={Array.isArray(p.imagenes) ? p.imagenes[0] : ''} alt={p.nombre} />
                  <div>
                    <h4>{p.nombre}</h4>
                    <span className="pCat">{p.categoria}</span>
                  </div>
                </div>
                <div className="pActions">
                  <button onClick={() => onEditProduct(p)} className="editBtn">
                    <Edit3 size={18} /> <span>Editar Diseño</span>
                  </button>
                  <a href={`/producto/${p.id}`} target="_blank" rel="noreferrer" className="viewBtn">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && <div className="emptyMsg">No se encontraron productos con diseño personalizado.</div>}
          </div>
          </section>
          </div>

          {/* Modal de Edición de Tema */}
          {editingTheme && (
          <div className="themeModalOverlay">
          <div className="themeModal">
            <header className="modalHeader">
              <div className="modalTitle">
                <Palette size={20} />
                <h3>Editando Tema: <span>{editingTheme.nombre}</span></h3>
              </div>
              <button className="closeBtn" onClick={() => setEditingTheme(null)}><X size={24} /></button>
            </header>

            <form onSubmit={handleUpdateTheme} className="modalForm">
              <div className="inputRow">
                <div className="field">
                  <label>Nombre del Tema</label>
                  <input 
                    type="text" 
                    value={editingTheme.nombre} 
                    onChange={(e) => setEditingTheme({...editingTheme, nombre: e.target.value})}
                    required
                  />
                </div>
                <div className="field colorField">
                  <label>Color</label>
                  <div className="colorInputWrapper">
                    <input 
                      type="color" 
                      value={editingTheme.color || '#00AEEF'} 
                      onChange={(e) => setEditingTheme({...editingTheme, color: e.target.value})}
                    />
                    <span className="colorHex">{editingTheme.color}</span>
                  </div>
                </div>
              </div>

              <div className="field codeField">
                <label><Code size={16} /> HTML del Tema</label>
                <textarea 
                  value={editingTheme.html} 
                  onChange={(e) => setEditingTheme({...editingTheme, html: e.target.value})}
                />
              </div>

              <div className="field codeField">
                <label><Layout size={16} /> CSS del Tema</label>
                <textarea 
                  value={editingTheme.css} 
                  onChange={(e) => setEditingTheme({...editingTheme, css: e.target.value})}
                />
              </div>

              <footer className="modalFooter">
                <button type="button" className="cancelBtn" onClick={() => setEditingTheme(null)}>Cancelar</button>
                <button type="submit" className="saveBtn" disabled={saveLoading}>
                  {saveLoading ? 'Guardando...' : <><Save size={18} /> Guardar Cambios</>}
                </button>
              </footer>
            </form>
          </div>
          </div>
          )}


      <style>{`
        .styleManager { display: flex; flex-direction: column; gap: 2rem; padding-bottom: 5rem; }
        .managerGrid { display: grid; grid-template-columns: 350px 1fr; gap: 3rem; align-items: start; }

        .sectionHeader { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
        .titleGroup { display: flex; gap: 15px; }
        .titleGroup h2 { margin: 0; font-size: 1.25rem; color: white; }
        .titleGroup p { margin: 5px 0 0 0; font-size: 0.85rem; color: #64748b; }

        /* Buscador */
        .searchBox { display: flex; align-items: center; gap: 10px; background: #1e293b; padding: 10px 15px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); transition: all 0.2s; }
        .searchBox:focus-within { border-color: var(--tech-blue); box-shadow: 0 0 15px rgba(0, 174, 239, 0.2); }
        .searchBox input { background: none; border: none; color: white; outline: none; font-size: 0.9rem; width: 100%; }
        .mb-1 { margin-bottom: 1.5rem; }

        /* Estilos de Temas */
        .themesGrid { display: flex; flex-direction: column; gap: 1rem; }
        .themeCard { 
          background: rgba(15, 23, 42, 0.5); 
          border: 1px solid rgba(255,255,255,0.05); 
          border-radius: 16px; 
          display: flex; 
          align-items: center; 
          padding: 15px; 
          gap: 15px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        }
        .themeCard:hover { transform: translateX(8px); background: rgba(255,255,255,0.08); }
        .themeBody { flex: 1; }
        .themeBody h3 { margin: 0; font-size: 1rem; color: white; font-weight: 700; }
        
        .themeMeta { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: #64748b; margin-top: 6px; }
        .colorDot { width: 8px; height: 8px; border-radius: 50%; }

        .themeActions { display: flex; gap: 5px; }
        .actionBtn { background: none; border: none; padding: 8px; border-radius: 10px; cursor: pointer; transition: all 0.2s; color: #64748b; }
        .actionBtn.edit:hover { color: var(--tech-blue); background: rgba(0, 174, 239, 0.1); }
        .actionBtn.delete:hover { color: #ef4444; background: rgba(239, 68, 68, 0.1); }

        /* Estilos de Productos */
        .customProductsList { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 1.5rem; }
        .customProductItem { 
          background: rgba(15, 23, 42, 0.5); 
          border-radius: 20px; 
          padding: 20px; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          border: 1px solid rgba(255,255,255,0.05);
          transition: all 0.3s;
        }
        .customProductItem:hover { border-color: #10B981; transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .pInfo { display: flex; align-items: center; gap: 15px; }
        .pInfo img { width: 60px; height: 60px; border-radius: 14px; object-fit: cover; border: 2px solid rgba(255,255,255,0.1); }
        .pInfo h4 { margin: 0; font-size: 1.1rem; color: white; font-weight: 700; }
        .pCat { font-size: 0.8rem; color: var(--tech-blue); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
        
        .pActions { display: flex; gap: 10px; }
        .editBtn { background: var(--tech-blue); color: white; border: none; padding: 10px 18px; border-radius: 12px; font-weight: 800; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.3s; }
        .editBtn:hover { transform: scale(1.05); background: white; color: black; }
        .viewBtn { background: rgba(255,255,255,0.05); color: #cbd5e1; padding: 10px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; }
        .viewBtn:hover { background: white; color: black; }

        .emptyMsg { text-align: center; padding: 3rem; color: #64748b; font-style: italic; font-size: 0.95rem; background: rgba(0,0,0,0.1); border-radius: 20px; border: 1px dashed rgba(255,255,255,0.05); }

        /* MODAL DE EDICIÓN */
        .themeModalOverlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 10000; padding: 2rem; }
        .themeModal { background: #0f172a; width: 100%; max-width: 900px; max-height: 90vh; border-radius: 30px; border: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 50px 100px rgba(0,0,0,0.5); }
        
        .modalHeader { padding: 1.5rem 2rem; background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; }
        .modalTitle { display: flex; align-items: center; gap: 15px; color: var(--tech-blue); }
        .modalTitle h3 { margin: 0; color: white; font-size: 1.25rem; font-weight: 800; }
        .modalTitle span { color: var(--tech-blue); }
        .closeBtn { background: none; border: none; color: #64748b; cursor: pointer; transition: all 0.2s; }
        .closeBtn:hover { color: white; transform: rotate(90deg); }

        .modalForm { padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; overflow-y: auto; }
        .inputRow { display: grid; grid-template-columns: 1fr 200px; gap: 2rem; }
        
        .field { display: flex; flex-direction: column; gap: 8px; }
        .field label { font-size: 0.85rem; font-weight: 700; color: #94a3b8; display: flex; align-items: center; gap: 8px; }
        .field input[type="text"] { background: #1e293b; border: 1px solid rgba(255,255,255,0.1); padding: 12px 15px; border-radius: 12px; color: white; outline: none; }
        .field input[type="text"]:focus { border-color: var(--tech-blue); }

        .colorField .colorInputWrapper { display: flex; align-items: center; gap: 12px; background: #1e293b; padding: 8px 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); }
        .colorField input[type="color"] { width: 30px; height: 30px; border: none; background: none; cursor: pointer; padding: 0; }
        .colorHex { font-family: monospace; font-size: 0.9rem; color: #cbd5e1; }

        .codeField textarea { width: 100%; height: 200px; background: #010409; border: 1px solid rgba(255,255,255,0.1); border-radius: 15px; padding: 1rem; color: #10b981; font-family: 'Fira Code', monospace; font-size: 0.85rem; resize: vertical; outline: none; }
        .codeField textarea:focus { border-color: var(--tech-blue); }

        .modalFooter { padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: flex-end; gap: 15px; }
        .cancelBtn { background: rgba(255,255,255,0.05); color: white; border: none; padding: 12px 25px; border-radius: 12px; font-weight: 700; cursor: pointer; }
        .saveBtn { background: var(--tech-blue); color: white; border: none; padding: 12px 30px; border-radius: 12px; font-weight: 900; cursor: pointer; display: flex; align-items: center; gap: 10px; box-shadow: 0 10px 20px rgba(0, 174, 239, 0.2); }
        .saveBtn:disabled { opacity: 0.5; cursor: not-allowed; }

        @media (max-width: 1024px) {
          .managerGrid { grid-template-columns: 1fr; }
          .customProductsList { grid-template-columns: 1fr; }
          .themeModal { border-radius: 0; max-height: 100vh; height: 100%; }
          .inputRow { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default StyleManager;
