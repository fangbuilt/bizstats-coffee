import rawCoffeeData from '../assets/static-coffee-data.json'
import coffeeDataOutliers from '../assets/outliers.json'
import stringify from 'fast-json-stable-stringify'

export function toTitleCase(string: string) {
  if (!string) return ''
  return string
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function round(value: number | null | undefined, precision = 2): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 0
  if (precision < 0) throw new Error('Precision must be non-negative')
  const factor = 10 ** precision
  return Math.round(value * factor) / factor
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
  Moisture: 'Moisture',
} as const
export interface CorgisCoffee {
  Location: {
    Country: string
    Region: string
    Altitude: {
      Min: number
      Max: number
      Average: number
    }
  }
  Year: number | string
  Data: {
    Owner: string
    Type: {
      Species: string
      Variety: string
      'Processing method': string
    }
    Production: {
      'Number of bags': number
      'Bag weight': number
    }
    Scores: {
      Aroma: number
      Flavor: number
      Aftertaste: number
      Acidity: number
      Body: number
      Balance: number
      Uniformity: number
      Sweetness: number
      Moisture: number
      Total: number
    }
    Color: string
  }
}

export type ScoreAccumulator = {
  year: number
  totalScore: number
  count: number
  aroma: number
  flavor: number
  aftertaste: number
  acidity: number
  body: number
  balance: number
  uniformity: number
  sweetness: number
  moisture: number
}

export type ScoreKey =
  | 'Averaged Total Score'
  | 'Aroma'
  | 'Flavor'
  | 'Aftertaste'
  | 'Acidity'
  | 'Body'
  | 'Balance'
  | 'Uniformity'
  | 'Sweetness'
  | 'Moisture'

function normalizeForCompare(obj: any): any {
  if (typeof obj !== 'object' || obj === null) return obj
  if (Array.isArray(obj)) return obj.map(normalizeForCompare)

  const sortedEntries = Object.entries(obj).sort(([a], [b]) =>
    a.localeCompare(b)
  )
  return sortedEntries.reduce((acc, [key, val]) => {
    acc[key] = normalizeForCompare(val)
    return acc
  }, {} as any)
}

function removeOutliers<T extends Record<string, any>>(
  data: T[],
  outliers: T[]
): T[] {
  const normalizedOutliers = new Set(
    outliers.map((o) => stringify(normalizeForCompare(o)))
  )
  return data.filter(
    (item) => !normalizedOutliers.has(stringify(normalizeForCompare(item)))
  )
}

export const cleanedCoffeeData = removeOutliers(
  rawCoffeeData,
  coffeeDataOutliers
)
