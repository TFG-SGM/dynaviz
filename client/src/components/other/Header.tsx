import { useLocation, useNavigate } from "react-router-dom";
import { DataService } from "../../services/DataService";
import { useState } from "react";
import { MyAccount } from "../menus/MyAccount";
import { Account, ArrowBack, Logout } from "./Icons";

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
          <ArrowBack></ArrowBack>
        </button>
      )}
      <div>
        <button className="account-button" onClick={handleMyAccount}>
          <Account></Account>
        </button>
        <button className="logout-button" onClick={handleLogout}>
          <Logout></Logout>
        </button>
      </div>
    </nav>
  );
}
