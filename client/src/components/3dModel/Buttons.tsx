import { DRAWING_MODE, ROTATE_MODE } from "../../utils/constants";
import { Drawing3D, Erase3D, Reset3D, Rotate3D, Save3D } from "../other/Icons";

export function Buttons({
  mode,
  selectedColor,
  setMode,
  reset,
  save,
  setSelectedColor,
}: ButtonsProps) {
  return (
    <div className="model-buttons-container">
      <button
        className={mode === ROTATE_MODE ? "model-button-active" : ""}
        onClick={() => setMode(ROTATE_MODE)}
      >
        <Rotate3D></Rotate3D>
      </button>
      <button
        className={mode === DRAWING_MODE ? "model-button-active" : ""}
        onClick={() => setMode(DRAWING_MODE)}
      >
        <Drawing3D></Drawing3D>
      </button>
      <button
        className={selectedColor === "#fff" ? "model-button-active" : ""}
        onClick={() => {
          setSelectedColor("#fff");
        }}
      >
        <Erase3D></Erase3D>
      </button>
      <button onClick={save}>
        <Save3D></Save3D>
      </button>
      <button onClick={reset}>
        <Reset3D></Reset3D>
      </button>
    </div>
  );
}

type ButtonsProps = {
  mode: string;
  selectedColor: string;
  setMode: (mode: string) => void;
  reset: () => void;
  save: () => void;
  setSelectedColor: (color: string) => void;
};
