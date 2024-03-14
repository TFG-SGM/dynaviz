import { TestPartsData } from "../utils/types";

export class TestService {
  static getRealMovements(parts: TestPartsData, actualPart: string) {
    return parts[actualPart].realMovement;
  }

  static getIdealMovements(parts: TestPartsData, actualPart: string) {
    return parts[actualPart].idealMovement;
  }

  static getBodyParts(parts: TestPartsData) {
    return Object.keys(parts).map((part) => part);
  }

  static getBodyPartsForRadial(parts: TestPartsData) {
    return Object.keys(parts).map((part) => {
      return { name: part };
    });
  }

  static getBodyPartQuality(parts: TestPartsData) {
    return Object.keys(parts).map((part) => parts[part].quality);
  }

  static getUniqueMovements(parts: TestPartsData, actualPart: string) {
    const realMovements = this.getRealMovements(parts, actualPart);
    const idealMovements = this.getIdealMovements(parts, actualPart);
    const combinedArray = [...realMovements, ...idealMovements];

    const uniqueMovementsSet = new Set<number>();
    for (const num of combinedArray) {
      uniqueMovementsSet.add(num);
    }

    const uniqueMovements = Array.from(uniqueMovementsSet);

    return uniqueMovements;
  }

  static getRealCountMovements(
    parts: TestPartsData,
    actualPart: string,
    uniqueMovements: number[]
  ) {
    const realMovements = this.getRealMovements(parts, actualPart);

    console.log(realMovements);

    const countMovements = uniqueMovements.map((movement) => {
      const count = realMovements.filter(
        (realMovement) => realMovement === movement
      ).length;
      return count;
    });

    return countMovements;
  }

  static getIdealCountMovements(
    parts: TestPartsData,
    actualPart: string,
    uniqueMovements: number[]
  ) {
    const idealMovements = this.getIdealMovements(parts, actualPart);

    const countMovements = uniqueMovements.map((movement) => {
      const count = idealMovements.filter(
        (idealMovement) => idealMovement === movement
      ).length;
      return count;
    });
    return countMovements;
  }

  static getBoxPlotData(movements: number[]) {
    const sortedData = movements.sort((a, b) => a - b);

    const min = sortedData[0];
    const q1 = this.findQuartile(sortedData, 0.25);
    const median = this.findQuartile(sortedData, 0.5);
    const q3 = this.findQuartile(sortedData, 0.75);
    const max = sortedData[sortedData.length - 1];
    console.log([min, q1, median, q3, max]);

    return [min, q1, median, q3, max];
  }

  private static findQuartile(sortedData: number[], quartile: number) {
    const index = quartile * (sortedData.length - 1);
    const lowerIndex = Math.floor(index);
    const upperIndex = Math.ceil(index);
    const fraction = index - lowerIndex;
    return (
      (1 - fraction) * sortedData[lowerIndex] +
      fraction * sortedData[upperIndex]
    );
  }

  static getCorrelatedMovements(parts: TestPartsData, actualParts: string[]) {
    const movements1 = this.getRealMovements(parts, actualParts[0]);
    const movements2 = this.getRealMovements(parts, actualParts[1]);

    const combine = movements1.map((movement, index) => [
      movement,
      movements2[index],
    ]);

    // Use a Set to keep track of unique pairs
    const uniquePairs = new Set<string>();

    // Count occurrences of each unique pair [x, y]
    const occurrencesMap = combine.reduce((map, pair) => {
      const key = JSON.stringify(pair);
      if (!uniquePairs.has(key)) {
        uniquePairs.add(key);
        map.set(key, 1);
      } else {
        map.set(key, map.get(key)! + 1);
      }
      return map;
    }, new Map<string, number>());

    // Transform map entries into arrays with three elements
    const result = Array.from(occurrencesMap.entries()).map(([key, count]) => {
      const pair = JSON.parse(key);
      return [...pair, count];
    });

    return result;
  }
}
