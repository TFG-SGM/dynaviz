import { useEffect, useRef, useState } from "react";
import { usePaintTexture } from "../../hooks/usePaintTexture";
import { Buttons } from "./Buttons";
import { ColorsList } from "./ColorsList";
import { CanvasComponent } from "./Canvas";
import { LayerSelector } from "./LayerSelector";
import { ROTATE_MODE } from "../../utils/constants";
import {
  Colors,
  DeleteMenuState,
  Downloader3DRef,
  UserData,
} from "../../utils/types";
import { useData } from "../../hooks/useData";
import { format } from "date-fns";
import { DeleteMenu } from "../menus/DeleteMenu";
import { Note } from "./Note";
import { getLayerName, isToday } from "../../utils/helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dowloand3D, Note3D } from "../other/Icons";
import { GeneralNote } from "./GeneralNote";
import { DataService } from "../../services/DataService";
import { Toaster } from "sonner";

export function ModelEditor({ patientId }: { patientId: string }) {
  const [user] = useData<UserData>("auth/user-data");
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [mode, setMode] = useState<string>(ROTATE_MODE);
  const [colors, setColors] = useState<Colors>({});
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedLayers, setSelectedLayers] = useState<number[]>([0]);
  const [deleteMenu, setDeleteMenu] = useState<DeleteMenuState | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [generalNote, setGeneralNote] = useState({
    patient: "",
    doctor: "",
  });
  const [isGeneralNote, setIsGeneralNote] = useState(false);
  const disabledDates = useData<string[]>(
    `modelPainted/patient/${patientId}/dates`
  );
  const [isControlModel, setIsControlModel] = useState(false);
  const downloaderRef = useRef<Downloader3DRef>(null);

  const isDateDisabled = (date: string) => {
    return disabledDates?.[0]?.includes(date) ?? false;
  };

  const handleDownload = async () => {
    const patient = await DataService.getData(`patient/${patientId}`);
    downloaderRef.current?.downloadPdfWithViews(
      patient,
      date,
      colors,
      generalNote
    );
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
    toggleLayerVisibility,
  } = usePaintTexture({
    patientId,
    colors,
    setColors,
    generalNote,
    setGeneralNote,
  });

  const handleReset = () => {
    setDeleteMenu({
      delete: reset,
      message:
        "Se eliminará todo lo dibujado en todas las capas. ¿Estas seguro de resetear?",
    });
  };

  const handleClearLayer = (layer: number) => {
    setDeleteMenu({
      delete: () => {
        clearLayer(layer);
      },
      message: `Se eliminará todo lo dibujado en la capa "${getLayerName(
        layer
      )}". ¿Estas seguro de limpiar la capa?`,
    });
  };

  const handleDeleteColor = (key: string) => {
    setDeleteMenu({
      delete: () => {
        const updatedColors = { ...colors };
        delete updatedColors[key];
        setColors(updatedColors);
        deleteColor(colors[key].color);
        save(updatedColors);
      },
      message: colors[key],
    });
  };

  return (
    <main className="model-editor-container">
      <Toaster position="top-center" richColors expand={true}></Toaster>
      {deleteMenu && (
        <DeleteMenu
          handleClean={() => setDeleteMenu(null)}
          handleDelete={() => deleteMenu.delete()}
          message={deleteMenu.message}
        ></DeleteMenu>
      )}
      {isGeneralNote && (
        <GeneralNote
          generalNote={generalNote}
          setGeneralNote={setGeneralNote}
          setIsGeneralNote={setIsGeneralNote}
          isPatient={user?.role === "patient"}
          patientId={patientId}
          strokesRefs={strokesRefs}
          colors={colors}
          date={date}
        ></GeneralNote>
      )}
      <CanvasComponent
        texture={texture}
        strokesRef={strokesRefs}
        saveLocal={saveLocal}
        paint={paint}
        mode={mode}
        selectedColor={selectedColor}
        downloaderRef={downloaderRef}
      ></CanvasComponent>
      <div className="model-editor-controls-container">
        <button
          className="model-editor-controls-button"
          onClick={() => setIsControlModel(!isControlModel)}
        >
          {isControlModel ? "Ocultar menú" : "Mostrar menú"}
        </button>
        <div className={`model-editor-controls ${isControlModel && "show"}`}>
          <div
            className={`model-date-container ${
              user?.role !== "patient" && "date-container-doctor"
            }`}
          >
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
            <button
              onClick={() => setIsGeneralNote(true)}
              title="Añadir nota general"
            >
              <Note3D></Note3D>
            </button>
            {user?.role !== "patient" && (
              <button onClick={handleDownload} title="Descargar PDF">
                <Dowloand3D></Dowloand3D>
              </button>
            )}
          </div>
          {user?.role === "patient" && isToday(date) && (
            <Buttons
              mode={mode}
              selectedColor={selectedColor}
              setMode={setMode}
              handleReset={handleReset}
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
            setNote={setNote}
            save={save}
          ></ColorsList>
        </div>
      </div>
      {note && (
        <Note
          note={note}
          setNote={setNote}
          colors={colors}
          setColors={setColors}
          isPatient={user?.role === "patient" && isToday(date)}
          patientId={patientId}
          date={date}
          generalNote={generalNote}
          strokesRefs={strokesRefs}
        ></Note>
      )}
    </main>
  );
}
