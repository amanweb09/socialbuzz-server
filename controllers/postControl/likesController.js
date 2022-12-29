const { notificationActions } = require('../../actions');
const postService = require('../../services/postService');
const notifications = require('../userControl/notifications');

module.exports = function likesController() {
    return {
        async likePost(req, res) {
            const { postId } = req.body;

            if (!postId) {
                return res
                    .status(400)
                    .json({ err: "bad request!" })
            }

            const post = await postService.findPost({ _id: postId })

            if (!post) {
                return res
                    .status(404)
                    .json({ err: "post not found!" })
            }

            post.likedBy.unshift(req._id)

            try {
                await post.save()
                await notifications().pushNotification({
                    type: notificationActions.POST_LIKED,
                    text: `${req.username} liked your post`,
                    userId: post.postedBy._id
                })
                return res
                    .status(200)
                    .json({ message: "like added!" })
            } catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ err: "Server Error!" })
            }
        },
        async showAllLikes(req, res) {
            const { postId } = req.query;

            const posts = await postService.findPosts({ _id: postId })

            if (posts[0]) {
                return res
                    .status(200)
                    .json({ likes: posts[0].likedBy })
            }

            return res
                .status(500)
                .json({ err: "Something went wrong!" })
        }
    }
}