import { FormEvent, useState } from "react";
import { DataService } from "../../services/DataService";
import { TestData, UserData } from "../../utils/types";
import { ErrorComponent } from "../other/ErrorComponent";
import { AxiosError } from "axios";
import { CrossButton } from "../buttons/CrossButton";
import { INITIAL_TEST, TEST_TYPE_ENDPOINT } from "../../utils/constants";
import { TestForm } from "./TestForm";
import { generateDataTest } from "../../utils/generateDataTest";
import { useNavigate } from "react-router-dom";

export interface AddTestProps {
  endpoint: string;
  handleClean: () => void;
  patient: UserData;
}

export function AddTestForm({ endpoint, handleClean, patient }: AddTestProps) {
  const [newData, setNewData] = useState<TestData>({
    ...INITIAL_TEST,
    patientId: patient._id,
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await DataService.getData(
        TEST_TYPE_ENDPOINT + newData.typeId
      );
      const completeTest = {
        ...newData,
        data: generateDataTest(data.bodyParts),
      };

      const { _id } = await DataService.createData<TestData>(
        endpoint,
        completeTest
      );
      navigate(`/app/pacientes/${patient._id}/${_id}`);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError && error.response)
        setError(error.response.data.message);
    }
  };

  return (
    <dialog open>
      <CrossButton handleClean={handleClean}></CrossButton>
      <form onSubmit={handleSubmit}>
        <TestForm data={newData} setNewData={setNewData}></TestForm>
        <button>Añadir</button>
      </form>
      {error && <ErrorComponent error={error}></ErrorComponent>}
      <button onClick={handleClean}>Cancelar</button>
      <hr></hr>
    </dialog>
  );
}
