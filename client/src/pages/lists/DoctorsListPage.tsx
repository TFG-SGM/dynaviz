import { UsersList } from "../../components/lists/UsersList";
import { DOCTOR_ENDPOINT } from "../../utils/constants";

export function DoctorsListPage() {
  return (
    <>
      <h1>Doctores</h1>
      <UsersList endpoint={DOCTOR_ENDPOINT}></UsersList>
    </>
  );
}
