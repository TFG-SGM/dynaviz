import { ChangeEventHandler } from "react";
import { useData } from "../../hooks/useData";
import { UserData } from "../../utils/types";

interface SelectTypeProps {
  option: string;
  value: string;
  endpoint: string;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  isAdding?: boolean;
}

export function SelectDoctor({
  option,
  value,
  endpoint,
  handleChange,
  isAdding,
}: SelectTypeProps) {
  const [doctors] = useData<UserData[]>(endpoint, isAdding);

  if (!doctors) return;

  return (
    <select name={option} value={value} onChange={handleChange} required>
      <option value="">Selecciona un médico</option>
      {doctors.map((element, index) => (
        <option key={index} value={element._id}>
          {element.name} {element.surname}
        </option>
      ))}
    </select>
  );
}
