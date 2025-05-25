import { useState } from "react";
import { Colors } from "../../utils/types";
import { ColorEvaSelector } from "./ColorEvaSelector";
import { COLORS } from "../../utils/constants";
import { adjustLightDark } from "../../utils/helpers";
import { toast } from "sonner";

export function ColorSelection({
  colors,
  setColors,
  setSelectedColor,
}: ColorSelectionProps) {
  const [temp, setTemp] = useState({
    name: "",
    base: COLORS.red,
    intensity: 5,
  });

  const handleAdd = () => {
    const mixed = adjustLightDark(temp.base, temp.intensity);

    if (temp.name.trim() === "") {
      toast.error("Error: El nombre del color no puede estar vacío");
      return;
    } else if (colors[temp.name]) {
      toast.error("Error: El nombre del color ya existe");
      return;
    } else if (Object.values(colors).some((c) => c.color === mixed)) {
      toast.error("Error: El color ya existe");
      return;
    } else {
      setColors({
        ...colors,
        [temp.name]: {
          color: mixed,
          description: "",
          intensity: temp.intensity,
          base: temp.base,
        },
      });
      setSelectedColor(mixed);
      setTemp({ name: "", base: COLORS.red, intensity: 5 });
    }
  };

  return (
    <div className="model-color-selection">
      <input
        type="text"
        value={temp.name}
        onChange={(e) => {
          setTemp({ ...temp, name: e.target.value });
        }}
      ></input>
      <div>
        <ColorEvaSelector
          base={temp.base}
          intensity={temp.intensity}
          onChange={(newBase: string, newInt: number) =>
            setTemp({ ...temp, base: newBase, intensity: newInt })
          }
        ></ColorEvaSelector>
        <button onClick={() => handleAdd()}>&#43;</button>
      </div>
    </div>
  );
}

type ColorSelectionProps = {
  colors: Colors;
  setColors: React.Dispatch<React.SetStateAction<Colors>>;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
};
