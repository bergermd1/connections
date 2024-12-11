const { Router } = require('express');
const router = Router();
const controller = require('./controller.cjs');

router.get('/data', controller.dataGet);
router.get('/data/:userId', controller.dataGet);
router.get('/logout', controller.logoutGet)
router.get('/loginfailure', controller.loginFailureGet)
// router.get('/validate', controller.test)
router.post('/login', controller.validate, controller.loginPost);
router.post('/register', controller.registerPost);
router.post('/complete', controller.complete)
router.get('/stats/:userId', controller.statsGet)

module.exports = router;