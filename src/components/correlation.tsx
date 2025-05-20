import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CorgisCoffee, twoDigitDecimals } from "../utils";

export default function Correlation({ data }: { data: CorgisCoffee[]}) {
    const methodBySpecies = data.reduce((acc, entry) => {
        const species = entry.Data.Type.Species;
        const method = entry.Data.Type['Processing method'];
        const key = `${species}-${method}`;
        const altitude = entry.Location.Altitude.Average || 0;
        const score = entry.Data.Scores.Total;

        if (!species || !method) return acc;

        if (!acc[key]) {
            acc[key] = {
                species,
                method,
                totalScore: score,
                count: 1,
                altitudeSum: altitude
            };
        } else {
            acc[key].totalScore += score;
            acc[key].count += 1;
            acc[key].altitudeSum += altitude;
        }

        return acc;
    }, {} as Record<string, {
        species: string;
        method: string;
        totalScore: number;
        count: number;
        altitudeSum: number;
    }>);

    // Average scores and altitudes per species-method
    const avgMethodBySpecies = Object.values(methodBySpecies).map((entry) => ({
        species: entry.species,
        method: entry.method,
        avgScore: twoDigitDecimals(entry.totalScore / entry.count),
        avgAltitude: Math.round(entry.altitudeSum / entry.count),
    }));

    // Find best method per species
    const bestMethodPerSpecies = Object.values(
        avgMethodBySpecies.reduce((acc, entry) => {
            if (
                !acc[entry.species] ||
                entry.avgScore > acc[entry.species].avgScore
            ) {
                acc[entry.species] = entry;
            }
            return acc;
        }, {} as Record<string, typeof avgMethodBySpecies[0]>)
    );
    return (
        <div className="flex flex-col gap-4 w-full max-w-6xl">
            <ResponsiveContainer width="100%" height={400} className='rounded shadow p-4'>
                <BarChart data={bestMethodPerSpecies}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="species" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgScore" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}