import { ChangeEvent } from "react";
import { useData } from "../../hooks/useData";
import { TEST_ENDPOINT } from "../../utils/constants";
import { LoadingComponent } from "../other/LoadingComponent";

interface SelectDateProps {
  filters: { date: string };
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectDate({ filters, handleChange }: SelectDateProps) {
  const [dates] = useData<string[]>(TEST_ENDPOINT + "attributes/date");

  if (!dates) return <LoadingComponent></LoadingComponent>;
  return (
    <label>
      Fecha:{" "}
      <select name="date" value={filters.date} onChange={handleChange} required>
        <option value="">Selecciona una fecha</option>
        {dates.map((date, index) => (
          <option key={index} value={date}>
            {date.split("T")[0]}
          </option>
        ))}
      </select>
    </label>
  );
}
