import { createLazyFileRoute } from '@tanstack/react-router'
import data from '../assets/static-coffee-data.json'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useState } from 'react';

function twoDigitDecimals(number: number) {
  return Math.ceil(number * 100) / 100;
}

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const [mode, setMode] = useState<'total' | 'categories'>('total');

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  function toggleMode() {
    setMode(previousState => (previousState === 'total' ? 'categories' : 'total'));
  }

  const allCountries = Array.from(
    new Set(data.map(entry => entry.Location.Country))
  ).sort();

  const filteredData = data.filter(entry => {
    if (selectedCountry && entry.Location.Country !== selectedCountry) return false;

    return true;
  });

  const averagedScoreData = Object.values(
    filteredData.reduce((accumulated, entry) => {
      const year = entry.Year;
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
    "Averaged Total Score": twoDigitDecimals(averaged.totalScore / averaged.count),
    "Aroma": twoDigitDecimals(averaged.aroma / averaged.count),
    "Flavor": twoDigitDecimals(averaged.flavor / averaged.count),
    "Aftertaste": twoDigitDecimals(averaged.aftertaste / averaged.count),
    "Acidity": twoDigitDecimals(averaged.acidity / averaged.count),
    "Body": twoDigitDecimals(averaged.body / averaged.count),
    "Balance": twoDigitDecimals(averaged.balance / averaged.count),
    "Uniformity": twoDigitDecimals(averaged.uniformity / averaged.count),
    "Sweetness": twoDigitDecimals(averaged.sweetness / averaged.count),
    "Moisture": twoDigitDecimals(averaged.moisture / averaged.count)
  }));

  const barKeys = mode === 'total' ? ['Averaged Total Score'] : ['Aroma', 'Flavor', 'Aftertaste', 'Acidity', 'Body', 'Balance', 'Uniformity', 'Sweetness', 'Moisture'];

  return (
    <div className="p-2 flex flex-col gap-4 justify-center items-center h-dvh">
      <div className='flex flex-col gap-4 w-[1000px]'>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-4 p-4 rounded shadow">
            <p>Now showing: {mode !== 'total' ? 'Categories' : 'Total'}</p>
            <button className='w-fit whitespace-nowrap' onClick={toggleMode}>{mode === 'total' ? 'Show Categories' : 'Show Total Score'}</button>
          </div>
          <div className='flex items-center gap-4 p-4 rounded shadow'>
            <label htmlFor='country'>Filter by Country:</label>
            <select id='country' value={selectedCountry ?? ''} onChange={event => setSelectedCountry(event.target.value || null)}>
              <option value="">All Countries</option>
              {allCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={500} className="rounded shadow p-4">
          <BarChart data={averagedScoreData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Year" />
            <YAxis />
            <Tooltip />
            {barKeys.map((key, index) => (
              <Bar key={key} dataKey={key} fill={`hsl(${(index * 35) % 360}, 70%, 60%)`} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
        <div className='p-4 rounded shadow w-full'>
          <p>Summary of aroma, flavor, aftertaste, acidity, body, balance, uniformity, sweetness, and moisture data averaged from aggregated countries through the years of 2010 - 2018</p>
        </div>
      </div>
    </div>
  )
}
