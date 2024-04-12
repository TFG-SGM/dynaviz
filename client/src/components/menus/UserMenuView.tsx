import { Dispatch, SetStateAction, useState } from "react";
import { UpdateUserForm } from "../forms/UpdateUserForm";
import { useData } from "../../hooks/useData";
import { PatientData, UserData, userActual } from "../../utils/types";
import { UserDataElement } from "../elements/UserDataElement";
import { CrossButton } from "../buttons/CrossButton";
import { TestsViewButton } from "../buttons/TestsViewButton";
import { PatientDataElement } from "../elements/PatientDataElement";
import { Overlay } from "../other/Overlay";
import {
  ACTUAL_USER_ENDPOINT,
  TEST_ENDPOINT,
  VIDEO_ENDPOINT,
} from "../../utils/constants";
import { DeleteMenu } from "./DeleteMenu";
import { DataService } from "../../services/DataService";
import { getUserType } from "../../utils/helpers";

export interface UserMenuView {
  endpoint: string;
  handleClean: () => void;
  setActual: Dispatch<SetStateAction<userActual>>;
  setUsers: Dispatch<SetStateAction<UserData[] | null>>;
  handleUpdateList: (data: UserData) => void;
  isPatient?: boolean;
  setFeedback: Dispatch<SetStateAction<string | null>>;
}

export function UserMenuView({
  endpoint,
  handleClean,
  setActual,
  setUsers,
  handleUpdateList,
  isPatient = false,
  setFeedback,
}: UserMenuView) {
  const endpointParts = endpoint.split("/");
  const userType = getUserType(endpointParts[0] + "/");

  const [actualUser] = useData<UserData>(ACTUAL_USER_ENDPOINT);
  const [user, setUser] = useData<UserData | PatientData>(endpoint);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const handleStartDelete = () => setIsDelete(true);
  const handleCancelDelete = () => setIsDelete(false);

  const handleStartUpdate = () => setIsUpdate(true);
  const handleCancelUpdate = () => setIsUpdate(false);

  const handleUpdate = (data: UserData) => {
    try {
      setUser(data);
      handleUpdateList(data);
      setFeedback("Usuario editado correctamente");
    } catch (e) {
      setFeedback("Error: Usuario no editado correctamente");
    }
  };

  const handleDelete = async () => {
    try {
      const data = await DataService.deleteData(endpoint);
      if (isPatient) {
        const data = await DataService.deleteData(
          TEST_ENDPOINT + "patient/" + endpointParts[1]
        );
        if (data)
          data.forEach(async (id: string) => {
            await DataService.deleteData(VIDEO_ENDPOINT + id);
          });
      }
      setUsers((prevState) =>
        prevState
          ? prevState.filter((dataDict) => dataDict._id !== data)
          : prevState
      );
      if (setActual) setActual({ action: "", userId: "" });
      setFeedback(`${userType} eliminado correctamente`);
    } catch (e) {
      setFeedback(`Error: ${userType} no eliminado correctamente`);
    }
  };

  if (!user) return;
  return (
    <>
      <Overlay></Overlay>
      {isUpdate ? (
        <UpdateUserForm
          endpoint={endpoint}
          handleClean={handleClean}
          handleCancel={handleCancelUpdate}
          handleUpdate={handleUpdate}
        ></UpdateUserForm>
      ) : (
        <dialog className="view-menu" open>
          <>
            {isDelete && (
              <DeleteMenu
                handleDelete={handleDelete}
                handleClean={handleCancelDelete}
              ></DeleteMenu>
            )}
            <div className="menu-title">
              <h2>Detalles de {userType}</h2>
              <CrossButton handleClean={handleClean}></CrossButton>
            </div>{" "}
            {isPatient ? (
              <PatientDataElement
                user={user as PatientData}
              ></PatientDataElement>
            ) : (
              <UserDataElement user={user as UserData}></UserDataElement>
            )}
            <div className="buttons-container">
              <button className="delete-button" onClick={handleStartDelete}>
                Eliminar
              </button>
              <button onClick={handleStartUpdate}>Editar</button>
              {isPatient && actualUser?.role !== "admin" && (
                <TestsViewButton userId={user?._id}></TestsViewButton>
              )}
            </div>
          </>
        </dialog>
      )}
    </>
  );
}
