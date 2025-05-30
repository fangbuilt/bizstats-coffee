/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const CardsLazyImport = createFileRoute('/cards')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const CardsLazyRoute = CardsLazyImport.update({
  id: '/cards',
  path: '/cards',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/cards.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/cards': {
      id: '/cards'
      path: '/cards'
      fullPath: '/cards'
      preLoaderRoute: typeof CardsLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/cards': typeof CardsLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/cards': typeof CardsLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/cards': typeof CardsLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/cards'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/cards'
  id: '__root__' | '/' | '/cards'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  CardsLazyRoute: typeof CardsLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  CardsLazyRoute: CardsLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/cards"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/cards": {
      "filePath": "cards.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
