const User = require('../models/User');


function userSeed() {
    User.create([{
        fullname: 'Robert Maick',
        nickname: 'make',
        email: 'robert@make.com',
        password: '987654321',
        role: 'ADMINISTRATOR'
    }])
}

module.exports = userSeed