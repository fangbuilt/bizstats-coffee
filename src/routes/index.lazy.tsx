import { createLazyFileRoute } from '@tanstack/react-router'
import data from '../assets/static-coffee-data.json'
import AvgChar from '../components/avgChar';
import CharRank from '../components/charRank';
import MostBags from '../components/mostBags';
import Correlation from '../components/correlation';
import { calculateStandardDeviation, CorgisCoffee } from '../utils';

export const Route = createLazyFileRoute('/')({
  component: Index,
})

const SD_VARIABLE = calculateStandardDeviation<CorgisCoffee>(
  data,
  (d) => d.Data.Scores.Total
)

function Index() {
  return (
    <div className="p-2 sm:p-4 flex flex-col gap-6 justify-center items-center min-h-screen mt-2 sm:mt-4">
      Standard Deviation of {}: {SD_VARIABLE}
      <AvgChar data={data} />
      <CharRank data={data} />
      <MostBags data={data} />
      <Correlation data={data} />
    </div>

  )
}
