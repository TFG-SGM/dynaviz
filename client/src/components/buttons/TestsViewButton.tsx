import { useNavigate } from "react-router-dom";

export function TestsViewButton({ userId }: { userId: string }) {
  const navigate = useNavigate();

  const handleViewTests = () => {
    navigate(`/app/pacientes/${userId}/pruebas`);
  };

  return (
    <button data-user-id={userId} onClick={handleViewTests}>
      Pruebas
    </button>
  );
}
