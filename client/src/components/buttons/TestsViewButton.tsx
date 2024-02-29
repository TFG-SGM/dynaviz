import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export function TestsViewButton({ userId }: { userId: string }) {
  const navigate = useNavigate();

  const handleViewTests = (e: FormEvent) => {
    const { target } = e;
    const userId = (target as HTMLButtonElement).getAttribute("data-user-id");
    navigate(`/app/pacientes/${userId}`);
  };

  return (
    <button data-user-id={userId} onClick={handleViewTests}>
      Pruebas
    </button>
  );
}
