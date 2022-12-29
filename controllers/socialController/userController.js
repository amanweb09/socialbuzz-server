const userService = require("../../services/userService");
const postService = require("../../services/postService");

module.exports = function userController() {
    return {
        async getUser(req, res) {
            const { username } = req.params;

            const user = await userService.findUser({ username })

            if (!user) {
                return res
                    .status(404)
                    .json({ err: "No user found with this username!" })
            }

            const posts = await postService.findPosts({ postedBy: user._id })

            return res
                .status(200)
                .json({ user, posts })
        },
        async followRequest(req, res) {
            const { _id } = req.body

            const followedBy = await userService.findUser({ _id: req._id })
            const userToBeFollowed = await userService.findUser({ _id })

            if (!userToBeFollowed) {
                return res
                    .status(404)
                    .json({ err: "User not found!" })
            }

            followedBy.following.unshift(userToBeFollowed._id)
            userToBeFollowed.followers.unshift(followedBy._id)

            try {
                await userToBeFollowed.save()
                await followedBy.save()

                return res
                    .status(200)
                    .json({ message: "follower added" })
            } catch (error) {
                return res
                    .status(500)
                    .json({ message: "Server Error!" })

            }

        },
        async unfollow(req, res) {
            const { _id } = req.body

            const unfollowedBy = await userService.findUser({ _id: req._id })
            const userToBeUnfollowed = await userService.findUser({ _id })

            if (!userToBeUnfollowed) {
                return res
                    .status(404)
                    .json({ err: "User not found!" })
            }

            const newFollowing = unfollowedBy.following.filter((following) => {
                return following._id.toString() !== userToBeUnfollowed._id.toString()
            })

            const newFollowers = userToBeUnfollowed.followers.filter((follower) => {
                return follower._id.toString() !== unfollowedBy._id.toString()
            })


            unfollowedBy.following = newFollowing
            userToBeUnfollowed.followers = newFollowers

            try {
                await userToBeUnfollowed.save()
                await unfollowedBy.save()

                return res
                    .status(200)
                    .json({ message: "follower added" })
            } catch (error) {
                return res
                    .status(500)
                    .json({ message: "Server Error!" })

            }

        },
        async getPeopleYouKnow(req, res) {
            const { limit } = req.query;

            if (!limit) {
                return res.status(400).json({ err: 'please pass in a limit' })
            }

            const users = await userService.getLimitedUsers({}, limit)

            if(users) {
                return res.status(200).json({ users })
            }

            return res.status(500).json({ err: 'Server error' })
        }
    }
}