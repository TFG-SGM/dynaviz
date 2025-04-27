import { useNavigate } from "react-router-dom";

export function Model3DButton({ userId }: { userId: string }) {
  const navigate = useNavigate();

  const handleViewTests = () => {
    navigate(`/app/pacientes/${userId}/modelos`);
  };

  return (
    <button data-user-id={userId} onClick={handleViewTests}>
      Modelo
    </button>
  );
}
