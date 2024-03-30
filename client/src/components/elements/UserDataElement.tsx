import { UserData } from "../../utils/types";

export function UserDataElement({ user }: { user: UserData }) {
  const { uId, name, surname, age, city, email, phone } = user;
  return (
    <>
      <p>
        <strong>uID:</strong> {uId}
      </p>
      <p>
        <strong>Nombre:</strong> {name}
      </p>
      <p>
        <strong>Apellidos:</strong> {surname}
      </p>
      <p>
        <strong>Edad:</strong> {age}
      </p>
      <p>
        <strong>Ciudad:</strong> {city}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Teléfono:</strong> {phone}
      </p>
    </>
  );
}
