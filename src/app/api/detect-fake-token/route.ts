import { NextRequest, NextResponse } from 'next/server';

const ENGINE_NAME = 'Web3Security Threat Engine';

export async function POST(req: NextRequest) {
  try {
    const { token, chainId } = await req.json();
    if (!token || !chainId) {
      return NextResponse.json({ status: 'fake', message: 'No token address or chainId provided.' }, { status: 400 });
    }
    const apiKey = process.env.GOPLUS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ status: 'fake', message: 'API key not configured.' }, { status: 500 });
    }
    // GoPlus API call
    const goPlusUrl = `https://api.gopluslabs.io/api/v1/token_security/${chainId}?contract_addresses=${token}`;
    let goPlusResult = null;
    try {
      const res = await fetch(goPlusUrl, {
        headers: {
          'API-KEY': apiKey,
        },
      });
      if (res.ok) {
        const data = await res.json();
        const addressKey = token.toLowerCase();
        if (data.result && data.result[addressKey]) {
          goPlusResult = data.result[addressKey];
        }
      }
    } catch (e) {}

    // honeypot.is v2 GET API call
    let honeypotResult = null;
    let honeypotSummary = null;
    try {
      const hpRes = await fetch(`https://api.honeypot.is/v2/IsHoneypot?address=${token}&chainID=${chainId}`);
      if (hpRes.ok) {
        const hpData = await hpRes.json();
        honeypotResult = hpData.honeypotResult;
        honeypotSummary = hpData.summary;
      }
    } catch (e) {}

    // Decision logic
    // 1. If GoPlus flags as honeypot/scam
    if (goPlusResult && (goPlusResult.is_honeypot === '1' || goPlusResult.scam === '1')) {
      return NextResponse.json({ status: 'fake', message: `${ENGINE_NAME}: Fake token detected! Remove immediately.`, engine: ENGINE_NAME });
    }
    // 2. If honeypot.is v2 flags as honeypot (summary.risk === 'honeypot' or honeypotResult.isHoneypot === true)
    if ((honeypotSummary && honeypotSummary.risk === 'honeypot') || (honeypotResult && honeypotResult.isHoneypot === true)) {
      return NextResponse.json({ status: 'fake', message: `${ENGINE_NAME}: Fake token detected! Remove immediately.`, engine: ENGINE_NAME });
    }
    // 3. If either has data and both say safe
    if (goPlusResult || honeypotResult) {
      return NextResponse.json({ status: 'safe', message: `${ENGINE_NAME}: Token is safe. No scam detected!`, engine: ENGINE_NAME });
    }
    // 4. If both have no data
    return NextResponse.json({ status: 'fake', message: `${ENGINE_NAME}: Unable to analyze token on this chain. No data available.`, engine: ENGINE_NAME }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ status: 'fake', message: 'Error analyzing token.' }, { status: 500 });
  }
} 