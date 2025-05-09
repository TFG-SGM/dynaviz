import { ChangeEventHandler } from "react";
import { useData } from "../../hooks/useData";
import { TestTypeData } from "../../utils/types";

interface SelectTypeProps {
  option: string;
  value: string;
  endpoint: string;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  isAdding?: boolean;
}

export function SelectType({
  option,
  value,
  endpoint,
  handleChange,
  isAdding,
}: SelectTypeProps) {
  const [testTypes] = useData<TestTypeData[]>(endpoint, isAdding);

  if (!testTypes) return;

  return (
    <select name={option} value={value} onChange={handleChange} required>
      <option value="">Selecciona un tipo</option>
      {testTypes.map((element, index) => (
        <option key={index} value={element._id}>
          {element.name}
        </option>
      ))}
    </select>
  );
}
