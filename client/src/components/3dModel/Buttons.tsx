export function Buttons({ clear, clearAll, save, load }: ButtonsProps) {
  return (
    <div style={{ display: "flex", gap: "1px" }}>
      <button onClick={clear}>Limpiar capa</button>
      <button onClick={clearAll}>Resetear</button>
      <button onClick={save}>Guardar</button>
      <button onClick={load}>Cargar</button>
    </div>
  );
}

type ButtonsProps = {
  clear: () => void;
  clearAll: () => void;
  save: () => void;
  load: () => void;
};
