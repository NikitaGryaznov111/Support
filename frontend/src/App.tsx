import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { routerAuth } from './routes/routesAuth';
import { useEffect, useState } from 'react';
import { useAppSelector } from './store/store';
// ЕСЛИ ЕСТЬ ТОКЕН, ТО БУДЕТ router
function App() {
  const token = useAppSelector((state) => state.auth);
  console.log(token);
  return (
    <div className=" container">
      {token ? (
        <RouterProvider router={router}></RouterProvider>
      ) : (
        <div className="routerAuth">
          {' '}
          <RouterProvider router={routerAuth}></RouterProvider>
        </div>
      )}
    </div>
  );
}

export default App;
