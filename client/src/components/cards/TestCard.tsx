import { useNavigate } from "react-router-dom";
import { useData } from "../../hooks/useData";
import { TEST_ENDPOINT } from "../../utils/constants";
import { TestData } from "../../utils/types";
import { LoadingComponent } from "../other/LoadingComponent";
import { DataService } from "../../services/DataService";

export function TestCard({ testId }: { testId: string }) {
  const [data] = useData<TestData>(TEST_ENDPOINT + testId);
  const navigate = useNavigate();

  if (!data) return <LoadingComponent></LoadingComponent>;

  const { _id, doctor, type, date, patientId } = data;

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
