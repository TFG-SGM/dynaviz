import { useNavigate } from "react-router-dom";
import { DataService } from "../../services/DataService";
import { FormEvent, useState } from "react";
import { ErrorComponent } from "../../components/other/ErrorComponent";
import { AxiosError } from "axios";
import DynaViz from "../../../public/dynaviz.png";
import { Footer } from "../../components/other/Footer";
import { LoadingComponent } from "../../components/other/LoadingComponent";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const data = await DataService.login(email, password);
      setIsLoading(false);
      if (data.role === "admin") navigate("/app");
      else if (data.role === "doctor") navigate("/app/pacientes");
      else navigate(`/app/modelo`);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError && error.response)
        setError(error.response.data.message);
    }
  };

  return (
    <div className="login-page">
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
          <button className="login-button" disabled={isLoading}>
            Iniciar Sesión
          </button>
          {error ? (
            <ErrorComponent error={error}></ErrorComponent>
          ) : isLoading ? (
            <LoadingComponent message="Cargando"></LoadingComponent>
          ) : null}
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
}
