import { createBrowserRouter } from 'react-router-dom';
import { TypeRoutesConfig } from '../utils/types';
import MainPage from '../components/pages/MainPage/MainPage';
import UserPage from '../components/pages/UserPage/UserPage';
import TasksPage from '../components/pages/TasksPage/TasksPage';
import Error from '../components/simple/Error/Error';
import EditTaskPage from '../components/pages/EditTaskPage/EditTaskPage';
import TaskPage from '../components/pages/TaskPage/TaskPage';
import PrivateRouter from '../components/smart/Auth/PrivateRouter';
import NavAuth from '../components/smart/Auth/NavAuth';
import Login from '../components/smart/Auth/Login';
import Registration from '../components/smart/Auth/Registration';

const routesConfig: TypeRoutesConfig[] = [
  {
    path: '/',
    element: <PrivateRouter />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
    ],
  },
  {
    path: '/:userId',
    element: <PrivateRouter />,
    children: [
      {
        path: '/:userId',
        element: <UserPage />,
        children: [
          {
            path: '/:userId/tasks',
            element: <TasksPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/:userId/tasks/editTask/:editTaskId',
    element: <PrivateRouter />,
    children: [
      {
        path: '/:userId/tasks/editTask/:editTaskId',
        element: <EditTaskPage />,
      },
    ],
  },
  {
    path: '/:userId/tasks/:taskId',
    element: <PrivateRouter />,
    children: [
      {
        path: '/:userId/tasks/:taskId',
        element: <TaskPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
  {
    path: '/navigationAuth',
    element: <NavAuth />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
];

export const router = createBrowserRouter(routesConfig);
