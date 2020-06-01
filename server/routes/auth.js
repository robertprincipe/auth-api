const { Router } = require('express')
const authController = require('../controllers/auth')
const { check } = require('express-validator')


const router = Router()

router.post('/login', [
    check('email', 'Email is required').notEmpty(),
    check('email', 'Email format is invalid').isEmail(),
    check('password', 'Password is required').notEmpty()
], authController.login)

router.post('/register', [
    check('fullname', 'Full name is required').notEmpty(),
    check('nickname', 'Username is required').notEmpty(),
    check('email', 'Email is required').notEmpty(),
    check('email', 'Email format is invalid').isEmail(),
    check('password', 'Password is required').notEmpty(),
    check('password', 'Password must have a minimum of 9 characters').isLength({min: 9})
], authController.register)

router.get('/verify-token', authController.verifyToken)

router.post('/check-email', authController.checkEmail)

module.exports = router