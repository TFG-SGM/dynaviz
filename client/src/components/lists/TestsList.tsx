import { ChangeEvent, useState } from "react";
import { AddTestForm } from "../forms/AddTestForm";
import { TEST_ENDPOINT } from "../../utils/constants";
import { TestCard } from "../cards/TestCard";
import { useData } from "../../hooks/useData";
import { TestData, UserData } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { useFilters } from "../../hooks/useFilters";
import { TestsFilters } from "../elements/TestsFilters";
import { Toaster } from "sonner";

export function TestsList({ patient }: { patient: UserData }) {
  const [isAdding, setIsAdding] = useState(false);
  const [filters, setFilters] = useState({
    doctorId: "",
    typeId: "",
    date: "",
  });
  const [filtersText] = useFilters(filters);
  const [tests] = useData<TestData[]>(
    TEST_ENDPOINT + "?patientId=" + patient._id + filtersText,
    isAdding
  );
  const navigate = useNavigate();

  const handleStartCreating = () => setIsAdding(true);
  const handleClean = () => setIsAdding(false);
  const handleViewEvolution = () =>
    navigate(`/app/pacientes/${patient._id}/pruebas/evolucion`);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFilters((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  if (!tests) return;

  return (
    <>
      <Toaster position="top-center" richColors></Toaster>
      {isAdding && (
        <AddTestForm
          endpoint={TEST_ENDPOINT}
          handleClean={handleClean}
          patient={patient}
        ></AddTestForm>
      )}

      <div className="tests-buttons">
        <button className="add-test-button" onClick={handleStartCreating}>
          Añadir Pruebas
        </button>

        <button className="evolution-button" onClick={handleViewEvolution}>
          Evolución de Paciente
        </button>
      </div>

      <TestsFilters
        patientId={patient._id}
        filters={filters}
        handleChange={handleChange}
        isAdding={isAdding}
      ></TestsFilters>

      <div className="test-list">
        {tests.length === 0 ? (
          <p className="empty-text">¡No hay ninguna prueba!</p>
        ) : (
          tests.map((test) => {
            return <TestCard key={test._id} testId={test._id}></TestCard>;
          })
        )}
      </div>
    </>
  );
}
