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