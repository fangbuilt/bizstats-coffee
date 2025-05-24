import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CorgisCoffee, toTitleCase } from "../utils";

export default function AvgChar({ data }: { data: CorgisCoffee[]}) {
    const [mode, setMode] = useState<'total' | 'categories'>('total');
    const chartType = mode === 'total' ? 'line' : 'bar';
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

    function toggleMode() {
        setMode(previousState => (previousState === 'total' ? 'categories' : 'total'));
    }

    const allCountries = Array.from(
        new Set(data.map(entry => entry.Location.Country))
    ).sort();

    const allRegions = selectedCountry ?
        Array.from(
            new Set(
                data
                    .filter(entry => entry.Location.Country === selectedCountry)
                    .map(entry => entry.Location.Region)
                    .filter(Boolean)
            )
        ).sort()
        : [];

    const filteredData = data.filter(entry => {
        if (selectedCountry && entry.Location.Country !== selectedCountry) return false;
        if (selectedRegion && entry.Location.Region !== selectedRegion) return false;
        return true;
    });

    const averagedScoreData = Object.values(
        filteredData.reduce((accumulated, entry) => {
            const year = Number(entry.Year);
            if (!accumulated[year]) {
                accumulated[year] = {
                    year,
                    totalScore: 0,
                    count: 0,
                    aroma: 0,
                    flavor: 0,
                    aftertaste: 0,
                    acidity: 0,
                    body: 0,
                    balance: 0,
                    uniformity: 0,
                    sweetness: 0,
                    moisture: 0
                }
            }
            accumulated[year].totalScore += entry.Data.Scores.Total;
            accumulated[year].count += 1;
            accumulated[year].aroma += entry.Data.Scores.Aroma;
            accumulated[year].flavor += entry.Data.Scores.Flavor;
            accumulated[year].aftertaste += entry.Data.Scores.Aftertaste;
            accumulated[year].acidity += entry.Data.Scores.Acidity;
            accumulated[year].body += entry.Data.Scores.Body;
            accumulated[year].balance += entry.Data.Scores.Balance;
            accumulated[year].uniformity += entry.Data.Scores.Uniformity;
            accumulated[year].sweetness += entry.Data.Scores.Sweetness;
            accumulated[year].moisture += entry.Data.Scores.Moisture
            return accumulated;
        }, {} as Record<number, {
            year: number,
            totalScore: number,
            count: number,
            aroma: number,
            flavor: number,
            aftertaste: number,
            acidity: number,
            body: number,
            balance: number,
            uniformity: number,
            sweetness: number,
            moisture: number
        }>)
    ).map(averaged => ({
        "Year": averaged.year,
        "Averaged Total Score": (averaged.totalScore / averaged.count).toFixed(2),
        "Aroma": (averaged.aroma / averaged.count).toFixed(2),
        "Flavor": (averaged.flavor / averaged.count).toFixed(2),
        "Aftertaste": (averaged.aftertaste / averaged.count).toFixed(2),
        "Acidity": (averaged.acidity / averaged.count).toFixed(2),
        "Body": (averaged.body / averaged.count).toFixed(2),
        "Balance": (averaged.balance / averaged.count).toFixed(2),
        "Uniformity": (averaged.uniformity / averaged.count).toFixed(2),
        "Sweetness": (averaged.sweetness / averaged.count).toFixed(2),
        "Moisture": (averaged.moisture / averaged.count).toFixed(2)
    }));

    const barKeys = mode === 'total' ? ['Averaged Total Score'] : ['Aroma', 'Flavor', 'Aftertaste', 'Acidity', 'Body', 'Balance', 'Uniformity', 'Sweetness', 'Moisture'];


    return (
        <div className="flex flex-col gap-4 w-full max-w-6xl">

            {/* Description Box */}
            <div className="p-6 rounded shadow w-full text-sm sm:text-base bg-white text-center">
                <h3>Average of Coffee Characteristics Score</h3>
            </div>

            {/* Controls Row */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 items-stretch sm:items-center justify-center">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-4 rounded shadow w-full sm:w-auto bg-white">
                    <p>Now showing: {mode !== 'total' ? 'Categories' : 'Total'}</p>
                    <button className="w-full sm:w-auto border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={toggleMode}>
                        {mode === 'total' ? 'Show Categories' : 'Show Total Score'}
                    </button>
                </div>

                {/* Country Select */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-4 rounded shadow w-full sm:w-auto bg-white">
                    <label htmlFor="country">Filter by Country:</label>
                    <select
                        name="country"
                        id="country"
                        value={selectedCountry ?? ''}
                        className="w-full sm:w-auto border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(event) => {
                            setSelectedCountry(event.target.value || null);
                            setSelectedRegion(null);
                        }}
                    >
                        <option value="">All Countries</option>
                        {allCountries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                </div>

                {/* Region Select (Conditional) */}
                {selectedCountry && allRegions.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-4 rounded shadow w-full sm:w-auto bg-white">
                        <label htmlFor="region">Filter by Region:</label>
                        <select
                            name="region"
                            id="region"
                            value={selectedRegion ?? ''}
                            className="w-full sm:w-auto border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={event => setSelectedRegion(event.target.value || null)}
                        >
                            <option value="">All Regions</option>
                            {allRegions.map(region => (
                                <option key={region} value={region}>{toTitleCase(region)}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={500} className="rounded shadow p-6 bg-white">
                {chartType === 'line' ? (
                    <LineChart data={averagedScoreData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Year" />
                        <YAxis />
                        <Tooltip />
                        {barKeys.map((key, index) => (
                            <Line
                                key={key}
                                type="monotone"
                                dataKey={key}
                                stroke={`hsl(${(index * 35) % 360}, 70%, 60%)`}
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 5 }}
                            />
                        ))}
                    </LineChart>
                ) : (
                    <BarChart data={averagedScoreData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Year" />
                        <YAxis />
                        <Tooltip />
                        {barKeys.map((key, index) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                fill={`hsl(${(index * 35) % 360}, 70%, 60%)`}
                                radius={[4, 4, 0, 0]}
                            />
                        ))}
                    </BarChart>
                )}
            </ResponsiveContainer>
        </div>
    )
}