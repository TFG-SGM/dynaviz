import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";

export function Heatmap({
  data,
  actualParts,
}: {
  data: TestSubData;
  actualParts: string[];
}) {
  if (actualParts.length !== 2) return <p>Selecciona dos partes del cuerpo</p>;

  const option = {
    tooltip: {
      position: "top",
    },
    animation: false,
    grid: {
      height: "50%",
      top: "10%",
    },
    xAxis: {
      name: `Var. ${actualParts[0]}`,
      type: "category",
    },
    yAxis: {
      name: `Var. ${actualParts[1]}`,
      type: "category",
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "15%",
    },
    series: [
      {
        type: "heatmap",
        data: TestService.getCorrelatedVariations(data.parts, actualParts),
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
