
const isAdmin = (req, res, next) => {
    const user = req.User

    if (user.role !== 'ADMINISTRATOR') {
        return res.status(401).json({
            errors: ['Unauthorized']
        })
    }

    next()
}

module.exports = isAdmin