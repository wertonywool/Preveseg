import React, { useState, useEffect } from 'react';
import { Code, Save, Trash2, Layout, BookOpen } from 'lucide-react';
import { supabase } from '../../../../services/supabaseClient';

interface CustomStyleSectionProps {
  product: any;
  onInputChange: (e: any) => void;
}

const CustomStyleSection: React.FC<CustomStyleSectionProps> = ({ product, onInputChange }) => {
  const [themes, setThemes] = useState<any[]>([]);
  const [themeName, setThemeName] = useState('');
  const [themeColor, setThemeColor] = useState('#00AEEF');
  const [loadingThemes, setLoadingThemes] = useState(false);

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    setLoadingThemes(true);
    try {
      const { data, error } = await supabase.from('temas').select('*').order('nombre');
      if (error) throw error;
      setThemes(data || []);
    } catch (err) {
      console.error('Error fetching themes:', err);
    } finally {
      setLoadingThemes(false);
    }
  };

  const saveTheme = async () => {
    if (!themeName.trim()) return alert('Dale un nombre al tema');
    try {
      const { error } = await supabase.from('temas').insert([{
        nombre: themeName,
        html: product.customHtml,
        css: product.customCss,
        color: themeColor
      }]);
      if (error) throw error;
      alert('Tema guardado correctamente');
      setThemeName('');
      fetchThemes();
    } catch (err: any) {
      alert('Error al guardar tema: ' + err.message);
    }
  };

  const loadTheme = (theme: any) => {
    if (confirm(`¿Cargar el tema "${theme.nombre}"? Esto sobrescribirá el estilo actual.`)) {
      onInputChange({ target: { name: 'customHtml', value: theme.html } });
      onInputChange({ target: { name: 'customCss', value: theme.css } });
      if (theme.color) setThemeColor(theme.color);
    }
  };

  const deleteTheme = async (id: number) => {
    if (confirm('¿Borrar este tema permanentemente?')) {
      try {
        const { error } = await supabase.from('temas').delete().eq('id', id);
        if (error) throw error;
        fetchThemes();
      } catch (err: any) {
        alert('Error al borrar tema: ' + err.message);
      }
    }
  };

  const resetToDefault = () => {
    if (confirm('¿Seguro que quieres borrar todo el diseño personalizado y volver al diseño por defecto?')) {
      onInputChange({ target: { name: 'customHtml', value: '' } });
      onInputChange({ target: { name: 'customCss', value: '' } });
    }
  };

  return (
    <div className="customStyleSection">
      <div className="sectionHeader">
        <div className="headerText">
          <Code size={20} color="#00AEEF" />
          <h3>Personalización de Alto Nivel</h3>
        </div>
        <p>Transforma la experiencia de compra con diseños únicos. Si dejas esto vacío, se usará el diseño estándar del sitio.</p>
        <button type="button" onClick={resetToDefault} className="resetDefaultBtn">
          <Trash2 size={16} /> Volver al Diseño por Defecto
        </button>
      </div>

      <div className="styleGrid">
        <div className="editorCol">
          <div className="editorGroup">
            <label><Code size={16} /> HTML Personalizado</label>
            <textarea 
              name="customHtml" 
              value={product.customHtml || ''} 
              onChange={onInputChange}
              placeholder="<div class='mi-diseño'>...</div>"
              className="codeEditor"
            />
          </div>

          <div className="editorGroup">
            <label><Layout size={16} /> CSS Personalizado</label>
            <textarea 
              name="customCss" 
              value={product.customCss || ''} 
              onChange={onInputChange}
              placeholder=".mi-diseño { background: black; ... }"
              className="codeEditor"
            />
          </div>
        </div>

        <div className="themesCol">
          <div className="themesHeader">
            <BookOpen size={18} />
            <h4>Mis Temas Guardados</h4>
          </div>

          <div className="saveThemeBox">
            <input 
              type="text" 
              placeholder="Nombre..." 
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              className="nameInput"
            />
            <input 
              type="color" 
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
              className="colorInput"
              title="Color identificador"
            />
            <button type="button" onClick={saveTheme} className="saveThemeBtn" title="Guardar actual como tema">
              <Save size={18} />
            </button>
          </div>

          <div className="themesList">
            {loadingThemes ? (
              <p className="loadingText">Cargando temas...</p>
            ) : themes.length === 0 ? (
              <p className="emptyThemes">No tienes temas guardados.</p>
            ) : (
              themes.map(t => (
                <div key={t.id} className="themeItem" style={{ borderLeftColor: t.color }}>
                  <span className="themeName" onClick={() => loadTheme(t)}>{t.nombre}</span>
                  <button type="button" onClick={() => deleteTheme(t.id)} className="deleteThemeBtn">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="tutorialBox">
            <h5><BookOpen size={14} /> Tips de Diseño</h5>
            <ul>
              <li>Usa un <code>id</code> o <code>class</code> único para no afectar el resto de la página.</li>
              <li>Puedes usar variables de CSS del sitio.</li>
              <li>El HTML reemplazará TODO el contenido de la página del producto si está presente.</li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .customStyleSection { display: flex; flex-direction: column; gap: 1.5rem; }
        .sectionHeader { margin-bottom: 1rem; }
        .headerText { display: flex; align-items: center; gap: 10px; margin-bottom: 5px; }
        .headerText h3 { margin: 0; font-size: 1.1rem; color: white; }
        .sectionHeader p { margin: 0; font-size: 0.85rem; color: #64748b; }

        .resetDefaultBtn {
          margin-top: 10px;
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .resetDefaultBtn:hover {
          background: #ef4444;
          color: white;
        }

        .styleGrid { display: grid; grid-template-columns: 1fr 300px; gap: 2rem; }
        
        .editorCol { display: flex; flex-direction: column; gap: 1.5rem; }
        .editorGroup { display: flex; flex-direction: column; gap: 10px; }
        .editorGroup label { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; font-weight: 700; color: #cbd5e1; }
        
        .codeEditor { 
          width: 100%; 
          height: 250px; 
          background: #0f172a; 
          border: 1px solid rgba(255,255,255,0.1); 
          border-radius: 12px; 
          padding: 1rem; 
          color: #10b981; 
          font-family: 'Fira Code', monospace; 
          font-size: 0.85rem; 
          resize: vertical;
          outline: none;
        }
        .codeEditor:focus { border-color: var(--tech-blue); }

        .themesCol { background: rgba(15, 23, 42, 0.5); border-radius: 16px; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.05); }
        .themesHeader { display: flex; align-items: center; gap: 10px; margin-bottom: 1.5rem; color: white; }
        .themesHeader h4 { margin: 0; font-size: 0.95rem; }

        .saveThemeBox { display: flex; gap: 8px; margin-bottom: 1.5rem; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 12px; }
        .saveThemeBox .nameInput { flex: 1; background: #1e293b; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 12px; color: white; font-size: 0.8rem; }
        .saveThemeBox .colorInput { width: 40px; height: 36px; padding: 0; border: none; background: none; cursor: pointer; }
        .saveThemeBtn { background: var(--tech-blue); color: white; border: none; border-radius: 8px; padding: 0 12px; cursor: pointer; display: flex; align-items: center; gap: 5px; font-size: 0.8rem; font-weight: 700; transition: all 0.2s; }
        .saveThemeBtn:hover { transform: scale(1.05); background: white; color: black; }

        .themesList { display: flex; flex-direction: column; gap: 8px; max-height: 300px; overflow-y: auto; margin-bottom: 1.5rem; }
        .themeItem { display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 10px 12px; border-radius: 10px; border: 1px solid transparent; transition: all 0.2s; border-left: 4px solid var(--tech-blue); }
        .themeItem:hover { background: rgba(255,255,255,0.05); border-color: var(--tech-blue); }
        .themeName { font-size: 0.85rem; color: #cbd5e1; cursor: pointer; flex: 1; font-weight: 600; }
        .deleteThemeBtn { background: none; border: none; color: #ef4444; cursor: pointer; opacity: 0.5; }
        .deleteThemeBtn:hover { opacity: 1; }

        .tutorialBox { background: rgba(0, 174, 239, 0.05); border: 1px solid rgba(0, 174, 239, 0.1); border-radius: 12px; padding: 1rem; }
        .tutorialBox h5 { margin: 0 0 10px 0; font-size: 0.85rem; color: var(--tech-blue); display: flex; align-items: center; gap: 8px; }
        .tutorialBox ul { margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 5px; }
        .tutorialBox li { font-size: 0.75rem; color: #94a3b8; }

        .loadingText, .emptyThemes { font-size: 0.8rem; color: #64748b; text-align: center; padding: 1rem; }

        @media (max-width: 1024px) {
          .styleGrid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default CustomStyleSection;
