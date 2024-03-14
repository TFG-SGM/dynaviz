import { useData } from "../../hooks/useData";
import { DOCTOR_ENDPOINT } from "../../utils/constants";
import { PatientData, UserData } from "../../utils/types";

export function PatientDataElement({ user }: { user: PatientData }) {
  const {
    name,
    surname,
    age,
    city,
    email,
    phone,
    activityLevel,
    occupation,
    diagnosisYears,
    isFibro,
    assignedDoctor,
  } = user;
  const [doctor] = useData<UserData>(DOCTOR_ENDPOINT + assignedDoctor);
  return (
    <>
      <p>Nombre: {name}</p>
      <p>Apellidos: {surname}</p>
      <p>Edad: {age}</p>
      <p>Ciudad: {city}</p>
      <p>Email: {email}</p>
      <p>Teléfono: {phone}</p>
      <p>Actividad física: {activityLevel}</p>
      <p>Ocupación: {occupation}</p>
      <p>Años con diagnostico: {diagnosisYears}</p>
      <p>Diagnosticado con fibromialgia: {isFibro ? "Si" : "No"}</p>
      <p>Médico asignado: {doctor?.name}</p>
    </>
  );
}
