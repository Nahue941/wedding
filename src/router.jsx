import { Navigate, createBrowserRouter } from "react-router-dom";

import GamePage from "./pages/games/GamePage";
import GamesIndex from "./pages/games/GamesIndex";
import Home from "./pages/Home";
import Invitation from "./pages/Invitation";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/la-boda/invitacion/:token", element: <Invitation /> },
  { path: "/juegos", element: <GamesIndex /> },
  { path: "/juegos/:slug", element: <GamePage /> },
  { path: "*", element: <Navigate to="/" replace /> },
]);
