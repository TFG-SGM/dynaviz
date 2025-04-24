import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { ErrorPage } from "../pages/main/ErrorPage";
import { LoginPage } from "../pages/main/LoginPage";
import { PatientsListPage } from "../pages/lists/PatientsListPage";
import { HomePage } from "../pages/main/HomePage";
import { DoctorsListPage } from "../pages/lists/DoctorsListPage";
import { AdminsListPage } from "../pages/lists/AdminsListPage";
import { TestsListPage } from "../pages/lists/TestsListPage";
import { TestPage } from "../pages/tests-pages/TestPage";
import { TestEvolutionPage } from "../pages/tests-pages/TestEvolutionPage";
import { EditorPage } from "../pages/EditorPage";

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
          path: "medicos",
          element: <DoctorsListPage></DoctorsListPage>,
        },
        {
          path: "pacientes",
          element: <PatientsListPage></PatientsListPage>,
        },
        {
          path: "pacientes/:patientId",
          element: <TestsListPage></TestsListPage>,
        },
        {
          path: "pacientes/:patientId/:testId",
          element: <TestPage></TestPage>,
        },
        {
          path: "pacientes/:patientId/evolucion",
          element: <TestEvolutionPage></TestEvolutionPage>,
        },
        {
          path: "model",
          element: <EditorPage></EditorPage>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
