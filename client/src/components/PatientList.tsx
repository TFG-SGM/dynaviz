import { useState } from "react";
import { useData } from "../hooks/useData";
import { PatientCard } from "./cards/PatientCard";
import { UpdateForm } from "./forms/UpdateForm";
import { CreateForm } from "./forms/CreateForm";

export type PatientData = {
  _id: string;
  name: string;
  surname: string;
  age: number;
};

export function PatientsList() {
  const endpoint = "test";
  const fields = ["name", "surname", "age"];

  const [patients, setPatients] = useData<PatientData[]>(endpoint);
  const [patientId, setPatientId] = useState<string | null>(null);

  const handleCreate = () => {
    setPatientId("create");
  };

  return (
    <div>
      <button onClick={handleCreate}>Crear</button>
      {patientId === "create" && (
        <CreateForm
          endpoint={endpoint}
          setActualId={setPatientId}
          setData={setPatients}
          fields={fields}
        ></CreateForm>
      )}
      {patientId && patientId != "create" && (
        <UpdateForm
          endpoint={`${endpoint}/${patientId}`}
          setActualId={setPatientId}
          setData={setPatients}
          fields={fields}
        ></UpdateForm>
      )}
      {patients ? (
        <div>
          {patients.map((patient: PatientData) => {
            return (
              <PatientCard
                key={patient._id}
                patientData={patient}
                setActualPatientId={setPatientId}
                setPatients={setPatients}
              ></PatientCard>
            );
          })}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}
