import { TEST_TYPE_ENDPOINT } from "../../utils/constants";
import { SelectType } from "../selects/SelectType";

export function NewTest({
  id,
  data,
  handleChange,
  handleChangeRecordingState,
  videoId,
  handleRemoveNewTest,
}) {
  return (
    <div className="new-test">
      {id !== "0" && (
        <button
          className="remove-new-test-button"
          id={id}
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