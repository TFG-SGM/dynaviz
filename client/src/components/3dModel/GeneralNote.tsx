import { useState } from "react";
import { CrossButton } from "../buttons/CrossButton";
import { Overlay } from "../other/Overlay";
import { DataService } from "../../services/DataService";
import { Colors, GeneralNoteType, Stroke } from "../../utils/types";
import { toast } from "sonner";

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
    try {
      await DataService.createData("modelPainted", {
        patientId: patientId,
        date: date,
        generalNote: newGeneralNote,
        data: strokesRefs.current,
        colors: colors,
      });

      setGeneralNote(newGeneralNote);
      setIsGeneralNote(false);
      toast.success("Nota guardada correctamente");
    } catch (error) {
      console.error("Error al guardar la nota:", error);
      toast.error("Error: Nota no guardada correctamente");
    }
  };

  return (
    <>
      <Overlay></Overlay>
      <dialog className="model-note" open>
        <div>
          <h2></h2>
          <CrossButton
            handleClean={() => setIsGeneralNote(false)}
          ></CrossButton>
        </div>
        <p>Describe como te sientes hoy</p>
        <textarea
          placeholder={
            newGeneralNote.patient === "" && !isPatient
              ? "El paciente todavía no ha puesto ningún comentario."
              : ""
          }
          value={newGeneralNote.patient}
          onChange={(e) =>
            setNewGeneralNote({
              doctor: newGeneralNote.doctor,
              patient: e.target.value,
            })
          }
          readOnly={!isPatient}
        ></textarea>
        <p>Comentarios del médico</p>
        <textarea
          placeholder={
            newGeneralNote.doctor === "" && isPatient
              ? "El médico todavía no ha puesto ningún comentario."
              : ""
          }
          value={newGeneralNote.doctor}
          onChange={(e) =>
            setNewGeneralNote({
              doctor: e.target.value,
              patient: newGeneralNote.patient,
            })
          }
          readOnly={isPatient}
        ></textarea>
        <div className="buttons-container">
          <button onClick={() => setIsGeneralNote(false)}>Cancelar</button>
          <button onClick={() => handleSave()}>Guardar</button>
        </div>
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
