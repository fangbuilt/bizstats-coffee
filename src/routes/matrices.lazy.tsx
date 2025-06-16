import { createLazyFileRoute } from '@tanstack/react-router'
import { cleanedCoffeeData } from '../utils'
import { sampleCorrelation, standardDeviation } from 'simple-statistics'
import { useMemo, useState } from 'react'

export const Route = createLazyFileRoute('/matrices')({
  component: Matrices,
})

function Matrices() {
  const [scoreSDAccessor, setScoreSDAccessor] =
    useState<keyof (typeof cleanedCoffeeData)[number]['Data']['Scores']>(
      'Total'
    )
  const [scoreCorrAccessorA, setScoreCorrAccessorA] =
    useState<keyof (typeof cleanedCoffeeData)[number]['Data']['Scores']>(
      'Total'
    )
  const [scoreCorrAccessorB, setScoreCorrAccessorB] =
    useState<keyof (typeof cleanedCoffeeData)[number]['Data']['Scores']>(
      'Total'
    )

  const sd = useMemo<string>(() => {
    return standardDeviation(
      cleanedCoffeeData.map((d) => d.Data.Scores[scoreSDAccessor])
    ).toFixed(2)
  }, [scoreSDAccessor])

  const corr = useMemo<string>(() => {
    return sampleCorrelation(
      cleanedCoffeeData.map((d) => d.Data.Scores[scoreCorrAccessorA]),
      cleanedCoffeeData.map((d) => d.Data.Scores[scoreCorrAccessorB])
    ).toFixed(2)
  }, [scoreCorrAccessorA, scoreCorrAccessorB])

  const corrAltTotal = useMemo<string>(() => {
    return sampleCorrelation(
      cleanedCoffeeData.map((d) => d.Location.Altitude.Average),
      cleanedCoffeeData.map((d) => d.Data.Scores.Total)
    ).toFixed(2)
  }, [])

  return (
    <div className="flex flex-col items-center gap-6 bg-gray-50 p-4">
      {/* Container width scales on screen size, full width on mobile, capped on larger */}
      <div className="w-full max-w-xl rounded bg-white p-6 shadow">
        <h3 className="mb-4 text-center text-xl font-semibold">
          Standard Deviation
        </h3>
        <hr className="mb-6" />
        <div className="flex flex-col gap-4">
          <h5 className="text-center font-medium">Characteristics Score</h5>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            {/* Select full width on mobile, auto on larger */}
            <select
              name="scores"
              id="scores"
              value={scoreSDAccessor}
              onChange={(e) =>
                setScoreSDAccessor(
                  e.target
                    .value as keyof (typeof cleanedCoffeeData)[number]['Data']['Scores']
                )
              }
              className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:w-auto"
            >
              {Object.keys(cleanedCoffeeData[0].Data.Scores).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            <p className="text-center text-lg font-semibold sm:text-left">
              {sd}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-xl rounded bg-white p-6 shadow">
        <h3 className="mb-4 text-center text-xl font-semibold">Correlation</h3>
        <hr className="mb-6" />
        <div className="flex flex-col gap-4">
          <h5 className="text-center font-medium">Characteristics Score</h5>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <select
              name="scoresA"
              id="scoresA"
              value={scoreCorrAccessorA}
              onChange={(e) =>
                setScoreCorrAccessorA(
                  e.target
                    .value as keyof (typeof cleanedCoffeeData)[number]['Data']['Scores']
                )
              }
              className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:w-auto"
            >
              {Object.keys(cleanedCoffeeData[0].Data.Scores).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            <select
              name="scoresB"
              id="scoresB"
              value={scoreCorrAccessorB}
              onChange={(e) =>
                setScoreCorrAccessorB(
                  e.target
                    .value as keyof (typeof cleanedCoffeeData)[number]['Data']['Scores']
                )
              }
              className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:w-auto"
            >
              {Object.keys(cleanedCoffeeData[0].Data.Scores).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            <p className="text-center text-lg font-semibold sm:text-left">
              {corr}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-xl rounded bg-white p-6 shadow">
        <h3 className="mb-4 text-center text-xl font-semibold">Correlation</h3>
        <hr className="mb-6" />
        <div className="flex flex-col gap-4">
          <h5 className="text-center font-medium">Altitude : Total Score</h5>
          <div className="flex justify-center">
            <p className="text-lg font-semibold">{corrAltTotal}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
