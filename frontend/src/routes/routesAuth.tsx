import { createBrowserRouter } from 'react-router-dom';
import { TypeRoutesConfig } from '../utils/types';
import NavAuth from '../components/smart/Auth/NavAuth';
import Registration from '../components/smart/Auth/Registration';
import Login from '../components/smart/Auth/Login';

const routesConfig: TypeRoutesConfig[] = [
  {
    path: '/',
    element: <NavAuth />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/login',
    element: <Login />,
  },
];
export const routerAuth = createBrowserRouter(routesConfig);
