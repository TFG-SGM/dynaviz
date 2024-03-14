import { TestSubData } from "./types";

export function generateDataTest(bodyParts: string[]): TestSubData {
  const videoLength: number = generateRandomNumber(60, 180);
  const data: TestSubData = {
    time: generateTime(videoLength),
    quality: generateQualityMovement(),
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
    idealMovement: generateAngles(videoLength),
    realMovement: generateAngles(videoLength),
    quality: generateQualityMovement(),
  };
}

function generateTime(videoLength: number): number[] {
  const numbersArray: number[] = [];

  for (let i = 0; i < videoLength; i++) {
    numbersArray.push(i);
  }

  return numbersArray;
}

function generateAngles(videoLength: number): number[] {
  const numbersArray: number[] = [];

  for (let i = 0; i < videoLength; i++) {
    const angle = generateRandomNumber(0, 100);
    numbersArray.push(angle);
  }

  return numbersArray;
}

function generateQualityMovement() {
  return generateRandomNumber(1, 100);
}

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
