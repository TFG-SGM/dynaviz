import { deleteData } from "../../utils/utils";

export function PatientCard({ patientData, setActualPatientId, setPatients }) {
  return (
    <article>
      <h2>
        {patientData.name} {patientData.surname}
      </h2>
      <button
        data-patient-id={patientData._id}
        onClick={(e) => {
          const { target } = e;
          setActualPatientId(
            (target as HTMLButtonElement).getAttribute("data-patient-id")
          );
        }}
      >
        Editar
      </button>
      <button onClick={() => deleteData(`patient/${patientData}`, setPatients)}>
        Eliminar
      </button>
      <hr></hr>
    </article>
  );
}
