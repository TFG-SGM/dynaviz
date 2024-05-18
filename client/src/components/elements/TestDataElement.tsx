import { useData } from "../../hooks/useData";
import {
  DOCTOR_ENDPOINT,
  PATIENT_ENDPOINT,
  TEST_TYPE_ENDPOINT,
  VIDEO_TYPE,
} from "../../utils/constants";
import {
  PatientData,
  TestData,
  TestTypeData,
  UserData,
} from "../../utils/types";
import { useFile } from "../../hooks/useFile";
import { LoadingComponent } from "../other/LoadingComponent";

export function TestDataElement({ test }: { test: TestData }) {
  const { doctorId, typeId, date, video, patientId, evaScale } = test;
  const [doctor] = useData<UserData>(DOCTOR_ENDPOINT + doctorId);
  const [type] = useData<TestTypeData>(TEST_TYPE_ENDPOINT + typeId);
  const [patient] = useData<PatientData>(PATIENT_ENDPOINT + patientId);
  const [videoBlob] = useFile(video.id, VIDEO_TYPE);

  return (
    <>
      <p>
        <strong>Médico:</strong>{" "}
        {doctor
          ? `${doctor.name} ${doctor.surname} (${doctor.uId})`
          : "Ninguno"}
      </p>
      <p>
        <strong>Tipo:</strong> {type ? type.name : "Ninguno"}
      </p>
      <p>
        <strong>Fecha:</strong> {date.split("T")[0]}
      </p>
      <p>
        <strong>Paciente:</strong>{" "}
        {patient
          ? `${patient.name} ${patient.surname} (${patient.uId})`
          : "Ninguno"}
      </p>
      <p>
        <strong>Escala EVA:</strong> {evaScale} / 10
      </p>
      <p>
        <strong>Restricción de movimiento total: </strong>
        {test.data?.restriction}
      </p>
      <p>
        <strong>Vídeo:</strong> {video.name}
      </p>
      {videoBlob ? (
        <video id="videoPlayer" width="500" controls>
          <source src={URL.createObjectURL(videoBlob)} type="video/mp4" />
        </video>
      ) : (
        <LoadingComponent message="Cargando vídeo"></LoadingComponent>
      )}
    </>
  );
}
