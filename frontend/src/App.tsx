import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { useState } from "react";
import { AppStyleContext } from "./context/AppStylesContext";
import "./styles/UI.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [appStyles, setAppStyles] = useState<string>("");

  return (
    <AppStyleContext.Provider value={setAppStyles}>
      <div className={`${appStyles}`}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </div>
    </AppStyleContext.Provider>
  );
}

export default App;
