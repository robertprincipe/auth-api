const { Router } = require('express')
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')

const router = Router()

router.get('/', [isAuth, isAdmin], (req, res) => {
    res.json({
        user: req.User
    })
})

module.exports = router