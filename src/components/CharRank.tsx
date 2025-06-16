import { useMemo, useState } from 'react'
import { CorgisCoffee, scoreCategories } from '../utils'
import { ChartCanvas } from './reusable/ChartCanvas'
import { ChartData } from 'chart.js'

export default function CharRank({ data }: { data: CorgisCoffee[] }) {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all')
  const [rankBy, setRankBy] = useState<'Total' | keyof typeof scoreCategories>(
    'Total'
  )
  const [entriesPerCountry, setEntriesPerCountry] = useState(3)

  const allYears = useMemo<(string | number)[]>(() => {
    return Array.from(new Set(data.map((entry) => entry.Year))).sort()
  }, [data])

  const topCountriesData = useMemo(() => {
    return Object.values(
      data.reduce(
        (accumulated, entry) => {
          const year = entry.Year
          if (selectedYear !== 'all' && year !== selectedYear)
            return accumulated

          const country = entry.Location.Country

          if (!accumulated[country]) {
            accumulated[country] = {
              country,
              totalScore: 0,
              count: 0,
              ...Object.keys(scoreCategories).reduce(
                (accumulatedCategories, key) => {
                  accumulatedCategories[key as keyof typeof scoreCategories] = 0
                  return accumulatedCategories
                },
                {} as Record<keyof typeof scoreCategories, number>
              ),
            }
          }

          accumulated[country].totalScore += entry.Data.Scores.Total
          accumulated[country].count += 1

          for (const key of Object.keys(
            scoreCategories
          ) as (keyof typeof scoreCategories)[]) {
            accumulated[country][key] += entry.Data.Scores[key]
          }

          return accumulated
        },
        {} as Record<
          string,
          {
            country: string
            totalScore: number
            count: number
          } & Record<keyof typeof scoreCategories, number>
        >
      )
    )
      .filter((averaged) => {
        if (selectedYear === 'all') {
          return averaged.count >= entriesPerCountry
        }
        return true // For a specific year, we don't filter by count
      })
      .map((averaged) => ({
        country: averaged.country,
        sampleSize: averaged.count, // Show sample size for transparency
        Value:
          rankBy === 'Total'
            ? averaged.totalScore / averaged.count
            : averaged[rankBy] / averaged.count,
      }))
      .sort((a, b) => b.Value - a.Value)
      .slice(0, 10)
      .map((sorted, index) => ({ ...sorted, rank: index + 1 }))
  }, [data, selectedYear, rankBy, entriesPerCountry])

  const chartData = useMemo(() => {
    return {
      labels: topCountriesData.map((data) => `#${data.rank} ${data.country}`),
      datasets: [
        {
          label: rankBy === 'Total' ? 'Total Score' : rankBy,
          data: topCountriesData.map((data) => data.Value),
          backgroundColor: 'hsl(220, 80%, 60%)',
          borderRadius: 4,
          barThickness: 20,
        },
      ],
    } as ChartData<'bar'>
  }, [topCountriesData, rankBy])

  return (
    <>
      <div className="w-full rounded bg-white p-4 text-center text-sm shadow sm:w-auto sm:text-base">
        <h3 className="text-xl">
          {rankBy === 'Total' ? 'Total Score Ranking' : rankBy + ' Ranking'}
        </h3>
      </div>

      <div className="flex flex-col flex-wrap items-stretch justify-center gap-2 sm:flex-row sm:items-center">
        <div className="flex w-full flex-col items-start gap-2 rounded bg-white p-4 shadow sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <select
            disabled={selectedYear !== 'all'}
            name="entryThreshold"
            id="entryThreshold"
            value={entriesPerCountry}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:w-auto"
            onChange={(event) =>
              setEntriesPerCountry(Number(event.target.value))
            }
          >
            {[1, 2, 3, 5, 10].map((value) => (
              <option key={value} value={selectedYear === 'all' ? value : 1}>
                {selectedYear !== 'all'
                  ? 'Please select all years'
                  : `At least ${value} entr${value > 1 ? 'ies' : 'y'}`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-full flex-col items-start gap-2 rounded bg-white p-4 shadow sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <select
            name="year"
            id="year"
            value={selectedYear}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:w-auto"
            onChange={(event) =>
              setSelectedYear(
                event.target.value === 'all'
                  ? 'all'
                  : Number(event.target.value)
              )
            }
          >
            <option value="all">All Years (2010 - 2018)</option>
            {allYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-full flex-col items-start gap-2 rounded bg-white p-4 shadow sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <select
            name="rankBy"
            id="rankBy"
            onChange={(event) =>
              setRankBy(
                event.target.value as keyof typeof scoreCategories | 'Total'
              )
            }
            className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:w-auto"
            value={rankBy}
          >
            <option value="Total">Total Score</option>
            {Object.keys(scoreCategories).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Rankings Chart */}
      <ChartCanvas data={chartData} chartType="bar" horizontal />
    </>
  )
}
