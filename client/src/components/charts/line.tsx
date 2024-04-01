import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";
import { WarnComponent } from "../other/WarnComponent";

export function LineChart({ data, part }: { data: TestSubData; part: string }) {
  if (part === "")
    return (
      <WarnComponent text="Selecciona una parte del cuerpo"></WarnComponent>
    );

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
        data: TestService.getRealMovements(data.parts, part),
        type: "line",
      },
      {
        name: "Ideal",
        data: TestService.getIdealMovements(data.parts, part),
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
