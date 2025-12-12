const router = require('express').Router();
const TaxController = require('../controllers/tax.controller');
const { validateTaxCalculation, validateSimulation } = require('../middlewares/validator');

router.post('/calculate', validateTaxCalculation, TaxController.calculate);
router.post('/simulate', validateSimulation, TaxController.simulate);

module.exports = router;
