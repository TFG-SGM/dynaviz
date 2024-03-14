import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData } from "../../utils/types";

export function BubbleChart({
  data,
  actualParts,
}: {
  data: TestSubData;
  actualParts: string[];
}) {
  if (actualParts.length !== 2) return <p>Selecciona dos partes del cuerpo</p>;

  const option = {
    xAxis: {},
    yAxis: {},
    tooltip: {},
    series: [
      {
        data: TestService.getCorrelatedMovements(data.parts, actualParts),
        type: "scatter",
        symbolSize: function (data: number[]) {
          return data[2] * 10;
        },
      },
    ],
  };

  return <ReactECharts option={option}></ReactECharts>;
}
