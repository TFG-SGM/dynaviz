import { Link } from "react-router-dom";
import { useData } from "../hooks/useData";
import { UserData } from "../utils/types";
import { UserDataComponent } from "../components/menus/UserDataComponent";

export function AdminHomePage() {
  const [user] = useData<UserData>("auth/user-data");
  return (
    <>
      <h1>Bienvenido {user?.name}</h1>
      <h2>¿Qué quieres hacer?</h2>
      <ul>
        <li>
          <Link to="/app/lista-administradores">Consultar Administradores</Link>
        </li>
        <li>
          <Link to="/app/lista-medicos">Consultar Médicos</Link>
        </li>
      </ul>
      <hr></hr>
      <h2>Tus datos</h2>
      {user && <UserDataComponent user={user}></UserDataComponent>}
    </>
  );
}
