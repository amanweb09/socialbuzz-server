const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    profilePicture: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    tel: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    role: { type: String, default: 'user' },
    password: { type: String, required: true },
    accessToken: { type: String },
    followers: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                unique: false,
                required: false
            }
        }
    ],
    following: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                unique: false,
                required: false
            }
        }
    ],
    pendingRequests: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                unique: false,
                required: false
            }
        }
    ],
})

module.exports = new mongoose.model('users', userSchema, 'users')