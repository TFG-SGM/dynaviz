import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData } from "../../utils/types";

export function BoxPlot({
  data,
  actualParts,
}: {
  data: TestSubData;
  actualParts: string[];
}) {
  if (actualParts.length !== 1) return <p>Selecciona una parte del cuerpo</p>;

  const realAngles = TestService.getRealAngles(data.parts, actualParts[0]);
  const idealAngles = TestService.getIdealAngles(data.parts, actualParts[0]);

  const option = {
    xAxis: {
      type: "category",
    },
    yAxis: {
      type: "value",
      name: "Ángulos",
    },
    tooltip: {
      trigger: "axis",
      confine: true,
    },
    series: [
      {
        type: "boxplot",
        data: [
          TestService.getBoxPlotData(realAngles),
          TestService.getBoxPlotData(idealAngles),
        ],
      },
    ],
  };

  return <ReactECharts option={option}></ReactECharts>;
}
