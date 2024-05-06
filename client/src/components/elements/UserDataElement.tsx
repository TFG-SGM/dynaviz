import { calculateAge } from "../../utils/helpers";
import { UserData } from "../../utils/types";

export function UserDataElement({ user }: { user: UserData }) {
  const { uId, name, surname, date, city, email, phone } = user;
  const age = calculateAge(date);
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
        <strong>Fecha de nacimiento:</strong> {date.split("T")[0]}.{" "}
        <strong>Edad:</strong> {age}{" "}
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
