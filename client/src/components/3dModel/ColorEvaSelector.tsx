import ReactDOM from "react-dom";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { COLORS } from "../../utils/constants";
import { adjustLightDark } from "../../utils/helpers";

export function ColorEvaSelector({
  base,
  intensity,
  onChange,
}: ColorEvaSelectorProps) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [isChoosing, setIsChoosing] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const display = adjustLightDark(base, intensity);

  useLayoutEffect(() => {
    if (isChoosing && parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isChoosing]);

  const dropdown = (
    <div
      className="model-dropdown-container"
      style={{
        top: dropdownPosition.top,
        left: dropdownPosition.left,
      }}
    >
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
              min="1"
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
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} style={{ fontSize: "12px" }}>
                {10 - i}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        parentRef.current &&
        !parentRef.current.contains(target) &&
        !document.body.contains(
          (target as HTMLElement).closest(".model-dropdown")
        )
      ) {
        setIsChoosing(false);
      }
    };

    if (isChoosing) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChoosing]);

  return (
    <div ref={parentRef} className="model-color-selector">
      <div
        className="model-color-bullet"
        style={{
          backgroundColor: display,
          cursor: "pointer",
        }}
        onClick={() => setIsChoosing(!isChoosing)}
      >
        {intensity}
      </div>
      {isChoosing && ReactDOM.createPortal(dropdown, document.body)}
    </div>
  );
}

interface ColorEvaSelectorProps {
  base: string;
  intensity: number;
  onChange: (base: string, intensity: number) => void;
}
