import { useState } from "react";
import { Overlay } from "../other/Overlay";
import { Colors, Stroke } from "../../utils/types";
import { CrossButton } from "../buttons/CrossButton";
import { toast } from "sonner";
import { DataService } from "../../services/DataService";

export function Note({
  note,
  setNote,
  colors,
  setColors,
  isPatient,
  patientId,
  date,
  generalNote,
  strokesRefs,
}: NoteProps) {
  const [description, setDescription] = useState(
    note ? colors[note].description : ""
  );

  if (!note) return null;

  const setNewDescription = async () => {
    if (description) {
      const newColors = {
        ...colors,
        [note]: { ...colors[note], description },
      };

      await DataService.createData("modelPainted", {
        patientId: patientId,
        date: date,
        generalNote: generalNote,
        data: strokesRefs.current,
        colors: newColors,
      });

      setColors(newColors);
    }
    setNote(null);
    toast.success("Nota guardada correctamente");
  };

  return (
    <>
      <Overlay></Overlay>
      <dialog className="model-note" open>
        <div>
          <p>
            Describe lo que significa el color{" "}
            <span
              className="model-note-color"
              style={{
                backgroundColor: colors[note].color,
              }}
            ></span>
          </p>
          <CrossButton handleClean={() => setNote(null)}></CrossButton>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          readOnly={!isPatient}
        ></textarea>
        {isPatient && (
          <div className="buttons-container">
            <button onClick={() => setNote(null)}>Cancelar</button>
            <button onClick={() => setNewDescription()}>Guardar</button>
          </div>
        )}
      </dialog>
    </>
  );
}

type NoteProps = {
  note: string | null;
  setNote: (note: string | null) => void;
  colors: Colors;
  setColors: React.Dispatch<React.SetStateAction<Colors>>;
  isPatient: boolean;
  patientId: string;
  date: string;
  generalNote: { doctor: string; patient: string };
  strokesRefs: React.RefObject<Stroke[][]>;
};
