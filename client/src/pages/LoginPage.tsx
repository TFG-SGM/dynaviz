import { useNavigate } from "react-router-dom";
import { DataService } from "../services/DataService";
import { FormEvent, useState } from "react";
import { ErrorComponent } from "../components/other/ErrorComponent";
import { AxiosError } from "axios";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = await DataService.login(email, password);
      if (data.role === "admin") navigate("/app/admin");
      else if (data.role === "doctor") navigate("/app/medico");
    } catch (error) {
      if (error instanceof AxiosError && error.response)
        setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>DiPAMIA</h1>
      <form onSubmit={handleSubmit}>
        <label>Correo</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button>Iniciar Sesión</button>
        {error && <ErrorComponent error={error}></ErrorComponent>}
      </form>
    </div>
  );
}
