const jwt = require('jsonwebtoken');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '1d'
        })

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '1y'
        })

        return { accessToken, refreshToken }
    }
    validateToken(token) {
        try {
            const validity = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return validity
        } catch (error) {
            console.log(error);
        }
    }
    validateRefreshToken(token) {
        try {
            const validity = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return validity;
        } catch (error) {
            console.log(error);
        }
    }
    async generatePasswordRestToken(payload) {
        return jwt.sign(payload, process.env.PASSWORD_RESET_SECRET, {
            expiresIn: '10m'
        })
    }
    validatePasswordToken(token) {
        return jwt.verify(token, process.env.PASSWORD_RESET_SECRET);
    }
}

module.exports = new TokenService()