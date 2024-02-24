import { useState } from "react";
import { useData } from "../../hooks/useData";
import { UsersList } from "./UsersList";
import { PATIENTS_FIELDS, PATIENT_ENDPOINT } from "../../utils/constants";
import { UserData } from "../../utils/types";

export function PatientsList() {
  const [patients, setPatients] = useData<UserData[]>(PATIENT_ENDPOINT);
  const [patientId, setPatientId] = useState<string | null>(null);

  return (
    <UsersList
      users={patients}
      setUsers={setPatients}
      userId={patientId}
      setUserId={setPatientId}
      endpoint={PATIENT_ENDPOINT}
      fields={PATIENTS_FIELDS}
    ></UsersList>
  );
}
