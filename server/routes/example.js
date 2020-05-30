const { Router } = require('express')
const { isAuth } = require('../middlewares/isAuth')

const router = Router()

router.post('/', isAuth, (req, res) => {
    res.json({
        user: req.User
    })
})

module.exports = router