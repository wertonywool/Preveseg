import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import './Login.css';

const ADMIN_USER = 'Preveseg2106';
const ADMIN_PASS = '1144137354';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Si ya está autenticado, redirigir directo al admin
    if (localStorage.getItem('isAdmin') === 'true') {
      navigate('/Admin_panel');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username.trim() === ADMIN_USER && password.trim() === ADMIN_PASS) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/Admin_panel');
    } else {
      setError('Credenciales incorrectas. Verifica el usuario y la contraseña.');
    }
  };

  return (
    <div className="loginContainer page-transition">
      <div className="loginCard animate-in">
        <div className="loginHeader">
          <div className="loginLogoWrapper">
            <img src={logoImg} alt="Preveseg Logo" className="loginLogo" />
          </div>
          <h2>PREVESEG <span>ADMIN</span></h2>
          <p className="loginSubtitle"><ShieldCheck size={14} className="inline-icon" /> Portal Administrativo • Cali</p>
        </div>

        {error && <div className="errorMsg">{error}</div>}

        <form onSubmit={handleLogin} className="loginForm">
          <div className="formGroup">
            <label htmlFor="username">Usuario Administrador</label>
            <div className="inputIconWrapper">
              <User size={18} className="inputIcon" />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className="formGroup">
            <label htmlFor="password">Contraseña</label>
            <div className="inputIconWrapper">
              <Lock size={18} className="inputIcon" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" className="loginBtn">
            Ingresar al Panel <ArrowRight size={18} />
          </button>
        </form>

        <div className="loginFooterLink">
          <Link to="/" className="backToStoreLink">
            <ArrowLeft size={15} /> Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
