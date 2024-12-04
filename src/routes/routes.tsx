import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../components/pages/MainPage/MainPage';
import UserPage, { UserId } from '../components/pages/UserPage/UserPage';
import TasksPage from '../components/pages/TasksPage/TasksPage';
// import Error from '../components/simple/Error';
import EditTaskPage, {
  action as editTaskAction,
} from '../components/pages/EditTaskPage/EditTaskPage';
import TaskPage from '../components/pages/TaskPage/TaskPage';
type RoutesConfig = {
  path: string;
  element: React.ReactElement;
  loader?: () => any;
  action?: () => any;
  children?: RoutesConfig[];
};

// ДОБАВЬ СТАНИЦУ ОШИБКИ И ИЗМЕНИ КОРНЕВОЙ ПУТЬ!
// ПОДУМАЙ НАСЧЕТ ТИПИЗАЦИИ
const routesConfig: RoutesConfig[] = [
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
    action: editTaskAction as ({ params }?: UserId) => any,
  },
  {
    path: '/:userId/tasks/:taskId',
    element: <TaskPage />,
  },
  // {
  //   path: '*',
  //   element: <Error />,
  // },
];

export const router = createBrowserRouter(routesConfig);
