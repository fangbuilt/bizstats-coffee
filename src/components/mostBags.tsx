import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CorgisCoffee } from "../utils";

export default function MostBags({ data }: { data: CorgisCoffee[]}) {
    // 33333333
    const ownerRankingByBagsSold = Object.values(
        data.reduce((acc, entry) => {
            const owner = entry.Data.Owner;
            if (!acc[owner]) {
                acc[owner] = { owner, totalBags: 0 };
            }

            acc[owner].totalBags += entry.Data.Production["Number of bags"] || 0;

            return acc;
        }, {} as Record<string, { owner: string; totalBags: number }>)
    )
        .sort((a, b) => b.totalBags - a.totalBags)
        .slice(0, 10)
        .map((entry, index) => ({
            ...entry,
            rank: index + 1
        }));

    console.log("haha", ownerRankingByBagsSold);

    return (
        <div className="flex flex-col gap-4 w-full max-w-6xl">
            <ResponsiveContainer width="100%" height={400} className="rounded shadow p-4">
                <BarChart data={ownerRankingByBagsSold} className='h-full min-h-fit'>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="owner" angle={-90} textAnchor='end' fontSize={16} interval={0} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="totalBags" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}