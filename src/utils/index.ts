export function twoDigitDecimals(number: number) {
  return Math.ceil(number * 100) / 100;
}

export function toTitleCase(string: string) {
  if (!string) return '';
  return string.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export const scoreCategories = {
  Aroma: 'Aroma',
  Flavor: 'Flavor',
  Aftertaste: 'Aftertaste',
  Acidity: 'Acidity',
  Body: 'Body',
  Balance: 'Balance',
  Uniformity: 'Uniformity',
  Sweetness: 'Sweetness',
  Moisture: 'Moisture'
} as const;

export interface CorgisCoffee {
  Location: {
    Country: string;
    Region: string;
    Altitude: {
      Min: number;
      Max: number;
      Average: number;
    }
  };
  Year: number | string;
  Data: {
    Owner: string;
    Type: {
      Species: string;
      Variety: string;
      "Processing method": string;
    };
    Production: {
      "Number of bags": number;
      "Bag weight": number;
    };
    Scores: {
      Aroma: number;
      Flavor: number;
      Aftertaste: number;
      Acidity: number;
      Body: number;
      Balance: number;
      Uniformity: number;
      Sweetness: number;
      Moisture: number;
      Total: number;
    };
    Color: string;
  }
}

export function calculateStandardDeviation<T>(
  data: T[],
  accessor: (item: T) => number
): number {
  const values = data.map(accessor).filter(v => !isNaN(v));
  if (values.length === 0) return 0;
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
  const finalValue = Math.sqrt(variance);
  return twoDigitDecimals(finalValue);
}

export function calculateMedian<T>(data: T[], accessor: (item: T) => number): number {
  const sorted = data.map(accessor).filter(v => !isNaN(v)).sort((a, b) => a - b);
  const len = sorted.length;
  const mid = Math.floor(len / 2);
  return len % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid]
}

export function calculateCovariance<T>(
  data: T[],
  accessorX: (item: T) => number,
  accessorY: (item: T) => number
): number {
  const valuesX = data.map(accessorX).filter(v => !isNaN(v));
  const valuesY = data.map(accessorY).filter(v => !isNaN(v));
  const meanX = valuesX.reduce((sum, val) => sum + val, 0) / valuesX.length;
  const meanY = valuesY.reduce((sum, val) => sum + val, 0) / valuesY.length;
  const covariance = valuesX.reduce((sum, x, i) => {
    const y = valuesY[i];
    return sum + ((x - meanX) * (y - meanY));
  }, 0) / valuesX.length;
  return covariance;
}

export function calculateMode<T, V extends string | number>(
  data: T[],
  accessor: (item: T) => V
): V | null {
  const frequencyMap = new Map<V, number>();
  data.forEach(item => {
    const value = accessor(item);
    frequencyMap.set(value, (frequencyMap.get(value) || 0) + 1);
  });

  let mode: V | null = null;
  let maxCount = 0;
  for (const [key, count] of frequencyMap.entries()) {
    if (count > maxCount) {
      maxCount = count;
      mode = key;
    }
  }
  return mode;
}

export function calculateCoefficientOfVariation<T>(
  data: T[],
  accessor: (item: T) => number
): number {
  const values = data.map(accessor).filter((v) => !isNaN(v))
  if (values.length === 0) return 0
  const mean =
    values.reduce((sum, val) => sum + val, 0) / values.length
  const variance =
    values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
    values.length
  const standardDeviation = Math.sqrt(variance)
  const cv = (standardDeviation / mean) * 100
  return cv
}
