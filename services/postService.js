const Posts = require('../models/post')

class PostService {
    async createPost(post) {
        try {
            return await Posts.create(post)
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async findPosts(filter) {
        try {
            return await Posts
                .find(filter)
                .sort({ createdAt: -1 })
                .populate('postedBy')
                .exec()
                
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async findPost(filter) {
        try {
            return await Posts
                .findOne(filter)
                
        } catch (error) {
            console.log(error);
            return error
        }
    }
}

module.exports = new PostService()