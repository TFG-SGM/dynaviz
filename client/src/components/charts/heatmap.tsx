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
      data: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
    },
    yAxis: {
      type: "category",
      data: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
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
        data: TestService.getCorrelatedAngles(data.parts, actualParts),
      },
    ],
  };

  return <ReactECharts option={option}></ReactECharts>;
}
