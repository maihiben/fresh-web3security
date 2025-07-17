import { NextRequest, NextResponse } from 'next/server';

// Remove hardcoded lists and import from files
import POPULAR_CRYPTO_BRANDS from './brands';
import SUSPICIOUS_KEYWORDS from './keywords';
import RISKY_TLDS from './tlds';
import WHITELIST from './whitelist';
import BLACKLIST from './blacklist';

// Helper to extract domain from URL
function extractDomain(url: string): string | null {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

// Helper: get TLD
function getTLD(domain: string): string {
  const parts = domain.split('.');
  return parts.length > 1 ? parts[parts.length - 1] : '';
}

// Helper: get subdomain
function getSubdomain(domain: string): string {
  const parts = domain.split('.');
  if (parts.length > 2) return parts.slice(0, -2).join('.');
  return '';
}

// Helper: punycode to Unicode (IDN)
function toUnicode(domain: string): string {
  try {
    return domain.startsWith('xn--') ? decodeURIComponent('http://' + domain).split('//')[1] : domain;
  } catch {
    return domain;
  }
}

// Helper: simple string similarity (Levenshtein distance or substring)
function looksLikeBrand(domain: string): { match: string, type: string } | null {
  const d = domain.toLowerCase();
  for (const brand of POPULAR_CRYPTO_BRANDS) {
    if (d === brand + '.com' || d === brand) return { match: brand, type: 'exact' };
    if (d.includes(brand)) return { match: brand, type: 'substring' };
    // Check for IDN homograph (punycode)
    if (toUnicode(d).includes(brand)) return { match: brand, type: 'idn' };
  }
  return null;
}

// Helper: check for suspicious keywords
function hasSuspiciousKeyword(domain: string): string[] {
  const d = domain.toLowerCase();
  return SUSPICIOUS_KEYWORDS.filter((kw) => d.includes(kw));
}

// Helper: check for risky TLD
function isRiskyTLD(tld: string): boolean {
  return RISKY_TLDS.includes(tld.toLowerCase());
}

// Helper: check for brand in subdomain
function brandInSubdomain(domain: string): string | null {
  const sub = getSubdomain(domain).toLowerCase();
  for (const brand of POPULAR_CRYPTO_BRANDS) {
    if (sub.includes(brand)) return brand;
  }
  return null;
}

// Helper: Try multiple API Ninjas keys for WHOIS
const WHOIS_KEYS = [
  process.env.API_NINJAS_KEY,
  process.env.API_NINJAS_KEY_2,
  process.env.API_NINJAS_KEY_3
].filter(Boolean);

async function getDomainAge(domain: string): Promise<{ ageDays?: number, createdAt?: string | null, registrar?: string, error?: string }> {
  let lastError = '';
  for (const apiKey of WHOIS_KEYS) {
    try {
      const headers: Record<string, string> = {};
      if (apiKey) headers['X-Api-Key'] = apiKey;
      const res = await fetch(`https://api.api-ninjas.com/v1/whois?domain=${domain}`, {
        headers
      });
      if (!res.ok) {
        lastError = `WHOIS API error: ${res.status}`;
        continue;
      }
      const data = await res.json();
      if (data && data.creation_date) {
        let createdAt = data.creation_date;
        let createdDate: Date | null = null;
        if (typeof createdAt === 'number') {
          createdDate = new Date(createdAt > 1e12 ? createdAt : createdAt * 1000);
        } else if (typeof createdAt === 'string') {
          const tryDate = new Date(createdAt);
          if (!isNaN(tryDate.getTime())) createdDate = tryDate;
        }
        if (createdDate && !isNaN(createdDate.getTime())) {
          createdAt = createdDate.toISOString().slice(0, 10);
        } else {
          createdAt = null;
        }
        const now = new Date();
        const ageDays = createdDate ? Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)) : undefined;
        return { ageDays, createdAt, registrar: data.registrar_name };
      }
      // If API returns no creation_date, treat as not registered
      return { error: 'not_registered' };
    } catch (e: any) {
      lastError = e?.message || 'WHOIS lookup failed.';
      continue;
    }
  }
  // If all keys fail, return a specific error
  return { error: 'whois_api_error' };
}

