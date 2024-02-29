import { useData } from "../../hooks/useData";
import { TEST_ENDPOINT } from "../../utils/constants";
import { TestData } from "../../utils/types";

export function TestCard({ testId }: { testId: string }) {
  const [data] = useData<TestData>(TEST_ENDPOINT + testId);

  return (
    <article>
      <p>Médico: {data?.doctor}</p>
      <p>Tipo: {data?.type}</p>
      <p>Fecha: {data?.date}</p>
      <button>Consultar</button>
      <button>Eliminar</button>
      <hr></hr>
    </article>
  );
}
