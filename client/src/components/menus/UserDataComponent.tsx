import { UserData } from "../../utils/types";

export function UserDataComponent({ user }: { user: UserData }) {
  const { name, surname, bornDate, address, email, phone } = user;
  return (
    <>
      <p>Nombre: {name}</p>
      <p>Apellidos: {surname}</p>
      <p>Fecha de nacimiento: {bornDate.split("T")[0]}</p>
      <p>Dirección: {address}</p>
      <p>Email: {email}</p>
      <p>Teléfono: {phone}</p>
    </>
  );
}
