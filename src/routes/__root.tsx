import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router'
import {
  ChartNoAxesCombined,
  LayoutDashboard,
  Menu,
  Table2,
  X,
} from 'lucide-react'
import { useState } from 'react'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-dvh w-dvw">
      {/* Desktop Sidebar */}
      <nav
        className={`hidden transition-all duration-200 ease-out md:flex md:flex-col md:border-r md:border-gray-200 md:bg-white ${
          sidebarOpen ? 'md:w-64' : 'md:w-16'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center p-2 ${sidebarOpen ? 'justify-between px-4 py-4' : 'justify-center'}`}
        >
          <div
            className={`transition-opacity duration-150 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          >
            {sidebarOpen && (
              <h1 className="text-xl font-semibold text-gray-900">
                Bizstats-Coffee
              </h1>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`flex-shrink-0 rounded-lg transition-colors hover:bg-gray-100 ${
              sidebarOpen ? 'p-2' : 'p-3'
            }`}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 space-y-1 px-2">
          <Link
            to="/"
            className={`group flex items-center rounded-lg text-sm font-medium text-gray-700 no-underline transition-colors hover:bg-gray-100 [&.active]:bg-blue-50 [&.active]:text-blue-700 ${
              sidebarOpen ? 'px-3 py-2' : 'justify-center p-3'
            }`}
            title={!sidebarOpen ? 'Charts' : undefined}
          >
            <ChartNoAxesCombined size={20} className="flex-shrink-0" />
            <span
              className={`ml-3 transition-all duration-150 ${
                sidebarOpen
                  ? 'translate-x-0 opacity-100'
                  : 'absolute -translate-x-2 opacity-0'
              }`}
            >
              Charts
            </span>
          </Link>

          <Link
            to="/matrices"
            className={`group flex items-center rounded-lg text-sm font-medium text-gray-700 no-underline transition-colors hover:bg-gray-100 [&.active]:bg-blue-50 [&.active]:text-blue-700 ${
              sidebarOpen ? 'px-3 py-2' : 'justify-center p-3'
            }`}
            title={!sidebarOpen ? 'Matrices' : undefined}
          >
            <LayoutDashboard size={20} className="flex-shrink-0" />
            <span
              className={`ml-3 transition-all duration-150 ${
                sidebarOpen
                  ? 'translate-x-0 opacity-100'
                  : 'absolute -translate-x-2 opacity-0'
              }`}
            >
              Matrices
            </span>
          </Link>

          <Link
            to="/documentation"
            className={`group flex items-center rounded-lg text-sm font-medium text-gray-700 no-underline transition-colors hover:bg-gray-100 [&.active]:bg-blue-50 [&.active]:text-blue-700 ${
              sidebarOpen ? 'px-3 py-2' : 'justify-center p-3'
            }`}
            title={!sidebarOpen ? 'Documentation' : undefined}
          >
            <Table2 size={20} className="flex-shrink-0" />
            <span
              className={`ml-3 transition-all duration-150 ${
                sidebarOpen
                  ? 'translate-x-0 opacity-100'
                  : 'absolute -translate-x-2 opacity-0'
              }`}
            >
              Documentation
            </span>
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex min-h-0 flex-1 flex-col">
        <main className="flex-1 overflow-auto pb-16 md:pb-0">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed right-0 bottom-0 left-0 border-t border-gray-200 bg-white px-4 py-2 md:hidden">
          <div className="flex justify-around">
            <Link
              to="/"
              className="flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium text-gray-600 no-underline transition-colors hover:text-blue-600 [&.active]:text-blue-600"
            >
              <ChartNoAxesCombined size={20} />
              Charts
            </Link>
            <Link
              to="/matrices"
              className="flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium text-gray-600 no-underline transition-colors hover:text-blue-600 [&.active]:text-blue-600"
            >
              <LayoutDashboard size={20} />
              Matrices
            </Link>
            <Link
              to="/documentation"
              className="flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium text-gray-600 no-underline transition-colors hover:text-blue-600 [&.active]:text-blue-600"
            >
              <Table2 size={20} />
              Docs
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8">
      <p className="mb-4 text-lg text-gray-600">This page could not be found</p>
      <Link
        to="/"
        className="rounded-lg bg-blue-600 px-4 py-2 text-white no-underline transition-colors hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  )
}
