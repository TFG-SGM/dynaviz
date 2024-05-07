import { CrossButton } from "../buttons/CrossButton";
import { TestDataElement } from "../elements/TestDataElement";
import { DataService } from "../../services/DataService";
import { FILE_ENDPOINT, TEST_ENDPOINT } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { TestData } from "../../utils/types";
import { Overlay } from "../other/Overlay";
import { DeleteMenu } from "./DeleteMenu";
import { useState } from "react";

export interface TestMenuView {
  test: TestData;
  handleClean: () => void;
}

export function TestMenuView({ test, handleClean }: TestMenuView) {
  const navigate = useNavigate();

  const [isDelete, setIsDelete] = useState(false);

  const handleStartDelete = () => setIsDelete(true);
  const handleCancelDelete = () => setIsDelete(false);

  const handleDelete = async () => {
    navigate(-1);

    await Promise.all([
      DataService.deleteData(FILE_ENDPOINT + test.video.id),
      DataService.deleteData(TEST_ENDPOINT + test._id),
    ]);
  };

  if (!test) return;
  return (
    <>
      <Overlay></Overlay>
      <dialog open className="view-menu">
        {isDelete && (
          <DeleteMenu
            handleDelete={handleDelete}
            handleClean={handleCancelDelete}
          ></DeleteMenu>
        )}
        <div className="menu-title">
          <h2>Detalles de Prueba</h2>
          <CrossButton handleClean={handleClean}></CrossButton>
        </div>
        <TestDataElement test={test}></TestDataElement>
        <button className="delete-button" onClick={handleStartDelete}>
          Eliminar
        </button>
      </dialog>
    </>
  );
}
