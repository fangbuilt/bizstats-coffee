import { createLazyFileRoute } from '@tanstack/react-router'
import data from '../assets/static-coffee-data.json'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { useState } from 'react';

function twoDigitDecimals(number: number) {
  return Math.ceil(number * 100) / 100;
}

function toTitleCase(string: string) {
  if (!string) return '';
  return string.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const scoreCategories = {
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

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const [mode, setMode] = useState<'total' | 'categories'>('total');
  const chartType = mode === 'total' ? 'line' : 'bar';
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [rankBy, setRankBy] = useState<'Total' | keyof typeof scoreCategories>('Total');

  function toggleMode() {
    setMode(previousState => (previousState === 'total' ? 'categories' : 'total'));
  }

  const allCountries = Array.from(
    new Set(data.map(entry => entry.Location.Country))
  ).sort();

  const allRegions = selectedCountry ?
    Array.from(
      new Set(
        data
          .filter(entry => entry.Location.Country === selectedCountry)
          .map(entry => entry.Location.Region)
          .filter(Boolean)
      )
    ).sort()
    : [];

  const allYears = Array.from(
    new Set(
      data.map(entry => entry.Year)
    )
  ).sort();

  const filteredData = data.filter(entry => {
    if (selectedCountry && entry.Location.Country !== selectedCountry) return false;
    if (selectedRegion && entry.Location.Region !== selectedRegion) return false;
    return true;
  });

  const averagedScoreData = Object.values(
    filteredData.reduce((accumulated, entry) => {
      const year = entry.Year;
      if (!accumulated[year]) {
        accumulated[year] = {
          year,
          totalScore: 0,
          count: 0,
          aroma: 0,
          flavor: 0,
          aftertaste: 0,
          acidity: 0,
          body: 0,
          balance: 0,
          uniformity: 0,
          sweetness: 0,
          moisture: 0
        }
      }
      accumulated[year].totalScore += entry.Data.Scores.Total;
      accumulated[year].count += 1;
      accumulated[year].aroma += entry.Data.Scores.Aroma;
      accumulated[year].flavor += entry.Data.Scores.Flavor;
      accumulated[year].aftertaste += entry.Data.Scores.Aftertaste;
      accumulated[year].acidity += entry.Data.Scores.Acidity;
      accumulated[year].body += entry.Data.Scores.Body;
      accumulated[year].balance += entry.Data.Scores.Balance;
      accumulated[year].uniformity += entry.Data.Scores.Uniformity;
      accumulated[year].sweetness += entry.Data.Scores.Sweetness;
      accumulated[year].moisture += entry.Data.Scores.Moisture
      return accumulated;
    }, {} as Record<number, {
      year: number,
      totalScore: number,
      count: number,
      aroma: number,
      flavor: number,
      aftertaste: number,
      acidity: number,
      body: number,
      balance: number,
      uniformity: number,
      sweetness: number,
      moisture: number
    }>)
  ).map(averaged => ({
    "Year": averaged.year,
    "Averaged Total Score": twoDigitDecimals(averaged.totalScore / averaged.count),
    "Aroma": twoDigitDecimals(averaged.aroma / averaged.count),
    "Flavor": twoDigitDecimals(averaged.flavor / averaged.count),
    "Aftertaste": twoDigitDecimals(averaged.aftertaste / averaged.count),
    "Acidity": twoDigitDecimals(averaged.acidity / averaged.count),
    "Body": twoDigitDecimals(averaged.body / averaged.count),
    "Balance": twoDigitDecimals(averaged.balance / averaged.count),
    "Uniformity": twoDigitDecimals(averaged.uniformity / averaged.count),
    "Sweetness": twoDigitDecimals(averaged.sweetness / averaged.count),
    "Moisture": twoDigitDecimals(averaged.moisture / averaged.count)
  }));

  const barKeys = mode === 'total' ? ['Averaged Total Score'] : ['Aroma', 'Flavor', 'Aftertaste', 'Acidity', 'Body', 'Balance', 'Uniformity', 'Sweetness', 'Moisture'];

  const topCountriesData = Object.values(
    data.reduce((accumulated, entry) => {
      const year = entry.Year;
      if (selectedYear !== 'all' && year !== selectedYear) return accumulated;

      const country = entry.Location.Country;

      if (!accumulated[country]) {
        accumulated[country] = {
          country,
          totalScore: 0,
          count: 0,
          ...Object.keys(scoreCategories).reduce((accumulatedCategories, key) => {
            accumulatedCategories[key as keyof typeof scoreCategories] = 0;
            return accumulatedCategories;
          }, {} as Record<keyof typeof scoreCategories, number>)
        }
      }

      accumulated[country].totalScore += entry.Data.Scores.Total;
      accumulated[country].count += 1;

      for (const key of Object.keys(scoreCategories) as (keyof typeof scoreCategories)[]) {
        accumulated[country][key] += entry.Data.Scores[key];
      }

      return accumulated;
    }, {} as Record<
      string, {
        country: string,
        totalScore: number,
        count: number
      } & Record<keyof typeof scoreCategories, number>
    >)
  )
    .map(averaged => ({
      country: averaged.country,
      rankByValue:
        rankBy === 'Total'
          ? twoDigitDecimals(averaged.totalScore / averaged.count)
          : twoDigitDecimals(averaged[rankBy] / averaged.count)
    }))
    .sort((a, b) => b.rankByValue - a.rankByValue)
    .slice(0, 10)
    .map((sorted, index) => ({ ...sorted, rank: index + 1 }));

  return (
    <div className="p-2 sm:p-4 flex flex-col gap-6 justify-center items-center min-h-screen mt-2 sm:mt-4">
      <div className="flex flex-col gap-4 w-full max-w-6xl">

        {/* Description Box */}
        <div className="p-4 rounded shadow w-full text-sm sm:text-base">
          <h3>Average of Coffee Characteristics Score</h3>
        </div>

        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 items-stretch sm:items-center">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-4 rounded shadow w-full sm:w-auto">
            <p className="text-sm sm:text-base">Now showing: {mode !== 'total' ? 'Categories' : 'Total'}</p>
            <button className="text-sm sm:text-base w-full sm:w-fit whitespace-nowrap" onClick={toggleMode}>
              {mode === 'total' ? 'Show Categories' : 'Show Total Score'}
            </button>
          </div>

          {/* Country Select */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-4 rounded shadow w-full sm:w-auto">
            <label htmlFor="country">Filter by Country:</label>
            <select
              name="country"
              id="country"
              value={selectedCountry ?? ''}
              onChange={(event) => {
                setSelectedCountry(event.target.value || null);
                setSelectedRegion(null);
              }}
            >
              <option value="">All Countries</option>
              {allCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          {/* Region Select (Conditional) */}
          {selectedCountry && allRegions.length > 0 && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-4 rounded shadow w-full sm:w-auto">
              <label htmlFor="region">Filter by Region:</label>
              <select
                name="region"
                id="region"
                value={selectedRegion ?? ''}
                onChange={event => setSelectedRegion(event.target.value || null)}
              >
                <option value="">All Regions</option>
                {allRegions.map(region => (
                  <option key={region} value={region}>{toTitleCase(region)}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={500} className="rounded shadow p-4">
          {chartType === 'line' ? (
            <LineChart data={averagedScoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Year" />
              <YAxis />
              <Tooltip />
              {barKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={`hsl(${(index * 35) % 360}, 70%, 60%)`}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          ) : (
            <BarChart data={averagedScoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Year" />
              <YAxis />
              <Tooltip />
              {barKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={`hsl(${(index * 35) % 360}, 70%, 60%)`}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Rankings */}
      <div className="flex flex-col gap-4 w-full max-w-6xl">
        <div className="p-4 rounded shadow w-full text-sm sm:text-base">
          <h3>{rankBy === 'Total' ? 'Total Score Ranking' : rankBy + ' Ranking'}</h3>
        </div>

        {/* Year & RankBy Controls */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 items-stretch sm:items-center">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-4 shadow rounded w-full sm:w-auto">
            <label htmlFor="year">Filter by Year:</label>
            <select
              name="year"
              id="year"
              value={selectedYear}
              onChange={event => setSelectedYear(event.target.value === 'all' ? 'all' : Number(event.target.value))}
            >
              <option value="all">All Years (2010 - 2018)</option>
              {allYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-4 shadow rounded w-full sm:w-auto">
            <select
              name="rankBy"
              id="rankBy"
              onChange={event => setRankBy(event.target.value as any)}
              value={rankBy}
            >
              <option value="Total">Total Score</option>
              {Object.keys(scoreCategories).map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Rankings Chart */}
        <ResponsiveContainer width="100%" height={topCountriesData.length * 80} className="rounded shadow p-4">
          <BarChart data={topCountriesData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis
              dataKey="Country"
              type="category"
              tickFormatter={(_, index) => {
                const rank = topCountriesData[index]?.rank;
                const countryName = topCountriesData[index]?.country;
                return `#${rank} ${countryName}`;
              }}
            />
            <Tooltip />
            <Bar dataKey="rankByValue" fill="hsl(220, 80%, 60%)" radius={[4, 4, 0, 0]} barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

  )
}
