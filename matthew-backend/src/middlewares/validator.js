/**
 * Validate tax calculation inputs
 */
function validateTaxCalculation(req, res, next) {
  const { revenue, profit, capitalGains, digitalAssets, turnover, businessType } = req.body;
  
  const errors = [];
  
  if (revenue !== undefined && (typeof revenue !== 'number' || revenue < 0)) {
    errors.push('Revenue must be a non-negative number');
  }
  
  if (profit !== undefined && (typeof profit !== 'number')) {
    errors.push('Profit must be a number');
  }
  
  if (capitalGains !== undefined && (typeof capitalGains !== 'number' || capitalGains < 0)) {
    errors.push('Capital gains must be a non-negative number');
  }
  
  if (digitalAssets !== undefined && (typeof digitalAssets !== 'number' || digitalAssets < 0)) {
    errors.push('Digital assets must be a non-negative number');
  }
  
  if (turnover !== undefined && (typeof turnover !== 'number' || turnover < 0)) {
    errors.push('Turnover must be a non-negative number');
  }
  
  if (businessType && !['SME', 'LARGE'].includes(businessType)) {
    errors.push('Business type must be either SME or LARGE');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  
  next();
}

/**
 * Validate simulation inputs
 */
function validateSimulation(req, res, next) {
  const { years } = req.body;
  
  const errors = [];
  
  if (years !== undefined && (typeof years !== 'number' || years < 1 || years > 20)) {
    errors.push('Years must be a number between 1 and 20');
  }
  
  // Also validate base scenario
  validateTaxCalculation(req, res, (err) => {
    if (err) return;
    
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    
    next();
  });
}

/**
 * Validate explanation request
 */
function validateExplanation(req, res, next) {
  const { language } = req.body;
  
  const validLanguages = ['english', 'pidgin', 'yoruba', 'igbo', 'hausa'];
  
  if (language && !validLanguages.includes(language.toLowerCase())) {
    return res.status(400).json({
      success: false,
      error: `Language must be one of: ${validLanguages.join(', ')}`
    });
  }
  
  next();
}

module.exports = {
  validateTaxCalculation,
  validateSimulation,
  validateExplanation
};