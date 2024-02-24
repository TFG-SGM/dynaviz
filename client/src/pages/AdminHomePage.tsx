import { Link } from "react-router-dom";

export function AdminHomePage() {
  return (
    <>
      <h1>Bienvenido administrador!</h1>
      <Link to="/app/lista-administradores">Consultar Administradores</Link>
      <Link to="/app/lista-medicos">Consultar Médicos</Link>
    </>
  );
}
