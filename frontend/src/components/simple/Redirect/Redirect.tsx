import { Navigate, useLocation, useParams } from 'react-router-dom';
import { TypePath } from '../../../utils/types';

const Redirect = () => {
  const { pathname } = useLocation();
  const { userId, projectId } = useParams<TypePath>();

  let to = '';
  if (pathname === `/${userId}/tasks/editTask`) {
    to = `/${userId}/tasks`;
  } else if (pathname === `/${userId}/projects/editProject`) {
    to = `/${userId}/projects`;
  } else if (pathname === `/${userId}/projects/${projectId}/fromProject`) {
    to = `/${userId}/projects/${projectId}`;
  }
  return <Navigate to={to} />;
};

export default Redirect;
