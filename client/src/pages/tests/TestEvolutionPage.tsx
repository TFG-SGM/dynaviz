import { useParams } from "react-router-dom";
import { useData } from "../../hooks/useData";
import { TEST_ENDPOINT } from "../../utils/constants";
import { ChangeEvent, useState } from "react";
import { useFilters } from "../../hooks/useFilters";
import { TestsFilters } from "../../components/elements/TestsFilters";
import { EvolutionChart } from "../../components/charts/evolution";
import { TestData } from "../../utils/types";
import { EmptyListComponent } from "../../components/other/EmptyListComponent";

export function TestEvolutionPage() {
  const { id } = useParams();
  const [chartType, setChartType] = useState("line");
  const [filters, setFilters] = useState({
    doctorId: "",
    typeId: "",
    date: "",
  });
  const [filtersText] = useFilters(filters);
  const [tests] = useData<TestData[]>(
    TEST_ENDPOINT + "?patientId=" + id + filtersText
  );

  const handleChangeChart = (e: ChangeEvent<HTMLSelectElement>) => {
    setChartType(e.target.value);
  };

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
      {tests ? (
        <>
          <EvolutionChart tests={tests} chartType={chartType}></EvolutionChart>
          <select value={chartType} onChange={handleChangeChart}>
            <option value="line">Línea</option>
            <option value="bar">Barra</option>
          </select>
        </>
      ) : (
        <EmptyListComponent></EmptyListComponent>
      )}
    </>
  );
}
