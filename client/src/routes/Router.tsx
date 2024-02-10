import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { ErrorPage } from "../pages/ErrorPage";
import { LoginPage } from "../pages/LoginPage";
import { AdminDashboard } from "../pages/AdminDashboard";

export function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        { path: "login", element: <LoginPage></LoginPage> },
        { path: "admin", element: <AdminDashboard></AdminDashboard> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
