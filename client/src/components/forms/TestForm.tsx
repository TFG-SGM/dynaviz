import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { TestData, TestTypeData, UserData } from "../../utils/types";
import { LoadingComponent } from "../other/LoadingComponent";
import { useData } from "../../hooks/useData";
import { DOCTOR_ENDPOINT, TEST_TYPE_ENDPOINT } from "../../utils/constants";
import { SelectType } from "../selects/SelectType";
import { RecordVideoView } from "../elements/RecordVideoView";

export interface TestFormProps<T> {
  data: TestData | null;
  setNewData: Dispatch<SetStateAction<T>>;
}

export function TestForm<T>({ data, setNewData }: TestFormProps<T>) {
  const [testTypes] = useData<TestTypeData[]>(TEST_TYPE_ENDPOINT);
  const [doctors] = useData<UserData[]>(DOCTOR_ENDPOINT);
  const [isRecording, setIsRecording] = useState(false);

  const handleChangeRecordingState = () => setIsRecording(!isRecording);
  const handleAddRecordingVideo = () => {
    handleChangeRecordingState();
    setNewData((prevState) => {
      return { ...prevState, video: "videoGrabado.mv4" };
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNewData((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        [name]: name === "evaScale" ? parseInt(value) : value,
      };
    });
  };

  if (!data || !testTypes || !doctors) {
    return <LoadingComponent></LoadingComponent>;
  }

  return (
    <>
      <label>
        Médico:{" "}
        <SelectType
          option={"doctorId"}
          value={data.doctorId}
          endpoint={DOCTOR_ENDPOINT}
          handleChange={handleChange}
        ></SelectType>
      </label>
      <label>
        Tipo:{" "}
        <SelectType
          option={"typeId"}
          value={data.typeId}
          endpoint={TEST_TYPE_ENDPOINT}
          handleChange={handleChange}
        ></SelectType>
      </label>
      <label>
        Fecha:{" "}
        <input
          name="date"
          type="date"
          value={data.date.split("T")[0]}
          onChange={handleChange}
          max={new Date().toISOString().split("T")[0]}
          required
        ></input>
      </label>
      <label>
        Escala EVA:
        <input
          name="evaScale"
          type="range"
          value={data.evaScale}
          onChange={handleChange}
          min={1}
          max={10}
          required
        ></input>
        <p>
          {data.evaScale < 4 ? "😞" : data.evaScale > 6 ? "😀" : "😐"}{" "}
          {data.evaScale}
        </p>
      </label>
      <label>
        Vídeo seleccionado:{" "}
        <input
          name="video"
          value={data.video}
          type="text"
          required
          disabled
        ></input>
      </label>{" "}
      <label>
        Añadir vídeo:{" "}
        <input
          name="video"
          type="file"
          onChange={handleChange}
          accept="video/*"
        ></input>
      </label>
      <button type="button" onClick={handleChangeRecordingState}>
        Grabar vídeo
      </button>
      {isRecording && (
        <RecordVideoView
          handleChangeRecordingState={handleChangeRecordingState}
          handleAddRecordingVideo={handleAddRecordingVideo}
        ></RecordVideoView>
      )}
    </>
  );
}
