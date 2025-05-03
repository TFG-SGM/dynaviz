import { useEffect } from "react";
import { Colors } from "../../utils/types";
import { ColorSelection } from "./ColorSelection";

export function ColorsList({
  colors,
  setColors,
  selectedColor,
  setSelectedColor,
  deleteColor,
  editColor,
}: ColorsListProps) {
  const handleDeleteColor = (key: string) => {
    const updatedColors = { ...colors };

    delete updatedColors[key];
    setColors(updatedColors);
    deleteColor(colors[key].color);
  };

  useEffect(() => {
    if (
      !Object.values(colors).some(
        (colorObj) => colorObj.color === selectedColor
      )
    ) {
      setSelectedColor("");
    }
  }, [colors, selectedColor]);

  return (
    <div>
      <h2>Colores</h2>
      <ColorSelection
        colors={colors}
        setColors={setColors}
        setSelectedColor={setSelectedColor}
      ></ColorSelection>
      {Object.keys(colors).map((key) => (
        <div
          style={{
            border: `2px solid ${
              selectedColor === colors[key].color ? "red" : "black"
            }`,
            margin: "10px 0",
            cursor: "pointer",
          }}
          key={key}
          onClick={() => setSelectedColor(colors[key].color)}
        >
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
          <input type="text" defaultValue={key} readOnly disabled />
          <button onClick={() => handleDeleteColor(key)}>X</button>
        </div>
      ))}
      <button
        style={{
          border: `2px solid ${selectedColor === "#fff" ? "red" : "black"}`,
        }}
        onClick={() => {
          setSelectedColor("#fff");
        }}
      >
        Borrador
      </button>
    </div>
  );
}

type ColorsListProps = {
  colors: Colors;
  setColors: React.Dispatch<React.SetStateAction<Colors>>;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  deleteColor: (color: string) => void;
  editColor: (colorToEdit: string, newColor: string) => void;
};
