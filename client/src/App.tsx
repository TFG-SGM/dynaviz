import { Outlet } from "react-router-dom";
import { Header } from "./components/other/Header";

export function App() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
}
