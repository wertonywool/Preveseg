import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirección directa para modo de pruebas sin contraseña
    localStorage.setItem('isAdmin', 'true');
    navigate('/Admin_panel');
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isAdmin', 'true');
    navigate('/Admin_panel');
  };

  return (
    <div className="loginContainer page-transition">
      <div className="loginCard animate-in">
        <div className="loginHeader">
          <div className="loginLogoWrapper">
            <img src={logoImg} alt="Preveseg Logo" className="loginLogo" />
          </div>
          <h2>PREVESEG <span>ADMIN</span></h2>
          <p className="loginSubtitle"><ShieldCheck size={14} className="inline-icon" /> Acceso al Panel de Control</p>
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
              />
            </div>
          </div>

          <button type="submit" className="loginBtn">
            Ingresar al Panel <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
