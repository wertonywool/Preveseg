import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const AdminGuard = ({ children }: Props) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminGuard;
