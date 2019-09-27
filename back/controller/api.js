var router = require('express').Router();

router.use(require('../middlewares/bodyParse'));
router.use(require('../middlewares/cors'));
router.use(require('../middlewares/auth'));

router.use('/user', require('./user'));
router.use('/record', require('./record'));
router.use('/auth', require('./auth'));

router.use(require('../middlewares/error'));

module.exports = router;