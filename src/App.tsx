import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';

function App() {
  return (
    <div className="container pt-2 px-4 my-0 mx-auto">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