// Check against CryptoScamDB (MetaMask eth-phishing-detect)
async function checkCryptoScamDB(domain: string): Promise<'phishing' | null> {
  try {
    const res = await fetch('https://raw.githubusercontent.com/MetaMask/eth-phishing-detect/master/src/config.json');
    const data = await res.json();
    const blacklist = data.blacklist || {};
    if (blacklist[domain]) return 'phishing';
    return null;
  } catch {
    return null;
  }
}

// --- Additional blocklist feeds integration ---
let phishfortJsonCache: { list: Set<string>, fetchedAt: number } | null = null;
let mycryptoHudsonCache: { list: Set<string>, fetchedAt: number } | null = null;
let chainabuseBlacklistCache: { list: Set<string>, fetchedAt: number } | null = null;

async function getPhishFortJsonList(): Promise<Set<string>> {
  const now = Date.now();
  if (phishfortJsonCache && now - phishfortJsonCache.fetchedAt < ONE_HOUR) {
    return phishfortJsonCache.list;
  }
  try {
    const res = await fetch('https://raw.githubusercontent.com/phishfort/phishfort-lists/master/blacklists/domains.json');
    const data = await res.json();
    const set = new Set(Array.isArray(data) ? data : []);
    phishfortJsonCache = { list: set, fetchedAt: now };
    return set;
  } catch (e) {
    console.error('[PhishingSiteDetector] Failed to fetch PhishFort JSON blocklist', e);
    return new Set();
  }
}

async function checkPhishFortJson(domain: string): Promise<'phishing' | null> {
  const list = await getPhishFortJsonList();
  return list.has(domain) ? 'phishing' : null;
}

async function getMyCryptoHudsonList(): Promise<Set<string>> {
  const now = Date.now();
  if (mycryptoHudsonCache && now - mycryptoHudsonCache.fetchedAt < ONE_HOUR) {
    return mycryptoHudsonCache.list;
  }
  try {
    const res = await fetch('https://raw.githubusercontent.com/MyCrypto/hudson/master/blacklists/domains.json');
    const data = await res.json();
    const set = new Set(Array.isArray(data) ? data : []);
    mycryptoHudsonCache = { list: set, fetchedAt: now };
    return set;
  } catch (e) {
    console.error('[PhishingSiteDetector] Failed to fetch MyCrypto Hudson blocklist', e);
    return new Set();
  }
}

async function checkMyCryptoHudson(domain: string): Promise<'phishing' | null> {
  const list = await getMyCryptoHudsonList();
  return list.has(domain) ? 'phishing' : null;
}

async function getChainabuseBlacklist(): Promise<Set<string>> {
  const now = Date.now();
  if (chainabuseBlacklistCache && now - chainabuseBlacklistCache.fetchedAt < ONE_HOUR) {
    return chainabuseBlacklistCache.list;
  }
  if (!process.env.CHAINABUSE_API_KEY) return new Set();
  try {
    const res = await fetch('https://chainabuse.com/api/downloads/blacklist', {
      headers: { 'x-api-key': process.env.CHAINABUSE_API_KEY }
    });
    if (!res.ok) throw new Error('Failed to fetch Chainabuse downloadable blacklist');
    const data = await res.json();
    // The format is an array of domains
    const set = new Set(Array.isArray(data) ? data : []);
    chainabuseBlacklistCache = { list: set, fetchedAt: now };
    return set;
  } catch (e) {
    console.error('[PhishingSiteDetector] Failed to fetch Chainabuse downloadable blacklist', e);
    return new Set();
  }
}

async function checkChainabuseBlacklist(domain: string): Promise<'phishing' | null> {
  const list = await getChainabuseBlacklist();
  return list.has(domain) ? 'phishing' : null;
}

