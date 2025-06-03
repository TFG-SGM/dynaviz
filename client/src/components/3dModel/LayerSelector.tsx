import { getLayerName } from "../../utils/helpers";
import { Reset3D, VisibleActive3D, VisibleInactive3D } from "../other/Icons";

export function LayerSelector({
  isPatient,
  setActiveLayers,
  selectedLayers,
  setSelectedLayers,
  handleClearLayer,
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
    <details className="model-layer-selector-container">
      <summary>Capas</summary>
      <div className="model-layer-selector-content">
        {[0, 1, 2].map((layer) => (
          <div key={layer} className="model-layer-selector">
            <label>
              {isPatient && (
                <input
                  type="checkbox"
                  checked={selectedLayers.includes(layer)}
                  onChange={() => handleCheckboxChange(layer)}
                />
              )}
              {getLayerName(layer)}
            </label>
            <div>
              {isPatient && (
                <button
                  onClick={() => handleClearLayer(layer)}
                  className="model-layer-clear-button"
                  title="Limpiar capa"
                >
                  <Reset3D></Reset3D>
                </button>
              )}
              <button
                onClick={() => toggleLayerVisibility(layer)}
                className="model-layer-visibility-button"
                title={
                  visibleLayers.has(layer) ? "Ocultar capa" : "Mostrar capa"
                }
              >
                {visibleLayers.has(layer) ? (
                  <VisibleActive3D></VisibleActive3D>
                ) : (
                  <VisibleInactive3D></VisibleInactive3D>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}

type LayerSelectorProps = {
  isPatient: boolean;
  setActiveLayers: (layers: number[]) => void;
  selectedLayers: number[];
  setSelectedLayers: React.Dispatch<React.SetStateAction<number[]>>;
  handleClearLayer: (layer: number) => void;
  visibleLayers: Set<number>;
  toggleLayerVisibility: (layer: number) => void;
};
