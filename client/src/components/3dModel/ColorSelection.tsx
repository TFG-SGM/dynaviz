import { useCallback, useState } from "react";
import { Colors } from "../../utils/types";
import { ColorEvaSelector } from "./ColorEvaSelector";
import { COLORS } from "../../utils/constants";

export function ColorSelection({
  colors,
  setColors,
  setSelectedColor,
}: ColorSelectionProps) {
  const [color, setColor] = useState<[string, string, number]>([
    "",
    COLORS.red,
    1,
  ]);
  const [error, setError] = useState("");
  const handleColorChange = useCallback(
    (newColor: string, newIntensity: number) => {
      setColor((prev) => [prev[0], newColor, newIntensity]);
    },
    [setColor]
  );

  const handleAdd = () => {
    if (colors.hasOwnProperty(color[0])) {
      setError("El nombre ya existe");
      return;
    } else if (Object.values(colors).some((c) => c.color === color[1])) {
      setError("El color ya existe");
      return;
    } else {
      setColors({
        ...colors,
        [color[0]]: {
          color: color[1],
          description: "",
          intensity: color[2],
        },
      });
      setSelectedColor(color[1]);
      setColor(["", COLORS.red, 1]);
      setError("");
    }
  };

  return (
    <div className="model-color-selection">
      <input
        type="text"
        value={color[0]}
        onChange={(e) => {
          setColor([e.target.value, color[1], color[2]]);
          setError("");
        }}
      ></input>
      <div>
        <ColorEvaSelector
          color={color[1]}
          intensity={color[2]}
          onChange={handleColorChange}
        ></ColorEvaSelector>
        <button onClick={() => handleAdd()}>&#43;</button>
      </div>
      {error && <p style={{ color: "red", fontSize: "0.9em" }}>{error}</p>}{" "}
    </div>
  );
}

type ColorSelectionProps = {
  colors: Colors;
  setColors: React.Dispatch<React.SetStateAction<Colors>>;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
};
