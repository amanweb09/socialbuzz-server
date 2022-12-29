const router = require('express').Router()

const commentController = require('../controllers/postControl/commentController');
const likesController = require('../controllers/postControl/likesController');
const postsController = require('../controllers/postControl/postsController');
const userController = require('../controllers/socialController/userController');
const notifications = require('../controllers/userControl/notifications');
const profileController = require('../controllers/userControl/profileController');

const authenticate = require('../middleware/authenticate')

router.post('/api/posts/create', authenticate, postsController().create)
router.get('/api/posts/show-on-feed', authenticate, postsController().showOnFeed)

router.post('/api/comments/all', authenticate, commentController().showAllComments)
router.get('/api/likes/all', authenticate, likesController().showAllLikes)
router.post('/api/like', authenticate, likesController().likePost)
router.post('/api/comment', authenticate, commentController().postComment)

router.get('/api/get-profile', authenticate, profileController().getProfile)
router.get('/api/my-account', authenticate, profileController().getAccountDetails)

router.get('/api/users/:username', authenticate, userController().getUser)

router.get('/api/you-may-know', authenticate, userController().getPeopleYouKnow)

router.post('/api/follow-request', authenticate, userController().followRequest)
router.post('/api/unfollow', authenticate, userController().unfollow)

router.get('/api/notifications', authenticate, notifications().ShowNotifications)

module.exports = router;