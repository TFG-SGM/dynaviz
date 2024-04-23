import { useNavigate } from "react-router-dom";
import { useData } from "../../hooks/useData";
import { UserData } from "../../utils/types";
import { Toaster } from "sonner";

export function HomePage() {
  const navigate = useNavigate();
  const [user] = useData<UserData>("auth/user-data");

  return (
    <div className="homepage-container">
      <Toaster position="top-center" richColors></Toaster>

      {user?.role === "admin" && (
        <>
          <button onClick={() => navigate("/app/administradores")}>
            Consultar Administradores
          </button>
          <button onClick={() => navigate("/app/medicos")}>
            Consultar Médicos
          </button>
        </>
      )}

      <button onClick={() => navigate("/app/pacientes")}>
        Consultar Pacientes
      </button>
    </div>
  );
}
