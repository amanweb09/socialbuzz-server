const crypto = require('crypto')

class HashingService {
    hashPassword(pwd) {
        return crypto
        .createHmac('sha256', process.env.PASSWORD_HASH_SECRET)
        .update(pwd)
        .digest('hex')
    }
}

module.exports = new HashingService()