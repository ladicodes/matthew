const OpenAI = require('openai');
const { OPENAI_API_KEY } = require('../config/env');

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

/**
 * Generate plain-language tax explanations in multiple languages
 * @param {Object} taxData - Tax calculation results
 * @param {string} language - 'english', 'pidgin', 'yoruba', 'igbo', 'hausa'
 * @returns {Promise<string>} - AI-generated explanation
 */
async function generateExplanation(taxData, language = 'english') {
  if (!OPENAI_API_KEY) {
    return generateFallbackExplanation(taxData, language);
  }

  const languagePrompts = {
    english: 'in simple English',
    pidgin: 'in Nigerian Pidgin English',
    yoruba: 'in Yoruba language',
    igbo: 'in Igbo language',
    hausa: 'in Hausa language'
  };

  const prompt = `You are a Nigerian tax expert. Explain the following tax calculation ${languagePrompts[language] || 'in simple English'} for a business owner who may not understand complex tax terms. Be clear, friendly, and actionable.

Tax Calculation:
- Total Revenue: ₦${taxData.inputs?.revenue?.toLocaleString() || 0}
- Total Profit: ₦${taxData.inputs?.profit?.toLocaleString() || 0}
- Company Income Tax (CIT): ₦${taxData.breakdown?.cit?.amount?.toLocaleString() || 0}
- Capital Gains Tax (CGT): ₦${taxData.breakdown?.cgt?.amount?.toLocaleString() || 0}
- Development Levy: ₦${taxData.breakdown?.developmentLevy?.amount?.toLocaleString() || 0}
- Digital Assets Tax: ₦${taxData.breakdown?.digitalAssetsTax?.amount?.toLocaleString() || 0}
- VAT: ₦${taxData.breakdown?.vat?.amount?.toLocaleString() || 0}
- Total Tax: ₦${taxData.totalTax?.toLocaleString() || 0}
- Net Profit After Tax: ₦${taxData.netProfit?.toLocaleString() || 0}

Provide:
1. What these taxes mean
2. Why they need to pay them
3. Any tips to stay compliant
4. Important deadlines to remember`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error.message);
    return generateFallbackExplanation(taxData, language);
  }
}

/**
 * Fallback explanation when OpenAI is unavailable
 */
function generateFallbackExplanation(taxData, language) {
  const templates = {
    english: `Based on Nigerian 2025 tax reforms, here's your tax breakdown:

💰 Company Income Tax (CIT): ₦${taxData.breakdown?.cit?.amount?.toLocaleString() || 0} - This is ${taxData.breakdown?.cit?.rate} of your profits.
📈 Capital Gains Tax: ₦${taxData.breakdown?.cgt?.amount?.toLocaleString() || 0} - 30% tax on asset sales.
🏗️ Development Levy: ₦${taxData.breakdown?.developmentLevy?.amount?.toLocaleString() || 0} - 4% for national development.
🌐 Digital Assets Tax: ₦${taxData.breakdown?.digitalAssetsTax?.amount?.toLocaleString() || 0} - 30% on crypto/digital gains.
🛒 VAT: ₦${taxData.breakdown?.vat?.amount?.toLocaleString() || 0} - 7.5% on sales.

💵 Total Tax: ₦${taxData.totalTax?.toLocaleString() || 0}
✅ Your Net Profit: ₦${taxData.netProfit?.toLocaleString() || 0}

📅 Key Deadlines:
- File quarterly returns by the 21st of the month after each quarter
- Annual returns due by June 30th
- Pay taxes within 60 days of assessment

⚠️ Stay compliant to avoid penalties!`,
    
    pidgin: `Based on 2025 Nigerian tax law, na so your tax be:

💰 Company Tax (CIT): ₦${taxData.breakdown?.cit?.amount?.toLocaleString() || 0} - Na ${taxData.breakdown?.cit?.rate} of your profit.
📈 Capital Gains Tax: ₦${taxData.breakdown?.cgt?.amount?.toLocaleString() || 0} - 30% tax wen you sell property.
🏗️ Development Levy: ₦${taxData.breakdown?.developmentLevy?.amount?.toLocaleString() || 0} - 4% for national development.
🌐 Digital Money Tax: ₦${taxData.breakdown?.digitalAssetsTax?.amount?.toLocaleString() || 0} - 30% for crypto gain.
🛒 VAT: ₦${taxData.breakdown?.vat?.amount?.toLocaleString() || 0} - 7.5% on wetin you sell.

💵 Total Tax Wey You Go Pay: ₦${taxData.totalTax?.toLocaleString() || 0}
✅ Your Remaining Profit: ₦${taxData.netProfit?.toLocaleString() || 0}

📅 Important Dates:
- File every 3 months before 21st
- Year end filing na June 30
- Pay within 60 days

⚠️ Make sure say you comply, make dem no charge you extra!`
  };

  return templates[language] || templates.english;
}

module.exports = {
  generateExplanation
};
