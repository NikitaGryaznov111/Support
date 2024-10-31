import { createBrowserRouter } from "react-router-dom";
import Main from "../components/pages/Main";
import Error from "../components/simple/Error";
type RoutesConfig = {
    path: string,
    element: React.ReactElement
    children?: []
}


const routesConfig: RoutesConfig[]= [
    {
        path: "/",
        element: <Main/>

    },
    {
        path: '*',
        element: <Error/>
    }
]

export const router = createBrowserRouter(routesConfig)