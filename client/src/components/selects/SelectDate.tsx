import { ChangeEvent } from "react";
import { useData } from "../../hooks/useData";
import { TEST_ENDPOINT } from "../../utils/constants";

interface SelectDateProps {
  patientId: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  isAdding?: boolean;
}

export function SelectDate({
  patientId,
  value,
  handleChange,
  isAdding,
}: SelectDateProps) {
  const [dates] = useData<string[]>(
    TEST_ENDPOINT + `attribute?attribute=date&patientId=${patientId}`,
    isAdding
  );

  if (!dates) return;
  return (
    <select name="date" value={value} onChange={handleChange} required>
      <option value="">Selecciona una fecha</option>
      {dates.map((date, index) => (
        <option key={index} value={date}>
          {date.split("T")[0]}
        </option>
      ))}
    </select>
  );
}
