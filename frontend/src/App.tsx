import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { routerAuth } from './routes/routesAuth';
// ЕСЛИ ЕСТЬ ТОКЕН, ТО БУДЕТ router
function App() {
  return (
    <div className=" container">
      {false ? (
        <RouterProvider router={router}></RouterProvider>
      ) : (
        <RouterProvider router={routerAuth}></RouterProvider>
      )}
    </div>
  );
}

export default App;
