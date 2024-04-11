import { useNavigate } from "react-router-dom";
import { DataService } from "../../services/DataService";
import { FormEvent, useState } from "react";
import { ErrorComponent } from "../../components/other/ErrorComponent";
import { AxiosError } from "axios";
import DynaViz from "../../../public/dynaviz.png";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = await DataService.login(email, password);
      if (data.role === "admin") navigate("/app");
      else navigate("/app/pacientes");
    } catch (error) {
      if (error instanceof AxiosError && error.response)
        setError(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="title-container">
        <img src={DynaViz}></img>
        <h1>DynaViz</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Correo
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>
        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>
        <button className="login-button">Iniciar Sesión</button>
        {error && <ErrorComponent error={error}></ErrorComponent>}
      </form>
    </div>
  );
}
