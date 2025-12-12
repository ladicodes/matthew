const ussdService = require('../services/ussd.service');

/**
 * Handle USSD requests
 * POST /ussd
 * Body: { sessionId, phoneNumber, text }
 */
function handle(req, res) {
  try {
    const { sessionId, phoneNumber, text } = req.body;
    
    if (!sessionId || !phoneNumber || text === undefined) {
      return res.status(400).json({
        success: false,
        error: 'sessionId, phoneNumber, and text are required'
      });
    }
    
    const result = ussdService.processUssd(sessionId, phoneNumber, text);
    
    // Return USSD response format
    res.type('text/plain').send(result.response);
  } catch (error) {
    res.status(500).type('text/plain').send('END Service temporarily unavailable. Please try again.');
  }
}

module.exports = {
  handle
};
