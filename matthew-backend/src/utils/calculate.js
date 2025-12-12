/**
 * Calculate all Nigerian taxes based on 2025 tax reforms
 * @param {Object} inputs - { revenue, profit, capitalGains, digitalAssets, turnover, businessType }
 * @returns {Object} - Detailed breakdown of all taxes
 */
module.exports = function calculateTaxes(inputs) {
  const {
    revenue = 0,
    profit = 0,
    capitalGains = 0,
    digitalAssets = 0,
    turnover = 0,
    businessType = 'SME' // SME or LARGE
  } = inputs;

  // 1. Company Income Tax (CIT)
  let cit = 0;
  let effectiveRate = 0;
  if (businessType === 'LARGE') {
    // Large companies: 15% minimum effective tax rate
    effectiveRate = 0.15;
    cit = Math.max(profit * 0.30, revenue * effectiveRate);
  } else {
    // SMEs: Standard 30% on profit
    cit = profit * 0.30;
  }

  // 2. Capital Gains Tax (CGT) - 30% on capital gains
  const cgt = capitalGains * 0.30;

  // 3. Development Levy - 4% on assessable profits
  const developmentLevy = profit * 0.04;

  // 4. Digital Assets Tax - 30% on gains from digital assets
  const digitalAssetsTax = digitalAssets * 0.30;

  // 5. Value Added Tax (VAT) - 7.5% on taxable supplies
  const vat = turnover * 0.075;

  // Total Tax Liability
  const totalTax = cit + cgt + developmentLevy + digitalAssetsTax + vat;

  // Net Profit after all taxes
  const netProfit = profit + capitalGains + digitalAssets - totalTax;

  return {
    breakdown: {
      cit: {
        amount: parseFloat(cit.toFixed(2)),
        rate: businessType === 'LARGE' ? `${effectiveRate * 100}% effective` : '30%',
        description: 'Company Income Tax'
      },
      cgt: {
        amount: parseFloat(cgt.toFixed(2)),
        rate: '30%',
        description: 'Capital Gains Tax'
      },
      developmentLevy: {
        amount: parseFloat(developmentLevy.toFixed(2)),
        rate: '4%',
        description: 'Development Levy'
      },
      digitalAssetsTax: {
        amount: parseFloat(digitalAssetsTax.toFixed(2)),
        rate: '30%',
        description: 'Digital Assets Tax'
      },
      vat: {
        amount: parseFloat(vat.toFixed(2)),
        rate: '7.5%',
        description: 'Value Added Tax'
      }
    },
    totalTax: parseFloat(totalTax.toFixed(2)),
    netProfit: parseFloat(netProfit.toFixed(2)),
    effectiveTaxRate: revenue > 0 ? parseFloat(((totalTax / revenue) * 100).toFixed(2)) : 0,
    inputs
  };
};