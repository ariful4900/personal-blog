const { authorProfileGetController } = require('../controllers/authorController');

const router = require('express').Router();


router.get('/:userId', authorProfileGetController)

module.exports = router