import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import { Login } from "./Login";
import { Chat } from "./Chat";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);
