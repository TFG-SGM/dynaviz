import { useState } from "react";
import { useData } from "../../hooks/useData";
import { UsersList } from "./UsersList";
import { DOCTOR_ENDPOINT, DOCTOR_FIELDS } from "../../utils/constants";
import { UserData } from "../../utils/types";

export function DoctorsList() {
  const [doctors, setDoctors] = useData<UserData[]>(DOCTOR_ENDPOINT);
  const [doctorId, setDoctorId] = useState<string | null>(null);

  return (
    <UsersList
      users={doctors}
      setUsers={setDoctors}
      userId={doctorId}
      setUserId={setDoctorId}
      endpoint={DOCTOR_ENDPOINT}
      fields={DOCTOR_FIELDS}
    ></UsersList>
  );
}
