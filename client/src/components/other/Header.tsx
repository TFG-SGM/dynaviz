import { useLocation, useNavigate } from "react-router-dom";
import { DataService } from "../../services/DataService";
import { useState } from "react";
import { MyAccount } from "../menus/MyAccount";
import { Account, ArrowBack, Logout } from "./Icons";
import DynaViz from "../../../public/dynaviz.png";
export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMyAccount, setIsMyAccount] = useState(false);

  const handleGoBack = () => navigate(-1);
  const handleMyAccount = () => setIsMyAccount(!isMyAccount);
  const handleLogout = () => {
    navigate("/");
    DataService.logout();
  };

  const pathParts = location.pathname.split("/");

  return (
    <nav className="header-container">
      {isMyAccount && <MyAccount handleClean={handleMyAccount}></MyAccount>}
      {location.pathname !== "/app" && (
        <button className="back-button" onClick={handleGoBack}>
          <ArrowBack></ArrowBack>
        </button>
      )}
      <p className="location-text">
        {/*<img src={DynaViz}></img>
         */}
        <span>DynaViz</span>{" "}
        {pathParts[2] && (
          <>
            &#x276F; <span>{pathParts[2]}</span>
          </>
        )}{" "}
        {pathParts[3] && (
          <>
            &#x276F; <span>Pruebas</span>
          </>
        )}
        {pathParts[4] && pathParts[4] !== "evolucion" && (
          <>
            &#x276F; <span>Prueba</span>
          </>
        )}
        {pathParts[4] && pathParts[4] === "evolucion" && (
          <>
            &#x276F; <span>Evolución</span>
          </>
        )}
      </p>
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
