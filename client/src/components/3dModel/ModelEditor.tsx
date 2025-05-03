import { useState } from "react";
import { usePaintTexture } from "../../hooks/usePaintTexture";
import { Buttons } from "./Buttons";
import { ColorsList } from "./ColorsList";
import { CanvasComponent } from "./Canvas";
import { ModeSelector } from "./ModeSelector";
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
    clearSelectedLayers,
    reset,
    save,
    load,
    setActiveLayers,
    deleteColor,
    editColor,
    toggleLayerVisibility,
  } = usePaintTexture({ patientId, colors, setColors });

  return (
    <main
      style={{
        height: "85vh",
        margin: "0 25px",
        display: "flex",
        gap: "20px",
      }}
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
          width: "fit-content",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <input
          type="date"
          value={date}
          onChange={(e) => {
            const selectedDate = e.target.value;
            setDate(selectedDate);
            load(selectedDate);
          }}
        ></input>
        <ModeSelector mode={mode} setMode={setMode}></ModeSelector>
        <Buttons
          clear={() => clearSelectedLayers()}
          reset={reset}
          save={save}
        ></Buttons>
        <LayerSelector
          setActiveLayers={setActiveLayers}
          selectedLayers={selectedLayers}
          setSelectedLayers={setSelectedLayers}
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
