import { createBrowserRouter, RouteObject } from 'react-router-dom';
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
import ProjectsPage from '../components/pages/ProjectsPage/ProjectsPage';
import ProjectPage from '../components/pages/ProjectPage/ProjectPage';
import EditProjectPage from '../components/pages/EditProjectPage/EditProjectPage';
import Redirect from '../components/simple/Redirect/Redirect';
import { ROUTES } from './routes.config';

const routes: RouteObject[] = [
  {
    path: ROUTES.error,
    element: <Error />,
  },
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
    element: <PrivateRouter />,
    children: [
      {
        path: ROUTES.root,
        element: <MainPage />,
      },
    ],
  },
  {
    path: ROUTES.user,
    element: <PrivateRouter />,
    children: [
      {
        path: ROUTES.user,
        element: <UserPage />,
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
    ],
  },

  {
    path: '/:userId/tasks/editTask',
    element: <Redirect />,
  },
  {
    path: '/:userId/projects/editProject',
    element: <Redirect />,
  },
  {
    path: '/:userId/projects/:projectId/fromProject',
    element: <Redirect />,
  },
  {
    path: ROUTES.editTask,
    element: <PrivateRouter />,
    children: [
      {
        path: ROUTES.editTask,
        element: <EditTaskPage />,
      },
    ],
  },
  {
    path: ROUTES.editProject,
    element: <PrivateRouter />,
    children: [
      {
        path: ROUTES.editProject,
        element: <EditProjectPage />,
      },
    ],
  },
  {
    path: ROUTES.editTaskInProject,
    element: <PrivateRouter />,
    children: [
      {
        path: ROUTES.editTaskInProject,
        element: <EditTaskPage />,
      },
    ],
  },
  {
    path: ROUTES.task,
    element: <PrivateRouter />,
    children: [
      {
        path: ROUTES.task,
        element: <TaskPage />,
      },
    ],
  },
  {
    path: ROUTES.taskInProject,
    element: <PrivateRouter />,
    children: [
      {
        path: ROUTES.taskInProject,
        element: <TaskPage />,
      },
    ],
  },
  {
    path: ROUTES.project,
    element: <PrivateRouter />,
    children: [
      {
        path: ROUTES.project,
        element: <ProjectPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
