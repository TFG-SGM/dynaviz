import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData, axisData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";

export function BoxPlot({
  data,
  axis,
  part,
}: {
  data: TestSubData;
  axis: axisData;
  part: string;
}) {
  if (part === "") return;

  const realMovements = TestService.getRealMovements(data.parts, axis, part);
  const idealMovements = TestService.getIdealMovements(data.parts, axis, part);

  const option = {
    xAxis: {
      type: "category",
    },
    yAxis: {
      type: "value",
      name: "Desplazamiento",
    },
    tooltip: {
      trigger: "item",
      confine: true,
    },
    series: [
      {
        type: "boxplot",
        data: [TestService.getBoxPlotData(realMovements)],
        name: "Desplazamiento real",
      },
      {
        type: "boxplot",
        data: [TestService.getBoxPlotData(idealMovements)],
        name: "Desplazamiento ideal",
      },
    ],
    legend: {
      top: "bottom",
      orient: "horizontal",
    },
  };

  return (
    <ReactECharts
      style={{ height: CHART_HEIGHT }}
      option={option}
    ></ReactECharts>
  );
}
