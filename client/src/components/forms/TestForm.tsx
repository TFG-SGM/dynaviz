import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { ManyTestsData, TestTypeData, UserData } from "../../utils/types";
import { useData } from "../../hooks/useData";
import { DOCTOR_ENDPOINT, TEST_TYPE_ENDPOINT } from "../../utils/constants";
import { SelectType } from "../selects/SelectType";
import { RecordVideoView } from "../elements/RecordVideoView";
import { useActualDoctor } from "../../hooks/useActualDoctor";
import { NewTest } from "./NewTest";

export interface TestFormProps<T> {
  data: ManyTestsData | null;
  setNewData: Dispatch<SetStateAction<T>>;
}

export function TestForm<T>({ data, setNewData }: TestFormProps<T>) {
  useActualDoctor(setNewData);
  const [testTypes] = useData<TestTypeData[]>(TEST_TYPE_ENDPOINT);
  const [doctors] = useData<UserData[]>(DOCTOR_ENDPOINT);
  const [isRecording, setIsRecording] = useState(false);
  const [videoId, setVideoId] = useState("0");

  const handleChangeRecordingState = (e = null) => {
    setIsRecording(!isRecording);
    if (e) setVideoId(e.target.id);
  };

  const handleAddRecordingVideo = () => {
    handleChangeRecordingState();
    setNewData((prevState) => {
      return {
        ...prevState,
        dataTests: {
          ...prevState.dataTests,
          [videoId]: {
            ...prevState.dataTests[videoId],
            video: "videoGrabado.mv4",
          },
        },
      };
    });
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [dataTests, id, nameType] = name.split(".");
      setNewData((prevState) => {
        console.log(dataTests, id, nameType);
        if (!prevState) return prevState;
        if (!prevState[dataTests]) prevState[dataTests] = {};
        if (!prevState[dataTests][id]) prevState[dataTests][id] = {};
        prevState[dataTests][id][nameType] = value;
        return { ...prevState };
      });
    } else {
      setNewData((prevState) => {
        if (!prevState) return prevState;
        return {
          ...prevState,
          [name]: name === "evaScale" ? parseInt(value) : value,
        };
      });
    }
  };

  const handleAddNewTest = () => {
    setNewData((prevState) => {
      if (!prevState) return prevState;

      const nextId = Object.keys(prevState.dataTests).length;
      const newDataTests = {
        ...prevState.dataTests,
        [nextId]: { typeId: "", video: "" },
      };

      return {
        ...prevState,
        dataTests: newDataTests,
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
      <div className="new-tests-container">
        {Object.keys(data.dataTests).map((dataKey) => {
          return (
            <NewTest
              key={dataKey}
              id={dataKey}
              data={data}
              handleChange={handleChange}
              handleChangeRecordingState={handleChangeRecordingState}
              videoId={videoId}
            ></NewTest>
          );
        })}
        <button type="button" onClick={handleAddNewTest}>
          Añadir más
        </button>
      </div>
    </>
  );
}
