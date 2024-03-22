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

  static getBodyPartRestriction(parts: TestPartsData) {
    return Object.keys(parts).map((part) => parts[part].restriction);
  }

  static getUniqueVariations(parts: TestPartsData, actualPart: string) {
    const uniqueVariationsSet = new Set<number>();
    for (const num of parts[actualPart].variations) {
      uniqueVariationsSet.add(num);
    }

    const uniqueVariationsArray = Array.from(uniqueVariationsSet).sort(
      (a, b) => a - b
    );

    return uniqueVariationsArray;
  }

  static getVariationsCount(
    parts: TestPartsData,
    actualPart: string,
    uniqueVariations: number[]
  ) {
    const variations = parts[actualPart].variations;

    const countVariations = uniqueVariations.map((uniqueVariation) => {
      const count = variations.filter(
        (variation) => variation === uniqueVariation
      ).length;
      return count;
    });

    return countVariations;
  }

  static getBoxPlotData(movements: number[]) {
    const sortedData = movements.sort((a, b) => a - b);

    const min = sortedData[0];
    const q1 = this.findQuartile(sortedData, 0.25);
    const median = this.findQuartile(sortedData, 0.5);
    const q3 = this.findQuartile(sortedData, 0.75);
    const max = sortedData[sortedData.length - 1];

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

  static getCorrelatedVariations(parts: TestPartsData, actualParts: string[]) {
    const variations1 = parts[actualParts[0]].variations;
    const variations2 = parts[actualParts[1]].variations;

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
}
