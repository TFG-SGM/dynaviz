import { Link } from "react-router-dom";
import { useData } from "../../hooks/useData";
import { UserData } from "../../utils/types";

export function HomePage() {
  const [user] = useData<UserData>("auth/user-data");
  return (
    <>
      <ul>
        {user?.role === "admin" && (
          <>
            <li>
              <Link to="/app/administradores">Consultar Administradores</Link>
            </li>
            <li>
              <Link to="/app/medicos">Consultar Médicos</Link>
            </li>
          </>
        )}

        <li>
          <Link to="/app/pacientes">Consultar Pacientes</Link>
        </li>
      </ul>
      <hr></hr>
    </>
  );
}
