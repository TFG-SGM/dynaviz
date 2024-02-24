import { Link } from "react-router-dom";
import { useData } from "../hooks/useData";
import { UserData } from "../utils/types";
import { UserDataComponent } from "../components/menus/UserDataComponent";

export function HomePage() {
  const [user] = useData<UserData>("auth/user-data");
  return (
    <>
      <h1>Bienvenido {user?.name}</h1>
      <h2>¿Qué quieres hacer?</h2>
      <ul>
        {user?.role === "admin" && (
          <li>
            <Link to="/app/administradores">Consultar Administradores</Link>
          </li>
        )}

        <li>
          <Link to="/app/medicos">Consultar Médicos</Link>
        </li>

        {user?.role === "doctor" && (
          <li>
            <Link to="/app/pacientes">Consultar Pacientes</Link>
          </li>
        )}
      </ul>
      <hr></hr>
      <h2>Tus datos</h2>
      {user && <UserDataComponent user={user}></UserDataComponent>}
    </>
  );
}
