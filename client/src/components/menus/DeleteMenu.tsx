import { Overlay } from "../other/Overlay";

interface DeleteMenuProps {
  handleDelete: () => void;
  handleClean: () => void;
  message?:
    | string
    | { color: string; description: string; intensity: number; base: string };
}

export function DeleteMenu({
  handleDelete,
  handleClean,
  message = "¿Estas seguro de eliminar?",
}: DeleteMenuProps) {
  const handleConfirm = () => {
    handleDelete();
    handleClean();
  };

  return (
    <>
      <Overlay></Overlay>
      <dialog open className="delete-menu">
        {typeof message === "string" ? (
          <p>{message}</p>
        ) : (
          <p>
            Se eliminará todo lo dibujado con el color{" "}
            <span
              className="model-note-color"
              style={{
                backgroundColor: message.color,
              }}
              title={message.description}
            ></span>{" "}
            ¿Estas seguro de eliminar el color?
          </p>
        )}
        <div className="buttons-container">
          <button className="cancel-button" onClick={handleClean}>
            Cancelar
          </button>
          <button onClick={handleConfirm}>Confirmar</button>
        </div>
      </dialog>
    </>
  );
}
