import ReactECharts from "echarts-for-react";
import { TestData, evolutionActual } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";
import { useProcessDataEvolution } from "../../hooks/useProcessDataEvolution";

export function EvolutionChart({
  tests,
  actual,
}: {
  tests: TestData[];
  actual: evolutionActual;
}) {
  const [processData] = useProcessDataEvolution(tests, actual);

  const option = {
    xAxis: {
      name: "Fecha",
      type: "category",
      data: processData.dates,
    },
    yAxis: {
      name: "Restricción de movimiento",
      type: "value",
    },
    series: processData.restrictionSeries,
    tooltip: {
      trigger: "axis",
    },
    legend: {
      top: "bottom",
      orient: "horizontal",
    },
  };

  return (
    <ReactECharts
      style={{ height: CHART_HEIGHT }}
      option={option}
      notMerge={true}
    ></ReactECharts>
  );
}
