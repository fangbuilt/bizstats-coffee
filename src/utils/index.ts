import rawCoffeeData from '../assets/static-coffee-data.json'
import coffeeDataOutliers from '../assets/outliers.json'
import stringify from 'fast-json-stable-stringify';

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

function normalizeForCompare(obj: any): any {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(normalizeForCompare);

  const sortedEntries = Object.entries(obj).sort(([a], [b]) => a.localeCompare(b));
  return sortedEntries.reduce((acc, [key, val]) => {
    acc[key] = normalizeForCompare(val);
    return acc;
  }, {} as any);
}

function removeOutliers<T extends Record<string, any>>(data: T[], outliers: T[]): T[] {
  const normalizedOutliers = new Set(outliers.map(o => stringify(normalizeForCompare(o))));
  return data.filter(item => !normalizedOutliers.has(stringify(normalizeForCompare(item))));
}

export const cleanedCoffeeData = removeOutliers(rawCoffeeData, coffeeDataOutliers)
