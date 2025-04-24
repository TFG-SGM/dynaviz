import { DRAWING_MODE, ROTATE_MODE } from "../../utils/constants";

export function ModeSelector({ mode, setMode }: ModeSelectorProps) {
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "200px" }}>
      <label htmlFor="modeSelector">Seleccionar Modo:</label>
      <select
        id="modeSelector"
        value={mode}
        onChange={handleModeChange}
        style={{ padding: "5px", fontSize: "16px" }}
      >
        <option value={ROTATE_MODE}>Modo Rotación</option>
        <option value={DRAWING_MODE}>Modo Dibujo</option>
      </select>
    </div>
  );
}

type ModeSelectorProps = {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
};
