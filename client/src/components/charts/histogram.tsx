import ReactECharts from "echarts-for-react";

export function BarChart() {
  const bodyParts = ["Pierna", "Brazo", "Cuello"];
  const option = {
    xAxis: {
      type: "category",
      data: bodyParts,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: generateBodyPartsProblem(bodyParts.length),
        type: "bar",
      },
    ],
  };

  return <ReactECharts option={option}></ReactECharts>;
}

function generateBodyPartsProblem(bodyPartsNumber: number): number[] {
  const numbersArray: number[] = [];

  for (let i = 0; i < bodyPartsNumber; i++) {
    const problem = generateRandomNumber(0, 100);
    numbersArray.push(problem);
  }

  return numbersArray;
}

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
