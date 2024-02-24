import { Dispatch, SetStateAction } from "react";
import { DataService } from "../../services/DataService";
import { UserData, actual } from "../../utils/types";
import { AxiosError } from "axios";

interface DeleteUserButton {
  endpoint: string;
  setActual?: Dispatch<SetStateAction<actual>> | null;
  setUsers: Dispatch<SetStateAction<UserData[] | null>>;
  setError: Dispatch<SetStateAction<string | null>>;
}

export function DeleteUserButton({
  endpoint,
  setActual = null,
  setUsers,
  setError,
}: DeleteUserButton) {
  const handleDelete = async () => {
    try {
      const data = await DataService.deleteData(endpoint);
      setUsers((prevState) =>
        prevState
          ? prevState.filter((dataDict) => dataDict._id !== data)
          : prevState
      );
      if (setActual) setActual({ action: "", userId: "" });
    } catch (error) {
      if (error instanceof AxiosError && error.response)
        setError("Error al eliminar. " + error.response.data.error);
    }
  };
  return <button onClick={handleDelete}>Eliminar usuario</button>;
}
