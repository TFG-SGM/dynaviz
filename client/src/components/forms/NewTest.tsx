import { TEST_TYPE_ENDPOINT } from "../../utils/constants";
import { SelectType } from "../selects/SelectType";

export function NewTest({
  id,
  data,
  handleChange,
  handleChangeRecordingState,
  videoId,
}) {
  return (
    <div className="new-test">
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
          Vídeo seleccionado{" "}
          <input
            className="selected-video"
            name={`dataTests.${id}.video`}
            value={data.dataTests[id].video}
            type="text"
            required
            disabled
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
