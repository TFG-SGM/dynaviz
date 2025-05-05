import { useState } from "react";
import { Overlay } from "../other/Overlay";
import { Colors } from "../../utils/types";

export function Note({ note, setNote, colors, setColors }: NoteProps) {
  if (!note) return;

  const [description, setDescription] = useState(colors[note].description);

  const setNewDescription = () => {
    if (description) {
      setColors((prevColors) => ({
        ...prevColors,
        [note]: { ...prevColors[note], description },
      }));
    }
    setNote(null);
  };

  return (
    <>
      <Overlay></Overlay>
      <dialog className="model-note" open>
        <p>
          Describe lo que significa '{note}' para el color{" "}
          <div
            style={{
              width: "15px",
              height: "15px",
              color: colors[note].color,
              backgroundColor: colors[note].color,
              borderRadius: "100%",
              display: "inline-block",
            }}
          ></div>
        </p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div>
          <button onClick={() => setNote(null)}>Cancelar</button>
          <button onClick={() => setNewDescription()}>Guardar</button>
        </div>
      </dialog>
    </>
  );
}

type NoteProps = {
  note: string | null;
  setNote: (note: string | null) => void;
  colors: Colors;
  setColors: React.Dispatch<React.SetStateAction<Colors>>;
};
