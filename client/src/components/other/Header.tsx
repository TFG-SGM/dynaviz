import { useLocation, useNavigate } from "react-router-dom";
import { DataService } from "../../services/DataService";
import { useState } from "react";
import { MyAccount } from "../menus/MyAccount";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMyAccount, setIsMyAccount] = useState(false);

  const handleGoBack = () => {
    if (location.pathname === "/app") DataService.logout();
    navigate(-1);
  };

  const handleLogout = () => {
    navigate("/");
    DataService.logout();
  };

  const handleMyAccount = () => setIsMyAccount(!isMyAccount);

  return (
    <>
      {isMyAccount && <MyAccount handleClean={handleMyAccount}></MyAccount>}
      <button onClick={handleGoBack}>Atrás</button>
      <button onClick={handleMyAccount}>Mi Cuenta</button>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <hr></hr>
    </>
  );
}
