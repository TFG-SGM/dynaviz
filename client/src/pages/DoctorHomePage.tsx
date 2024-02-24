import { Link } from "react-router-dom";
import { UserDataComponent } from "../components/menus/UserDataComponent";
import { UserData } from "../utils/types";
import { useData } from "../hooks/useData";

export function DoctorHomePage() {
  const [user] = useData<UserData>("auth/user-data");
  return (
    <>
      <h1>Bienvenido {user?.name}</h1>
      <ul>
        <li>
          <Link to="/app/lista-medicos">Consultar Médicos</Link>
        </li>
        <li>
          <Link to="/app/lista-pacientes">Consultar Pacientes</Link>
        </li>
      </ul>
      <hr></hr>
      <h2>Tus datos</h2>
      {user && <UserDataComponent user={user}></UserDataComponent>}
    </>
  );
}
