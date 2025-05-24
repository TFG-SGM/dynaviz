import { useState } from "react";
import { CrossButton } from "../buttons/CrossButton";
import { Overlay } from "../other/Overlay";
import { DataService } from "../../services/DataService";
import { Colors, GeneralNoteType, Stroke } from "../../utils/types";

export function GeneralNote({
  generalNote,
  setGeneralNote,
  setIsGeneralNote,
  isPatient,
  patientId,
  strokesRefs,
  colors,
  date,
}: GeneralNoteProps) {
  const [newGeneralNote, setNewGeneralNote] = useState(generalNote);

  const handleSave = async () => {
    await DataService.createData("modelPainted", {
      patientId: patientId,
      date: date,
      generalNote: newGeneralNote,
      data: strokesRefs.current,
      colors: colors,
    });

    setGeneralNote(newGeneralNote);
    setIsGeneralNote(false);
  };

  return (
    <>
      <Overlay></Overlay>
      <dialog className="model-note" open>
        <div>
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
              ? "El médico todavía no ha puesto ningún comentario."
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

interface GeneralNoteProps {
  generalNote: GeneralNoteType;
  setGeneralNote: (note: GeneralNoteType) => void;
  setIsGeneralNote: (open: boolean) => void;
  isPatient: boolean;
  patientId: string;
  strokesRefs: React.RefObject<Stroke[][]>;
  colors: Colors;
  date: string;
}
