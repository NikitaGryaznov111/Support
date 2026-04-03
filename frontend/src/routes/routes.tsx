import { createBrowserRouter, RouteObject } from 'react-router-dom';
import MainPage from '../components/pages/MainPage/MainPage';
import UserPage from '../components/pages/UserPage/UserPage';
import TasksPage from '../components/pages/TasksPage/TasksPage';
import Error from '../components/simple/Error/Error';
import EditTaskPage from '../components/pages/EditTaskPage/EditTaskPage';
import TaskPage from '../components/pages/TaskPage/TaskPage';
import NavAuth from '../components/smart/Auth/NavAuth';
import Login from '../components/smart/Auth/Login';
import Registration from '../components/smart/Auth/Registration';
import ProjectsPage from '../components/pages/ProjectsPage/ProjectsPage';
import ProjectPage from '../components/pages/ProjectPage/ProjectPage';
import EditProjectPage from '../components/pages/EditProjectPage/EditProjectPage';
import { ROUTES } from './routes.config';
import { requireAuth } from '../utils/auth/requireAuth';
// TODO Продолжи
const routes: RouteObject[] = [
  {
    path: ROUTES.navAuth,
    element: <NavAuth />,
  },
  {
    path: ROUTES.login,
    element: <Login />,
  },
  {
    path: ROUTES.registration,
    element: <Registration />,
  },
  {
    path: ROUTES.root,
    element: <MainPage />,
    // loader: requireAuth,
  },
  {
    path: ROUTES.editTask,
    element: <EditTaskPage />,
    // loader: requireAuth,
  },
  {
    path: ROUTES.editProject,
    element: <EditProjectPage />,
    // loader: requireAuth,
  },
  {
    path: ROUTES.editTaskInProject,
    element: <EditTaskPage />,
    // loader: requireAuth,
  },
  {
    path: ROUTES.task,
    element: <TaskPage />,
    // loader: requireAuth,
  },
  {
    path: ROUTES.taskInProject,
    element: <TaskPage />,
    // loader: requireAuth,
  },
  {
    path: ROUTES.project,
    element: <ProjectPage />,
    // loader: requireAuth,
  },
  {
    path: ROUTES.user,
    element: <UserPage />,
    // loader: requireAuth,
    children: [
      {
        path: ROUTES.tasks,
        element: <TasksPage />,
      },

      {
        path: ROUTES.projects,
        element: <ProjectsPage />,
      },
    ],
  },
  {
    path: ROUTES.error,
    element: <Error />,
  },
];

export const router = createBrowserRouter(routes);
