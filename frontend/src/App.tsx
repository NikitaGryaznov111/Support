import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';

function App() {
  return (
    <div className=" container">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
