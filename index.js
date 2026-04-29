require('dotenv').config()
const express      = require('express')
const logger       = require('./src/middleware/logger')
const errorHandler = require('./src/middleware/errorHandler')

const app  = express()
const PUERTO = Number(process.env.PORT) || 3000

app.use(express.json())
app.use(logger)

app.use('/api/personajes', require('./src/routes/personajes'))
app.use('/api/combates',   require('./src/routes/combates'))


app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.url} no encontrada` })
})


app.use(errorHandler)

app.listen(PUERTO, () => {
  console.log(`EJERCICO BACKEND GRUPO 3 - RPG en http://localhost:${PUERTO}`)
})

