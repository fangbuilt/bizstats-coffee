import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootComponent,
    notFoundComponent: NotFound,
  },
)

function RootComponent() {
  return (
    <div className='w-dvw h-dvh'>
      <div className="px-4 py-6 flex gap-2 sticky top-0 z-50 shadow justify-center bg-white">
        <Link to="/">
          Dashboard
        </Link>
        <Link to="/cards">
          Cards
        </Link>
      </div>
      <Outlet />
    </div>
  )
}

function NotFound() {
  return (
    <>
      <p>This is the not found component configured on root route</p>
      <Link to="/">Start Over</Link>
    </>
  )
}
