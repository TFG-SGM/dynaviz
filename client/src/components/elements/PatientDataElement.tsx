import { useData } from "../../hooks/useData";
import { DOCTOR_ENDPOINT } from "../../utils/constants";
import { PatientData, UserData } from "../../utils/types";

export function PatientDataElement({ user }: { user: PatientData }) {
  const {
    uId,
    name,
    surname,
    age,
    city,
    email,
    phone,
    weight,
    height,
    activityLevel,
    occupation,
    diagnosisYears,
    isFibro,
    doctorId,
  } = user;
  const [doctor] = useData<UserData>(DOCTOR_ENDPOINT + doctorId);
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
      <p>
        <strong>Peso:</strong> {weight}
      </p>
      <p>
        <strong>Altura:</strong> {height}
      </p>
      <p>
        <strong>Actividad física:</strong> {activityLevel} / 5
      </p>
      <p>
        <strong>Ocupación:</strong> {occupation}
      </p>
      <p>
        <strong>Años con diagnostico:</strong> {diagnosisYears}
      </p>
      <p>
        <strong>Diagnosticado con fibromialgia:</strong> {isFibro ? "Si" : "No"}
      </p>
      <p>
        <strong>Médico asignado:</strong>{" "}
        {doctor
          ? `${doctor.name} ${doctor.surname} (${doctor.uId})`
          : "Ninguno"}
      </p>
    </>
  );
}
