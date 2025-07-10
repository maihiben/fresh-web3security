npx create-next-app@latest . --typescript --app --eslint --tailwind --src-dir --import-alias "@/*"



curl -H "API-KEY: 1XR8wSTHgftBpQmfvAm1" "https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses=0x3893b9422Cd5D70a81eDeFfe3d5A1c6A978310BB"


curl -X POST http://localhost:3000/api/detect-fake-token -H "Content-Type: application/json" -d '{"token":"0x5CCB99Da306b132e9A429f5a0467e23B498191F0","chainId":56}'

curl "https://api.honeypot.is/v2/TokenIsHoneypot?address=0x5CCB99Da306b132e9A429f5a0467e23B498191F0&chainID=56"

curl https://api.honeypot.is/v2/IsHoneypot -d "address=0x5CCB99Da306b132e9A429f5a0467e23B498191F0" -d "chainID=56"

   curl "https://api.honeypot.is/v2/IsHoneypot?address=0x5CCB99Da306b132e9A429f5a0467e23B498191F0&chainID=56"