import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const AdminGuard = ({ children }: Props) => {
  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true';

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminGuard;
