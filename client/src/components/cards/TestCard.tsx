import { useNavigate } from "react-router-dom";
import { useTest } from "../../hooks/useTest";

export function TestCard({ testId }: { testId: string }) {
  const [test] = useTest(testId);
  const navigate = useNavigate();

  if (!test) return;

  const { _id, doctorId, typeId, date, patientId } = test;

  const handleViewTest = () => navigate(`/app/pacientes/${patientId}/${_id}`);

  return (
    <article className="test-card" data-test-id={_id} onClick={handleViewTest}>
      <p>
        <strong>Médico: </strong>
        {doctorId}
      </p>
      <p>
        <strong>Tipo: </strong>
        {typeId}
      </p>
      <p>
        <strong>Fecha: </strong>
        {date}
      </p>
    </article>
  );
}
