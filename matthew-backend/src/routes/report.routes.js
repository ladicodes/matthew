const router = require('express').Router();
const ReportController = require('../controllers/report.controller');

router.post('/', ReportController.create);
router.get('/:id', ReportController.getOne);

module.exports = router;
