const userValidator = require('../../validators/userValidator')
const UserService = require('../../services/userService')
const HashingService = require('../../services/hashingService')

module.exports = function signupController() {
    return {
        async createUser(req, res) {
            const { name, email, tel, username, password, profilePicture } = req.body;

            if (!name || !email || !tel || !username || !password) {
                return res
                    .status(422)
                    .json({ err: 'Please fill all the fields!' })
            }

            const { errorType, status, message } = userValidator(req.body)

            if (errorType) {
                return res
                    .status(status)
                    .json({ err: message })
            }

            const user = await UserService.findUser({
                $or: [
                    { email },
                    { tel }]
            })

            if (user) {
                return res
                    .status(422)
                    .json({ err: 'User already exists with this email/contact number!' })
            }

            const hash = HashingService.hashPassword(password)

            if (hash) {
                const newUser = { name, profilePicture, email, tel, username, password: hash, followers: [], following: [], pendingRequests: [] }
                const saveUser = await UserService.createUser(newUser)

                if (saveUser) {
                    return res
                        .status(201)
                        .json({ message: 'Signup successful.. Please Login!' })
                }

                return res
                    .status(500)
                    .json({ err: 'Something went wrong...' })

            }

            console.log(hash);
            return res
                .status(500)
                .json({ err: 'Hashing error' })
        }
    }
}