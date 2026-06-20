import { createBrowserRouter } from "react-router-dom";

import App from "./App";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBook from "./pages/AddBook";
import MyBooks from "./pages/MyBooks";
import Requests from "./pages/Requests";
import EditBook from "./pages/EditBook";

import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "add-book",
        element: (
          <ProtectedRoute>
            <AddBook />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-books",
        element: (
          <ProtectedRoute>
            <MyBooks />
          </ProtectedRoute>
        ),
      },
      {
        path: "requests",
        element: (
          <ProtectedRoute>
            <Requests />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <ProtectedRoute>
            <EditBook />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
