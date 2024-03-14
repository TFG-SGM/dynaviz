import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData } from "../../utils/types";

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
      type: "category",
      data: Array.from(Array(100).keys()),
    },
    yAxis: {
      type: "category",
      data: Array.from(Array(100).keys()),
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
        data: TestService.getCorrelatedMovements(data.parts, actualParts),
      },
    ],
  };

  return <ReactECharts option={option}></ReactECharts>;
}
