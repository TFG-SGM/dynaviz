import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { TestData, TestTypeData, UserData } from "../../utils/types";
import { useData } from "../../hooks/useData";
import { DOCTOR_ENDPOINT, TEST_TYPE_ENDPOINT } from "../../utils/constants";
import { SelectType } from "../selects/SelectType";
import { RecordVideoView } from "../elements/RecordVideoView";
import { useActualDoctor } from "../../hooks/useActualDoctor";

export interface TestFormProps<T> {
  data: TestData | null;
  setNewData: Dispatch<SetStateAction<T>>;
}

export function TestForm<T>({ data, setNewData }: TestFormProps<T>) {
  useActualDoctor(setNewData);
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

  if (!data || !testTypes || !doctors) return;

  return (
    <>
      {isRecording && (
        <RecordVideoView
          handleChangeRecordingState={handleChangeRecordingState}
          handleAddRecordingVideo={handleAddRecordingVideo}
        ></RecordVideoView>
      )}
      <div className="test-form-part">
        <label>
          Médico{" "}
          <SelectType
            option={"doctorId"}
            value={data.doctorId}
            endpoint={DOCTOR_ENDPOINT}
            handleChange={handleChange}
          ></SelectType>
        </label>
        <label>
          Tipo{" "}
          <SelectType
            option={"typeId"}
            value={data.typeId}
            endpoint={TEST_TYPE_ENDPOINT}
            handleChange={handleChange}
          ></SelectType>
        </label>
        <label>
          Fecha{" "}
          <input
            name="date"
            type="date"
            value={data.date.split("T")[0]}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            required
          ></input>
        </label>
      </div>
      <div className="test-form-part">
        <label>
          Vídeo seleccionado{" "}
          <input
            className="selected-video"
            name="video"
            value={data.video}
            type="text"
            required
            disabled
          ></input>
        </label>{" "}
        <label>
          <input
            name="video"
            type="file"
            onChange={handleChange}
            accept="video/*"
          ></input>
          <button type="button" onClick={handleChangeRecordingState}>
            Grabar Vídeo
          </button>
        </label>
      </div>
      <label>
        Escala EVA
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
    </>
  );
}
