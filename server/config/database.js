const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        console.log('DB is online')
        return connection
    } catch(error) {
        throw error
    }
}

module.exports = dbConnection