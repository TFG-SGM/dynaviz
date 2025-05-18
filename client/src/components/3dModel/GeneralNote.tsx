import { useState } from "react";
import { CrossButton } from "../buttons/CrossButton";
import { Overlay } from "../other/Overlay";

export function GeneralNote({
  generalNote,
  setGeneralNote,
  setIsGeneralNote,
  isPatient,
}) {
  const [newGeneralNote, setNewGeneralNote] = useState(generalNote);

  const handleSave = async () => {
    try {
      setGeneralNote(newGeneralNote);
      setIsGeneralNote(false);
    } catch (error) {
      console.error("Error saving paint layers:", error);
    }
  };

  return (
    <>
      <Overlay></Overlay>
      <dialog className="model-note" open>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p>Describe lo que sientes hoy:</p>
          <CrossButton
            handleClean={() => setIsGeneralNote(false)}
          ></CrossButton>
        </div>
        <textarea
          value={newGeneralNote.patient}
          onChange={(e) =>
            setNewGeneralNote({
              doctor: newGeneralNote.doctor,
              patient: e.target.value,
            })
          }
          readOnly={!isPatient}
        ></textarea>
        <p>Comentarios del médico:</p>
        <textarea
          value={
            newGeneralNote.doctor === "" && isPatient
              ? "El médico todavía no ha puesto ningún comentario"
              : newGeneralNote.doctor
          }
          onChange={(e) =>
            setNewGeneralNote({
              doctor: e.target.value,
              patient: newGeneralNote.patient,
            })
          }
          readOnly={isPatient}
        ></textarea>
        <>
          <div>
            <button onClick={() => setIsGeneralNote(false)}>Cancelar</button>
            <button onClick={() => handleSave()}>Guardar</button>
          </div>
        </>
      </dialog>
    </>
  );
}

interface GeneralNoteProps {}
