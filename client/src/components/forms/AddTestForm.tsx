import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { DataService } from "../../services/DataService";
import { ManyTestsData, UserData } from "../../utils/types";
import { CrossButton } from "../buttons/CrossButton";
import { INITIAL_TEST, TEST_TYPE_ENDPOINT } from "../../utils/constants";
import { TestForm } from "./TestForm";
import { generateDataTest } from "../../utils/generateDataTest";
import { Overlay } from "../other/Overlay";

export interface AddTestProps {
  endpoint: string;
  handleClean: () => void;
  patient: UserData;
  setFeedback: Dispatch<SetStateAction<string | null>>;
}

export function AddTestForm({
  endpoint,
  handleClean,
  patient,
  setFeedback,
}: AddTestProps) {
  const [newData, setNewData] = useState<ManyTestsData>({
    ...INITIAL_TEST,
    patientId: patient._id,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { doctorId, date, patientId, evaScale } = newData;
      const fetchPromises = Object.keys(newData.dataTests).map(
        async (dataKey) => {
          const { typeId, video } = newData.dataTests[parseInt(dataKey)];
          const data = await DataService.getData(TEST_TYPE_ENDPOINT + typeId);
          const completeTest = {
            _id: "",
            doctorId,
            date,
            patientId,
            evaScale,
            typeId,
            video,
            data: generateDataTest(data.bodyParts),
          };

          await DataService.createTestData(endpoint, completeTest);
        }
      );

      await Promise.all(fetchPromises);
      handleClean();
      setFeedback("Prueba(s) añadida(s) correctamente");
    } catch (e) {
      setFeedback("Error: Prueba(s) no añadida(s) correctamente");
    }
  };

  return (
    <>
      <Overlay></Overlay>
      <dialog open>
        <div className="menu-title">
          <h2>Nueva Prueba</h2>
          <CrossButton handleClean={handleClean}></CrossButton>
        </div>{" "}
        <form className="test-form" onSubmit={handleSubmit}>
          <TestForm data={newData} setNewData={setNewData}></TestForm>
          <div className="buttons-container">
            <button className="add-button">Añadir</button>
            <button
              type="button"
              className="cancel-button"
              onClick={handleClean}
            >
              Cancelar
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
