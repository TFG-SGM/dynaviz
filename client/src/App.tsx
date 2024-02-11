import { Link, Outlet } from "react-router-dom";

export function App() {
  return (
    <>
      <h1>DiPAMIA</h1>
      <Link to="/admin">Admin Page</Link>
      <Outlet></Outlet>
    </>
  );
}
