const { Router } = require('express');
const router = Router();
const controller = require('./controller.cjs');

router.get('/data', controller.dataGet);

module.exports = router;