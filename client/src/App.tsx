import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DataService } from "./services/DataService";

export function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    console.log(location);
    if (
      location.pathname === "/app/admin" ||
      location.pathname === "/app/medico"
    )
      DataService.logout();
    navigate(-1);
  };

  const handleLogout = () => {
    navigate("/");
    DataService.logout();
  };

  return (
    <>
      <button onClick={handleGoBack}>Atrás</button>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <Outlet></Outlet>
    </>
  );
}
