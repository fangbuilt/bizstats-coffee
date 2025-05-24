import { createLazyFileRoute } from '@tanstack/react-router'
import { cleanedCoffeeData } from '../utils';
import AvgChar from '../components/avgChar';
import CharRank from '../components/charRank';
import MostBags from '../components/mostBags';

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2 sm:p-4 flex flex-col gap-6 justify-center items-center min-h-screen mt-2 sm:mt-4">
      <AvgChar data={cleanedCoffeeData} />
      <hr className='my-4' />
      <CharRank data={cleanedCoffeeData} />
      <hr className='my-4' />
      <MostBags data={cleanedCoffeeData} />
    </div>

  )
}
