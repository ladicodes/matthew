# 🚀 QUICK START - SmartTax NG Backend

## Start Server (30 seconds)

```bash
# Install dependencies
npm install

# Start server
npm start
```

Server will run on **http://localhost:8080**

---

## Test It Works (Copy & Paste)

### PowerShell:
```powershell
# 1. Health Check
Invoke-RestMethod http://localhost:8080/

# 2. Calculate Taxes
$body = @{
    revenue = 10000000
    profit = 3000000
    capitalGains = 500000
    digitalAssets = 200000
    turnover = 10000000
    businessType = "SME"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:8080/tax/calculate -Method POST -Body $body -ContentType "application/json"
```

### cURL (Git Bash):
```bash
# Calculate Taxes
curl -X POST http://localhost:8080/tax/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "revenue": 10000000,
    "profit": 3000000,
    "capitalGains": 500000,
    "digitalAssets": 200000,
    "turnover": 10000000,
    "businessType": "SME"
  }'
```

---

## Expected Response

```json
{
  "success": true,
  "data": {
    "breakdown": {
      "cit": {
        "amount": 900000,
        "rate": "30%",
        "description": "Company Income Tax"
      },
      "cgt": {
        "amount": 150000,
        "rate": "30%",
        "description": "Capital Gains Tax"
      },
      "developmentLevy": {
        "amount": 120000,
        "rate": "4%",
        "description": "Development Levy"
      },
      "digitalAssetsTax": {
        "amount": 60000,
        "rate": "30%",
        "description": "Digital Assets Tax"
      },
      "vat": {
        "amount": 750000,
        "rate": "7.5%",
        "description": "Value Added Tax"
      }
    },
    "totalTax": 1980000,
    "netProfit": 1720000,
    "effectiveTaxRate": 19.8
  },
  "blockchain": {
    "hash": "abc123...",
    "signature": "MOCK_abc123",
    "explorerUrl": "https://explorer.solana.com/tx/MOCK_abc123?cluster=devnet"
  }
}
```

---

## All Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | Health check + API info |
| `/tax/calculate` | POST | Calculate all taxes |
| `/tax/simulate` | POST | Investment simulation |
| `/explain` | POST | AI tax explanation |
| `/ussd` | POST | USSD handler |
| `/report` | POST | Save report |
| `/report/:id` | GET | Get report |

---

## Demo Script

1. **Start server**: `npm start`
2. **Run tests**: `.\test-api.ps1`
3. **Show judges**: Open browser to http://localhost:8080
4. **Explain features**: Point to IMPLEMENTATION.md

---

## ✅ IT JUST WORKS!

No configuration needed for demo. All features functional out of the box.
