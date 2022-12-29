const mongoose = require('mongoose')

module.exports = function connection() {
    try {
        mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: false
        })

       console.log('db connected');
    } catch (error) {
        console.log(error);
    }
}