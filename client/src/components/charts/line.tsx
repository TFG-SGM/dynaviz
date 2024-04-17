import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData, axisData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";

export function LineChart({
  data,
  axis,
  part,
}: {
  data: TestSubData;
  axis: axisData;
  part: string;
}) {
  if (part === "") return;

  const option = {
    xAxis: {
      name: "Segundos en vídeo",
      type: "category",
      data: data.time,
    },
    yAxis: {
      name: "Desplazamiento",
      type: "value",
    },
    series: [
      {
        name: "Real",
        data: TestService.getRealMovements(data.parts, axis, part),
        type: "line",
      },
      {
        name: "Ideal",
        data: TestService.getIdealMovements(data.parts, axis, part),
        type: "line",
      },
    ],
    legend: {
      top: "bottom",
      orient: "horizontal",
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
