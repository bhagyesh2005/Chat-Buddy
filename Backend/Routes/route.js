const router = require('express').Router();
const { getVarified } = require('../controller/userController');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
/** HTTP Reqeust */
router.post('/getverified', getVarified);

module.exports = router;