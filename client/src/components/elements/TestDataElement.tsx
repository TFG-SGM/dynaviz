import { useData } from "../../hooks/useData";
import {
  DOCTOR_ENDPOINT,
  PATIENT_ENDPOINT,
  TEST_TYPE_ENDPOINT,
} from "../../utils/constants";
import {
  PatientData,
  TestData,
  TestTypeData,
  UserData,
} from "../../utils/types";

export function TestDataElement({ test }: { test: TestData }) {
  const { doctorId, typeId, date, video, patientId } = test;
  const [doctor] = useData<UserData>(DOCTOR_ENDPOINT + doctorId);
  const [type] = useData<TestTypeData>(TEST_TYPE_ENDPOINT + typeId);
  const [patient] = useData<PatientData>(PATIENT_ENDPOINT + patientId);

  return (
    <>
      <p>Médico: {doctor?.name}</p>
      <p>Tipo: {type?.name}</p>
      <p>Fecha: {date.split("T")[0]}</p>
      <p>Video: {video}</p>
      <p>Paciente: {patient?.name}</p>
    </>
  );
}
