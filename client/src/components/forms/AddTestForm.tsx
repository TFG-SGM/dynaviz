import { FormEvent, useState } from "react";
import { DataService } from "../../services/DataService";
import { ManyTestsData, TestData, UserData } from "../../utils/types";
import { CrossButton } from "../buttons/CrossButton";
import { INITIAL_TEST, TEST_TYPE_ENDPOINT } from "../../utils/constants";
import { TestForm } from "./TestForm";
import { generateDataTest } from "../../utils/generateDataTest";
import { Overlay } from "../other/Overlay";

export interface AddTestProps {
  endpoint: string;
  handleClean: () => void;
  patient: UserData;
}

export function AddTestForm({ endpoint, handleClean, patient }: AddTestProps) {
  const [newData, setNewData] = useState<ManyTestsData>({
    ...INITIAL_TEST,
    patientId: patient._id,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { doctorId, date, patientId, evaScale } = newData;
    Object.keys(newData.dataTests).forEach(async (dataKey) => {
      const { typeId, video } = newData.dataTests[dataKey];
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

      await DataService.createData<TestData>(endpoint, completeTest);
    });
    handleClean();
  };

  return (
    <>
      <Overlay></Overlay>
      <dialog open>
        <CrossButton handleClean={handleClean}></CrossButton>
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
