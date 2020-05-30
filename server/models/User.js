const { Schema, model } = require('mongoose')
const bcryptjs = require('bcryptjs')

const schema = new Schema({
    fullname: {
        type: String,
        minlength: 3,
        required: true,
        trim: true,
    },
    nickname: {
        type: String,
        minlength: 3,
        required: true,
        trim: true,
    },
    picture: {
        type: String,
        default: 'picture-default.png'
    },
    role: {
        type: String,
        enum: ['ADMINISTRATOR', 'AUTHOR'],
        default: 'AUTHOR',
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    }
}, {
    timestamps: true
})

schema.pre('save', function (next) {
    this.password = bcryptjs.hashSync(this.password, 8)
    next()
})

schema.methods.verifyPassword = function(password) {
    return bcryptjs.compareSync(password, this.password)
}

schema.methods.ToJSON = function() {
    let user = this.toObject()
    delete user.password
    return user
}

module.exports = model('User', schema)