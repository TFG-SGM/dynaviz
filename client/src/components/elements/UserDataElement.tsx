import { UserData } from "../../utils/types";

export function UserDataElement({ user }: { user: UserData }) {
  const { name, surname, age, city, email, phone } = user;
  return (
    <>
      <p>Nombre: {name}</p>
      <p>Apellidos: {surname}</p>
      <p>Edad: {age}</p>
      <p>Ciudad: {city}</p>
      <p>Email: {email}</p>
      <p>Teléfono: {phone}</p>
    </>
  );
}
