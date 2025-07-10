import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json({ status: 'fake', message: 'No token address provided.' }, { status: 400 });
    }
    const apiKey = process.env.GOPLUS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ status: 'fake', message: 'API key not configured.' }, { status: 500 });
    }
    // GoPlus API call
    const url = `https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses=${token}`;
    const res = await fetch(url, {
      headers: {
        'API-KEY': apiKey,
      },
    });
    if (!res.ok) {
      return NextResponse.json({ status: 'fake', message: 'Failed to fetch token info.' }, { status: 500 });
    }
    const data = await res.json();
    const addressKey = token.toLowerCase();
    if (data.result && data.result[addressKey]) {
      const risk = data.result[addressKey];
      if (risk.is_honeypot === '1' || risk.scam === '1') {
        return NextResponse.json({ status: 'fake', message: 'Fake token detected! Remove immediately.' });
      } else {
        return NextResponse.json({ status: 'safe', message: 'Token is safe. No scam detected!' });
      }
    } else {
      return NextResponse.json({ status: 'fake', message: 'Unable to analyze token. Please check the address.' }, { status: 400 });
    }
  } catch (e) {
    return NextResponse.json({ status: 'fake', message: 'Error analyzing token.' }, { status: 500 });
  }
} 