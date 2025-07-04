import { getLayerName } from "../../utils/helpers";
import { Letter3D } from "../other/Icons";

export function LayersColors({ isColorInLayer, color }: LayersColorsProps) {
  return (
    <div className="model-layers-colors">
      {[0, 1, 2].map((layer) =>
        isColorInLayer(color, layer) ? (
          <Letter3D
            key={layer}
            letter={getLayerName(layer)?.slice(0, 1) || ""}
          />
        ) : null
      )}
    </div>
  );
}

export interface LayersColorsProps {
  isColorInLayer: (color: string, layer: number) => boolean;
  color: string;
}
