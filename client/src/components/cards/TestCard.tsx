import { useNavigate } from "react-router-dom";
import { LoadingComponent } from "../other/LoadingComponent";
import { useTest } from "../../hooks/useTest";

export function TestCard({ testId }: { testId: string }) {
  const [test] = useTest(testId);
  const navigate = useNavigate();

  if (!test) return <LoadingComponent></LoadingComponent>;

  const { _id, doctorId, typeId, date, patientId } = test;

  const handleViewTest = () => navigate(`/app/pacientes/${patientId}/${_id}`);

  return (
    <article>
      <p>Médico: {doctorId}</p>
      <p>Tipo: {typeId}</p>
      <p>Fecha: {date}</p>
      <button data-test-id={_id} onClick={handleViewTest}>
        Consultar
      </button>
      <hr></hr>
    </article>
  );
}
