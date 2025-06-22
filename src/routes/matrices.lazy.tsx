import { createLazyFileRoute } from '@tanstack/react-router'
import {
  cleanedCoffeeData,
  // CorgisCoffee
} from '../utils'
import { sampleCorrelation, standardDeviation } from 'simple-statistics'
import {
  // React,
  useMemo,
  useState,
} from 'react'

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

  // function computeCorrelationMatrix(
  //   scores: (typeof cleanedCoffeeData)[number]['Data']['Scores'][]
  // ) {
  //   const keys = Object.keys(scores[0]) as (keyof (typeof scores)[0])[]

  //   const matrix = keys.map((keyA) =>
  //     keys.map((keyB) =>
  //       sampleCorrelation(
  //         scores.map((s) => s[keyA]),
  //         scores.map((s) => s[keyB])
  //       )
  //     )
  //   )

  //   return { keys, matrix }
  // }

  // const { keys, matrix } = useMemo(() => {
  //   return computeCorrelationMatrix(cleanedCoffeeData.map((d) => d.Data.Scores))
  // }, [])

  return (
    <div className="mt-2 flex min-h-screen flex-col items-center justify-center gap-4 p-2">
      {/* Container width scales on screen size, full width on mobile, capped on larger */}
      <div className="w-full max-w-sm rounded bg-white p-4 shadow">
        <h3 className="mb-2 text-center text-xl font-semibold">
          Standard Deviation
        </h3>
        <div className="flex flex-col gap-2">
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

      <div className="w-full max-w-sm rounded bg-white p-4 shadow">
        <h3 className="mb-2 text-center text-xl font-semibold">Correlation</h3>
        <div className="flex flex-col gap-2">
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

      <div className="w-full max-w-sm rounded bg-white p-4 shadow">
        <h3 className="mb-2 text-center text-xl font-semibold">Correlation</h3>
        <div className="flex flex-col gap-2">
          <h5 className="text-center text-lg font-medium">
            Altitude : Total Score
          </h5>
          <div className="flex justify-center">
            <p className="text-lg font-semibold">{corrAltTotal}</p>
          </div>
        </div>
      </div>

      {/* <div className="w-full overflow-auto rounded bg-white p-4 shadow">
        <h3 className="mb-2 text-center text-xl font-semibold">
          Score Correlation Heatmap
        </h3>

        <table className="border-collapse">
          <thead>
            <tr>
              <th
                className="sticky left-0 z-10 bg-white"
                style={{ width: 60, height: 40 }}
              />
              {keys.map((key) => (
                <th
                  key={`head-${key}`}
                  className="bg-white text-center text-[10px] font-semibold"
                  style={{ width: 40, height: 40 }}
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                <th
                  className="sticky left-0 z-10 bg-white pr-1 text-right text-[10px] font-semibold"
                  style={{ width: 60, height: 40 }}
                >
                  {keys[rowIndex]}
                </th>
                {row.map((val, colIndex) => {
                  const red = Math.round(((val + 1) / 2) * 255)
                  const blue = 255 - red
                  const bgColor = `rgb(${red},${255 - Math.abs(red - blue)},${blue})`
                  return (
                    <td
                      key={`cell-${rowIndex}-${colIndex}`}
                      className="text-center align-middle text-[10px] font-semibold text-white"
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: bgColor,
                      }}
                      title={`Corr(${keys[rowIndex]}, ${keys[colIndex]}) = ${val.toFixed(2)}`}
                    >
                      {val.toFixed(2)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  )
}
