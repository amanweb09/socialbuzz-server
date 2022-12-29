const tokenService = require('../services/tokenService');
const userService = require('../services/userService')

const authenticate = async (req, res, next) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        return res
            .status(401)
            .json({ err: 'Please login to continue!' })
    }

    const payload = await tokenService.validateToken(accessToken)

    if (payload) {
        const authUser = await userService.findUser({ _id: payload._id });

        if (!authUser) {
            return res
                .status(404)
                .json({ err: "No user found!" })
        }
        
        req._id = authUser._id;
        req.name = authUser.name;
        req.email = authUser.email;
        req.tel = authUser.tel;
        req.role = authUser.role;
        req.username = authUser.username;
        req.followers = authUser.followers.length;
        req.following = authUser.following.length;

        return next()
    }

    return res
        .status(401)
        .json({ err: 'Please login to continue!', expErr: true })

}

module.exports = authenticate;