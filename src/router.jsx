import Confirm from "./pages/Confirm";
import Info from "./pages/Info";
import Invitation from "./pages/Invitation";
import NotFound from "./pages/NotFound";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  { path: "/la-boda/invitacion/:token", element: <Invitation /> },
  { path: "/confirm", element: <Confirm /> },
  { path: "/info", element: <Info /> },
  { path: "*", element: <NotFound /> },
]);
