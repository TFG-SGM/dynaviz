import { ChangeEventHandler } from "react";
import { useData } from "../../hooks/useData";
import { TestTypeData } from "../../utils/types";
import { LoadingComponent } from "../other/LoadingComponent";

interface SelectTypeProps {
  option: string;
  value: string;
  endpoint: string;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
}

export function SelectType({
  option,
  value,
  endpoint,
  handleChange,
}: SelectTypeProps) {
  const [testTypes] = useData<TestTypeData[]>(endpoint);

  const label = option[0] === "t" ? "tipo" : "médico";
  if (!testTypes) return <LoadingComponent></LoadingComponent>;

  return (
    <select name={option} value={value} onChange={handleChange} required>
      <option value="">Selecciona un {label}</option>
      {testTypes.map((element, index) => (
        <option key={index} value={element._id}>
          {element.name}
        </option>
      ))}
    </select>
  );
}
