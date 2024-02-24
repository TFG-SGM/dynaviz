import { useNavigate } from "react-router-dom";
import { DataService } from "../services/DataService";
import { FormEvent, useState } from "react";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = await DataService.login(email, password);
    if (data.role === "admin") navigate("/app/admin");
    else if (data.role === "doctor") navigate("/app/medico");
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
      </form>
    </div>
  );
}
