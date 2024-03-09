import ReactECharts from "echarts-for-react";

export function PieChart({ type }) {
  const bodyParts = ["Pierna", "Brazo", "Cuello"];
  const values = generateBodyPartsProblem(bodyParts.length);
  const option = {
    tooltip: {
      trigger: "item",
    },
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
