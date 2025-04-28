import { useData } from "../../hooks/useData";
import { ModelPainted } from "../../utils/types";
import { LoadingComponent } from "../other/LoadingComponent";

export function ModelList({
  patientId,
  load,
}: {
  patientId: string;
  load: (date: string) => void;
}) {
  const [data, , error] = useData<ModelPainted[]>(
    `modelPainted/patient/${patientId}`
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <LoadingComponent message="..."></LoadingComponent>;
  }

  return (
    <ul>
      {data.map((model) => (
        <li key={model._id} onClick={() => load(model.date.split("T")[0])}>
          {model.date.split("T")[0]}
        </li>
      ))}
    </ul>
  );
}
