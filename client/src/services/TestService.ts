import { TestPartsData } from "../utils/types";

export class TestService {
  static getRealAngles(parts: TestPartsData, actualPart: string) {
    return parts[actualPart].realAngles;
  }

  static getIdealAngles(parts: TestPartsData, actualPart: string) {
    return parts[actualPart].idealAngles;
  }

  static getBodyParts(parts: TestPartsData) {
    return Object.keys(parts).map((part) => part);
  }

  static getBodyPartsForRadial(parts: TestPartsData) {
    return Object.keys(parts).map((part) => {
      return { name: part };
    });
  }

  static getBodyPartProblem(parts: TestPartsData) {
    return Object.keys(parts).map((part) => parts[part].problem);
  }

  static getUniqueAngles(parts: TestPartsData, actualPart: string) {
    const realAngles = this.getRealAngles(parts, actualPart);
    const idealAngles = this.getIdealAngles(parts, actualPart);
    const combinedArray = [...realAngles, ...idealAngles];

    const uniqueAnglesSet = new Set<number>();
    for (const num of combinedArray) {
      uniqueAnglesSet.add(num);
    }

    const uniqueAngles = Array.from(uniqueAnglesSet);

    return uniqueAngles;
  }

  static getRealCountAngles(
    parts: TestPartsData,
    actualPart: string,
    uniqueAngles: number[]
  ) {
    const realAngles = this.getRealAngles(parts, actualPart);

    console.log(realAngles);

    const countAngles = uniqueAngles.map((angle) => {
      const count = realAngles.filter(
        (realAngle) => realAngle === angle
      ).length;
      return count;
    });

    return countAngles;
  }

  static getIdealCountAngles(
    parts: TestPartsData,
    actualPart: string,
    uniqueAngles: number[]
  ) {
    const idealAngles = this.getIdealAngles(parts, actualPart);

    const countAngles = uniqueAngles.map((angle) => {
      const count = idealAngles.filter(
        (idealAngle) => idealAngle === angle
      ).length;
      return count;
    });
    return countAngles;
  }

  static getBoxPlotData(angles: number[]) {
    const sortedData = angles.sort((a, b) => a - b);

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

  static getCorrelatedAngles(parts: TestPartsData, actualParts: string[]) {
    const realAngles1 = this.getRealAngles(parts, actualParts[0]);
    const realAngles2 = this.getRealAngles(parts, actualParts[1]);

    const combine = realAngles1.map((angle, index) => [
      angle,
      realAngles2[index],
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
