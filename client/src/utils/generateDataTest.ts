import { TestSubData } from "./types";

export function generateDataTest(bodyParts: string[]) {
  const videoLength: number = generateRandomNumber(60, 180);
  const data: TestSubData = {
    time: generateTime(videoLength),
    restriction: generateRandomRestriction(),
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

  return JSON.stringify(data);
}

function generateParts(videoLength: number) {
  const idealMovement = generateMovements(videoLength);
  const realMovement = generateMovements(videoLength);
  const variations = idealMovement.map((move, index) =>
    Math.abs(move - realMovement[index])
  );
  const restriction = generateRandomRestriction();

  return {
    idealMovement,
    realMovement,
    variations,
    restriction,
  };
}

function generateTime(videoLength: number): number[] {
  const numbersArray: number[] = [];

  for (let i = 0; i < videoLength; i++) {
    numbersArray.push(i);
  }

  return numbersArray;
}

function generateMovements(videoLength: number): number[] {
  const numbersArray: number[] = [];

  for (let i = 0; i < videoLength; i++) {
    const angle = generateRandomNumber(0, 100);
    numbersArray.push(angle);
  }

  return numbersArray;
}

function generateRandomRestriction() {
  return generateRandomNumber(0, 100);
}

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
