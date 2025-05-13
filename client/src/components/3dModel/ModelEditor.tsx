import { useEffect, useState } from "react";
import { usePaintTexture } from "../../hooks/usePaintTexture";
import { Buttons } from "./Buttons";
import { ColorsList } from "./ColorsList";
import { CanvasComponent } from "./Canvas";
import { LayerSelector } from "./LayerSelector";
import { ROTATE_MODE } from "../../utils/constants";
import { Colors, DeleteMenuState, UserData } from "../../utils/types";
import { useData } from "../../hooks/useData";
import { format } from "date-fns";
import { DeleteMenu } from "../menus/DeleteMenu";
import { Note } from "./Note";
import { isToday } from "../../utils/helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function ModelEditor({ patientId }: { patientId: string }) {
  const [user] = useData<UserData>("auth/user-data");
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [mode, setMode] = useState<string>(ROTATE_MODE);
  const [colors, setColors] = useState<Colors>({});
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedLayers, setSelectedLayers] = useState<number[]>([0]);
  const [deleteMenu, setDeleteMenu] = useState<DeleteMenuState | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const disabledDates = useData<string[]>(
    `modelPainted/patient/${patientId}/dates`
  );

  const isDateDisabled = (date: string) => {
    return disabledDates?.[0]?.includes(date) ?? false;
  };

  useEffect(() => {
    load();
  }, []);

  const {
    texture,
    strokesRefs,
    visibleLayers,
    paint,
    clearLayer,
    reset,
    save,
    saveLocal,
    load,
    loadLocal,
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
      message: "¿Estas seguro de eliminar el color?",
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
        saveLocal={saveLocal}
        paint={paint}
        mode={mode}
        selectedColor={selectedColor}
      ></CanvasComponent>
      <div className="model-editor-controls">
        <DatePicker
          className="model-editor-date-input"
          selected={new Date(date)}
          onChange={(date: Date | null) => {
            if (date) {
              const selectedDate = format(date, "yyyy-MM-dd");
              setDate(selectedDate);
              setMode(ROTATE_MODE);
              load(selectedDate);
            }
          }}
          filterDate={(date) => isDateDisabled(format(date, "yyyy-MM-dd"))}
          portalId="root"
          dateFormat="dd-MM-YYYY"
        />
        {user?.role === "patient" && isToday(date) && (
          <Buttons
            mode={mode}
            selectedColor={selectedColor}
            setMode={setMode}
            handleReset={handleReset}
            save={save}
            setSelectedColor={setSelectedColor}
            loadLocal={loadLocal}
          ></Buttons>
        )}
        <LayerSelector
          isPatient={user?.role === "patient" && isToday(date)}
          setActiveLayers={setActiveLayers}
          selectedLayers={selectedLayers}
          setSelectedLayers={setSelectedLayers}
          handleClearLayer={handleClearLayer}
          visibleLayers={visibleLayers}
          toggleLayerVisibility={toggleLayerVisibility}
        ></LayerSelector>
        <ColorsList
          isPatient={user?.role === "patient" && isToday(date)}
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
          isPatient={user?.role === "patient" && isToday(date)}
        ></Note>
      )}
    </main>
  );
}
