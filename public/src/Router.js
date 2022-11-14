import App from "./pages/App";
import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { Static as RoomIndex } from "pages/App/Room/Static";
import { Room } from "pages/App/Room";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <RoomIndex />,
      },
      {
        path: ":id",
        element: <Room />,
      },
    ]
  },
]);
