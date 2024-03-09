import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import { TestData } from "../utils/types";
import { TEST_ENDPOINT } from "../utils/constants";
import { LoadingComponent } from "../components/other/LoadingComponent";
import { TestButtons } from "../components/tests/TestButtons";
import { useState } from "react";
import { LineChart } from "../components/charts/line";
import { BarChart } from "../components/charts/bar";
import { RadarChart } from "../components/charts/radar";
import { PieChart } from "../components/charts/pie";

export function TestPage() {
  const { testId } = useParams();
  const [test] = useData<TestData>(TEST_ENDPOINT + testId);
  const [actualChart, setActualChart] = useState("time");

  const handleChangeChart = (e: Event) => {
    const activeButton = document.querySelector(".active-chart");
    activeButton?.classList.remove("active-chart");
    e.target?.classList.add("active-chart");
    setActualChart(e.target?.id);
  };

  if (!test) <LoadingComponent></LoadingComponent>;

  return (
    <>
      <h1>Prueba del {test?.date}</h1>
      <TestButtons handleChangeChart={handleChangeChart}></TestButtons>
      {getActualChart(actualChart)};
    </>
  );
}

function getActualChart(actualChart: string): JSX.Element | null {
  switch (actualChart) {
    case "time":
      return <LineChart />;
    case "ranking1":
      return <BarChart />;
    case "ranking2":
      return <RadarChart />;
    case "whole1":
      return <PieChart type="pie" />;
    case "whole2":
      return <PieChart type="treemap" />;
    default:
      return <p>Cargando...</p>;
  }
}
