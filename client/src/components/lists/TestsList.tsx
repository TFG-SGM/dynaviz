import { ChangeEvent, useState } from "react";
import { EmptyListComponent } from "../other/EmptyListComponent";
import { AddTestForm } from "../forms/AddTestForm";
import { TEST_ENDPOINT } from "../../utils/constants";
import { TestCard } from "../cards/TestCard";
import { useData } from "../../hooks/useData";
import { TestData, UserData } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { useFilters } from "../../hooks/useFilters";
import { useTestsCount } from "../../hooks/useTestsCount";
import { TestsFilters } from "../elements/TestsFilters";

interface AggregationResult {
  [year: string]: TestData[];
}

export function TestsList({ patient }: { patient: UserData }) {
  const [isAdding, setIsAdding] = useState(false);
  const [filters, setFilters] = useState({
    doctorId: "",
    typeId: "",
    date: "",
  });
  const [filtersText] = useFilters(filters);
  const [tests] = useData<AggregationResult>(
    TEST_ENDPOINT + "?patientId=" + patient._id + filtersText
  );
  const [numTests] = useTestsCount(tests);

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

  return (
    <>
      <button onClick={handleStartCreating}>Añadir prueba</button>
      {isAdding && (
        <AddTestForm
          endpoint={TEST_ENDPOINT}
          handleClean={handleClean}
          patient={patient}
        ></AddTestForm>
      )}

      {numTests > 1 && <button onClick={handleViewEvolution}>Evolución</button>}

      <TestsFilters
        filters={filters}
        handleChange={handleChange}
      ></TestsFilters>

      {!tests || numTests === 0 ? (
        <EmptyListComponent></EmptyListComponent>
      ) : (
        <>
          {Object.keys(tests).map((year) => {
            return (
              <article key={year}>
                <h2>{year}</h2>
                {tests[year].map((test) => {
                  return <TestCard key={test._id} testId={test._id}></TestCard>;
                })}
              </article>
            );
          })}
        </>
      )}
    </>
  );
}
