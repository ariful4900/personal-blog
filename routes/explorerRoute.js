const router = require('express').Router();
const { explorerGetControler, singlePostGetController } = require('../controllers/explorerController');



router.get('/:postId', singlePostGetController)

router.get('/', explorerGetControler);

module.exports = router