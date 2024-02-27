import { useLocation, useNavigate } from "react-router-dom";
import { DataService } from "../../services/DataService";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    if (location.pathname === "/app") DataService.logout();
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
    </>
  );
}
