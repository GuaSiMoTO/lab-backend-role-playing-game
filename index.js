require('dotenv').config()
const express      = require('express')
const logger       = require('./src/middleware/logger')
const errorHandler = require('./src/middleware/errorHandler')
const cors = require("cors");

const app  = express()
const PUERTO = Number(process.env.PORT) || 3000

app.use(cors());
app.use(express.json())
//logger se pone al principio de todo
app.use(logger)

app.use('/api/personajes', require('./src/routes/personajes'))
app.use('/api/combates',   require('./src/routes/combates'))


app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.url} no encontrada` })
})

// errorHandler se pone al final
app.use(errorHandler)

app.listen(PUERTO, () => {
  console.log(`EJERCICO BACKEND GRUPO 3 - RPG en http://localhost:${PUERTO}`)
})

