const explainService = require('../services/explain.service');
const taxService = require('../services/tax.service');

/**
 * Generate AI explanation of tax calculation
 * POST /explain
 * Body: { revenue, profit, ..., language }
 */
async function explain(req, res) {
  try {
    const { language = 'english', ...taxInputs } = req.body;
    
    // Calculate taxes first
    const taxResult = taxService.calculate(taxInputs);
    
    // Generate explanation
    const explanation = await explainService.generateExplanation(taxResult, language);
    
    res.json({
      success: true,
      data: {
        taxCalculation: taxResult,
        explanation,
        language
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

module.exports = {
  explain
};
