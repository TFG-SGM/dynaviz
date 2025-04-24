import { useState } from "react";
import { usePaintTexture } from "../../hooks/usePaintTexture";
import { Buttons } from "./Buttons";
import { ColorsList } from "./ColorsList";
import { CanvasComponent } from "./Canvas";
import { ModeSelector } from "./ModeSelector";
import { LayerSelector } from "./LayerSelector";
import { ROTATE_MODE } from "../../utils/constants";

export function ModelEditor() {
  const [mode, setMode] = useState<string>(ROTATE_MODE);
  const [colors, setColors] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedLayer, setSelectedLayer] = useState(0);
  const {
    texture,
    strokesRefs,
    paint,
    clearLayer,
    clearAllLayers,
    save,
    load,
    setActiveLayer,
  } = usePaintTexture({});

  return (
    <main
      style={{ width: "100vw", height: "100vh", display: "flex", gap: "20px" }}
    >
      <CanvasComponent
        texture={texture}
        strokesRef={strokesRefs}
        paint={paint}
        mode={mode}
        selectedColor={selectedColor}
      ></CanvasComponent>
      <div
        style={{
          margin: "10px auto",
          width: "fit-content",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <ModeSelector mode={mode} setMode={setMode}></ModeSelector>
        <Buttons
          clear={() => clearLayer(selectedLayer)}
          clearAll={clearAllLayers}
          save={save}
          load={load}
        ></Buttons>
        <LayerSelector
          setActiveLayer={setActiveLayer}
          selectedLayer={selectedLayer}
          setSelectedLayer={setSelectedLayer}
        ></LayerSelector>
        <ColorsList
          colors={colors}
          setColors={setColors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        ></ColorsList>
      </div>
    </main>
  );
}
