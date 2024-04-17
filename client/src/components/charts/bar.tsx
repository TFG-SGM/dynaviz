import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";

export function BarChart({ data }: { data: TestSubData }) {
  const option = {
    xAxis: {
      name: "Partes del cuerpo",
      type: "category",
      data: TestService.getBodyParts(data.parts),
      colorBy: "values",
    },
    yAxis: {
      name: "Restricción de movimiento",
      type: "value",
    },
    series: [
      {
        name: "Restricción de movimiento",
        data: TestService.getBodyPartRestriction(data.parts),
        type: "bar",
      },
    ],
    tooltip: {},
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: "rgba(0, 0, 0, 0.5)",
      },
    },
  };

  return (
    <ReactECharts
      style={{ height: CHART_HEIGHT }}
      option={option}
    ></ReactECharts>
  );
}
