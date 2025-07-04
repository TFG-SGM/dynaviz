import { useEffect, useState } from "react";
import { Colors } from "../../utils/types";
import { ColorMenu } from "./ColorMenu";
import { Note3D, TrashColor3D } from "../other/Icons";
import { LayersColors } from "./LayersColors";

export function ColorsList({
  isPatient,
  colors,
  setColors,
  selectedColor,
  setSelectedColor,
  handleDeleteColor,
  setNote,
  save,
  isColorInLayer,
}: ColorsListProps) {
  const [isColorMenu, setIsColorMenu] = useState(false);

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
        <button onClick={() => setIsColorMenu(true)}>Añadir color &#43;</button>
      )}
      {isColorMenu && (
        <ColorMenu
          colors={colors}
          setColors={setColors}
          setSelectedColor={setSelectedColor}
          hideMenu={() => setIsColorMenu(false)}
          save={save}
        ></ColorMenu>
      )}
      <div className="model-colors-list">
        {Object.keys(colors).length === 0 ? (
          <p>&#x26A0; No hay ningún color creado todavía</p>
        ) : (
          Object.keys(colors).map((key) => (
            <div
              className="model-color-item"
              key={key}
              title={colors[key].description}
            >
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
              </label>
              <div className="model-color-details">
                <div
                  className="model-color-bullet"
                  style={{
                    backgroundColor: colors[key].color,
                  }}
                ></div>
                <p>{colors[key].intensity}</p>
                <LayersColors
                  color={colors[key].color}
                  isColorInLayer={isColorInLayer}
                ></LayersColors>
              </div>
              <div className="model-color-actions">
                <div>
                  <button onClick={() => setNote(key)} title="Editar nota">
                    <Note3D></Note3D>
                  </button>
                  {isPatient && (
                    <>
                      <button
                        onClick={() => handleDeleteColor(key)}
                        title="Eliminar color"
                      >
                        <TrashColor3D></TrashColor3D>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
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
  save: () => void;
  isColorInLayer: (color: string, layer: number) => boolean;
};
