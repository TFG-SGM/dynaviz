import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";

export function BoxPlot1({
  data,
  actualParts,
}: {
  data: TestSubData;
  actualParts: string[];
}) {
  if (actualParts.length !== 1) return <p>Selecciona una parte del cuerpo</p>;

  const realMovements = TestService.getRealMovements(
    data.parts,
    actualParts[0]
  );
  const idealMovements = TestService.getIdealMovements(
    data.parts,
    actualParts[0]
  );

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
        name: "Real",
      },
      {
        type: "boxplot",
        data: [TestService.getBoxPlotData(idealMovements)],
        name: "Ideal",
      },
    ],
    legend: {
      orient: "vertical",
      right: 10,
      top: "center",
    },
  };

  return (
    <ReactECharts
      style={{ height: CHART_HEIGHT }}
      option={option}
    ></ReactECharts>
  );
}