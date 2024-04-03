import { useParams } from "react-router-dom";
import { TestEvolutionContainer } from "../../components/tests-containers/TestEvolutionContainer";
import { useData } from "../../hooks/useData";
import { PatientData } from "../../utils/types";
import { PATIENT_ENDPOINT } from "../../utils/constants";

export function TestEvolutionPage() {
  const { patientId } = useParams();
  const [patient] = useData<PatientData>(PATIENT_ENDPOINT + patientId);

  if (!patient) return;
  return (
    <div className="test-evolution-page">
      <h1>Evolución de {patient.name}</h1>
      <TestEvolutionContainer
        patientId={patientId as string}
      ></TestEvolutionContainer>
    </div>
  );
}
