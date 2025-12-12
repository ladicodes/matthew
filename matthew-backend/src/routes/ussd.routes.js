const router = require('express').Router();
const UssdController = require('../controllers/ussd.controller');

router.post('/', UssdController.handle);

module.exports = router;
