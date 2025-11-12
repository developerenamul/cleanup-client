// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import { createBrowserRouter } from "react-router";
// import { RouterProvider } from "react-router/dom";
// import Root from "./layout/Root.jsx";
// import Home from "./pages/Home.jsx";
// import Issues from "./pages/Issues.jsx";
// import Login from "./pages/Login.jsx";
// import Register from "./pages/Register.jsx";
// import Demo from "./pages/Demo.jsx";
// import PrivateRoute from "./routes/PrivateRoute.jsx";
// import AuthProvider from "./context/AuthProvider.jsx";
// import IssuesDetails from "./pages/IssuesDetails.jsx";
// import AddIssue from "./pages/AddIssue.jsx";
// import AllIssues from "./pages/AllIssues.jsx";
// import MyContributions from "./pages/MyContributions.jsx";
// import MyIssues from "./pages/MyIssues.jsx";
// import NotFound from "./pages/NotFound.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root></Root>,
//     children: [
//       {
//         index: true,
//         element: <Home></Home>,
//         loader: () => fetch("http://localhost:5000/latestIssues"),
//       },
//       {
//         path: "/issues",
//         element: <Issues></Issues>,
//       },
//       {
//         path: "/all-issues",
//         element: <AllIssues></AllIssues>,
//         loader: () => fetch("http://localhost:5000/issues"),
//       },
//       {
//         path: "/add-issue",
//         element: <AddIssue></AddIssue>,
//       },
//       {
//         path: "/issues/:id",
//         element: <IssuesDetails></IssuesDetails>,
//         loader: ({ params }) =>
//           fetch(`http://localhost:5000/issues/${params.id}`),
//       },
//       {
//         path: "/my-contributions",
//         element: (
//           <PrivateRoute>
//             <MyContributions />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "/my-issues",
//         element: (
//           <PrivateRoute>
//             <MyIssues />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "/login",
//         element: <Login></Login>,
//       },
//       {
//         path: "/register",
//         element: <Register></Register>,
//       },
//       {
//         path: "/demo",
//         element: (
//           <PrivateRoute>
//             <Demo></Demo>
//           </PrivateRoute>
//         ),
//       },
//     ],
//   },
//   {
//     path: "*",
//     element: <NotFound></NotFound>,
//   },
// ]);
// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <AuthProvider>
//       <RouterProvider router={router}></RouterProvider>
//     </AuthProvider>
//   </StrictMode>
// );

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
import IssuesDetails from "./pages/IssuesDetails.jsx";
import AddIssue from "./pages/AddIssue.jsx";
import AllIssues from "./pages/AllIssues.jsx";
import MyContributions from "./pages/MyContributions.jsx";
import MyIssues from "./pages/MyIssues.jsx";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch("http://localhost:5000/latestIssues"),
      },
      {
        path: "/issues",
        element: <Issues />,
      },
      {
        path: "/all-issues",
        element: <AllIssues />,
        loader: () => fetch("http://localhost:5000/issues"),
      },
      {
        path: "/add-issue",
        element: (
          <PrivateRoute>
            <AddIssue />
          </PrivateRoute>
        ),
      },
      {
        path: "/issues/:id",
        element: <IssuesDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/issues/${params.id}`),
      },
      {
        path: "/my-contributions",
        element: (
          <PrivateRoute>
            <MyContributions />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-issues",
        element: (
          <PrivateRoute>
            <MyIssues />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/demo",
        element: (
          <PrivateRoute>
            <Demo />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider
        router={router}
        fallbackElement={
          <div className="h-screen flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-green-600"></span>
          </div>
        }
      />
    </AuthProvider>
  </StrictMode>
);
