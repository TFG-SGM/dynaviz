import { useNavigate } from "react-router-dom";
import { TEST_ENDPOINT } from "../../utils/constants";
import { LoadingComponent } from "../other/LoadingComponent";
import { DataService } from "../../services/DataService";
import { useTest } from "../../hooks/useTest";

export function TestCard({ testId }: { testId: string }) {
  const [test] = useTest(testId);
  const navigate = useNavigate();

  if (!test) return <LoadingComponent></LoadingComponent>;

  const { _id, doctor, type, date, patientId } = test;

  const handleViewTest = () => navigate(`/app/pacientes/${patientId}/${_id}`);
  const handleDelete = async () =>
    await DataService.deleteData(TEST_ENDPOINT + _id);

  return (
    <article>
      <p>Médico: {doctor}</p>
      <p>Tipo: {type}</p>
      <p>Fecha: {date}</p>
      <button data-test-id={_id} onClick={handleViewTest}>
        Consultar
      </button>
      <button onClick={handleDelete}>Eliminar</button>
      <hr></hr>
    </article>
  );
}
