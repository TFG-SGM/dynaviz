import { useState } from "react";
import { Colors } from "../../utils/types";

export function ColorSelection({
  colors,
  setColors,
  setSelectedColor,
}: ColorSelectionProps) {
  const [color, setColor] = useState<[string, string]>(["", "#000"]);

  return (
    <div className="model-color-selection">
      <input
        type="text"
        onChange={(e) => setColor([e.target.value, color[1]])}
      ></input>
      <div>
        <input
          type="color"
          onChange={(e) => setColor([color[0], e.target.value])}
        ></input>
        <button
          onClick={() => {
            setColors({
              ...colors,
              [color[0]]: { color: color[1], description: "" },
            });
            setSelectedColor(color[1]);
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
