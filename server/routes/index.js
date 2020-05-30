const { Router } = require('express')
const auth = require('./auth')
const example = require('./example')

const router = Router()

router.use('/auth', auth)
router.use('/example', example)

module.exports = router