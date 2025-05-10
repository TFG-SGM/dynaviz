import ReactDOM from "react-dom";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { COLORS } from "../../utils/constants";

const adjustLightDark = (hex: string, level: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const maxBlend = 0.5; // Incrementado de 0.3 a 0.5
  const midpoint = 5;
  const blendFactor = (Math.abs(level - midpoint) / midpoint) * maxBlend;

  let blendedR, blendedG, blendedB;

  if (level < midpoint) {
    blendedR = Math.round(r + (255 - r) * blendFactor);
    blendedG = Math.round(g + (255 - g) * blendFactor);
    blendedB = Math.round(b + (255 - b) * blendFactor);
  } else if (level > midpoint) {
    const f = 1 - blendFactor;
    blendedR = Math.round(r * f);
    blendedG = Math.round(g * f);
    blendedB = Math.round(b * f);
  } else {
    blendedR = r;
    blendedG = g;
    blendedB = b;
  }

  // Convert to hexadecimal and ensure two digits
  const toHex = (value: number) => value.toString(16).padStart(2, "0");
  return `#${toHex(blendedR)}${toHex(blendedG)}${toHex(blendedB)}`;
};

export function ColorIntensityPicker({
  color,
  onChange,
}: ColorIntensityPickerProps) {
  const [isChoosing, setIsChoosing] = useState(false);
  const [selectedColor, setSelectedColor] = useState(color);
  const [intensity, setIntensity] = useState(5);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [displayColor, setDisplayColor] = useState(color);

  useLayoutEffect(() => {
    if (isChoosing && parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isChoosing]);

  useEffect(() => {
    setDisplayColor(adjustLightDark(selectedColor, intensity));
  }, [selectedColor, intensity]);

  useEffect(() => {
    onChange(displayColor);
  }, [displayColor, onChange]);

  const dropdown = (
    <div
      className="dropdown"
      style={{
        position: "absolute",
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        zIndex: 999,
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          width: "150px",
        }}
      >
        {Object.entries(COLORS).map(([name, hex]) => (
          <button
            key={name}
            onClick={() => {
              setSelectedColor(hex);
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border:
                selectedColor === name ? "3px solid black" : "1px solid #ccc",
              backgroundColor: hex,
              cursor: "pointer",
              outline: "none",
            }}
            title={name}
          />
        ))}
      </div>
      <label>
        <input
          type="range"
          min="0"
          max="10"
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
        />
        &nbsp;<strong>{intensity}</strong>
      </label>
    </div>
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        parentRef.current &&
        !parentRef.current.contains(target) &&
        !document.body.contains((target as HTMLElement).closest(".dropdown"))
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
    <div
      ref={parentRef}
      style={{
        position: "relative",
        paddingLeft: "50px",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "30px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: displayColor,
          cursor: "pointer",
        }}
        onClick={() => setIsChoosing(!isChoosing)}
      />
      {isChoosing && ReactDOM.createPortal(dropdown, document.body)}
    </div>
  );
}

type ColorIntensityPickerProps = {
  color: string;
  onChange: (color: string) => void;
};
