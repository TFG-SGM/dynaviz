import { ChangeEvent, useState } from "react";
import { AddTestForm } from "../forms/AddTestForm";
import { TEST_ENDPOINT } from "../../utils/constants";
import { TestCard } from "../cards/TestCard";
import { useData } from "../../hooks/useData";
import { TestData, UserData } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { useFilters } from "../../hooks/useFilters";
import { TestsFilters } from "../elements/TestsFilters";

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
    navigate(`/app/pacientes/${patient._id}/evolucion`);

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
      {isAdding && (
        <AddTestForm
          endpoint={TEST_ENDPOINT}
          handleClean={handleClean}
          patient={patient}
        ></AddTestForm>
      )}

      <button className="add-test-button" onClick={handleStartCreating}>
        Añadir Pruebas
      </button>

      <button className="evolution-button" onClick={handleViewEvolution}>
        Evolución de Paciente
      </button>

      <TestsFilters
        patientId={patient._id}
        filters={filters}
        handleChange={handleChange}
      ></TestsFilters>

      <div className="test-list">
        {tests.map((test) => {
          return <TestCard key={test._id} testId={test._id}></TestCard>;
        })}
      </div>
    </>
  );
}
