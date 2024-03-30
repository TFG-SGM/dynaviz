import { useParams } from "react-router-dom";
import { useData } from "../../hooks/useData";
import { PATIENT_ENDPOINT } from "../../utils/constants";
import { UserData } from "../../utils/types";
import { TestsList } from "../../components/lists/TestsList";

export function TestsListPage() {
  const { patientId } = useParams();
  const [patient] = useData<UserData>(PATIENT_ENDPOINT + patientId);
  return (
    <div className="tests-list-container list">
      <h1>Pruebas de {patient?.name}</h1>
      {patient && <TestsList patient={patient}></TestsList>}
    </div>
  );
}
