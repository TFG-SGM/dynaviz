import { useState } from "react";
import { EmptyListComponent } from "../other/EmptyListComponent";
import { LoadingComponent } from "../other/LoadingComponent";
import { AddTestForm } from "../forms/AddTestForm";
import { TEST_ENDPOINT } from "../../utils/constants";
import { TestCard } from "../cards/TestCard";
import { useData } from "../../hooks/useData";
import { TestData, UserData } from "../../utils/types";
import { useNavigate } from "react-router-dom";

interface AggregationResult {
  [year: string]: TestData[];
}

export function TestsList({ patient }: { patient: UserData }) {
  const [isAdding, setIsAdding] = useState(false);
  const [tests] = useData<AggregationResult>(
    TEST_ENDPOINT + "?patientId=" + patient._id
  );
  const navigate = useNavigate();

  const handleStartCreating = () => setIsAdding(true);
  const handleClean = () => setIsAdding(false);
  const handleViewEvolution = () =>
    navigate(`/app/pacientes/${patient._id}/evolucion`);

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
      {!tests ? (
        <LoadingComponent></LoadingComponent>
      ) : Object.keys(tests).length === 0 ? (
        <EmptyListComponent></EmptyListComponent>
      ) : (
        <>
          <button onClick={handleViewEvolution}>Consultar evolución</button>
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
