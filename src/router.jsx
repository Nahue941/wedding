import { Navigate, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import IdeasVestimenta from "./pages/IdeasVestimenta";
import Invitation from "./pages/Invitation";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/ideas/vestimenta", element: <IdeasVestimenta /> },
  { path: "/la-boda/invitacion/:token", element: <Invitation /> },
  { path: "*", element: <Navigate to="/" replace /> },
]);


