const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { errorMessages } = require('../utils/errorsHandlers')

const login = async (req, res) => {
    let messages = errorMessages(req)
    if (messages.length > 0) {
        return res.status(400).json({
            errors: messages
        })
    }
    const {
        email, 
        password 
    } = req.body

    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({
                errors: ['Correo o contraseña incorrecta']
            })
        }
        if (!user.verifyPassword(password)) {
            return res.status(400).json({
                errors: ['Correo o contraseña incorrecta']
            })
        }
        const token = jwt.sign({
            _id: user._id,
            role: user.role
        }, 
        process.env.SECRET_KEY, {expiresIn: 60 * 60 * 7})
        res.json({
            message: 'Inicio de sesión exitosa',
            token
        })
    } catch (error) {
        res.status(500).json({
            errors: [error.message]
        })
    }
}

const register = async (req, res) => {

    let messages = errorMessages(req)
    if (messages.length > 0) {
        return res.status(400).json({
            errors: messages
        })
    }

    const { 
        fullname, 
        nickname, 
        email, 
        password 
    } = req.body

    try {
        const user = await User.findOne({email})

        if (user) {
            return res.status(400).json({
                errors: ['Correo ya fue registrado']
            })
        }

        await User.create({
            fullname,
            nickname,
            email,
            password
        })

        res.status(201).json({
            message: 'Usuario registrado correctamente'
        })
    } catch (error) {
        res.status(500).json({
            errors: [error.message]
        })
    }

}

const checkEmail = async (req, res) => {
    const { email } = req.body

    try {
        const user = await User.findOne({email})

        if (user) {
            return res.json({
                resp: false
            })
        }

        res.json({
            resp: true
        })
    } catch (error) {
        res.status(500).json({
            errors: [error.message]
        })
    }
}

const verifyToken = (req, res) => {
    const access = req.headers['x-access-token']

    if (!access || access === 'Bearer ')
        return res.status(400).json({
            errors: ['Token es requerido']
        })
    const token = access.split(' ', -1)[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(400).json({
                errors: [err.message]
            })
        }

        res.json({
            message: 'token valido'
        })
    })
}

// const resetPassword = (req, res) => {
    
// }

module.exports = {
    login,
    register,
    verifyToken,
    checkEmail
}