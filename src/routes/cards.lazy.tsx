import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/cards')({
  component: Cards,
})

function Cards() {
  return (
    <div className="p-2 flex flex-col justify-center items-center min-h-screen">
      <p>Interactive cards coming soon!</p>
    </div>
  )
}
