import { useState } from "react";
import { Colors } from "../../utils/types";
import { COLORS } from "../../utils/constants";
import { adjustLightDark } from "../../utils/helpers";
import { toast } from "sonner";
import { CrossButton } from "../buttons/CrossButton";

export function ColorMenu({
  colors,
  setColors,
  setSelectedColor,
  hideMenu,
  save,
}: ColorMenuProps) {
  const [temp, setTemp] = useState({
    base: COLORS.red,
    intensity: 5,
    description: "",
  });

  const handleAdd = () => {
    const mixed = adjustLightDark(temp.base, temp.intensity);

    if (Object.values(colors).some((c) => c.color === mixed)) {
      toast.error("Error: El color ya existe");
      return;
    } else {
      const newColors = { ...colors };
      newColors[mixed] = {
        color: mixed,
        description: temp.description,
        intensity: temp.intensity,
        base: temp.base,
      };
      setColors(newColors);
      setSelectedColor(mixed);
      setTemp({ base: COLORS.red, intensity: 5, description: "" });
      hideMenu();
      save(newColors);
      toast.success("Color añadido correctamente");
    }
  };

  const handleClean = () => {
    setTemp({
      base: COLORS.red,
      intensity: 5,
      description: "",
    });
    setSelectedColor("");
    hideMenu();
  };

  const display = adjustLightDark(temp.base, temp.intensity);

  return (
    <dialog className="model-color-menu">
      <div className="menu-title">
        <h2>Nuevo Color</h2>
        <CrossButton handleClean={handleClean} isDisabled={false}></CrossButton>
      </div>{" "}
      <label>
        Describe brevemente tu dolor
        <textarea
          onChange={(e) => setTemp({ ...temp, description: e.target.value })}
          value={temp.description}
        ></textarea>
      </label>
      <section>
        <p>Indica el color que representa tu dolor</p>
        <div className="model-colors-selector">
          {Object.entries(COLORS).map(([name, hex]) => (
            <button
              key={name}
              onClick={() => setTemp({ ...temp, base: hex })}
              className="model-color-button"
              style={{
                border:
                  temp.base === hex ? "3px solid black" : "1px solid #ccc",
                backgroundColor: hex,
              }}
              title={name}
            />
          ))}
        </div>
      </section>
      <label className="model-intensity-label">
        Señala la intensidad del dolor
        <input
          type="range"
          min="0"
          max="10"
          value={temp.intensity}
          onChange={(e) =>
            setTemp({ ...temp, intensity: Number(e.target.value) })
          }
        />
        <p>{temp.intensity}</p>
      </label>
      <div className="model-color-display">
        <p>Color final:</p>
        <div
          style={{
            backgroundColor: display,
          }}
        ></div>
      </div>
      <div className="buttons-container">
        <button onClick={handleClean}>Cancelar</button>
        <button onClick={handleAdd}>Añadir</button>
      </div>
    </dialog>
  );
}

type ColorMenuProps = {
  colors: Colors;
  setColors: React.Dispatch<React.SetStateAction<Colors>>;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  hideMenu: () => void;
  save: () => void;
};
