import { useState } from "react";
import { EmptyListComponent } from "../other/EmptyListComponent";
import { LoadingComponent } from "../other/LoadingComponent";
import { AddTestForm } from "../forms/AddTestForm";
import { TEST_ENDPOINT } from "../../utils/constants";

export function TestsList({ patientTests, setPatient }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleStartCreating = () => setIsAdding(true);
  const handleClean = () => setIsAdding(false);

  return (
    <>
      <button onClick={handleStartCreating}>Añadir prueba</button>
      {isAdding && (
        <AddTestForm
          endpoint={TEST_ENDPOINT}
          handleClean={handleClean}
          setTests={setPatient}
        ></AddTestForm>
      )}
      {!patientTests ? (
        <LoadingComponent></LoadingComponent>
      ) : patientTests.length === 0 ? (
        <EmptyListComponent></EmptyListComponent>
      ) : (
        <>
          <button>Consultar evolución</button>
          <p>Tests...</p>
        </>
      )}
    </>
  );
}
