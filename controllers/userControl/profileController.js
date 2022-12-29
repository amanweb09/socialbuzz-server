const userService = require('../../services/userService')
const postService = require('../../services/postService')

module.exports = function profileController() {
    return {
        getProfile(req, res) {
            return res
                .status(200)
                .json({
                    _id: req._id,
                    name: req.name,
                    email: req.email,
                    username: req.username,
                    tel: req.tel,
                    role: req.role,
                    followers: req.followers,
                    following: req.follwoing
                })
        },
        async getAccountDetails(req, res) {
            const user = await userService.findUser({ _id: req._id })

            if (user) {
                const posts = await postService.findPosts({ postedBy: req._id })

                return res
                    .status(200)
                    .json({ user, posts })
            }
            return res
                .status(404)
                .json({ err: "User not found!" })

        }
    }
}