import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { ErrorPage } from "../pages/ErrorPage";
import { LoginPage } from "../pages/LoginPage";
import { PatientListPage } from "../pages/PatientPage";
import { DoctorHomePage } from "../pages/DoctorHomePage";
import { AdminHomePage } from "../pages/AdminHomePage";

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
        { path: "doctor", element: <DoctorHomePage></DoctorHomePage> },

        {
          path: "lista-pacientes",
          element: <PatientListPage></PatientListPage>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
