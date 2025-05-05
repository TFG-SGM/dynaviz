import { useEffect } from "react";
import { Colors } from "../../utils/types";
import { ColorSelection } from "./ColorSelection";
import { TrashColor3D } from "../other/Icons";

export function ColorsList({
  colors,
  setColors,
  selectedColor,
  setSelectedColor,
  handleDeleteColor,
  editColor,
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
  }, [colors, selectedColor]);

  return (
    <details className="model-colors-list-container">
      <summary>Colores</summary>
      <ColorSelection
        colors={colors}
        setColors={setColors}
        setSelectedColor={setSelectedColor}
      ></ColorSelection>
      <div className="model-colors-list">
        {Object.keys(colors).map((key) => (
          <div className="model-color-item" key={key}>
            <label className="color-bullet-label">
              <input
                type="radio"
                name="color-selector"
                value={colors[key].color}
                checked={colors[key].color === selectedColor}
                onChange={() => setSelectedColor(colors[key].color)}
                className="color-bullet-input"
              />
              {" " + key}
            </label>
            <div>
              <input
                type="color"
                value={colors[key].color}
                onChange={(e) => {
                  const newColor = e.target.value;
                  editColor(colors[key].color, newColor);
                  setColors((prevColors) => ({
                    ...prevColors,
                    [key]: { ...prevColors[key], color: newColor },
                  }));
                }}
              />
              <button onClick={() => setNote(key)}>T</button>
              <button onClick={() => handleDeleteColor(key)}>
                <TrashColor3D></TrashColor3D>
              </button>
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}

type ColorsListProps = {
  colors: Colors;
  setColors: React.Dispatch<React.SetStateAction<Colors>>;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  handleDeleteColor: (color: string) => void;
  editColor: (colorToEdit: string, newColor: string) => void;
  setNote: (key: string) => void;
};
