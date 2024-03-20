import { ChangeEvent } from "react";
import { DOCTOR_ENDPOINT, TEST_TYPE_ENDPOINT } from "../../utils/constants";
import { SelectDate } from "../selects/SelectDate";
import { SelectType } from "../selects/SelectType";

interface TestFiltersProps {
  filters: {
    typeId: string;
    doctorId: string;
    date: string;
  };
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export function TestsFilters({ filters, handleChange }: TestFiltersProps) {
  return (
    <div className="test-filters">
      <SelectType
        option={"typeId"}
        value={filters.typeId}
        endpoint={TEST_TYPE_ENDPOINT}
        handleChange={handleChange}
      ></SelectType>
      <SelectType
        option={"doctorId"}
        value={filters.doctorId}
        endpoint={DOCTOR_ENDPOINT}
        handleChange={handleChange}
      ></SelectType>
      <SelectDate filters={filters} handleChange={handleChange}></SelectDate>{" "}
    </div>
  );
}
