import { createLazyFileRoute } from '@tanstack/react-router'
import { cleanedCoffeeData } from '../utils'
import AvgChar from '../components/AvgChar'
import CharRank from '../components/CharRank'
import MostBags from '../components/MostBags'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="mt-2 flex flex-col items-center justify-center gap-4 p-2 sm:mt-4 sm:p-4">
      <AvgChar data={cleanedCoffeeData} />
      <div className="my-4 w-full sm:w-xl h-2 border border-solid border-slate-200 rounded-full bg-slate-200" />
      <CharRank data={cleanedCoffeeData} />
      <div className="my-4 w-full sm:w-xl h-2 border border-solid border-slate-200 rounded-full bg-slate-200" />
      <MostBags data={cleanedCoffeeData} />
    </div>
  )
}
