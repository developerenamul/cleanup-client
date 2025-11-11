import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./layout/Root.jsx";
import Home from "./pages/Home.jsx";
import Issues from "./pages/Issues.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Demo from "./pages/Demo.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import AuthProvider from "./context/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: () => fetch("http://localhost:5000/latestIssues"),
      },
      {
        path: "/issues",
        element: <Issues></Issues>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/demo",
        element: (
          <PrivateRoute>
            <Demo></Demo>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
