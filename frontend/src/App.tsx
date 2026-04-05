import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { useState } from 'react';
import { AppStyleContext } from './context/AppStylesContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import './styles/UI.scss';
import { SidebarProvider } from './components/ui/sidebar';

const queryClient = new QueryClient();

function App() {
  const [appStyles, setAppStyles] = useState<string>('');

  return (
    <AppStyleContext.Provider value={setAppStyles}>
      <ToastContainer position="top-right" />
      <div className={`${appStyles}`}>
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <RouterProvider router={router} />
          </SidebarProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </div>
    </AppStyleContext.Provider>
  );
}

export default App;
