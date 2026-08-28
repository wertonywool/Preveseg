import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Usar variables de entorno para mayor seguridad
    const adminUser = import.meta.env.VITE_ADMIN_USER;
    const adminPass = import.meta.env.VITE_ADMIN_PASS;

    if (username === adminUser && password === adminPass) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/wertonywool');
    } else {
      setError('Credenciales incorrectas. Acceso denegado.');
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h2>Acceso <span>Admin</span></h2>
        {error && <div className="errorMsg">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="formGroup">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tu usuario"
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              required
            />
          </div>
          <button type="submit" className="loginBtn">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
