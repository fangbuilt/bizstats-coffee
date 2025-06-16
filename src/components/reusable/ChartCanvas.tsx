import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  Filler,
  TimeScale,
  ChartTypeRegistry,
  ChartOptions,
  ChartData,
  Plugin,
} from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'
import datalabels from 'chartjs-plugin-datalabels'
import 'chartjs-adapter-date-fns'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  Filler,
  TimeScale,
  datalabels,
  zoomPlugin
)

type ChartCanvasProps<TType extends keyof ChartTypeRegistry> = {
  chartType: TType
  data: ChartData<TType>
  options?: ChartOptions<TType>
  plugins?: Plugin<TType>[]
  stacked?: boolean
  horizontal?: boolean
}

export function ChartCanvas<TType extends keyof ChartTypeRegistry>({
  chartType,
  data,
  options,
  plugins,
  stacked = false,
  horizontal = false,
}: ChartCanvasProps<TType>) {
  const defaultOptions: ChartOptions<TType> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: horizontal ? 'nearest' : 'index',
      intersect: false,
      axis: horizontal ? 'y' : 'x',
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        enabled: true,
        mode: horizontal ? 'nearest' : 'index',
        axis: horizontal ? 'y' : 'x',
      },
      datalabels: {
        display: false,
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: horizontal ? 'y' :'x',
        },
        pan: {
          enabled: true,
          mode: horizontal ? 'y' : 'x',
        },
      },
    },
    scales: {
      x: {
        stacked,
        title: { display: true, text: horizontal ? 'Value' : 'Year' },
      },
      y: {
        stacked,
        title: { display: true, text: horizontal ? 'Year' : 'Score' },
        beginAtZero: true,
      },
    },
  } as ChartOptions<TType>

  const mergedOptions = {
    ...defaultOptions,
    ...(horizontal && chartType === 'bar' && { indexAxis: 'y' }),
    ...options,
  }

  return (
    <div className="relative h-[500px] w-full rounded bg-white p-6 shadow">
      <Chart
        type={chartType}
        data={data}
        options={mergedOptions}
        plugins={plugins}
      />
    </div>
  )
}