// Update checkChainabuse to use new v0 endpoint
async function checkChainabuse(domain: string): Promise<'phishing' | 'suspicious' | null> {
  try {
    const headers: Record<string, string> = {};
    if (process.env.CHAINABUSE_API_KEY) {
      headers['x-api-key'] = process.env.CHAINABUSE_API_KEY;
    }
    const res = await fetch(`https://api.chainabuse.com/v0/reports?domain=${encodeURIComponent(domain)}`, { headers });
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      if (data.some((r: any) => r.category && r.category.toLowerCase().includes('phishing'))) return 'phishing';
      return 'suspicious';
    }
    return null;
  } catch {
    return null;
  }
}

// --- PhishFort and ScamSniffer blocklist integration ---

// Simple in-memory cache for blocklists
let phishfortCache: { list: Set<string>, fetchedAt: number } | null = null;
let scamsnifferCache: { list: Set<string>, fetchedAt: number } | null = null;
const ONE_HOUR = 60 * 60 * 1000;

async function getPhishFortList(): Promise<Set<string>> {
  const now = Date.now();
  if (phishfortCache && now - phishfortCache.fetchedAt < ONE_HOUR) {
    return phishfortCache.list;
  }
  try {
    // PhishFort blocklist (CSV, one domain per line)
    const res = await fetch('https://blocklist.phishfort.com/domains.txt');
    const text = await res.text();
    const domains = text.split('\n').map(line => line.trim()).filter(Boolean);
    const set = new Set(domains);
    phishfortCache = { list: set, fetchedAt: now };
    return set;
  } catch (e) {
    console.error('[PhishingSiteDetector] Failed to fetch PhishFort blocklist', e);
    return new Set();
  }
}

async function checkPhishFort(domain: string): Promise<'phishing' | null> {
  const list = await getPhishFortList();
  return list.has(domain) ? 'phishing' : null;
}

async function getScamSnifferList(): Promise<Set<string>> {
  const now = Date.now();
  if (scamsnifferCache && now - scamsnifferCache.fetchedAt < ONE_HOUR) {
    return scamsnifferCache.list;
  }
  try {
    // ScamSniffer blocklist (TXT, one domain per line)
    const res = await fetch('https://raw.githubusercontent.com/scamsniffer/scam-database/main/blacklist/domains.txt');
    const text = await res.text();
    const domains = text.split('\n').map(line => line.trim()).filter(Boolean);
    const set = new Set(domains);
    scamsnifferCache = { list: set, fetchedAt: now };
    return set;
  } catch (e) {
    console.error('[PhishingSiteDetector] Failed to fetch ScamSniffer blocklist', e);
    return new Set();
  }
}

async function checkScamSniffer(domain: string): Promise<'phishing' | null> {
  const list = await getScamSnifferList();
  return list.has(domain) ? 'phishing' : null;
}

// Helper: Levenshtein distance
function levenshtein(a: string, b: string): number {
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] = a[i - 1] === b[j - 1]
        ? matrix[i - 1][j - 1]
        : Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
    }
  }
  return matrix[a.length][b.length];
}

