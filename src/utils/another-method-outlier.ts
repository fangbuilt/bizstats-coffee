import rawCoffeeData from '../assets/static-coffee-data.json'

type CoffeeData = {
  Location: {
    Country: string
    Region: string
    Altitude: {
      Min: number
      Max: number
      Average: number
    }
  }
  Year: number
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

interface OutlierConfig {
  iqrMultiplier?: number // Default: 1.5 (standard), use 1.0 for stricter
}

function removeCoffeeOutliers(
  data: CoffeeData[],
  config: OutlierConfig = { iqrMultiplier: 1.5 }
): CoffeeData[] {
  if (data.length === 0) return data

  // Use first record as template for required structure
  // const template = data[0]

  // Helper function to check if record has complete structure like template
  const hasCompleteStructure = (item: CoffeeData): boolean => {
    try {
      // Check all nested paths exist (excluding Color field)
      return (
        item.Location?.Country != null &&
        item.Location?.Region != null &&
        item.Location?.Altitude?.Min != null &&
        item.Location?.Altitude?.Max != null &&
        item.Location?.Altitude?.Average != null &&
        item.Year != null &&
        item.Data?.Owner != null &&
        item.Data?.Type?.Species != null &&
        item.Data?.Type?.Variety != null &&
        item.Data?.Type?.['Processing method'] != null &&
        item.Data?.Production?.['Number of bags'] != null &&
        item.Data?.Production?.['Bag weight'] != null &&
        item.Data?.Scores?.Aroma != null &&
        item.Data?.Scores?.Flavor != null &&
        item.Data?.Scores?.Aftertaste != null &&
        item.Data?.Scores?.Acidity != null &&
        item.Data?.Scores?.Body != null &&
        item.Data?.Scores?.Balance != null &&
        item.Data?.Scores?.Uniformity != null &&
        item.Data?.Scores?.Sweetness != null &&
        item.Data?.Scores?.Moisture != null &&
        item.Data?.Scores?.Total != null
        // Intentionally excluding Color field check
      )
    } catch {
      return false
    }
  }

  // Extract all numeric values with their paths
  const numericFields = [
    // Location altitude data
    {
      path: 'Location.Altitude.Min',
      extract: (item: CoffeeData) => item.Location.Altitude.Min,
    },
    {
      path: 'Location.Altitude.Max',
      extract: (item: CoffeeData) => item.Location.Altitude.Max,
    },
    {
      path: 'Location.Altitude.Average',
      extract: (item: CoffeeData) => item.Location.Altitude.Average,
    },

    // Year
    { path: 'Year', extract: (item: CoffeeData) => item.Year },

    // Production data
    {
      path: 'Data.Production.Number of bags',
      extract: (item: CoffeeData) => item.Data.Production['Number of bags'],
    },
    {
      path: 'Data.Production.Bag weight',
      extract: (item: CoffeeData) => item.Data.Production['Bag weight'],
    },

    // All coffee scores
    {
      path: 'Data.Scores.Aroma',
      extract: (item: CoffeeData) => item.Data.Scores.Aroma,
    },
    {
      path: 'Data.Scores.Flavor',
      extract: (item: CoffeeData) => item.Data.Scores.Flavor,
    },
    {
      path: 'Data.Scores.Aftertaste',
      extract: (item: CoffeeData) => item.Data.Scores.Aftertaste,
    },
    {
      path: 'Data.Scores.Acidity',
      extract: (item: CoffeeData) => item.Data.Scores.Acidity,
    },
    {
      path: 'Data.Scores.Body',
      extract: (item: CoffeeData) => item.Data.Scores.Body,
    },
    {
      path: 'Data.Scores.Balance',
      extract: (item: CoffeeData) => item.Data.Scores.Balance,
    },
    {
      path: 'Data.Scores.Uniformity',
      extract: (item: CoffeeData) => item.Data.Scores.Uniformity,
    },
    {
      path: 'Data.Scores.Sweetness',
      extract: (item: CoffeeData) => item.Data.Scores.Sweetness,
    },
    {
      path: 'Data.Scores.Moisture',
      extract: (item: CoffeeData) => item.Data.Scores.Moisture,
    },
    {
      path: 'Data.Scores.Total',
      extract: (item: CoffeeData) => item.Data.Scores.Total,
    },
  ]

  // Calculate outlier bounds for each field
  const fieldBounds = numericFields.map((field) => {
    const values = data
      .map(field.extract)
      .filter((v) => v != null && !isNaN(v))
      .sort((a, b) => a - b)

    if (values.length === 0)
      return { ...field, lowerBound: -Infinity, upperBound: Infinity }

    const q1Index = Math.floor(values.length * 0.25)
    const q3Index = Math.floor(values.length * 0.75)
    const q1 = values[q1Index]
    const q3 = values[q3Index]
    const iqr = q3 - q1

    return {
      ...field,
      lowerBound: q1 - config.iqrMultiplier! * iqr,
      upperBound: q3 + config.iqrMultiplier! * iqr,
    }
  })

  // Filter data - remove if ANY field is an outlier OR incomplete structure
  return data.filter((item) => {
    // First check: Must have complete structure like template
    if (!hasCompleteStructure(item)) {
      return false
    }

    // Second check: No numeric outliers
    return fieldBounds.every((field) => {
      const value = field.extract(item)
      // Skip NaN values (like "nan" strings converted to numbers)
      if (isNaN(value)) return true
      return value >= field.lowerBound && value <= field.upperBound
    })
  })
}

// Usage examples:
export const cleanCoffeeData = removeCoffeeOutliers(rawCoffeeData, {
  iqrMultiplier: 0.8
}) // Strictest: removes if ANY field is outlier
console.log('foo', rawCoffeeData.length)
console.log('bar', cleanCoffeeData.length)

// const extraStrictCoffee = removeCoffeeOutliers(rawCoffeeData, {
//   iqrMultiplier: 1.0,
// }) // Even stricter bounds - perfect for curating premium coffee data

// const ultraStrictCoffee = removeCoffeeOutliers(rawCoffeeData, {
//   iqrMultiplier: 0.8,
// }) // Ultra-strict for competition-grade coffee analysis
