import { Link, Outlet } from "react-router-dom";

export function App() {
  return (
    <>
      <Link to="/">Cerrar Sesión</Link>
      <Outlet></Outlet>
    </>
  );
}
