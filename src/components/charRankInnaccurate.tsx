import { useState } from "react";
import { CorgisCoffee, scoreCategories } from "../utils";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function CharRankInnaccurate({ data }: { data: CorgisCoffee[] }) {
    const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
    const [rankBy, setRankBy] = useState<'Total' | keyof typeof scoreCategories>('Total');

    const allYears = Array.from(
        new Set(
            data.map(entry => entry.Year)
        )
    ).sort();

    const topCountriesData = Object.values(
        data.reduce((accumulated, entry) => {
            const year = entry.Year;
            if (selectedYear !== 'all' && year !== selectedYear) return accumulated;

            const country = entry.Location.Country;

            if (!accumulated[country]) {
                accumulated[country] = {
                    country,
                    totalScore: 0,
                    count: 0,
                    ...Object.keys(scoreCategories).reduce((accumulatedCategories, key) => {
                        accumulatedCategories[key as keyof typeof scoreCategories] = 0;
                        return accumulatedCategories;
                    }, {} as Record<keyof typeof scoreCategories, number>)
                }
            }

            accumulated[country].totalScore += entry.Data.Scores.Total;
            accumulated[country].count += 1;

            for (const key of Object.keys(scoreCategories) as (keyof typeof scoreCategories)[]) {
                accumulated[country][key] += entry.Data.Scores[key];
            }

            return accumulated;
        }, {} as Record<
            string, {
                country: string,
                totalScore: number,
                count: number
            } & Record<keyof typeof scoreCategories, number>
        >)
    )
        .map(averaged => ({
            country: averaged.country,
            Value:
                rankBy === 'Total'
                    ? (averaged.totalScore / averaged.count)
                    : (averaged[rankBy] / averaged.count)
        }))
        .sort((a, b) => b.Value - a.Value)
        .slice(0, 10)
        .map((sorted, index) => ({ ...sorted, rank: index + 1 }));
    return (
        <div className="flex flex-col gap-6 w-full max-w-6xl" >
            <div className="p-6 rounded shadow w-full text-sm sm:text-base bg-white text-center">
                <h3>Innaccurate {rankBy === 'Total' ? 'Total Score Ranking' : rankBy + ' Ranking'}</h3>
                <p>Entry is less than 3 per country summed year - Allowing innaccurate averaged data</p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-2 items-stretch sm:items-center justify-center">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-4 shadow rounded w-full sm:w-auto bg-white">
                    <label htmlFor="year">Filter by Year:</label>
                    <select
                        name="year"
                        id="year"
                        value={selectedYear}
                        className="w-full sm:w-auto border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={event => setSelectedYear(event.target.value === 'all' ? 'all' : Number(event.target.value))}
                    >
                        <option value="all">All Years (2010 - 2018)</option>
                        {allYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-4 shadow rounded w-full sm:w-auto bg-white">
                    <select
                        name="rankBy"
                        id="rankBy"
                        onChange={event => setRankBy(event.target.value as any)}
                        className="w-full sm:w-auto border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={rankBy}
                    >
                        <option value="Total">Total Score</option>
                        {Object.keys(scoreCategories).map(key => (
                            <option key={key} value={key}>{key}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Rankings Chart */}
            <ResponsiveContainer width="100%" height={topCountriesData.length * 80} className="rounded shadow p-4 bg-white">
                <BarChart data={topCountriesData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                        dataKey="Country"
                        type="category"
                        tickFormatter={(_, index) => {
                            const rank = topCountriesData[index]?.rank;
                            const countryName = topCountriesData[index]?.country;
                            return `#${rank} ${countryName}`;
                        }}
                    />
                    <Tooltip
                        formatter={(value: number) => value.toFixed(2)}
                    />

                    <Bar dataKey="Value" fill="hsl(220, 80%, 60%)" radius={[4, 4, 0, 0]} barSize={10} />
                </BarChart>
            </ResponsiveContainer>

        </div >

    )
}
