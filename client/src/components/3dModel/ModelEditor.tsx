import { useState } from "react";
import { usePaintTexture } from "../../hooks/usePaintTexture";
import { Buttons } from "./Buttons";
import { ColorsList } from "./ColorsList";
import { CanvasComponent } from "./Canvas";
import { LayerSelector } from "./LayerSelector";
import { ROTATE_MODE } from "../../utils/constants";
import {
  Colors,
  DeleteMenuState,
  NoteState,
  UserData,
} from "../../utils/types";
import { useData } from "../../hooks/useData";
import { format } from "date-fns";
import { DeleteMenu } from "../menus/DeleteMenu";
import { Note } from "./Note";

export function ModelEditor({ patientId }: { patientId: string }) {
  const [user] = useData<UserData>("auth/user-data");
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [mode, setMode] = useState<string>(ROTATE_MODE);
  const [colors, setColors] = useState<Colors>({});
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedLayers, setSelectedLayers] = useState<number[]>([0]);
  const [deleteMenu, setDeleteMenu] = useState<DeleteMenuState | null>(null);
  const [note, setNote] = useState<string | null>(null);
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

  const handleReset = () => {
    setDeleteMenu({
      delete: reset,
      message: "¿Estas seguro de resetear?",
    });
  };

  const handleClearLayer = (layer: number) => {
    setDeleteMenu({
      delete: () => {
        clearLayer(layer);
      },
      message: "¿Estas seguro de limpiar la capa?",
    });
  };

  const handleDeleteColor = (key: string) => {
    setDeleteMenu({
      delete: () => {
        const updatedColors = { ...colors };
        delete updatedColors[key];
        setColors(updatedColors);
        deleteColor(colors[key].color);
      },
      message: "¿Estas seguro de eliminar todos los colores?",
    });
  };

  return (
    <main className="model-editor-container">
      {deleteMenu && (
        <DeleteMenu
          handleClean={() => setDeleteMenu(null)}
          handleDelete={() => deleteMenu.delete()}
          message={deleteMenu.message}
        ></DeleteMenu>
      )}
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
          handleReset={handleReset}
          save={save}
          setSelectedColor={setSelectedColor}
        ></Buttons>
        <LayerSelector
          setActiveLayers={setActiveLayers}
          selectedLayers={selectedLayers}
          setSelectedLayers={setSelectedLayers}
          handleClearLayer={handleClearLayer}
          visibleLayers={visibleLayers}
          toggleLayerVisibility={toggleLayerVisibility}
        ></LayerSelector>
        <ColorsList
          colors={colors}
          setColors={setColors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          handleDeleteColor={handleDeleteColor}
          editColor={editColor}
          setNote={setNote}
        ></ColorsList>
      </div>
      {note && (
        <Note
          note={note}
          setNote={setNote}
          colors={colors}
          setColors={setColors}
        ></Note>
      )}
    </main>
  );
}
