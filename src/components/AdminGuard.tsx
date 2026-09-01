interface Props {
  children: JSX.Element;
}

const AdminGuard = ({ children }: Props) => {
  // Modo de pruebas activo: acceso directo sin contraseña
  if (typeof window !== 'undefined') {
    localStorage.setItem('isAdmin', 'true');
  }

  return children;
};

export default AdminGuard;

