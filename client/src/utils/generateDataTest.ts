import { TestSubData } from "./types";

export function generateDataTest(bodyParts: string[]): TestSubData {
  const videoLength: number = generateRandomNumber(60, 180);
  const data: TestSubData = {
    time: generateTime(videoLength),
    probability: generateProblem(),
    problem: generateProblem(),
    parts: {},
  };

  bodyParts.forEach((part: string) => {
    if (part !== "Nariz") {
      data.parts[part + " izquierda"] = generateParts(videoLength);
      data.parts[part + " derecha"] = generateParts(videoLength);
    } else {
      data.parts[part] = generateParts(videoLength);
    }
  });

  return data;
}

function generateParts(videoLength: number) {
  return {
    idealAngles: generateAngles(videoLength),
    realAngles: generateAngles(videoLength),
    problem: generateProblem(),
  };
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

  return numbersArray;
}

function generateAngles(videoLength: number): number[] {
  const numbersArray: number[] = [];

  for (let i = 0; i < videoLength; i++) {
    const angle = generateRandomNumber(1, 30);
    numbersArray.push(angle);
  }

  return numbersArray;
}

function generateProblem() {
  return generateRandomNumber(1, 100);
}

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
