import { Overlay } from "../other/Overlay";

interface DeleteMenuProps {
  handleDelete: () => void;
  handleClean: () => void;
}

export function DeleteMenu({ handleDelete, handleClean }: DeleteMenuProps) {
  return (
    <>
      <Overlay></Overlay>
      <dialog open className="delete-menu">
        <p>¿Estas seguro de eliminar?</p>
        <div className="buttons-container">
          <button className="cancel-button" onClick={handleClean}>
            Cancelar
          </button>
          <button onClick={handleDelete}>Confirmar</button>
        </div>
      </dialog>
    </>
  );
}