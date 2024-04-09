import { ChangeEventHandler, RefObject } from "react";
import { TEST_TYPE_ENDPOINT } from "../../utils/constants";
import { ManyTestsData } from "../../utils/types";
import { SelectType } from "../selects/SelectType";

interface NewTestProps {
  id: number;
  data: ManyTestsData;
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  handleChangeRecordingState: () => void;
  handleRemoveNewTest: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  inputRef: RefObject<HTMLInputElement>;
}

export function NewTest({
  id,
  data,
  handleChange,
  handleChangeRecordingState,
  handleRemoveNewTest,
  inputRef,
}: NewTestProps) {
  return (
    <div className="new-test">
      {id !== 0 && (
        <button
          className="remove-new-test-button"
          id={id.toString()}
          onClick={handleRemoveNewTest}
          type="button"
        >
          &#x2716;
        </button>
      )}

      <label>
        Tipo{" "}
        <SelectType
          option={`${id}.typeId`}
          value={data.dataTests[id].typeId}
          endpoint={TEST_TYPE_ENDPOINT}
          handleChange={handleChange}
        ></SelectType>
      </label>
      <label>
        Video
        <input
          name={`${id}.video`}
          type="file"
          onChange={handleChange}
          accept="video/*"
          ref={inputRef}
          required
        ></input>
        <button
          type="button"
          id={id.toString()}
          onClick={handleChangeRecordingState}
        >
          Grabar Vídeo
        </button>
      </label>
    </div>
  );
}
