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
  return sampleCorrelation(cleanedCoffeeData.map(d => d.Data.Scores[accessorA]), cleanedCoffeeData.map(d => d.Data.Scores[accessorB])).toFixed(2)
}

const corrAltTotal = sampleCorrelation(cleanedCoffeeData.map(d => d.Location.Altitude.Average), cleanedCoffeeData.map(d => d.Data.Scores.Total)).toFixed(2)

function Cards() {
  const [scoreSDAccessor, setScoreSDAccessor] = useState<keyof typeof cleanedCoffeeData[number]['Data']['Scores']>('Total')
  const [scoreCorrAccessorA, setScoreCorrAccessorA] = useState<keyof typeof cleanedCoffeeData[number]['Data']['Scores']>('Total')
  const [scoreCorrAccessorB, setScoreCorrAccessorB] = useState<keyof typeof cleanedCoffeeData[number]['Data']['Scores']>('Total')

  const sd = getScoreSD(scoreSDAccessor)
  const corr = getScoreCorr(scoreCorrAccessorA, scoreCorrAccessorB)

  return (
    <div className="p-2 flex flex-col justify-center items-center min-h-screen gap-6">

      <div className='rounded shadow p-6 max-w-xl min-w-lg bg-white'>
        <h2 className='text-center'>Standard Deviation</h2>
        <hr className='my-4' />
        <div className='flex flex-col gap-4'>
          <h4 className='text-center'>Characteristics Score</h4>
          <div className="flex gap-4 justify-center align-middle items-center">
            <select
              name="scores"
              id="scores"
              value={scoreSDAccessor}
              onChange={(e) => setScoreSDAccessor(e.target.value as keyof typeof cleanedCoffeeData[number]['Data']['Scores'])}
            >
              {Object.keys(cleanedCoffeeData[0].Data.Scores).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
            <p>{sd}</p>
          </div>
        </div>
      </div>

      <div className='rounded shadow p-6 max-w-xl min-w-lg bg-white'>
        <h2 className='text-center'>Correlation</h2>
        <hr className='my-4' />
        <div className='flex flex-col gap-4'>
          <h4 className='text-center'>Characteristics Score</h4>
          <div className="flex gap-4 justify-center align-middle items-center">
            <select
              name="scores"
              id="scores"
              value={scoreCorrAccessorA}
              onChange={(e) => setScoreCorrAccessorA(e.target.value as keyof typeof cleanedCoffeeData[number]['Data']['Scores'])}
            >
              {Object.keys(cleanedCoffeeData[0].Data.Scores).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
            <select
              name="scores"
              id="scores"
              value={scoreCorrAccessorB}
              onChange={(e) => setScoreCorrAccessorB(e.target.value as keyof typeof cleanedCoffeeData[number]['Data']['Scores'])}
            >
              {Object.keys(cleanedCoffeeData[0].Data.Scores).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
            <p>{corr}</p>
          </div>
        </div>
      </div>

      <div className='rounded shadow p-6 max-w-xl min-w-lg bg-white'>
        <h2 className='text-center'>Correlation</h2>
        <hr className='my-4' />
        <div className='flex flex-col gap-4'>
          <h4 className='text-center'>Altitude : Total Score</h4>
          <div className="flex gap-4 justify-center align-middle items-center">
            <p>{corrAltTotal}</p>
          </div>
        </div>
      </div>

    </div>
  )
}
