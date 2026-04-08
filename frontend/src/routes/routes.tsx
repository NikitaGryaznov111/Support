import { createBrowserRouter, RouteObject } from 'react-router-dom';
import UserPage from '../components/pages/UserPage/UserPage';
import TasksPage from '../components/pages/TasksPage/TasksPage';
import Error from '../components/simple/Error/Error';
import EditTaskPage from '../components/pages/EditTaskPage/EditTaskPage';
import TaskPage from '../components/pages/TaskPage/TaskPage';
import ProjectsPage from '../components/pages/ProjectsPage/ProjectsPage';
import ProjectPage from '../components/pages/ProjectPage/ProjectPage';
import EditProjectPage from '../components/pages/EditProjectPage/EditProjectPage';
import { ROUTES } from './routes.config';
import { requireAuth } from '../utils/auth/requireAuth';
import UsersPage from '@/components/pages/users/Users.page';
import { LoginPage } from '@/components/pages/login/Login.page';
import { RegistrationPage } from '@/components/pages/registration/registration.page';
import MainLayout from '@/components/layout/main/MainLayout';

// TODO Продолжи
const routes: RouteObject[] = [
  {
    path: ROUTES.login,
    element: <LoginPage />,
  },
  {
    path: ROUTES.registration,
    element: <RegistrationPage />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.root,
        element: <UsersPage />,
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
    ],
  },
  {
    path: ROUTES.error,
    element: <Error />,
  },
];

export const router = createBrowserRouter(routes);
