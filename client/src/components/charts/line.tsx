import ReactECharts from "echarts-for-react";

export function LineChart() {
  const videoLength = generateRandomNumber(60, 180);
  const option = {
    xAxis: {
      type: "category",
      data: generateTime(videoLength),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: generateAngles(videoLength),
        type: "line",
      },
      {
        data: generateAngles(videoLength),
        type: "line",
      },
    ],
  };

  return <ReactECharts option={option}></ReactECharts>;
}

function generateTime(videoLength: number): number[] {
  const numbersArray: number[] = [];

  let count = 1;
  for (let i = 0; i < videoLength; i++) {
    numbersArray.push(count);
    count++;
    if (count > 60) {
      count = 1; // Reset count to 1 after reaching 60
    }
  }

  console.log(numbersArray);
  return numbersArray;
}

function generateAngles(videoLength: number): number[] {
  const numbersArray: number[] = [];

  for (let i = 0; i < videoLength; i++) {
    const angle = generateRandomNumber(5, 30);
    numbersArray.push(angle);
  }

  console.log(numbersArray);
  return numbersArray;
}

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
