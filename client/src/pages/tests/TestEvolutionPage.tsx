import { useParams } from "react-router-dom";
import { useData } from "../../hooks/useData";
import { TEST_ENDPOINT } from "../../utils/constants";
import { ChangeEvent, useState } from "react";
import { useFilters } from "../../hooks/useFilters";
import { TestsFilters } from "../../components/elements/TestsFilters";

export function TestEvolutionPage() {
  const { patientId } = useParams();
  const [filters, setFilters] = useState({
    doctorId: "",
    typeId: "",
    date: "",
  });
  const [filtersText] = useFilters(filters);
  const [tests] = useData(
    TEST_ENDPOINT + "?patientId=" + patientId + filtersText
  );

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFilters((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <>
      <h1>Evolución</h1>{" "}
      <TestsFilters
        filters={filters}
        handleChange={handleChange}
      ></TestsFilters>
    </>
  );
}
