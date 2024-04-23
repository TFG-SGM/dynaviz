import { FormEvent, useState } from "react";
import { DataService } from "../../services/DataService";
import { ManyTestsData, UserData } from "../../utils/types";
import { CrossButton } from "../buttons/CrossButton";
import { INITIAL_TEST, TEST_TYPE_ENDPOINT } from "../../utils/constants";
import { TestForm } from "./TestForm";
import { generateDataTest } from "../../utils/generateDataTest";
import { Overlay } from "../other/Overlay";
import { toast } from "sonner";
import { LoadingComponent } from "../other/LoadingComponent";

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
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsDisabled(true);
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
      toast.success("Prueba(s) añadida(s) correctamente");
    } catch (e) {
      console.log(e);
      setIsDisabled(false);
      toast.error("Error: Prueba(s) no añadida(s) correctamente");
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
            {isDisabled && (
              <LoadingComponent message="Añadiendo pruebas"></LoadingComponent>
            )}
            <button className="add-button" disabled={isDisabled}>
              Añadir
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={handleClean}
              disabled={isDisabled}
            >
              Cancelar
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
