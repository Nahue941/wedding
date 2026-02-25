import Confirm from "./pages/Confirm";
import Home from "./pages/Home";
import Info from "./pages/Info";
import NotFound from "./pages/NotFound";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/confirm", element: <Confirm /> },
  { path: "/info", element: <Info /> },
  { path: "*", element: <NotFound /> },
]);
