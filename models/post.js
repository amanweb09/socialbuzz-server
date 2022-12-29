const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        unique: false
    },
    picture: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: false
    },
    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            unique: false
        }
    ],
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                unique: false
            },
            comment: {
                type: String
            },
            postedOn: {
                type: String
                // type: Date,
                // default: Date.now()
            }
        }
    ]
}, { timestamps: true })

module.exports = new mongoose.model('posts', postSchema, 'posts')