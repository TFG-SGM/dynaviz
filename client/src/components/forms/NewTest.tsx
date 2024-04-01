import { ChangeEventHandler } from "react";
import { TEST_TYPE_ENDPOINT } from "../../utils/constants";
import { ManyTestsData } from "../../utils/types";
import { SelectType } from "../selects/SelectType";

interface NewTestProps {
  id: number;
  data: ManyTestsData;
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  handleChangeRecordingState: () => void;
  videoId: string;
  handleRemoveNewTest: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export function NewTest({
  id,
  data,
  handleChange,
  handleChangeRecordingState,
  videoId,
  handleRemoveNewTest,
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
          option={`dataTests.${id}.typeId`}
          value={data.dataTests[id].typeId}
          endpoint={TEST_TYPE_ENDPOINT}
          handleChange={handleChange}
        ></SelectType>
      </label>
      <div className="video-container">
        <label>
          Vídeo{" "}
          <input
            className="selected-video"
            name={`dataTests.${id}.video`}
            value={data.dataTests[id].video}
            type="text"
            placeholder="Selecciona o graba un vídeo >>"
            disabled
            required
          ></input>
        </label>{" "}
        <label>
          <input
            name={`dataTests.${id}.video`}
            type="file"
            onChange={handleChange}
            accept="video/*"
          ></input>
          <button
            type="button"
            id={videoId}
            onClick={handleChangeRecordingState}
          >
            Grabar Vídeo
          </button>
        </label>
      </div>
    </div>
  );
}
