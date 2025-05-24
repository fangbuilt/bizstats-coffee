import { createLazyFileRoute } from '@tanstack/react-router'
import { cleanedCoffeeData } from '../utils'
import { sampleCorrelation, standardDeviation } from 'simple-statistics'
import { useState } from 'react'

export const Route = createLazyFileRoute('/cards')({
  component: Cards,
})

function getScoreSD(accessor: keyof typeof cleanedCoffeeData[number]['Data']['Scores']) {
  return standardDeviation(cleanedCoffeeData.map(d => d.Data.Scores[accessor])).toFixed(2)
}

function getScoreCorr(accessorA: keyof typeof cleanedCoffeeData[number]['Data']['Scores'], accessorB: keyof typeof cleanedCoffeeData[number]['Data']['Scores']) {
  return sampleCorrelation(
    cleanedCoffeeData.map(d => d.Data.Scores[accessorA]),
    cleanedCoffeeData.map(d => d.Data.Scores[accessorB])
  ).toFixed(2)
}

const corrAltTotal = sampleCorrelation(
  cleanedCoffeeData.map(d => d.Location.Altitude.Average),
  cleanedCoffeeData.map(d => d.Data.Scores.Total)
).toFixed(2)

function Cards() {
  const [scoreSDAccessor, setScoreSDAccessor] = useState<keyof typeof cleanedCoffeeData[number]['Data']['Scores']>('Total')
  const [scoreCorrAccessorA, setScoreCorrAccessorA] = useState<keyof typeof cleanedCoffeeData[number]['Data']['Scores']>('Total')
  const [scoreCorrAccessorB, setScoreCorrAccessorB] = useState<keyof typeof cleanedCoffeeData[number]['Data']['Scores']>('Total')

  const sd = getScoreSD(scoreSDAccessor)
  const corr = getScoreCorr(scoreCorrAccessorA, scoreCorrAccessorB)

  return (
    <div className="p-4 flex flex-col items-center min-h-screen gap-6 bg-gray-50">
      {/* Container width scales on screen size, full width on mobile, capped on larger */}
      <div className="w-full max-w-xl bg-white rounded shadow p-6">
        <h3 className="text-center text-xl font-semibold mb-4">Standard Deviation</h3>
        <hr className="mb-6" />
        <div className="flex flex-col gap-4">
          <h5 className="text-center font-medium">Characteristics Score</h5>
          <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4">
            {/* Select full width on mobile, auto on larger */}
            <select
              name="scores"
              id="scores"
              value={scoreSDAccessor}
              onChange={(e) => setScoreSDAccessor(e.target.value as keyof typeof cleanedCoffeeData[number]['Data']['Scores'])}
              className="w-full sm:w-auto border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {Object.keys(cleanedCoffeeData[0].Data.Scores).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            <p className="text-center sm:text-left text-lg font-semibold">{sd}</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-xl bg-white rounded shadow p-6">
        <h3 className="text-center text-xl font-semibold mb-4">Correlation</h3>
        <hr className="mb-6" />
        <div className="flex flex-col gap-4">
          <h5 className="text-center font-medium">Characteristics Score</h5>
          <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4">
            <select
              name="scoresA"
              id="scoresA"
              value={scoreCorrAccessorA}
              onChange={(e) => setScoreCorrAccessorA(e.target.value as keyof typeof cleanedCoffeeData[number]['Data']['Scores'])}
              className="w-full sm:w-auto border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              onChange={(e) => setScoreCorrAccessorB(e.target.value as keyof typeof cleanedCoffeeData[number]['Data']['Scores'])}
              className="w-full sm:w-auto border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {Object.keys(cleanedCoffeeData[0].Data.Scores).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            <p className="text-center sm:text-left text-lg font-semibold">{corr}</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-xl bg-white rounded shadow p-6">
        <h3 className="text-center text-xl font-semibold mb-4">Correlation</h3>
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
