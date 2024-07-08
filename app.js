const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3000)
console.log("Connessione Riuscita");