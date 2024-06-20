import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";

import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { ProjectsPage } from "../pages/Projects";
import { ProjectPage } from "../pages/Project";

const Routes = () => {
  const { token } = useAuth();
  
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          index: true,
          loader: async () => redirect('/projects'),
        },
        {
          index: true,
          path: "/projects",
          element: <ProjectsPage />,
        },
        {
          path: "/projects/:id",
          element: <ProjectPage />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/auth/login",
      element: <LoginPage />,
    },
    {
      path: "/auth/register",
      element: <RegisterPage />,
    },
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;