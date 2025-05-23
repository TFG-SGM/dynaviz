import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { ManyTestsData, TestTypeData, UserData } from "../../utils/types";
import { useData } from "../../hooks/useData";
import { DOCTOR_ENDPOINT, TEST_TYPE_ENDPOINT } from "../../utils/constants";
import { RecordVideoView } from "../menus/RecordVideoView";
import { useActualDoctor } from "../../hooks/useActualDoctor";
import { NewTest } from "./NewTest";
import { SelectDoctor } from "../selects/SelectDoctor";
import { Toaster } from "sonner";

export interface TestFormProps {
  data: ManyTestsData | null;
  setNewData: Dispatch<SetStateAction<ManyTestsData>>;
  isDisabled: boolean;
}

export function TestForm({ data, setNewData, isDisabled }: TestFormProps) {
  useActualDoctor(setNewData);
  const [testTypes] = useData<TestTypeData[]>(TEST_TYPE_ENDPOINT);
  const [doctors] = useData<UserData[]>(DOCTOR_ENDPOINT);
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeRecordingState = () => setIsRecording(!isRecording);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [id, nameType] = name.split(".");

      setNewData((prevState) => {
        if (!prevState) return prevState;
        if (!prevState.dataTests) prevState.dataTests = {};
        if (!prevState.dataTests[+id])
          prevState.dataTests[+id] = {
            typeId: "",
            video: "",
          };
        if (
          nameType === "video" &&
          inputRef.current &&
          inputRef.current.files
        ) {
          prevState.dataTests[+id].video = inputRef.current.files[0];
        } else prevState.dataTests[+id].typeId = value;
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

      const maxId = Math.max(...Object.keys(prevState.dataTests).map(Number));
      const nextId = maxId + 1;

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

  const handleRemoveNewTest = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { id } = e.currentTarget;
    setNewData((prevState) => {
      if (!prevState) return prevState;

      const newDataTests = { ...prevState.dataTests };
      delete newDataTests[parseInt(id)];

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
        ></RecordVideoView>
      )}
      <Toaster position="top-center" richColors expand={true}></Toaster>
      <label>
        Médico{" "}
        <SelectDoctor
          option={"doctorId"}
          value={data.doctorId}
          endpoint={DOCTOR_ENDPOINT}
          handleChange={handleChange}
        ></SelectDoctor>
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
      <label className="eva-scale">
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
              id={parseInt(dataKey)}
              data={data}
              handleChange={handleChange}
              handleChangeRecordingState={handleChangeRecordingState}
              handleRemoveNewTest={handleRemoveNewTest}
              inputRef={inputRef as React.RefObject<HTMLInputElement>}
              isDisabled={isDisabled}
            ></NewTest>
          );
        })}
        <button
          className="add-new-test-button"
          type="button"
          onClick={handleAddNewTest}
          disabled={isDisabled}
        >
          + Añadir tipo de prueba
        </button>
      </div>
    </>
  );
}
