import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataService } from "../../services/DataService";
import { useState } from "react";
import { MyAccount } from "../menus/MyAccount";
import { Account, ArrowBack, Logout } from "./Icons";
import DynaViz from "../../../public/dynaviz.png";
import { useData } from "../../hooks/useData";
import { ACTUAL_USER_ENDPOINT, IMAGE_TYPE } from "../../utils/constants";
import { UserData } from "../../utils/types";
import { useFile } from "../../hooks/useFile";
export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMyAccount, setIsMyAccount] = useState(false);
  const [actualUser] = useData<UserData>(ACTUAL_USER_ENDPOINT);
  const [imageBlob] = useFile(actualUser?.photo?.id, IMAGE_TYPE);

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
      {location.pathname !== "/app" &&
        !(
          actualUser?.role === "doctor" &&
          location.pathname === "/app/pacientes"
        ) && (
          <button className="back-button" onClick={handleGoBack}>
            <ArrowBack></ArrowBack>
          </button>
        )}
      <p className="location-text">
        <img src={DynaViz}></img>
        <Link
          className={actualUser?.role === "doctor" ? "no-link" : ""}
          to={actualUser?.role === "doctor" ? "#" : "/app"}
        >
          DynaViz
        </Link>
        {pathParts[2] && (
          <>
            &#x276F;{" "}
            <Link to={"/" + pathParts[1] + "/" + pathParts[2]}>
              Lista de {pathParts[2]}
            </Link>
          </>
        )}{" "}
        {pathParts[3] && (
          <>
            &#x276F;{" "}
            <Link
              to={"/" + pathParts[1] + "/" + pathParts[2] + "/" + pathParts[3]}
            >
              Lista de pruebas
            </Link>
          </>
        )}
        {pathParts[4] && pathParts[4] !== "evolucion" && (
          <>
            &#x276F;{" "}
            <Link
              to={
                "/" +
                pathParts[1] +
                "/" +
                pathParts[2] +
                "/" +
                pathParts[3] +
                "/" +
                pathParts[4]
              }
            >
              Prueba
            </Link>
          </>
        )}
        {pathParts[4] && pathParts[4] === "evolucion" && (
          <>
            &#x276F;{" "}
            <Link
              to={
                "/" +
                pathParts[1] +
                "/" +
                pathParts[2] +
                "/" +
                pathParts[3] +
                "/" +
                pathParts[4]
              }
            >
              Evolución
            </Link>
          </>
        )}
      </p>
      <p className="user-name">
        {actualUser?.name + " " + actualUser?.surname}
      </p>
      <button className="account-button" onClick={handleMyAccount}>
        {!actualUser?.photo?.id ? (
          <Account></Account>
        ) : imageBlob ? (
          <img className="profile" src={URL.createObjectURL(imageBlob)} />
        ) : null}
      </button>
      <button className="logout-button" onClick={handleLogout}>
        <Logout></Logout>
      </button>
    </nav>
  );
}
