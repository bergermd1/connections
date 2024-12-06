const { Router } = require('express');
const router = Router();
const controller = require('./controller.cjs');

router.get('/data', controller.dataGet);
router.post('/login', controller.validate, controller.loginPost);
router.post('/register', controller.registerPost);

module.exports = router;