import { Overlay } from "../other/Overlay";

interface DeleteMenuProps {
  handleDelete: () => void;
  handleClean: () => void;
  message?: string;
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
        <p>{message}</p>
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
