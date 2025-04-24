export function LayerSelector({
  setActiveLayer,
  selectedLayer,
  setSelectedLayer,
}: LayerSelectorProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2>Capas</h2>
      {[0, 1, 2].map((layer) => (
        <ul
          key={layer}
          style={{ display: "flex", gap: "10px", cursor: "pointer" }}
        >
          <li
            style={{
              border: `1px solid ${selectedLayer === layer ? "red" : "black"}`,
            }}
            onClick={() => {
              setActiveLayer(layer);
              setSelectedLayer(layer);
            }}
          >
            Capa {layer + 1}
          </li>
        </ul>
      ))}
    </div>
  );
}

type LayerSelectorProps = {
  setActiveLayer: (layer: number) => void;
  selectedLayer: number;
  setSelectedLayer: React.Dispatch<React.SetStateAction<number>>;
};
