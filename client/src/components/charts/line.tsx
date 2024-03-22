import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";

export function LineChart({
  data,
  actualParts,
}: {
  data: TestSubData;
  actualParts: string[];
}) {
  if (actualParts.length !== 1) return <p>Selecciona una parte del cuerpo</p>;

  const option = {
    xAxis: {
      type: "category",
      data: data.time,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Real",
        data: TestService.getRealMovements(data.parts, actualParts[0]),
        type: "line",
      },
      {
        name: "Ideal",
        data: TestService.getIdealMovements(data.parts, actualParts[0]),
        type: "line",
      },
    ],
    legend: {
      orient: "vertical",
      right: 10,
      top: "center",
    },
    tooltip: {},
  };

  return (
    <ReactECharts
      style={{ height: CHART_HEIGHT }}
      option={option}
    ></ReactECharts>
  );
}
