import { useState } from "react";
import { usePaintTexture } from "../../hooks/usePaintTexture";
import { Buttons } from "./Buttons";
import { ColorsList } from "./ColorsList";
import { CanvasComponent } from "./Canvas";
import { LayerSelector } from "./LayerSelector";
import { ROTATE_MODE } from "../../utils/constants";
import { Colors, UserData } from "../../utils/types";
import { useData } from "../../hooks/useData";
import { format } from "date-fns";

export function ModelEditor({ patientId }: { patientId: string }) {
  const [user] = useData<UserData>("auth/user-data");
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [mode, setMode] = useState<string>(ROTATE_MODE);
  const [colors, setColors] = useState<Colors>({});
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedLayers, setSelectedLayers] = useState<number[]>([0]);
  const {
    texture,
    strokesRefs,
    visibleLayers,
    paint,
    clearLayer,
    reset,
    save,
    load,
    setActiveLayers,
    deleteColor,
    editColor,
    toggleLayerVisibility,
  } = usePaintTexture({ patientId, colors, setColors });

  return (
    <main className="model-editor-container">
      <CanvasComponent
        texture={texture}
        strokesRef={strokesRefs}
        paint={paint}
        mode={mode}
        selectedColor={selectedColor}
      ></CanvasComponent>
      <div className="model-editor-controls">
        <input
          className="model-editor-date-input"
          type="date"
          value={date}
          onChange={(e) => {
            const selectedDate = e.target.value;
            setDate(selectedDate);
            load(selectedDate);
          }}
        ></input>
        <Buttons
          mode={mode}
          selectedColor={selectedColor}
          setMode={setMode}
          reset={reset}
          save={save}
          setSelectedColor={setSelectedColor}
        ></Buttons>
        <LayerSelector
          setActiveLayers={setActiveLayers}
          selectedLayers={selectedLayers}
          setSelectedLayers={setSelectedLayers}
          clearLayer={clearLayer}
          visibleLayers={visibleLayers}
          toggleLayerVisibility={toggleLayerVisibility}
        ></LayerSelector>
        <ColorsList
          colors={colors}
          setColors={setColors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          deleteColor={deleteColor}
          editColor={editColor}
        ></ColorsList>
      </div>
    </main>
  );
}
