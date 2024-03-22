import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";

export function BubbleChart({
  data,
  actualParts,
}: {
  data: TestSubData;
  actualParts: string[];
}) {
  if (actualParts.length !== 2) return <p>Selecciona dos partes del cuerpo</p>;

  const option = {
    xAxis: {
      name: `Var. ${actualParts[0]}`,
    },
    yAxis: {
      name: `Var. ${actualParts[1]}`,
    },
    tooltip: {},
    series: [
      {
        data: TestService.getCorrelatedVariations(data.parts, actualParts),
        type: "scatter",
        symbolSize: function (data: number[]) {
          return data[2] * 10;
        },
      },
    ],
  };

  return (
    <ReactECharts
      style={{ height: CHART_HEIGHT }}
      option={option}
    ></ReactECharts>
  );
}
