import { useState } from "react";
import { Overlay } from "../other/Overlay";
import { Colors } from "../../utils/types";
import { CrossButton } from "../buttons/CrossButton";
import { toast } from "sonner";

export function Note({
  note,
  setNote,
  colors,
  setColors,
  isPatient,
}: NoteProps) {
  const [description, setDescription] = useState(
    note ? colors[note].description : ""
  );

  if (!note) return null;

  const setNewDescription = () => {
    if (description) {
      setColors((prevColors) => ({
        ...prevColors,
        [note]: { ...prevColors[note], description },
      }));
    }
    setNote(null);
    toast.success("Nota guardada correctamente");
    toast.warning("Recurda guardar el modelo para que se guarde la nota");
  };

  return (
    <>
      <Overlay></Overlay>
      <dialog className="model-note" open>
        <div>
          <p>
            Describe lo que significa '{note}' para el color{" "}
            <div
              className="model-note-color"
              style={{
                color: colors[note].color,
                backgroundColor: colors[note].color,
              }}
            ></div>
          </p>
          <CrossButton handleClean={() => setNote(null)}></CrossButton>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          readOnly={!isPatient}
        ></textarea>
        {isPatient && (
          <>
            <div>
              <button onClick={() => setNote(null)}>Cancelar</button>
              <button onClick={() => setNewDescription()}>Guardar</button>
            </div>
          </>
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
};
