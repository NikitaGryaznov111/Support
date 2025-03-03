import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/navigationAuth" />;
  }
  return <Outlet />;
};

export default PrivateRouter;
