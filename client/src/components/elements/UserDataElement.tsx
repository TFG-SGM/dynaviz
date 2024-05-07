import { useFile } from "../../hooks/useFile";
import { IMAGE_TYPE } from "../../utils/constants";
import { calculateAge } from "../../utils/helpers";
import { UserData } from "../../utils/types";
import { LoadingComponent } from "../other/LoadingComponent";

export function UserDataElement({ user }: { user: UserData }) {
  const { uId, name, surname, date, city, email, phone, photo } = user;
  const age = calculateAge(date);
  const [imageBlob] = useFile(photo?.id, IMAGE_TYPE);

  return (
    <div className="user-data">
      {!photo.id ? null : imageBlob ? (
        <img className="profile" src={URL.createObjectURL(imageBlob)} />
      ) : (
        <LoadingComponent message="Cargando imagen"></LoadingComponent>
      )}
      <div className="text-data">
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
          <strong>Fecha de nacimiento:</strong> {date.split("T")[0]}
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
      </div>
    </div>
  );
}
