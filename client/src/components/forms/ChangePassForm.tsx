import { ChangeEvent, useState } from "react";
import { Overlay } from "../other/Overlay";

export function ChangePassForm({ handleChangePassForm }) {
  const [passwords, setPasswords] = useState({ old: "", new1: "", new2: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPasswords((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {};

  return (
    <>
      <Overlay></Overlay>
      <dialog>
        <div className="menu-title">
          <h2>Cambio de contraseña</h2>
        </div>{" "}
        <form>
          <label>
            Contraseña actual
            <input
              name="old"
              type="password"
              value={passwords.old}
              onChange={handleChange}
              required
            ></input>
          </label>
          <label>
            Nueva contraseña
            <input
              name="new1"
              type="password"
              value={passwords.new1}
              onChange={handleChange}
              required
            ></input>
          </label>
          <label>
            Confirmar nueva contraseña
            <input
              name="new2"
              type="password"
              value={passwords.new2}
              onChange={handleChange}
              required
            ></input>
          </label>
          <div className="buttons-container">
            <button
              type="button"
              className="cancel-button"
              onClick={handleChangePassForm}
            >
              Cancelar
            </button>
            <button>Cambiar</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
