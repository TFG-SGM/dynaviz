import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";
import { WarnComponent } from "../other/WarnComponent";

export function Heatmap({
  data,
  part1,
  part2,
}: {
  data: TestSubData;
  part1: string;
  part2: string;
}) {
  if (part1 === "" || part2 === "")
    return (
      <WarnComponent text="Selecciona dos partes del cuerpo"></WarnComponent>
    );

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
      name: `Var. ${part1}`,
      type: "category",
    },
    yAxis: {
      name: `Var. ${part2}`,
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
        data: TestService.getCorrelatedVariations(data.parts, part1, part2),
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
