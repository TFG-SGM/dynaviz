import { CrossButton } from "../buttons/CrossButton";
import { TestDataElement } from "../elements/TestDataElement";
import { DataService } from "../../services/DataService";
import { TEST_ENDPOINT } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

export interface TestMenuView {}

export function TestMenuView({ test, handleClean }: TestMenuView) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    navigate(-1);
    await DataService.deleteData(TEST_ENDPOINT + test?._id);
  };

  if (!test) return;
  return (
    <>
      <article>
        <CrossButton handleClean={handleClean}></CrossButton>
        <TestDataElement test={test}></TestDataElement>
        <button onClick={handleDelete}>Eliminar</button>
      </article>
    </>
  );
}
