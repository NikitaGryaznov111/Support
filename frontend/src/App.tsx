import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { useState } from 'react';
import { AppStyleContext } from './context/AppStylesContext';
import './styles/UI.scss';
function App() {
  const [appStyles, setAppStyles] = useState<string>('');

  return (
    <AppStyleContext.Provider value={setAppStyles}>
      <div className={`${appStyles}`}>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </AppStyleContext.Provider>
  );
}

export default App;
