import { Link } from "react-router-dom";

export function DoctorHomePage() {
  return (
    <>
      <h1>Bienvenido doctor!</h1>
      <Link to="/app/lista-pacientes">Consultar Pacientes</Link>
    </>
  );
}
