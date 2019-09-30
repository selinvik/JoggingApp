var router = require('express').Router();

router.use(require('../middlewares/bodyParse'));
router.use(require('../middlewares/cors'));
router.use(require('../middlewares/authentication'));

router.use('/user', require('./user'));
router.use('/record', require('./record'));
router.use('/authentication', require('./authentication'));

router.use(require('../middlewares/error'));

module.exports = router;