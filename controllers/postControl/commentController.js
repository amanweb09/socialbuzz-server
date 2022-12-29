const postService = require('../../services/postService')
const Posts = require('../../models/post');
const notifications = require('../userControl/notifications');
const { notificationActions } = require('../../actions');

module.exports = function commentController() {
    return {
        async postComment(req, res) {

            const { postId, comment } = req.body;

            if (!postId || !comment) {
                return res
                    .status(422)
                    .json({ err: "All fields are required" })
            }

            const post = await postService.findPost({ _id: postId })

            if (post) {
                post.comments.unshift({
                    userId: req._id,
                    comment,
                    postedOn: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`
                })

                try {
                    await post.save()
                    await notifications().pushNotification({
                        type: notificationActions.COMMENTED,
                        text: `${req.username} commented on your post - ${comment}`,
                        userId: post.postedBy._id
                    })
                    return res
                        .status(200)
                        .json({ message: "comment added" })
                } catch (error) {
                    console.log(error);
                    return res
                        .status(500)
                        .json({ err: "Something went wrong!" })
                }
            }

            return res
                .status(404)
                .json({ err: "No post found with this ID!" })
        },
        async showAllComments(req, res) {
            const { postId } = req.body;

            try {
                const post = await Posts
                    .findOne({ _id: postId })
                    .populate('comments.userId')
                    .exec()

                if (post) {
                    return res
                        .status(200)
                        .json({ comments: post.comments })
                }

                return res
                    .status(404)
                    .json({ err: "Post not found!" })

            } catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ err: "Something went wrong!" })
            }


        }
    }
}