import { useLocation, useNavigate } from "react-router-dom";
import { DataService } from "../../services/DataService";
import { useState } from "react";
import { MyAccount } from "../menus/MyAccount";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMyAccount, setIsMyAccount] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    navigate("/");
    DataService.logout();
  };

  const handleMyAccount = () => setIsMyAccount(!isMyAccount);

  return (
    <nav className="header-container">
      {isMyAccount && <MyAccount handleClean={handleMyAccount}></MyAccount>}
      {location.pathname !== "/app" && (
        <button className="back-button" onClick={handleGoBack}>
          Atrás
        </button>
      )}
      <div>
        <button className="account-button" onClick={handleMyAccount}>
          Mi Cuenta
        </button>
        <button className="close-session-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}
