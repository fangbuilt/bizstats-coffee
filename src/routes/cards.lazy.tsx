import { createLazyFileRoute } from '@tanstack/react-router'
import { CorgisCoffee } from '../utils';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

export const Route = createLazyFileRoute('/cards')({
  component: Cards,
})

interface Row {
  owner: string;
  species: string;
  variety: string;
  method: string;
  country: string;
}

function getTypeRows(data: CorgisCoffee[], selectedYear?: number | 'all'): Row[] {
  return data
    .filter(d => selectedYear === 'all' || d.Year === selectedYear)
    .map(d => ({
      owner: d.Data.Owner,
      species: d.Data.Type.Species,
      variety: d.Data.Type.Variety,
      method: d.Data.Type["Processing method"],
      country: d.Location.Country,
    }))
}

function getModeCounts(data: Row[]) {
  const countMap: Record<'species' | 'variety' | 'method', Record<string, number>> = {
    species: {},
    variety: {},
    method: {}
  }
  for (const d of data) {
    for (const key of ['species', 'variety', 'method'] as const) {
      const val = d[key] || 'Unknown'
      countMap[key][val] = (countMap[key][val] ?? 0) + 1
    }
  }
  return countMap
}

const columns: ColumnDef<Row>[] = [
  { accessorKey: 'owner', header: 'Owner' },
  { accessorKey: 'species', header: 'Species' },
  { accessorKey: 'variety', header: 'Variety' },
  { accessorKey: 'method', header: 'Processing Method' },
  { accessorKey: 'country', header: 'Country' },
]

function Cards({ data, selectedYear }: { data: CorgisCoffee[], selectedYear: number | 'all' }) {
  const rows = useMemo(() => getTypeRows(data, selectedYear), [data, selectedYear])
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const modeCounts = getModeCounts(rows)
  return (
    <div className="p-2 flex flex-col justify-center items-center min-h-screen">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-sm">
        <h4>🔢 Mode Stats:</h4>
        <pre className="whitespace-pre-wrap">{JSON.stringify(modeCounts, null, 2)}</pre>
      </div>
    </div>
  )
}
