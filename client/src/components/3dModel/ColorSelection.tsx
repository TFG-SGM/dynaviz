import { useState } from "react";

export function ColorSelection({
  colors,
  setColors,
  setSelectedColor,
}: ColorSelectionProps) {
  const [color, setColor] = useState<[string, string]>(["#000", ""]);

  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      <input
        type="color"
        onChange={(e) => setColor([e.target.value, color[1]])}
      ></input>
      <input
        style={{ fontSize: "20px" }}
        type="text"
        onChange={(e) => setColor([color[0], e.target.value])}
      ></input>
      <button
        onClick={() => {
          const nextIndex = Object.keys(colors).length;
          setColors({ ...colors, [nextIndex]: color });
          setSelectedColor(color[0]);
        }}
      >
        Crear
      </button>
    </div>
  );
}

type ColorSelectionProps = {
  colors: { [key: string]: [string, string] };
  setColors: React.Dispatch<
    React.SetStateAction<{ [key: string]: [string, string] }>
  >;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
};
