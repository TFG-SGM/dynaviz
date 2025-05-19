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
      className="dropdown"
      style={{
        position: "absolute",
        display: "flex",
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        zIndex: 999,
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "20px",
        gap: "20px",
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
            onClick={() => onChange(hex, intensity)}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: base === name ? "3px solid black" : "1px solid #ccc",
              backgroundColor: hex,
              cursor: "pointer",
              outline: "none",
            }}
            title={name}
          />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", height: "200px" }}>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            marginLeft: "5px",
            marginBottom: "5px",
          }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} style={{ fontSize: "12px" }}>
              {10 - i}
            </span>
          ))}
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
        paddingLeft: "150px",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "30px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: display,
          cursor: "pointer",
          textAlign: "center",
          color: "white",
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
