const { validationResult } = require('express-validator')

const errorMessages = req => {
    let messages = []
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        messages = errors.array().map(error => error.msg)
    }

    return messages
}

module.exports = {
    errorMessages
}