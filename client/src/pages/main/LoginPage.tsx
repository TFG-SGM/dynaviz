import { useNavigate } from "react-router-dom";
import { DataService } from "../../services/DataService";
import { FormEvent, useState } from "react";
import { ErrorComponent } from "../../components/other/ErrorComponent";
import { AxiosError } from "axios";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await DataService.login(email, password);
      navigate("/app");
    } catch (error) {
      if (error instanceof AxiosError && error.response)
        setError(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h1>DynaViz</h1>
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
        <button>Iniciar Sesión</button>
        {error && <ErrorComponent error={error}></ErrorComponent>}
      </form>
    </div>
  );
}
