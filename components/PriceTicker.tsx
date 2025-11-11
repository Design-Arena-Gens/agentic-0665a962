"use client";
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

type PriceData = {
  symbol: string;
  priceUsd: number;
  usdToIrr?: number;
  updatedAt: string;
};

export default function PriceTicker() {
  const [data, setData] = useState<PriceData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch('/api/prices', { next: { revalidate: 30 } });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || '??? ?? ?????? ????');
        if (active) setData(json);
      } catch (e: any) {
        if (active) setError(e.message);
      }
    };
    load();
    const id = setInterval(load, 60_000);
    return () => { active = false; clearInterval(id); };
  }, []);

  const irr = (value: number, rate?: number) => rate ? Math.round(value * rate) : null;

  return (
    <section id="prices" className="mx-auto max-w-6xl px-4 mt-6 grid sm:grid-cols-3 gap-4">
      <div className="card">
        <div className="text-neutral-400 text-sm">??? ????? ??? (XAU)</div>
        <div className="mt-2 text-2xl font-bold">{data ? `$ ${data.priceUsd.toLocaleString()}` : '?'}</div>
        <div className="mt-1 text-xs text-neutral-400">{data ? `???????????: ${dayjs(data.updatedAt).format('HH:mm')}` : error ? error : '??????...'}</div>
      </div>
      <div className="card">
        <div className="text-neutral-400 text-sm">???? ?? ???? (??????)</div>
        <div className="mt-2 text-2xl font-bold">{data?.usdToIrr ? `${irr(data.priceUsd, data.usdToIrr)?.toLocaleString()} ????` : '?'}</div>
        <div className="mt-1 text-xs text-neutral-400">??? USD?IRR ??????</div>
      </div>
      <div className="card">
        <div className="text-neutral-400 text-sm">??? ?? ???? (??????)</div>
        <div className="mt-2 text-2xl font-bold">
          {data?.usdToIrr ? `${Math.round((data.priceUsd / 31.1035) * 0.916 * data.usdToIrr).toLocaleString()} ????` : '?'}
        </div>
        <div className="mt-1 text-xs text-neutral-400">?? ???? ????? ??? ? ????</div>
      </div>
    </section>
  );
}
