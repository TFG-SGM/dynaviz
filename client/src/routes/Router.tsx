import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { ErrorPage } from "../pages/ErrorPage";
import { LoginPage } from "../pages/LoginPage";
import { PatientPage } from "../pages/PatientPage";
import { DoctorPage } from "../pages/DoctorPage";

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
        { path: "doctores", element: <DoctorPage></DoctorPage> },
        { path: "pacientes", element: <PatientPage></PatientPage> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
