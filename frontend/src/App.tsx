import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { useState } from 'react';
import { MyContext } from './routes/MyContext';
import './styles/AppModal.scss';
function App() {
  const [appStyles, setAppStyles] = useState<string>('');

  return (
    <MyContext.Provider value={setAppStyles}>
      <div className={`${appStyles}`}>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </MyContext.Provider>
  );
}

export default App;
