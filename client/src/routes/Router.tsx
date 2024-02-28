import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { ErrorPage } from "../pages/ErrorPage";
import { LoginPage } from "../pages/LoginPage";
import { PatientsListPage } from "../pages/lists/PatientsListPage";
import { HomePage } from "../pages/HomePage";
import { DoctorsListPage } from "../pages/lists/DoctorsListPage";
import { AdminsListPage } from "../pages/lists/AdminsListPage";
import { TestsListPage } from "../pages/lists/TestsListPage";

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
        { index: true, element: <HomePage></HomePage> },
        {
          path: "administradores",
          element: <AdminsListPage></AdminsListPage>,
        },
        {
          path: "doctores",
          element: <DoctorsListPage></DoctorsListPage>,
        },
        {
          path: "pacientes",
          element: <PatientsListPage></PatientsListPage>,
        },
        {
          path: "pacientes/:id",
          element: <TestsListPage></TestsListPage>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
