import bodyParser from 'body-parser';
import express from 'express';
const router = express.Router();

router.use(express.static("public"));
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

export default router;