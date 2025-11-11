import { NextResponse } from 'next/server';
import { fetchGoldPrice } from '@/lib/gold';

export const revalidate = 30;

export async function GET() {
  try {
    const data = await fetchGoldPrice();
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: '??? ?? ?????? ????' }, { status: 500 });
  }
}
