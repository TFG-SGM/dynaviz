import { ChangeEvent, FormEvent, useState } from "react";
import { Overlay } from "../other/Overlay";
import { DataService } from "../../services/DataService";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ErrorComponent } from "../other/ErrorComponent";
import { useEndpoint } from "../../hooks/useEndpoint";

export function ChangePassForm({
  id,
  handleChangePassForm,
}: {
  id: string;
  handleChangePassForm: () => void;
}) {
  const [passwords, setPasswords] = useState({ old: "", new1: "", new2: "" });
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [endpoint] = useEndpoint();

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsDisabled(true);
      await DataService.updateData(endpoint + "password/" + id, passwords);
      toast.success(`Contraseña cambiada correctamente`);
      handleChangePassForm();
    } catch (error) {
      setIsDisabled(false);
      toast.error(`Error: Contraseña no cambiada correctamente`);
      if (error instanceof AxiosError && error.response)
        setError(error.response.data.message);
    }
  };

  return (
    <>
      <Overlay></Overlay>
      <dialog>
        <div className="menu-title">
          <h2>Cambio de contraseña</h2>
        </div>{" "}
        <form onSubmit={handleSubmit} className="password-form">
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
          {error && <ErrorComponent error={error}></ErrorComponent>}
          <div className="buttons-container">
            <button
              disabled={isDisabled}
              type="button"
              className="cancel-button"
              onClick={handleChangePassForm}
            >
              Cancelar
            </button>
            <button disabled={isDisabled} type="submit">
              Cambiar
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
