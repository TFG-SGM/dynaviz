import ReactECharts from "echarts-for-react";
import { TestData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";
import { TestService } from "../../services/TestService";
import { useEffect, useState } from "react";

interface ProcessDataProps {
  date: string;
  parts: {
    name: string;
    restriction: number | undefined;
  }[];
}

export function RadarEvolutionChart({ tests }: { tests: TestData[] }) {
  const [processData, setProcessData] = useState<(ProcessDataProps | null)[]>(
    []
  );

  useEffect(() => {
    const processData = TestService.getProcessDataForChartEvolution(tests);
    setProcessData(processData);
  }, [tests]);

  const options = processData.map((data) => ({
    radar: {
      indicator: data?.parts.map((part) => ({ text: part.name, max: 100 })),
      axisName: {
        color: "#444",
      },
    },
    series: [
      {
        name: `Restricciones del ${data?.date}`,
        data: [
          {
            value: data?.parts.map((part) => part.restriction),
          },
        ],
        type: "radar",
      },
    ],
    tooltip: {
      trigger: "item",
    },
  }));

  return (
    <div className="radar-evolution-charts">
      {options.map((option, index) => (
        <div key={index}>
          <h3>{processData[index]?.date}</h3>
          <ReactECharts
            key={index}
            style={{ height: CHART_HEIGHT }}
            option={option}
            notMerge={true}
          />
        </div>
      ))}
    </div>
  );
}
