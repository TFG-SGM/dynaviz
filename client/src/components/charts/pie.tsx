import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";

export function PieChart({ type, data }: { type: string; data: TestSubData }) {
  const bodyParts = TestService.getBodyParts(data.parts);
  const values = TestService.getBodyPartRestriction(data.parts);
  const option = {
    tooltip: {},
    series: [
      {
        data: bodyParts.map((part, index) => {
          return { name: part, value: values[index], color: "#111" };
        }),
        type,
      },
    ],
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
