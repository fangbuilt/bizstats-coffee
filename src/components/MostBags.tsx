import { useMemo } from 'react'
import { CorgisCoffee } from '../utils'

export default function MostBags({ data }: { data: CorgisCoffee[] }) {
  const ownerRankingByBagsSold = useMemo(() => {
    return Object.values(
      data.reduce(
        (acc, entry) => {
          const owner = entry.Data.Owner
          const country = entry.Location.Country
          if (!acc[owner]) {
            acc[owner] = { owner, totalBags: 0, country }
          }
          acc[owner].totalBags += entry.Data.Production['Number of bags'] || 0
          return acc
        },
        {} as Record<
          string,
          { owner: string; totalBags: number; country: string }
        >
      )
    )
      .sort((a, b) => b.totalBags - a.totalBags)
      .slice(0, 10)
      .map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }))
  }, [data])

  return (
    <>
      <div className="w-full rounded bg-white p-6 text-center text-sm shadow sm:w-auto sm:text-base">
        <h3 className='text-xl'>Most Bags Sold Owner Ranking</h3>
      </div>
      <ol className="flex flex-col flex-wrap items-stretch justify-center gap-2 sm:flex-row sm:items-center">
        {ownerRankingByBagsSold.map((d) => (
          <li className="flex w-full flex-col items-start gap-2 rounded bg-white p-4 shadow sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <div>
              <h1>{d.rank}</h1>
            </div>
            <div>
              <p className="font-medium">{d.owner.toLocaleUpperCase()}</p>
              <p className="text-xs">
                {d.totalBags.toLocaleString()} - {d.country}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </>
  )
}
