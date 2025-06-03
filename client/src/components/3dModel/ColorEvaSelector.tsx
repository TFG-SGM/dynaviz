import { useRef, useEffect } from "react";
import { COLORS } from "../../utils/constants";
import { adjustLightDark } from "../../utils/helpers";

export function ColorEvaSelector({
  base,
  intensity,
  onChange,
}: ColorEvaSelectorProps) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const display = adjustLightDark(base, intensity);

  return (
    <div ref={parentRef} className="model-color-selector">
      <div
        className="model-color-bullet"
        style={{
          backgroundColor: display,
          cursor: "pointer",
        }}
      >
        {intensity}
      </div>
      <div className="model-dropdown-container">
        <p>Elige un color y una intensidad:</p>
        <div className="model-dropdown">
          <div className="model-dropdown-colors-selector">
            {Object.entries(COLORS).map(([name, hex]) => (
              <button
                key={name}
                onClick={() => onChange(hex, intensity)}
                className="model-dropdown-color-button"
                style={{
                  border: base === name ? "3px solid black" : "1px solid #ccc",
                  backgroundColor: hex,
                }}
                title={name}
              />
            ))}
          </div>
          <div className="model-dropdown-intensity-selector">
            <label>
              <input
                type="range"
                min="0"
                max="10"
                value={intensity}
                onChange={(e) => onChange(base, Number(e.target.value))}
                style={{
                  writingMode: "vertical-lr",
                  WebkitAppearance: "slider-vertical",
                  height: "100%",
                  rotate: "180deg",
                }}
              />
            </label>
            <div className="model-dropdown-intensity-numbers">
              {Array.from({ length: 11 }, (_, i) => (
                <span key={i} style={{ fontSize: "12px" }}>
                  {10 - i}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ColorEvaSelectorProps {
  base: string;
  intensity: number;
  onChange: (base: string, intensity: number) => void;
}
