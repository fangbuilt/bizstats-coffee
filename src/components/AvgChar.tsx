import { useMemo, useState } from 'react'
import {
  CorgisCoffee,
  round,
  ScoreAccumulator,
  ScoreKey,
  toTitleCase,
} from '../utils'
import { ChartCanvas } from './reusable/ChartCanvas'
import { ChartData } from 'chart.js'

export default function AvgChar({ data }: { data: CorgisCoffee[] }) {
  const [mode, setMode] = useState<'total' | 'categories'>('total')
  const chartType = mode === 'total' ? 'line' : 'bar'
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  function toggleMode() {
    setMode((previousState) =>
      previousState === 'total' ? 'categories' : 'total'
    )
  }

  const allCountries = useMemo<string[]>(() => {
    return Array.from(
      new Set(data.map((entry) => entry.Location.Country))
    ).sort()
  }, [data])

  const allRegions = useMemo<string[]>(() => {
    if (!selectedCountry) return []
    return Array.from(
      new Set(
        data
          .filter((entry) => entry.Location.Country === selectedCountry)
          .map((entry) => entry.Location.Region)
          .filter(Boolean)
      )
    ).sort()
  }, [data, selectedCountry])

  const filteredData = useMemo<CorgisCoffee[]>(() => {
    return data.filter((entry) => {
      if (selectedCountry && entry.Location.Country !== selectedCountry)
        return false
      if (selectedRegion && entry.Location.Region !== selectedRegion)
        return false
      return true
    })
  }, [data, selectedCountry, selectedRegion])

  const averagedScoreData = useMemo(() => {
    const map = filteredData.reduce(
      (acc, entry) => {
        const year = Number(entry.Year)
        if (!acc[year]) {
          acc[year] = {
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
            moisture: 0,
          }
        }
        acc[year].totalScore += entry.Data.Scores.Total
        acc[year].count += 1
        acc[year].aroma += entry.Data.Scores.Aroma
        acc[year].flavor += entry.Data.Scores.Flavor
        acc[year].aftertaste += entry.Data.Scores.Aftertaste
        acc[year].acidity += entry.Data.Scores.Acidity
        acc[year].body += entry.Data.Scores.Body
        acc[year].balance += entry.Data.Scores.Balance
        acc[year].uniformity += entry.Data.Scores.Uniformity
        acc[year].sweetness += entry.Data.Scores.Sweetness
        acc[year].moisture += entry.Data.Scores.Moisture
        return acc
      },
      {} as Record<number, ScoreAccumulator>
    )

    return Object.values(map).map((avg) => ({
      Year: avg.year,
      'Averaged Total Score': round(avg.totalScore / avg.count),
      Aroma: round(avg.aroma / avg.count),
      Flavor: round(avg.flavor / avg.count),
      Aftertaste: round(avg.aftertaste / avg.count),
      Acidity: round(avg.acidity / avg.count),
      Body: round(avg.body / avg.count),
      Balance: round(avg.balance / avg.count),
      Uniformity: round(avg.uniformity / avg.count),
      Sweetness: round(avg.sweetness / avg.count),
      Moisture: round(avg.moisture / avg.count),
    }))
  }, [filteredData])

  const barKeys: ScoreKey[] = useMemo(() => {
    return mode === 'total'
      ? ['Averaged Total Score']
      : [
          'Aroma',
          'Flavor',
          'Aftertaste',
          'Acidity',
          'Body',
          'Balance',
          'Uniformity',
          'Sweetness',
          'Moisture',
        ]
  }, [mode])

  const chartData = useMemo(() => {
    const labels = averagedScoreData.map((data) => data.Year.toString())
    const datasets = barKeys.map((key, index) => {
      const color = `hsl(${(index * 36) % 360}, 70%, 60%)`
      return {
        label: String(key),
        data: averagedScoreData.map((data) => data[key as ScoreKey] ?? 0),
        backgroundColor: color,
        borderColor: color,
        borderWidth: 2,
        type: chartType as 'line' | 'bar',
      }
    })
    return {
      labels,
      datasets,
    } as ChartData<'line' | 'bar'>
  }, [averagedScoreData, barKeys, chartType])

  return (
    <>
      {/* Description Box */}
      <div className="w-full rounded bg-white p-4 text-center text-sm shadow sm:w-auto sm:text-base">
        <h3 className='text-xl'>Average of Coffee Characteristics Score</h3>
      </div>

      {/* Controls Row */}
      <div className="flex flex-col flex-wrap items-stretch justify-center gap-2 sm:flex-row sm:items-center">
        <div className="flex w-full flex-col items-start gap-2 rounded bg-white p-4 shadow sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <button
            className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:w-auto"
            onClick={toggleMode}
          >
            {mode === 'total' ? 'Show Categories' : 'Show Total Score'}
          </button>
        </div>

        {/* Country Select */}
        <div className="flex w-full flex-col items-start gap-2 rounded bg-white p-4 shadow sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <select
            name="country"
            id="country"
            value={selectedCountry ?? ''}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:w-auto"
            onChange={(event) => {
              setSelectedCountry(event.target.value || null)
              setSelectedRegion(null)
            }}
          >
            <option value="">All Countries</option>
            {allCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Region Select (Conditional) */}
        {selectedCountry && allRegions.length > 0 && (
          <div className="flex w-full flex-col items-start gap-2 rounded bg-white p-4 shadow sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <select
              name="region"
              id="region"
              value={selectedRegion ?? ''}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:w-auto"
              onChange={(event) =>
                setSelectedRegion(event.target.value || null)
              }
            >
              <option value="">All Regions</option>
              {allRegions.map((region) => (
                <option key={region} value={region}>
                  {toTitleCase(region)}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Chart */}
      <ChartCanvas
        data={chartData}
        chartType={chartType}
        stacked={mode !== 'total'} // stacked for category scores
      />
    </>
  )
}
