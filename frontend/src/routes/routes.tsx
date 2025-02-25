import { createBrowserRouter } from 'react-router-dom';
import { TypeRoutesConfig } from '../utils/types';
import MainPage from '../components/pages/MainPage/MainPage';
import UserPage from '../components/pages/UserPage/UserPage';
import TasksPage from '../components/pages/TasksPage/TasksPage';
import Error from '../components/simple/Error/Error';
import EditTaskPage from '../components/pages/EditTaskPage/EditTaskPage';
import TaskPage from '../components/pages/TaskPage/TaskPage';

const routesConfig: TypeRoutesConfig[] = [
  {
    path: '/',
    element: <MainPage />,
  },
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
  {
    path: '/:userId/tasks/editTask/:editTaskId',
    element: <EditTaskPage />,
  },
  {
    path: '/:userId/tasks/:taskId',
    element: <TaskPage />,
  },
  {
    path: '*',
    element: <Error />,
  },
];

export const router = createBrowserRouter(routesConfig);
