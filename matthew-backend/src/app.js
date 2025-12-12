const express = require('express');
const bodyParser = require('body-parser');
const taxRoutes = require('./routes/tax.routes');
const reportRoutes = require('./routes/report.routes');
const explainRoutes = require('./routes/explain.routes');
const ussdRoutes = require('./routes/ussd.routes');


const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Matthew API - Nigerian Tax Compliance Suite',
    version: '1.0.0',
    endpoints: {
      taxCalculation: 'POST /tax/calculate',
      investmentSimulation: 'POST /tax/simulate',
      aiExplanation: 'POST /explain',
      reportCreate: 'POST /report',
      reportGet: 'GET /report/:id',
      ussd: 'POST /ussd'
    },
    features: [
      'AI Tax Calculator (CIT, CGT, VAT, Development Levy, Digital Assets)',
      'Investment Scenario Simulator',
      'Multi-Language AI Assistant (English, Pidgin, Yoruba, Igbo, Hausa)',
      'Blockchain Audit Trail (Solana)',
      'USSD Access for Informal Sector'
    ]
  });
});

app.use('/tax', taxRoutes);
app.use('/report', reportRoutes);
app.use('/explain', explainRoutes);
app.use('/ussd', ussdRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

module.exports = app;