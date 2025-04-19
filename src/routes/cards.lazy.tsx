import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/cards')({
  component: Cards,
})

function Cards() {
  return (
    <div className="p-2">
      <p>Hello from cards!</p>
    </div>
  )
}
