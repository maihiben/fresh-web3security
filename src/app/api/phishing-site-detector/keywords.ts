const SUSPICIOUS_KEYWORDS = [
  // Account-related  
  'login', 'signin', 'signup', 'verify', 'auth', 'authentication',  
  'recovery', 'restore', 'password', 'reset', 'account', 'access',  
  'credentials', 'kyc', 'identity', 'confirmation', 'validation',  

  // Wallet & Security  
  'wallet', 'privatekey', 'seed', 'mnemonic', 'keystore', 'backup',  
  'phrase', 'passphrase', 'secret', 'security', 'authorize', 'approve',  
  'connect', 'disconnect', 'session', 'revoke', 'permission',  

  // Fake Rewards & Scams  
  'airdrop', 'giveaway', 'bonus', 'free', 'drop', 'reward', 'prize',  
  'claim', 'distribution', 'whitelist', 'early', 'exclusive', 'limited',  
  'congratulations', 'winner', 'selected', 'eligibility', 'participation',  

  // Urgency & Fake Updates  
  'update', 'critical', 'important', 'alert', 'notice', 'action',  
  'required', 'immediately', 'expire', 'deadline', 'lastchance',  
  'maintenance', 'suspension', 'termination', 'reactivate',  

  // Fake Support & Impersonation  
  'support', 'help', 'assistance', 'customer', 'service', 'contact',  
  'team', 'admin', 'moderator', 'official', 'staff', 'representative',  

  // Phishing & Deception  
  'click', 'link', 'redirect', 'form', 'submit', 'confirm',  
  'survey', 'register', 'apply', 'complete', 'check', 'validate',  
  'review', 'accept', 'agree', 'proceed', 'continue', 'unlock',  

  // Fake Transactions  
  'transaction', 'gas', 'fee', 'payment', 'refund', 'deposit',  
  'withdraw', 'transfer', 'migration', 'swap', 'bridge', 'convert',  

  // Other Red Flags  
  'suspicious', 'urgent', 'secret', 'hidden', 'exclusive', 'beta',  
  'test', 'trial', 'vip', 'earlyaccess', 'promo', 'discount', 'offer'  
];  

export default SUSPICIOUS_KEYWORDS;  