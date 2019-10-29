const bodyParser = require('body-parser');
const express = require('express')
const router = require('express').Router();

router.use(express.static("public"));
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

module.exports = router;