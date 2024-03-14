import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData } from "../../utils/types";

export function PieChart({ type, data }: { type: string; data: TestSubData }) {
  const bodyParts = TestService.getBodyParts(data.parts);
  const values = TestService.getBodyPartQuality(data.parts);
  const option = {
    tooltip: {},
    series: [
      {
        data: bodyParts.map((part, index) => {
          return { name: part, value: values[index] };
        }),
        type,
      },
    ],
  };

  return <ReactECharts option={option}></ReactECharts>;
}
