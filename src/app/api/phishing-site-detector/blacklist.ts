const BLACKLIST: string[] = [
    // Fake Wallet/Exchange Phishing (Common Targets)
    'myetherwallet.pro',
    'metamask-airdrop.com',
    'binance-airdrops.com',
    'coinbase-rewards.com',
    'ledger-live.app',
    'trustwallet.gifts',
    'uniswap-airdrop.xyz',
    'pancakeswap-giveaway.com',
    'opensea-mints.com',
    'phantomwallet.help',
  
    // Fake Airdrop/Giveaway Scams
    'eth-giveaway.xyz',
    'bitcoin-free.site',
    'solana-rewards.cc',
    'claim-crypto.tk',
    'mint-arbitrum.com',
    'layerzero-airdrop.pro',
    'starknet-drop.xyz',
    'cosmos-gifts.com',
    'aptos-rewards.net',
    'sui-airdrop.live',
  
    // Cloned/Copycat Scam Sites

    'ledgervault.com',
    'trezor-wallet.app',
    'kuc0in.com',   // Zero instead of 'o'
    'okx-defi.com', // Fake OKX subdomain
    '1inch-wallet.com',
  
    // Ponzi/High-Yield Scams
    'eth2staking.com',
    'bitcoin-doubler.com',
    'usdt-miner.pro',
    'solana-earn.xyz',
    'cloud-mining.vip',
    'defi-miningpool.com',
    'compound-rewards.com',
    'yearn-finance.app',
  
    // Malware/Stealer Domains
    'crypto-stealer.xyz',
    'wallet-connect.pro',
    'seedphrase-recovery.com',
    'keystore-decrypt.com',
    'metamask-update.net',
    'exodus-fix.com',
  
    // Fake Support/Recovery Scams
    'metamask-support.com',
    'ledger-help.com',
    'coinbase-support.live',
    'trustwallet-recovery.xyz',
    'binance-helpdesk.com',
  
    // Known Scam TLDs (Full Domains)
    'free-crypto.gq',
    'claim-nft.tk',
    'wallet-auth.cf',
    'uniswap-login.ml',
    'coinbase-verify.ga',
  
    // Recent Scam Campaigns (2023-2024)
    'arbitrum-foundation.com',
    'starknet-token.com',
    'zksync-rewards.xyz',
    'blur-nft.claims',
    'optimism-airdrop.website',
    'manta-network.gifts',
    'wormhole-airdrop.com',
    'jupiter-exchange.app',
  
    // Fake NFT/Minting Scams
    'yuga-labs.xyz',
    'azuki-mint.com',
    'pudgy-penguins.club',
    'degods-claim.xyz',
    'clonex-mint.art',
  
    // Additional Patterns
    'secure-walletconnect.com',
    'auth-metamask.com',
    'update-ledgerlive.com',
    'verify-coinbase.com',
    'restore-trustwallet.com',
  
    // High-Risk Free Domains
    'defi-rewards.icu',
    'nft-giveaway.pw',
    'crypto-bonus.cyou',
    'wallet-sync.gdn',
    'staking-rewards.lol',
  
    // Common Typos/Domain Variations
    'binancee.com',
    'coinbasse.com',
    'metmask.com',
    'ledgerr.com',
    'krakken.com',
  
    // Add more from live threat feeds...
  ];
  
  export default BLACKLIST;