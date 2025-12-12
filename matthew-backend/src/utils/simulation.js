const calculateTaxes = require('./calculate');

/**
 * Simulate investment scenarios over multiple years with tax impact
 * @param {Object} base - Base scenario inputs
 * @param {number} years - Number of years to simulate
 * @returns {Object} - Year-by-year projections with tax impact
 */
module.exports = function simulateScenario(base, years = 5) {
  const {
    initialInvestment = 0,
    revenue = 0,
    profit = 0,
    capitalGains = 0,
    digitalAssets = 0,
    turnover = 0,
    businessType = 'SME',
    growthRate = 0.10, // 10% annual growth default
    inflationRate = 0.15 // Nigerian inflation ~15%
  } = base;

  const projections = [];
  let cumulativeNetProfit = -initialInvestment;
  let roiAchieved = false;

  for (let year = 1; year <= years; year++) {
    // Apply growth rate
    const yearRevenue = revenue * Math.pow(1 + growthRate, year);
    const yearProfit = profit * Math.pow(1 + growthRate, year);
    const yearCapitalGains = capitalGains * Math.pow(1 + growthRate, year);
    const yearDigitalAssets = digitalAssets * Math.pow(1 + growthRate, year);
    const yearTurnover = turnover * Math.pow(1 + growthRate, year);

    // Calculate taxes for this year
    const taxResult = calculateTaxes({
      revenue: yearRevenue,
      profit: yearProfit,
      capitalGains: yearCapitalGains,
      digitalAssets: yearDigitalAssets,
      turnover: yearTurnover,
      businessType
    });

    cumulativeNetProfit += taxResult.netProfit;

    // Adjust for inflation
    const realNetProfit = taxResult.netProfit / Math.pow(1 + inflationRate, year);
    const realCumulativeProfit = cumulativeNetProfit / Math.pow(1 + inflationRate, year);

    // Calculate ROI
    const roi = initialInvestment > 0 ? (cumulativeNetProfit / initialInvestment) * 100 : 0;

    if (!roiAchieved && cumulativeNetProfit > 0) {
      roiAchieved = true;
    }

    projections.push({
      year,
      revenue: parseFloat(yearRevenue.toFixed(2)),
      grossProfit: parseFloat((yearProfit + yearCapitalGains + yearDigitalAssets).toFixed(2)),
      taxes: taxResult.breakdown,
      totalTax: taxResult.totalTax,
      netProfit: taxResult.netProfit,
      realNetProfit: parseFloat(realNetProfit.toFixed(2)),
      cumulativeNetProfit: parseFloat(cumulativeNetProfit.toFixed(2)),
      realCumulativeProfit: parseFloat(realCumulativeProfit.toFixed(2)),
      roi: parseFloat(roi.toFixed(2)),
      breakEven: cumulativeNetProfit >= 0
    });
  }

  return {
    initialInvestment,
    growthRate: growthRate * 100,
    inflationRate: inflationRate * 100,
    years,
    projections,
    summary: {
      totalNetProfit: parseFloat(cumulativeNetProfit.toFixed(2)),
      finalROI: projections[projections.length - 1].roi,
      breakEvenYear: roiAchieved ? projections.find(p => p.breakEven)?.year : null,
      recommendedAction: cumulativeNetProfit > 0 ? 'INVEST' : 'RECONSIDER'
    }
  };
};