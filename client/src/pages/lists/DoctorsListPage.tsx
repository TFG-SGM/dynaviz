import { UsersList } from "../../components/lists/UsersList";
import { DOCTOR_ENDPOINT } from "../../utils/constants";

export function DoctorsListPage() {
  return (
    <div className="doctors-list-container list">
      <h1>Médicos</h1>
      <UsersList endpoint={DOCTOR_ENDPOINT}></UsersList>
    </div>
  );
}
