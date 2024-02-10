import { CreateUserForm } from "../components/CreateUserForm";
import { UsersList } from "../components/UsersList";

export function AdminDashboard() {
  return (
    <>
      <h1>Usuarios</h1>
      <CreateUserForm></CreateUserForm>
      <UsersList></UsersList>
    </>
  );
}
