const reportService = require('../services/report.service');

/**
 * Create a new report (manual save)
 * POST /report
 * Body: { type, data }
 */
async function create(req, res) {
  try {
    const result = await reportService.save(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Get a report by ID or hash
 * GET /report/:id
 */
async function getOne(req, res) {
  try {
    const result = await reportService.find(req.params.id);
    
    if (!result.success) {
      return res.status(404).json(result);
    }
    
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

module.exports = {
  create,
  getOne
};
