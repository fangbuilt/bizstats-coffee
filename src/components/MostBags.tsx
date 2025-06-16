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
    <div className="flex w-full max-w-6xl flex-col gap-4">
      <div className="w-full rounded bg-white p-6 text-center text-sm shadow sm:text-base">
        <h3>Most Bags Sold Owner Ranking</h3>
      </div>
      <ol className="flex flex-col gap-4">
        {ownerRankingByBagsSold.map((d) => (
          <li className="flex items-center gap-4 rounded bg-white p-6 shadow">
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
    </div>
  )
}
