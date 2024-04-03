import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";

export function RadarChart({ data }: { data: TestSubData }) {
  const option = {
    radar: {
      indicator: TestService.getBodyPartsForRadial(data.parts),
      axisName: {
        color: "#444",
      },
    },
    series: [
      {
        name: "Restricción de movimiento",

        data: [
          {
            value: TestService.getBodyPartRestriction(data.parts),
          },
        ],
        type: "radar",
      },
    ],
    tooltip: {
      trigger: "item",
    },
  };

  return (
    <ReactECharts
      style={{ height: CHART_HEIGHT }}
      option={option}
    ></ReactECharts>
  );
}
