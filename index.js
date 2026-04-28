require('dotenv').config();
const express = require('express')
const app  = express();
const PUERTO = process.env.PORT || 3000;


app.use(express.json());
app.use('/personajes', require('./src/routes/personajes'));
app.use('/combates',   require('./src/routes/combates'))

app.listen(PUERTO, ()=>{
    console.log(`Servidor funcionando en puerto:`, PUERTO);
});

