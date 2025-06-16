import { useMemo, useState } from 'react'
import { CorgisCoffee, scoreCategories } from '../utils'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function CharRankInnaccurate({
  data,
}: {
  data: CorgisCoffee[]
}) {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all')
  const [rankBy, setRankBy] = useState<'Total' | keyof typeof scoreCategories>(
    'Total'
  )

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
      .map((averaged) => ({
        country: averaged.country,
        Value:
          rankBy === 'Total'
            ? averaged.totalScore / averaged.count
            : averaged[rankBy] / averaged.count,
      }))
      .sort((a, b) => b.Value - a.Value)
      .slice(0, 10)
      .map((sorted, index) => ({ ...sorted, rank: index + 1 }))
  }, [data, selectedYear, rankBy])

  return (
    <div className="flex w-full max-w-6xl flex-col gap-6">
      <div className="w-full rounded bg-white p-6 text-center text-sm shadow sm:text-base">
        <h3>
          Innaccurate{' '}
          {rankBy === 'Total' ? 'Total Score Ranking' : rankBy + ' Ranking'}
        </h3>
        <p>
          Entry is less than 3 per country summed year - Allowing innaccurate
          averaged data
        </p>
      </div>

      <div className="flex flex-col flex-wrap items-stretch justify-center gap-2 sm:flex-row sm:items-center">
        <div className="flex w-full flex-col items-start gap-2 rounded bg-white p-4 shadow sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <label htmlFor="year">Filter by Year:</label>
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
      <ResponsiveContainer
        width="100%"
        height={topCountriesData.length * 80}
        className="rounded bg-white p-4 shadow"
      >
        <BarChart data={topCountriesData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis
            dataKey="Country"
            type="category"
            tickFormatter={(_, index) => {
              const rank = topCountriesData[index]?.rank
              const countryName = topCountriesData[index]?.country
              return `#${rank} ${countryName}`
            }}
          />
          <Tooltip formatter={(value: number) => value.toFixed(2)} />

          <Bar
            dataKey="Value"
            fill="hsl(220, 80%, 60%)"
            radius={[4, 4, 0, 0]}
            barSize={10}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
