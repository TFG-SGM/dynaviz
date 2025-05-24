import { useEffect } from "react";
import { Colors } from "../../utils/types";
import { ColorSelection } from "./ColorSelection";
import { Note3D, TrashColor3D } from "../other/Icons";

export function ColorsList({
  isPatient,
  colors,
  setColors,
  selectedColor,
  setSelectedColor,
  handleDeleteColor,
  setNote,
}: ColorsListProps) {
  useEffect(() => {
    if (
      !Object.values(colors).some(
        (colorObj) => colorObj.color === selectedColor
      ) &&
      selectedColor !== "#fff"
    ) {
      setSelectedColor("");
    }
  }, [colors, selectedColor, setSelectedColor]);

  return (
    <details className="model-colors-list-container">
      <summary>Colores</summary>
      {isPatient && (
        <ColorSelection
          colors={colors}
          setColors={setColors}
          setSelectedColor={setSelectedColor}
        ></ColorSelection>
      )}
      <div className="model-colors-list">
        {Object.keys(colors).map((key) => (
          <div className="model-color-item" key={key}>
            <label className="color-bullet-label">
              {isPatient && (
                <input
                  type="radio"
                  name="color-selector"
                  value={colors[key].color}
                  checked={colors[key].color === selectedColor}
                  onChange={() => setSelectedColor(colors[key].color)}
                  className="color-bullet-input"
                />
              )}
              {" " + key}
            </label>
            <div>
              <div
                className="model-color-bullet"
                style={{
                  backgroundColor: colors[key].color,
                }}
              >
                {colors[key].intensity}
              </div>
              <button onClick={() => setNote(key)}>
                <Note3D></Note3D>
              </button>
              {isPatient && (
                <>
                  <button onClick={() => handleDeleteColor(key)}>
                    <TrashColor3D></TrashColor3D>
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}

type ColorsListProps = {
  isPatient: boolean;
  colors: Colors;
  setColors: React.Dispatch<React.SetStateAction<Colors>>;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  handleDeleteColor: (color: string) => void;
  setNote: (key: string) => void;
};
