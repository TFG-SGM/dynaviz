import { useNavigate } from "react-router-dom";

export function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="error-container">
      <h1>Error 404</h1>
      <button onClick={() => navigate("/app")}>Volver a inicio</button>
    </div>
  );
}
