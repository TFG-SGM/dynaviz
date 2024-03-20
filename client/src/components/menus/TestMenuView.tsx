import { CrossButton } from "../buttons/CrossButton";
import { TestDataElement } from "../elements/TestDataElement";
import { DataService } from "../../services/DataService";
import { TEST_ENDPOINT } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { TestData } from "../../utils/types";
import { Overlay } from "../other/Overlay";

export interface TestMenuView {
  test: TestData;
  handleClean: () => void;
}

export function TestMenuView({ test, handleClean }: TestMenuView) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    navigate(-1);
    await DataService.deleteData(TEST_ENDPOINT + test?._id);
  };

  if (!test) return;
  return (
    <>
      <Overlay></Overlay>
      <dialog open>
        <article>
          <CrossButton handleClean={handleClean}></CrossButton>
          <TestDataElement test={test}></TestDataElement>
          <button onClick={handleDelete}>Eliminar</button>
        </article>
      </dialog>
    </>
  );
}
