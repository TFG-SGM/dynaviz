import { Outlet } from "react-router-dom";
import { Header } from "./components/other/Header";

import "./styles/app.css";
import "./styles/login.css";
import "./styles/header.css";
import "./styles/homepage.css";
import "./styles/list.css";
import "./styles/cards.css";
import "./styles/menus.css";
import "./styles/tests.css";

export function App() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
}
