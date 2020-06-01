const jwt = require('jsonwebtoken')

const isAuth = (req, res, next) => {
    const access = req.headers['x-access-token']

    if (!access) {
        return res.status(422).json({
            errors: ['Token not found']
        })
    }

    const token = access.split(' ', -1)[1]

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(400).json({
                errors: [err.message]
            })
        }

        req.User = decoded
        next()
    })
}

module.exports = isAuth