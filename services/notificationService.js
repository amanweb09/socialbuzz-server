const Notifications = require('../models/notification')


module.exports = function notificationService() {

    return {

        async saveNotification(notification) {
            return await Notifications.create(notification)
        },

        async showNotifications(filter) {
            return await Notifications
                .find(filter)
                .populate('user')
                .sort({ createdAt: -1 })
                .exec()
        }
    }

}