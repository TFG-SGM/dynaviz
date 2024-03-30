import { useParams } from "react-router-dom";
import { TestContainer } from "../../components/tests/TestContainer";
import { useData } from "../../hooks/useData";
import { PatientData } from "../../utils/types";
import { PATIENT_ENDPOINT } from "../../utils/constants";

export function TestPage() {
  const { patientId } = useParams();
  const [patient] = useData<PatientData>(PATIENT_ENDPOINT + patientId);
  return (
    <div className="test-page">
      <h1>Prueba de {patient?.name}</h1>
      <TestContainer></TestContainer>
    </div>
  );
}
