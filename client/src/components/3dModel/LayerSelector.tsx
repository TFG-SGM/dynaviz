export function LayerSelector({
  setActiveLayers,
  selectedLayers,
  setSelectedLayers,
  visibleLayers,
  toggleLayerVisibility,
}: LayerSelectorProps) {
  const handleCheckboxChange = (layer: number) => {
    const updatedLayers = selectedLayers.includes(layer)
      ? selectedLayers.filter((l) => l !== layer)
      : [...selectedLayers, layer];

    setSelectedLayers(updatedLayers);
    setActiveLayers(updatedLayers);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2>Capas</h2>
      {[0, 1, 2].map((layer) => (
        <div
          key={layer}
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <label>
            <input
              type="checkbox"
              checked={selectedLayers.includes(layer)}
              onChange={() => handleCheckboxChange(layer)}
            />
            Capa {layer + 1}
          </label>
          <button
            onClick={() => toggleLayerVisibility(layer)}
            style={{
              backgroundColor: visibleLayers.has(layer) ? "green" : "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            {visibleLayers.has(layer) ? "Visible" : "Oculta"}
          </button>
        </div>
      ))}
      <p>
        Capas seleccionadas:{" "}
        {selectedLayers.map((l) => `Capa ${l + 1}`).join(", ")}
      </p>
      <p>
        Capas visibles:{" "}
        {Array.from(visibleLayers)
          .map((l) => `Capa ${l + 1}`)
          .join(", ")}
      </p>
    </div>
  );
}

type LayerSelectorProps = {
  setActiveLayers: (layers: number[]) => void;
  selectedLayers: number[];
  setSelectedLayers: React.Dispatch<React.SetStateAction<number[]>>;
  visibleLayers: Set<number>;
  toggleLayerVisibility: (layer: number) => void;
};
