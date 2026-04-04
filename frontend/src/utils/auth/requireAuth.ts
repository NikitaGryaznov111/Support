import { redirect } from 'react-router-dom';
import { ROUTES } from '../../routes/routes.config';

export const requireAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) throw redirect(ROUTES.registration);

  return token;
};
