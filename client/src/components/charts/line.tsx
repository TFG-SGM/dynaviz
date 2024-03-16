import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData } from "../../utils/types";

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
        data: TestService.getRealMovements(data.parts, actualParts[0]),
        type: "line",
      },
      {
        data: TestService.getIdealMovements(data.parts, actualParts[0]),
        type: "line",
      },
    ],
    tooltip: {},
  };

  return <ReactECharts option={option}></ReactECharts>;
}
