import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <div>
      <h1>DiPAMIA</h1>
      <ul>
        <li>
          <Link to="/app/pacientes">Pacientes</Link>
        </li>
        <li>
          <Link to="/app/doctores">Doctores</Link>
        </li>
      </ul>
    </div>
  );
}
