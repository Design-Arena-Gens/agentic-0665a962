"use client";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

type SeriesPoint = { t: string; v: number };

export default function PriceChart() {
  const [series, setSeries] = useState<SeriesPoint[]>([]);

  useEffect(() => {
    const gen = () => {
      const now = Date.now();
      const base = 2400; // baseline USD/oz
      const points: SeriesPoint[] = Array.from({ length: 30 }).map((_, i) => {
        const t = new Date(now - (29 - i) * 3600_000).toISOString();
        const v = base + Math.sin(i / 3) * 20 + (Math.random() - 0.5) * 10;
        return { t, v: Math.round(v * 100) / 100 };
      });
      setSeries(points);
    };
    gen();
  }, []);

  const data = {
    labels: series.map((p) => new Date(p.t).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })),
    datasets: [
      {
        label: '??? (USD)',
        data: series.map((p) => p.v),
        tension: 0.35,
        borderColor: '#f4b400',
        backgroundColor: 'rgba(244, 180, 0, 0.15)',
        fill: true,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { rtl: true, textDirection: 'rtl' as const } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#aaa' } },
      y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#aaa' } },
    },
  } as const;

  return (
    <section id="chart" className="mx-auto max-w-6xl px-4 mt-6">
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gold">?????? ???? (?????)</h2>
          <span className="text-xs text-neutral-400">???? ???????</span>
        </div>
        <Line data={data} options={options} height={110} />
      </div>
    </section>
  );
}
