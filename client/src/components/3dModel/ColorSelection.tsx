import { useCallback, useState } from "react";
import { Colors } from "../../utils/types";
import { ColorIntensityPicker } from "./ColorIntensityPicker";
import { COLORS } from "../../utils/constants";

export function ColorSelection({
  colors,
  setColors,
  setSelectedColor,
}: ColorSelectionProps) {
  const [color, setColor] = useState<[string, string]>(["", COLORS.red]);
  const handleColorChange = useCallback(
    (newColor: string) => {
      setColor((prev) => [prev[0], newColor]);
    },
    [setColor]
  );

  return (
    <div className="model-color-selection">
      <input
        type="text"
        value={color[0]}
        onChange={(e) => setColor([e.target.value, color[1]])}
      ></input>
      <div>
        <input
          type="color"
          value={color[1]}
          onChange={(e) => setColor([color[0], e.target.value])}
        ></input>
        {/*
        <ColorIntensityPicker
          color={color[1]}
          onChange={handleColorChange}
        ></ColorIntensityPicker>
        */}

        <button
          onClick={() => {
            setColors({
              ...colors,
              [color[0]]: { color: color[1], description: "" },
            });
            setSelectedColor(color[1]);
            setColor(["", color[1]]);
          }}
        >
          &#43;
        </button>
      </div>
    </div>
  );
}

type ColorSelectionProps = {
  colors: Colors;
  setColors: React.Dispatch<React.SetStateAction<Colors>>;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
};
