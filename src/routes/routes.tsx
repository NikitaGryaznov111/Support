import { createBrowserRouter } from 'react-router-dom';
import MainPage, {
  loader as mainLoader,
  UserStorage,
} from '../components/pages/MainPage/MainPage';
import UserPage, {
  loader as userLoader,
  UserId,
} from '../components/pages/UserPage/UserPage';
import TasksPage from '../components/pages/TasksPage/TasksPage';
import Error from '../components/simple/Error';
import { User } from '../api/getUsers';

type RoutesConfig = {
  path: string;
  element: React.ReactElement;
  loader?: () => Promise<UserStorage> | Promise<User>;
  children?: RoutesConfig[];
};

const routesConfig: RoutesConfig[] = [
  {
    path: '/',
    element: <MainPage />,
    loader: mainLoader,
  },
  {
    path: '/:userId',
    loader: userLoader as ({ params }?: UserId) => Promise<User>,
    element: <UserPage />,
    children: [
      {
        path: '/:userId/tasks',
        element: <TasksPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
];

export const router = createBrowserRouter(routesConfig);
