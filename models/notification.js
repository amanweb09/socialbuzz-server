const { Schema, model } = require('mongoose')

const notificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        unique: false
    },
    type: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = new model('notifications', notificationSchema, 'notifications')