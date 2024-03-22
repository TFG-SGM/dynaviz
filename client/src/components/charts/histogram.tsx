import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";

export function Histogram({
  data,
  actualParts,
}: {
  data: TestSubData;
  actualParts: string[];
}) {
  if (actualParts.length !== 1) return <p>Selecciona una parte del cuerpo</p>;

  const uniqueVariations = TestService.getUniqueVariations(
    data.parts,
    actualParts[0]
  );
  const option = {
    xAxis: {
      name: "Variación",
      type: "category",
      data: uniqueVariations,
    },
    yAxis: {
      name: "Número",
      type: "value",
    },
    tooltip: {},
    series: [
      {
        data: TestService.getVariationsCount(
          data.parts,
          actualParts[0],
          uniqueVariations
        ),
        type: "bar",
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
