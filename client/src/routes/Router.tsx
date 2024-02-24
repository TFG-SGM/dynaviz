import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { ErrorPage } from "../pages/ErrorPage";
import { LoginPage } from "../pages/LoginPage";
import { PatientsListPage } from "../pages/lists/PatientsListPage";
import { DoctorHomePage } from "../pages/DoctorHomePage";
import { AdminHomePage } from "../pages/AdminHomePage";
import { DoctorsListPage } from "../pages/lists/DoctorsListPage";
import { AdminsListPage } from "../pages/lists/AdminsListPage";

export function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage></LoginPage>,
    },
    {
      path: "/app",
      element: <App></App>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        { path: "admin", element: <AdminHomePage></AdminHomePage> },
        { path: "medico", element: <DoctorHomePage></DoctorHomePage> },

        {
          path: "lista-administradores",
          element: <AdminsListPage></AdminsListPage>,
        },
        {
          path: "lista-medicos",
          element: <DoctorsListPage></DoctorsListPage>,
        },
        {
          path: "lista-pacientes",
          element: <PatientsListPage></PatientsListPage>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
