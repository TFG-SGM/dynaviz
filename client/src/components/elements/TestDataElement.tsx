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
import { useVideo } from "../../hooks/useVideo";

export function TestDataElement({ test }: { test: TestData }) {
  const { doctorId, typeId, date, video, patientId, evaScale } = test;
  const [doctor] = useData<UserData>(DOCTOR_ENDPOINT + doctorId);
  const [type] = useData<TestTypeData>(TEST_TYPE_ENDPOINT + typeId);
  const [patient] = useData<PatientData>(PATIENT_ENDPOINT + patientId);
  const [videoBlob] = useVideo(video.id);

  return (
    <>
      <p>
        <strong>Médico:</strong>{" "}
        {doctor
          ? `${doctor.name} ${doctor.surname} (${doctor.uId})`
          : "Ninguno"}
      </p>
      <p>
        <strong>Tipo:</strong> {type?.name}
      </p>
      <p>
        <strong>Fecha:</strong> {date.split("T")[0]}
      </p>
      <p>
        <strong>Paciente:</strong> {patient?.name} {patient?.surname} (
        {patient?.uId})
      </p>
      <p>
        <strong>Escala EVA:</strong> {evaScale} / 10
      </p>
      <p>
        <strong>Video:</strong> {video.name}
      </p>
      {videoBlob ? (
        <video id="videoPlayer" width="500" controls>
          <source src={URL.createObjectURL(videoBlob)} type="video/mp4" />
        </video>
      ) : (
        <p className="loading">Cargando vídeo</p>
      )}
    </>
  );
}
