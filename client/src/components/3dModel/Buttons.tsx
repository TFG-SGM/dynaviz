import { DRAWING_MODE, ROTATE_MODE } from "../../utils/constants";
import { Drawing3D, Erase3D, Reset3D, Rotate3D, Undo3D } from "../other/Icons";

export function Buttons({
  mode,
  selectedColor,
  setMode,
  handleReset,
  setSelectedColor,
  loadLocal,
}: ButtonsProps) {
  return (
    <div className="model-buttons-container">
      <button
        className={mode === ROTATE_MODE ? "model-button-active" : ""}
        onClick={() => {
          setMode(ROTATE_MODE);
          if (selectedColor === "#fff") setSelectedColor("");
        }}
        title="Activar modo rotación"
      >
        <Rotate3D></Rotate3D>
      </button>
      <button
        className={
          mode === DRAWING_MODE && selectedColor !== "#fff"
            ? "model-button-active"
            : ""
        }
        onClick={() => {
          setMode(DRAWING_MODE);
          if (selectedColor === "#fff") setSelectedColor("#000");
        }}
        title="Activar modo dibujo"
      >
        <Drawing3D></Drawing3D>
      </button>
      <button
        className={selectedColor === "#fff" ? "model-button-active" : ""}
        onClick={() => {
          setMode(DRAWING_MODE);
          setSelectedColor("#fff");
        }}
        title="Borrador"
      >
        <Erase3D></Erase3D>
      </button>
      <button onClick={loadLocal} title="Deshacer">
        <Undo3D></Undo3D>
      </button>
      <button onClick={handleReset} title="Reiniciar modelo">
        <Reset3D></Reset3D>
      </button>
    </div>
  );
}

type ButtonsProps = {
  mode: string;
  selectedColor: string;
  setMode: (mode: string) => void;
  handleReset: () => void;
  setSelectedColor: (color: string) => void;
  loadLocal: () => void;
};
