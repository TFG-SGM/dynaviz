import { UsersList } from "../../components/lists/UsersList";
import { ADMIN_ENDPOINT } from "../../utils/constants";

export function AdminsListPage() {
  return (
    <div className="admins-list-container list">
      <h1>Administradores</h1>
      <UsersList endpoint={ADMIN_ENDPOINT}></UsersList>
    </div>
  );
}
