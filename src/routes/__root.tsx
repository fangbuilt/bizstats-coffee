import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootComponent,
    notFoundComponent: NotFound,
  },
)

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/">
          Home
        </Link>{' '}
        <Link to="/about">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
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