export async function POST(req: NextRequest) {
  const debugLog: string[] = [];
  const { url } = await req.json();
  if (!url) return NextResponse.json({ status: 'error', message: 'No URL provided.' }, { status: 400 });

  const domain = extractDomain(url);
  if (!domain) return NextResponse.json({ status: 'error', message: 'Invalid URL.' }, { status: 400 });

  debugLog.push(`Domain: ${domain}`);

  // Dynamically add the current app's domain to the whitelist
  let dynamicWhitelist = [...WHITELIST];
  const appDomain = req.headers.get('host')?.replace(/^www\./, '');
  if (appDomain && !dynamicWhitelist.includes(appDomain)) {
    dynamicWhitelist.push(appDomain);
  }

  // --- Blacklist Checks ---
  const scamdbResult = await checkCryptoScamDB(domain);
  // Fetch raw Chainabuse report data
  let chainabuseRawReport: any = null;
  try {
    const headers: Record<string, string> = {};
    if (process.env.CHAINABUSE_API_KEY) {
      headers['x-api-key'] = process.env.CHAINABUSE_API_KEY;
    }
    const res = await fetch(`https://api.chainabuse.com/v0/reports?domain=${encodeURIComponent(domain)}`, { headers });
    if (res.ok) {
      chainabuseRawReport = await res.json();
    }
  } catch {}
  const chainabuseResult = await checkChainabuse(domain);
  const chainabuseBlacklistResult = await checkChainabuseBlacklist(domain);
  const phishfortResult = await checkPhishFort(domain);
  const phishfortJsonResult = await checkPhishFortJson(domain);
  const mycryptoHudsonResult = await checkMyCryptoHudson(domain);
  const scamsnifferResult = await checkScamSniffer(domain);
  debugLog.push(`CryptoScamDB: ${scamdbResult}`);
  debugLog.push(`Chainabuse: ${chainabuseResult}`);
  debugLog.push(`Chainabuse Download: ${chainabuseBlacklistResult}`);
  debugLog.push(`PhishFort: ${phishfortResult}`);
  debugLog.push(`PhishFort JSON: ${phishfortJsonResult}`);
  debugLog.push(`MyCrypto Hudson: ${mycryptoHudsonResult}`);
  debugLog.push(`ScamSniffer: ${scamsnifferResult}`);

  // --- Heuristic Checks ---
  const tld = getTLD(domain);
  const subdomain = getSubdomain(domain);
  const unicodeDomain = toUnicode(domain);
  debugLog.push(`Unicode domain: ${unicodeDomain}`);
  const isIDN = domain.startsWith('xn--');
  if (isIDN) debugLog.push('Domain is IDN (punycode)');

  // Fuzzy lookalike detection (Levenshtein distance <= 2)
  let fuzzyLookalike: { match: string, type: string, distance: number, compared: string } | null = null;
  for (const brand of POPULAR_CRYPTO_BRANDS) {
    const dists = [
      { str: domain.toLowerCase(), type: 'raw' },
      { str: unicodeDomain.toLowerCase(), type: 'unicode' }
    ].map(({ str, type }) => ({
      type,
      distance: levenshtein(str.replace(/\..*$/, ''), brand),
      compared: str.replace(/\..*$/, '')
    }));
    for (const d of dists) {
      // Remove Levenshtein debug logs from debugLog/analysisLog
      if (d.distance <= 2) {
        fuzzyLookalike = { match: brand, type: d.type, distance: d.distance, compared: d.compared };
        // No debugLog push for fuzzy lookalike
        break;
      }
    }
    if (fuzzyLookalike) break;
  }

  const suspiciousKeywords = hasSuspiciousKeyword(domain);
  if (suspiciousKeywords.length > 0) debugLog.push(`Suspicious keywords: ${suspiciousKeywords.join(', ')}`);
  const riskyTld = isRiskyTLD(tld);
  if (riskyTld) debugLog.push(`Risky TLD: .${tld}`);
  const brandSub = brandInSubdomain(domain);
  if (brandSub) debugLog.push(`Brand in subdomain: ${brandSub}`);

  // WHOIS API key check
  if (!process.env.API_NINJAS_KEY) {
    // Only log on the server, do not push to debugLog or analysisLog
    console.error('[PhishingSiteDetector] WHOIS API key is missing. Set API_NINJAS_KEY in your environment.');
  }

  let domainAgeInfo: { ageDays?: number, createdAt?: string | null, registrar?: string, error?: string } = {};
  if (process.env.API_NINJAS_KEY) {
    domainAgeInfo = await getDomainAge(domain);
    debugLog.push(`Domain age info: ${JSON.stringify(domainAgeInfo)}`);
  }

  // WHOIS failure or unregistered domain logic
  if (domainAgeInfo && domainAgeInfo.error) {
    debugLog.push('WHOIS lookup failed or domain is unregistered.');
    console.error('[PhishingSiteDetector] WHOIS lookup failed or domain is unregistered.', domainAgeInfo.error);
    let message = '';
    let riskScore = 0;
    let riskLevel = 'low';
    let scoreBreakdown = {};
    if (domainAgeInfo.error === 'not_registered') {
      message = 'Domain is not registered or registration details could not be found. This is a strong indicator of a phishing or fake site.';
      riskScore = 100;
      riskLevel = 'high';
      scoreBreakdown = { whois: 100 };
    } else {
      message = 'Domain registration details could not be determined (API error or rate limit). This does not mean the domain is unregistered.';
      riskScore = 0;
      riskLevel = 'low';
      scoreBreakdown = { whois_api_error: 0 };
    }
    const analysisLog: string[] = debugLog;
    const report = {
      riskScore,
      riskLevel,
      scoreBreakdown,
      status: riskLevel,
      message,
      domain,
      unicodeDomain,
      tld,
      subdomain,
      blacklist: {
        scamdb: scamdbResult,
        chainabuse: chainabuseResult,
        phishfort: phishfortResult,
        scamsniffer: scamsnifferResult,
      },
      heuristics: {
        isIDN,
        fuzzyLookalike,
        suspiciousKeywords,
        riskyTld,
        brandInSubdomain: brandSub,
        domainAge: domainAgeInfo,
      },
      checkedAt: new Date().toISOString(),
      analysisLog,
    };
    console.log('[PhishingSiteDetector]', JSON.stringify(report, null, 2));
    return NextResponse.json(report);
  }

  // --- Whitelist/Blacklist logic ---
  if (dynamicWhitelist.includes(domain)) {
    const analysisLog: string[] = debugLog;
    analysisLog.push('Domain is in WHITELIST (including current deployment domain). Marked as trusted.');
    const report = {
      riskScore: 0,
      riskLevel: 'low',
      scoreBreakdown: { whitelist: 0 },
      status: 'low',
      message: 'This domain is whitelisted as trusted.',
      domain,
      unicodeDomain,
      tld,
      subdomain,
      blacklist: {
        scamdb: scamdbResult,
        chainabuse: chainabuseResult,
        phishfort: phishfortResult,
        scamsniffer: scamsnifferResult,
      },
      heuristics: {
        isIDN,
        fuzzyLookalike,
        suspiciousKeywords,
        riskyTld,
        brandInSubdomain: brandSub,
        domainAge: domainAgeInfo,
      },
      checkedAt: new Date().toISOString(),
      analysisLog,
    };
    console.log('[PhishingSiteDetector]', JSON.stringify(report, null, 2));
    return NextResponse.json(report);
  }
  if (BLACKLIST.includes(domain)) {
    const analysisLog: string[] = debugLog;
    analysisLog.push('Domain is in BLACKLIST. Marked as dangerous.');
    const report = {
      riskScore: 100,
      riskLevel: 'high',
      scoreBreakdown: { blacklist: 100 },
      status: 'high',
      message: 'This domain is blacklisted as dangerous.',
      domain,
      unicodeDomain,
      tld,
      subdomain,
      blacklist: {
        scamdb: scamdbResult,
        chainabuse: chainabuseResult,
        phishfort: phishfortResult,
        scamsniffer: scamsnifferResult,
      },
      heuristics: {
        isIDN,
        fuzzyLookalike,
        suspiciousKeywords,
        riskyTld,
        brandInSubdomain: brandSub,
        domainAge: domainAgeInfo,
      },
      checkedAt: new Date().toISOString(),
      analysisLog,
    };
    console.log('[PhishingSiteDetector]', JSON.stringify(report, null, 2));
    return NextResponse.json(report);
  }

  // Refined lookalike logic: only flag as lookalike if not an exact match
  let isExactBrandMatch = false;
  for (const brand of POPULAR_CRYPTO_BRANDS) {
    if (
      (domain.toLowerCase() === brand + '.com' || domain.toLowerCase() === brand) ||
      (unicodeDomain.toLowerCase() === brand + '.com' || unicodeDomain.toLowerCase() === brand)
    ) {
      isExactBrandMatch = true;
      break;
    }
  }
  // --- Risk Scoring ---
  let riskScore = 0;
  const scoreBreakdown: { [key: string]: number } = {};
  // Blacklist
  if (
    scamdbResult === 'phishing' ||
    phishfortResult === 'phishing' ||
    phishfortJsonResult === 'phishing' ||
    mycryptoHudsonResult === 'phishing' ||
    scamsnifferResult === 'phishing' ||
    chainabuseBlacklistResult === 'phishing'
  ) {
    riskScore = 100; scoreBreakdown['blacklist_phishing'] = 100;
  } else if (chainabuseResult === 'phishing') {
    riskScore = 100; scoreBreakdown['blacklist_phishing'] = 100;
  } else if (chainabuseResult === 'suspicious') {
    riskScore += 60; scoreBreakdown['blacklist_suspicious'] = 60;
  }
  // Heuristics
  if (isIDN) { riskScore += 30; scoreBreakdown['idn'] = 30; }
  if (fuzzyLookalike && !isExactBrandMatch) { riskScore += 40; scoreBreakdown['lookalike'] = 40; }
  if (suspiciousKeywords.length > 0) { riskScore += 20; scoreBreakdown['keywords'] = 20; }
  if (riskyTld) { riskScore += 20; scoreBreakdown['tld'] = 20; }
  if (brandSub) { riskScore += 20; scoreBreakdown['brand_subdomain'] = 20; }
  if (typeof domainAgeInfo.ageDays === 'number' && domainAgeInfo.ageDays < 30) { riskScore += 20; scoreBreakdown['domain_age'] = 20; }
  // Cap at 100
  if (riskScore > 100) riskScore = 100;
  // Risk level by score
  let riskLevel = 'low';
  if (riskScore >= 61) riskLevel = 'high';
  else if (riskScore >= 31) riskLevel = 'medium';
  // Message
  let message = '';
  if (riskScore === 100) message = 'This site is blacklisted as phishing! Do NOT connect your wallet.';
  else if (riskLevel === 'high') message = 'This site is high risk based on multiple warning signs. Avoid connecting your wallet.';
  else if (riskLevel === 'medium') message = 'This site has some suspicious characteristics. Proceed with caution!';
  else message = 'No major red flags detected, but always use caution. No tool can guarantee safety—this is a risk estimate based on public data and heuristics.';
  // --- Detailed Report ---
  const analysisLog: string[] = debugLog;
  const report = {
    riskScore,
    riskLevel,
    scoreBreakdown,
    status: riskLevel,
    message,
    domain,
    unicodeDomain,
    tld,
    subdomain,
    blacklist: {
      scamdb: scamdbResult,
      chainabuse: chainabuseResult,
      chainabuseDownload: chainabuseBlacklistResult,
      phishfort: phishfortResult,
      phishfortJson: phishfortJsonResult,
      mycryptoHudson: mycryptoHudsonResult,
      scamsniffer: scamsnifferResult,
    },
    heuristics: {
      isIDN,
      fuzzyLookalike,
      suspiciousKeywords,
      riskyTld,
      brandInSubdomain: brandSub,
      domainAge: domainAgeInfo,
    },
    checkedAt: new Date().toISOString(),
    chainabuseReport: chainabuseRawReport,
    analysisLog,
  };
  // Remove analysisLog from the raw API data (Technical Details) in the response
  const { analysisLog: reportAnalysisLog, ...reportWithoutLog } = report;
  // Server-side log
  console.log('[PhishingSiteDetector]', JSON.stringify(report, null, 2));
  // Send analysisLog as a separate field, not inside the main report object
  return NextResponse.json({ ...reportWithoutLog, analysisLog: reportAnalysisLog });
} 