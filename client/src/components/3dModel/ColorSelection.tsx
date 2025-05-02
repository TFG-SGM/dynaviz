import { useState } from "react";
import { Colors } from "../../utils/types";

export function ColorSelection({
  colors,
  setColors,
  setSelectedColor,
}: ColorSelectionProps) {
  const [color, setColor] = useState<[string, string]>(["", "#000"]);

  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      <input
        type="color"
        onChange={(e) => setColor([color[0], e.target.value])}
      ></input>
      <input
        style={{ fontSize: "20px" }}
        type="text"
        onChange={(e) => setColor([e.target.value, color[1]])}
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
        Crear
      </button>
    </div>
  );
}

type ColorSelectionProps = {
  colors: Colors;
  setColors: React.Dispatch<React.SetStateAction<Colors>>;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
};
