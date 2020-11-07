const router = require('express').Router();
const { isAuthenticated } = require('../../middleware/authMiddleware');
const { bookmarksGetController } = require('../controllers/bookmarkController');
const { commentPostController, replyCommentPostController } = require('../controllers/commentController');
const { likesGetController, dislikeGetController } = require('../controllers/likeDislikeController');





router.post('/comments/:postId', isAuthenticated, commentPostController)

router.post('/comments/replies/:commentId', isAuthenticated, replyCommentPostController)

router.get('/likes/:postId', isAuthenticated, likesGetController)
router.get('/dislikes/:postId', isAuthenticated, dislikeGetController)

router.get('/bookmarks/:postId', isAuthenticated, bookmarksGetController)

module.exports = router;  