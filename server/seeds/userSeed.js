const User = require('../models/User');


function userSeed() {
    try {
        User.create([{
            fullname: 'ADMINISTRATOR',
            nickname: 'admin',
            email: 'super@admin.com',
            password: 'admin1234',
            role: 'ADMINISTRATOR'
        }])
        console.log('User admin created')
    } catch (error) {
        console.log(error)
    }
}

module.exports = userSeed