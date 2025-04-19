import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/scores')({
  component: Scores,
})

function Scores() {
  return (
    <div className="p-2">
      <p>Hello from about!</p>
      <button type="button">Button Appears Like This</button>
    </div>
  )
}
