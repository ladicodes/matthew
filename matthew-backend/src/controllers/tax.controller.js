const taxService = require('../services/tax.service');
const reportService = require('../services/report.service');

/**
 * Calculate taxes for business inputs
 * POST /tax/calculate
 * Body: { revenue, profit, capitalGains, digitalAssets, turnover, businessType }
 */
async function calculate(req, res) {
  try {
    const result = taxService.calculate(req.body);
    
    // Save report
    const saved = await reportService.save({
      type: 'tax_calculation',
      inputs: req.body,
      result
    });
    
    res.json({
      success: true,
      data: result,
      reportId: saved.report?.id,
      blockchain: saved.blockchain
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Simulate investment scenarios
 * POST /tax/simulate
 * Body: { revenue, profit, ..., years, growthRate, inflationRate, initialInvestment }
 */
async function simulate(req, res) {
  try {
    const { years, ...baseInputs } = req.body;
    const result = taxService.simulate(baseInputs, years);
    
    // Save report
    const saved = await reportService.save({
      type: 'investment_simulation',
      inputs: req.body,
      result
    });
    
    res.json({
      success: true,
      data: result,
      reportId: saved.report?.id,
      blockchain: saved.blockchain
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

module.exports = {
  calculate,
  simulate
};
