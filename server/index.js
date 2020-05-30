const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const dbConnection = require('./config/database')
const app = express()
dbConnection()


app.use(morgan('dev'))
app.use(cors())

const router = require('./routes')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api', router)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Servidor escuchando en el http://localhost:${port}`);
})