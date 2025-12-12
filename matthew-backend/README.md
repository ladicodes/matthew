# SmartTax NG - Nigerian Tax Compliance Suite

**Web3 + AI tax compliance platform for Nigerian businesses under 2025 tax reforms**

## 🚀 Features

✅ **AI Tax Calculator** - Accurately calculates CIT (30%), CGT (30%), VAT (7.5%), Development Levy (4%), Digital Assets Tax  
✅ **Investment Simulator** - Multi-year ROI projections with tax impact  
✅ **Multi-Language AI** - Explanations in English, Pidgin, Yoruba, Igbo, Hausa  
✅ **Blockchain Audit Trail** - Immutable reports on Solana  
✅ **USSD Access** - Low-tech access for informal sector  
✅ **Supabase Database** - Secure report storage  

## 📋 2025 Nigerian Tax Reforms Covered

- **30% Capital Gains Tax** on asset sales
- **15% Minimum Effective Tax** for large companies
- **4% Development Levy** on assessable profits
- **30% Digital Assets Tax** on crypto/digital gains
- **7.5% VAT** on taxable supplies
- **30% Company Income Tax** on profits

## 🛠 Tech Stack

- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-3.5
- **Blockchain**: Solana
- **USSD**: Standard USSD gateway integration

## 📦 Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
# - SUPABASE_URL and SUPABASE_KEY from https://supabase.com
# - OPENAI_API_KEY from https://platform.openai.com
# - SOLANA_RPC and SOLANA_KEYPAIR_BASE58 (optional for demo)

# Run the server
npm start

# Development mode with auto-reload
npm run dev
```

## 🗄 Database Setup

Create a `reports` table in your Supabase database:

```sql
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hash TEXT NOT NULL,
  data JSONB NOT NULL,
  blockchain_signature TEXT,
  blockchain_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reports_hash ON reports(hash);
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);
```

## 🔌 API Endpoints

### 1. Calculate Taxes
```http
POST /tax/calculate
Content-Type: application/json

{
  "revenue": 10000000,
  "profit": 3000000,
  "capitalGains": 500000,
  "digitalAssets": 200000,
  "turnover": 10000000,
  "businessType": "SME"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "breakdown": {
      "cit": { "amount": 900000, "rate": "30%", "description": "Company Income Tax" },
      "cgt": { "amount": 150000, "rate": "30%", "description": "Capital Gains Tax" },
      "developmentLevy": { "amount": 120000, "rate": "4%", "description": "Development Levy" },
      "digitalAssetsTax": { "amount": 60000, "rate": "30%", "description": "Digital Assets Tax" },
      "vat": { "amount": 750000, "rate": "7.5%", "description": "Value Added Tax" }
    },
    "totalTax": 1980000,
    "netProfit": 1720000,
    "effectiveTaxRate": 19.8
  },
  "reportId": "uuid-here",
  "blockchain": {
    "success": true,
    "hash": "sha256-hash",
    "signature": "solana-signature",
    "explorerUrl": "https://explorer.solana.com/tx/..."
  }
}
```

### 2. Simulate Investment Scenarios
```http
POST /tax/simulate
Content-Type: application/json

{
  "initialInvestment": 5000000,
  "revenue": 10000000,
  "profit": 3000000,
  "capitalGains": 500000,
  "digitalAssets": 0,
  "turnover": 10000000,
  "businessType": "SME",
  "years": 5,
  "growthRate": 0.15,
  "inflationRate": 0.15
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "projections": [
      {
        "year": 1,
        "revenue": 11500000,
        "grossProfit": 4025000,
        "totalTax": 2277000,
        "netProfit": 1748000,
        "cumulativeNetProfit": -3252000,
        "roi": -65.04,
        "breakEven": false
      }
      // ... years 2-5
    ],
    "summary": {
      "totalNetProfit": 8500000,
      "finalROI": 170,
      "breakEvenYear": 3,
      "recommendedAction": "INVEST"
    }
  }
}
```

### 3. AI Tax Explanation
```http
POST /explain
Content-Type: application/json

{
  "revenue": 10000000,
  "profit": 3000000,
  "capitalGains": 500000,
  "digitalAssets": 200000,
  "turnover": 10000000,
  "businessType": "SME",
  "language": "pidgin"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "taxCalculation": { ... },
    "explanation": "Based on 2025 Nigerian tax law, na so your tax be: ...",
    "language": "pidgin"
  }
}
```

### 4. USSD Access
```http
POST /ussd
Content-Type: application/json

{
  "sessionId": "session123",
  "phoneNumber": "+2348012345678",
  "text": "1*50000*20000"
}
```

**Response:**
```
END Your Annual Tax:
Revenue: ₦600,000
Profit: ₦360,000

Taxes:
CIT: ₦108,000
VAT: ₦45,000
Total Tax: ₦153,000

Net Profit: ₦207,000

Visit www.smarttax.ng for details
```

### 5. Get Report
```http
GET /report/:id
```

**Response:**
```json
{
  "success": true,
  "report": {
    "id": "uuid",
    "hash": "sha256-hash",
    "data": { ... },
    "blockchain_signature": "solana-signature",
    "blockchain_url": "https://explorer.solana.com/tx/...",
    "created_at": "2025-12-11T..."
  }
}
```

## 🌍 Multi-Language Support

Supported languages for AI explanations:
- `english` - Standard English
- `pidgin` - Nigerian Pidgin
- `yoruba` - Yoruba language
- `igbo` - Igbo language
- `hausa` - Hausa language

## 🔐 Security Features

- ✅ Input validation on all endpoints
- ✅ SHA-256 hashing for data integrity
- ✅ Blockchain immutability via Solana
- ✅ CORS enabled for frontend integration
- ✅ Error handling and logging

## 📱 USSD Flow

```
*XXX#
└── Welcome to SmartTax NG
    ├── 1. Calculate Simple Tax
    │   ├── Enter monthly revenue
    │   ├── Enter monthly expenses
    │   └── [Shows tax breakdown]
    ├── 2. Get Tax Help (English)
    ├── 3. Get Tax Help (Pidgin)
    ├── 4. Check Tax Deadlines
    └── 0. Exit
```

## 🎯 Value Proposition

**For SMEs**: ₦5,000 - ₦20,000/month  
**For Large Companies**: ₦200,000 - ₦1,000,000/month  
**For Investors**: ₦2,000 - ₦10,000/month  
**For Informal Sector**: ₦200 - ₦1,000 via USSD  

## 🏆 Hackathon Highlights

✨ **Real-World Impact** - Addresses fresh 2025 Nigerian tax reforms  
✨ **Financial Inclusion** - USSD access for informal sector  
✨ **Web3 Integration** - Blockchain audit trail for transparency  
✨ **AI-Powered** - Multi-language explanations for accessibility  
✨ **Decision Support** - Investment scenario simulator  

## 📊 Tax Compliance Deadlines

- **Quarterly Returns**: 21st of month after each quarter
- **Annual Returns**: June 30th
- **Payment**: Within 60 days of assessment

## 🚀 Deployment

```bash
# Production build
NODE_ENV=production npm start

# Deploy to any Node.js hosting:
# - Heroku
# - Railway
# - Render
# - DigitalOcean App Platform
# - AWS EC2/ECS
```

## 📄 License

MIT

## 👥 Support

For support, email support@smarttax.ng or visit www.smarttax.ng

---

**Built for Nigerian Tax Compliance 2025** 🇳🇬
