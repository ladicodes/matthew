const calculateTaxes = require('../utils/calculate');

/**
 * Process USSD input for informal sector tax calculations
 * @param {string} sessionId - USSD session ID
 * @param {string} phoneNumber - User phone number
 * @param {string} text - USSD input text
 * @returns {Object} - USSD response with menu or results
 */
function processUssd(sessionId, phoneNumber, text) {
  let response = '';
  
  if (text === '') {
    // Main menu
    response = `CON Welcome to Matthew
1. Calculate Simple Tax
2. Get Tax Help (English)
3. Get Tax Help (Pidgin)
4. Check Tax Deadlines
0. Exit`;
  } else if (text === '1') {
    // Tax calculation flow
    response = `CON Enter your monthly revenue in Naira:
Example: 50000`;
  } else if (text.startsWith('1*')) {
    const parts = text.split('*');
    if (parts.length === 2) {
      // Asked for revenue, now ask for expenses
      response = `CON Enter your monthly expenses:
Example: 20000`;
    } else if (parts.length === 3) {
      // Calculate taxes
      const revenue = parseFloat(parts[1]) || 0;
      const expenses = parseFloat(parts[2]) || 0;
      const profit = revenue - expenses;
      
      const taxResult = calculateTaxes({
        revenue: revenue * 12, // Annualize
        profit: profit * 12,
        turnover: revenue * 12,
        businessType: 'SME'
      });
      
      response = `END Your Annual Tax:
Revenue: ₦${(revenue * 12).toLocaleString()}
Profit: ₦${(profit * 12).toLocaleString()}

Taxes:
CIT: ₦${taxResult.breakdown.cit.amount.toLocaleString()}
VAT: ₦${taxResult.breakdown.vat.amount.toLocaleString()}
Total Tax: ₦${taxResult.totalTax.toLocaleString()}

Net Profit: ₦${taxResult.netProfit.toLocaleString()}

Visit www.matthew.ng for details`;
    }
  } else if (text === '2') {
    // Tax help in English
    response = `END Nigerian 2025 Tax Guide:

- Pay 30% tax on profits (CIT)
- Pay 7.5% VAT on sales
- 4% development levy
- File quarterly by 21st of month
- Annual filing by June 30

Need help? Visit www.matthew.ng or call 0800-TAX-HELP`;
  } else if (text === '3') {
    // Tax help in Pidgin
    response = `END Naija Tax Guide 2025:

- Pay 30% tax for your profit (CIT)
- Pay 7.5% VAT for wetin you sell
- Pay 4% development levy
- File every 3 months before 21st
- Year end filing na June 30

Need help? Visit www.matthew.ng or call 0800-TAX-HELP`;
  } else if (text === '4') {
    // Tax deadlines
    const now = new Date();
    const quarter = Math.floor(now.getMonth() / 3) + 1;
    response = `END Tax Deadlines 2025:

Quarter ${quarter} filing: 21st of next month
Annual filing: June 30, 2025
Payment: Within 60 days of assessment

Set reminder at www.matthew.ng`;
  } else if (text === '0') {
    response = `END Thank you for using Matthew.

Visit www.matthew.ng for full features.
Stay compliant, avoid penalties!`;
  } else {
    // Invalid input
    response = `CON Invalid input. Please try again.
1. Calculate Tax
2. Tax Help (English)
3. Tax Help (Pidgin)
4. Check Deadlines
0. Exit`;
  }
  
  return {
    sessionId,
    phoneNumber,
    response
  };
}

module.exports = {
  processUssd
};
