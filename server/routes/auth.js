const { Router } = require('express')
const userController = require('../controllers/user')
const { check } = require('express-validator')


const router = Router()

router.post('/login', [
    check('email', 'El correo electrónico es requerido').notEmpty(),
    check('email', 'El formato de correo electrónico es invalido').isEmail(),
    check('password', 'La contraseña es requerida').notEmpty(),
    check('password', 'La contraseña debe tener minimo 8 caracteres').isLength({min: 8})
],userController.login)

router.post('/register', [
    check('fullname', 'El nombre completo es requerido').notEmpty(),
    check('nickname', 'El nombre de usuario es requerido').notEmpty(),
    check('email', 'El correo electrónico es requerido').notEmpty(),
    check('email', 'El formato de correo electrónico es invalido').isEmail(),
    check('password', 'La contraseña es requerida').notEmpty(),
    check('password', 'La contraseña debe tener minimo 8 caracteres').isLength({min: 8})
],userController.register)

router.get('/verify-token', userController.verifyToken)

router.post('/check-email', userController.checkEmail)

module.exports = router