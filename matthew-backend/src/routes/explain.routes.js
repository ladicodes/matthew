const router = require('express').Router();
const ExplainController = require('../controllers/explain.controller');
const { validateExplanation } = require('../middlewares/validator');

router.post('/', validateExplanation, ExplainController.explain);

module.exports = router;

