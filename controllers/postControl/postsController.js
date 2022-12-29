const postService = require("../../services/postService");

module.exports = function postsController() {
    return {
        async create(req, res) {
            const { picture, caption } = req.body;

            if (!picture) {
                return res
                    .status(422)
                    .json({ err: "Post must contain an image!" })
            }

            const createPost = await postService.createPost({
                postedBy: req._id,
                picture, caption,
                likedBy: [],
                comments: []
            })

            if (createPost) {
                return res
                    .status(201)
                    .json({ message: "Post created successfully!" })
            }

            return res
                .status(500)
                .json({ err: "Something went wrong!" })
        },
        async showOnFeed(req, res) {
            const posts = await postService.findPosts()

            if (posts) {
                return res
                    .status(200)
                    .json({ posts })
            }
            return res
                .status(500)
                .json({ err: "Something went wrong!" })
        }
    }
}