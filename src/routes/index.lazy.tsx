import { createLazyFileRoute } from '@tanstack/react-router'
import data from '../assets/static-coffee-data.json'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const chartData = data.map((entry) => ({
    year: entry.Year,
    totalScore: entry.Data.Scores.Total
  }))

  return (
    <div className="p-2">
      <ResponsiveContainer width={1000} height={500}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="totalScore" stroke='#8884d8' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
