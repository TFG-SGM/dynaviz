import { TestPartsData, axisData } from "../utils/types";

export class TestService {
  public static getRealMovements(
    parts: TestPartsData,
    axis: axisData,
    actualPart: string
  ) {
    return parts[actualPart][axis].realMovement;
  }

  public static getIdealMovements(
    parts: TestPartsData,
    axis: axisData,
    actualPart: string
  ) {
    return parts[actualPart][axis].idealMovement;
  }

  public static getBodyParts(parts: TestPartsData) {
    return Object.keys(parts).map((part) => part);
  }

  public static getBodyPartsForRadial(parts: TestPartsData) {
    return Object.keys(parts).map((part) => {
      return { name: part };
    });
  }

  public static getBodyPartRestriction(parts: TestPartsData) {
    return Object.keys(parts).map((part) => parts[part].restriction);
  }

  public static getUniqueVariations(
    parts: TestPartsData,
    axis: axisData,
    actualPart: string
  ) {
    const uniqueVariationsSet = new Set<number>();
    for (const num of parts[actualPart][axis].variations) {
      uniqueVariationsSet.add(num);
    }

    const uniqueVariationsArray = Array.from(uniqueVariationsSet).sort(
      (a, b) => a - b
    );

    return uniqueVariationsArray;
  }

  public static getVariationsCount(
    parts: TestPartsData,
    axis: axisData,
    actualPart: string,
    uniqueVariations: number[]
  ) {
    const variations = parts[actualPart][axis].variations;

    const countVariations = uniqueVariations.map((uniqueVariation) => {
      const count = variations.filter(
        (variation) => variation === uniqueVariation
      ).length;
      return count;
    });

    return countVariations;
  }

  public static getBoxPlotData(movements: number[]) {
    const sortedData = movements.sort((a, b) => a - b);

    const min = sortedData[0];
    const q1 = this.findQuartile(sortedData, 0.25);
    const median = this.findQuartile(sortedData, 0.5);
    const q3 = this.findQuartile(sortedData, 0.75);
    const max = sortedData[sortedData.length - 1];

    return [min, q1, median, q3, max];
  }

  public static getCorrelatedVariations(
    parts: TestPartsData,
    axis: axisData,
    part1: string,
    part2: string
  ) {
    const variations1 = parts[part1][axis].variations;
    const variations2 = parts[part2][axis].variations;

    const combine = variations1.map((variation, index) => [
      variation,
      variations2[index],
    ]);

    const occurrencesMap = combine.reduce((map, pair) => {
      const key = JSON.stringify(pair);
      map.set(key, (map.get(key) || 0) + 1);
      return map;
    }, new Map());

    const result = Array.from(occurrencesMap.entries()).map(([key, count]) => {
      const pair = JSON.parse(key);
      return [...pair, count];
    });

    return result;
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
}
