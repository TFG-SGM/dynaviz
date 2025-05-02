export function Buttons({ clear, reset, save }: ButtonsProps) {
  return (
    <div style={{ display: "flex", gap: "1px" }}>
      <button onClick={clear}>Limpiar capa</button>
      <button onClick={reset}>Resetear</button>
      <button onClick={save}>Guardar</button>
    </div>
  );
}

type ButtonsProps = {
  clear: () => void;
  reset: () => void;
  save: () => void;
};
