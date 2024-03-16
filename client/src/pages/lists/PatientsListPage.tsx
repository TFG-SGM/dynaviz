import { UsersList } from "../../components/lists/UsersList";
import { PATIENT_ENDPOINT } from "../../utils/constants";

export function PatientsListPage() {
  return (
    <div className="patients-list-container list">
      <h1>Pacientes</h1>
      <UsersList endpoint={PATIENT_ENDPOINT}></UsersList>
    </div>
  );
}
