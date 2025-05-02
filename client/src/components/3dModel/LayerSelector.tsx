export function LayerSelector({
  setActiveLayers,
  selectedLayers,
  setSelectedLayers,
}: LayerSelectorProps) {
  const handleRangeChange = (value: number) => {
    let layers: number[] = [];
    switch (value) {
      case 1:
        layers = [0]; // Capa 1
        break;
      case 2:
        layers = [1]; // Capa 2
        break;
      case 3:
        layers = [2]; // Capa 3
        break;
      case 4:
        layers = [0, 1]; // Capas 1 y 2
        break;
      case 5:
        layers = [0, 1, 2]; // Todas las capas
        break;
      default:
        layers = [];
    }
    setSelectedLayers(layers);
    setActiveLayers(layers);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2>Capas</h2>
      <input
        type="range"
        min={1}
        max={5}
        step={1}
        value={
          selectedLayers.length === 3
            ? 5 // Todas las capas
            : selectedLayers.length === 2
            ? 4 // Capas 1 y 2
            : selectedLayers.length === 1 && selectedLayers.includes(2)
            ? 3 // Solo capa 3
            : selectedLayers[0] === 1
            ? 2 // Solo capa 2
            : 1 // Solo capa 1
        }
        onChange={(e) => handleRangeChange(Number(e.target.value))}
      />
      <p>Capas: {selectedLayers.toString()}</p>
    </div>
  );
}

type LayerSelectorProps = {
  setActiveLayers: (layers: number[]) => void;
  selectedLayers: number[];
  setSelectedLayers: React.Dispatch<React.SetStateAction<number[]>>;
};
