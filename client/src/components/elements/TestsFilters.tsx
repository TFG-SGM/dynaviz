import { ChangeEvent } from "react";
import { DOCTOR_ENDPOINT, TEST_TYPE_ENDPOINT } from "../../utils/constants";
import { SelectDate } from "../selects/SelectDate";
import { SelectType } from "../selects/SelectType";
import { SelectDoctor } from "../selects/SelectDoctor";

interface TestFiltersProps {
  patientId: string;
  filters: {
    typeId: string;
    doctorId: string;
    date: string;
  };
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  isAdding?: boolean;
}

export function TestsFilters({
  patientId,
  filters,
  handleChange,
  isAdding,
}: TestFiltersProps) {
  return (
    <div className="test-filters">
      <SelectType
        option={"typeId"}
        value={filters.typeId}
        endpoint={TEST_TYPE_ENDPOINT}
        handleChange={handleChange}
        isAdding={isAdding}
      ></SelectType>
      <SelectDoctor
        option={"doctorId"}
        value={filters.doctorId}
        endpoint={DOCTOR_ENDPOINT}
        handleChange={handleChange}
        isAdding={isAdding}
      ></SelectDoctor>
      <SelectDate
        patientId={patientId}
        filters={filters}
        handleChange={handleChange}
        isAdding={isAdding}
      ></SelectDate>{" "}
    </div>
  );
}
