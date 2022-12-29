const notificationService = require("../../services/notificationService")


module.exports = function notificationController() {

    return {

        async pushNotification({ text, type, userId }) {

            const notification = {
                user: userId,
                type,
                text
            }

            return await notificationService().saveNotification(notification)
        },

        async ShowNotifications(req, res) {
            try {
                const notifications = await notificationService()
                    .showNotifications({
                        user: req._id
                    })
                return res.status(200).json({ notifications })
            } catch (error) {
                console.log(error);
                return res.status(500).json({ err: 'Server error' })
            }
        }

    }
}