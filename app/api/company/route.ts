import { NextResponse } from 'next/server';
import { getStockInfo } from '@/lib/stockInfo';

export async function GET(req: Request) {
    try {
        // Get the symbol from the URL query parameters
        const { searchParams } = new URL(req.url);
        const symbol = searchParams.get('symbol');

        console.log('symbol', symbol);

        if (!symbol) {
            return NextResponse.json({ error: 'Symbol parameter is required' }, { status: 400 });
        }

        // Get stock information
        const stockInfo = await getStockInfo(symbol);

        if (!stockInfo) {
            return NextResponse.json({ error: 'Company not found' }, { status: 404 });
        }
console.log('stockInfo', stockInfo);
        return NextResponse.json(stockInfo);

    } catch (error) {
        console.error('Error fetching company information:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}