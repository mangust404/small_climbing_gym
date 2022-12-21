const express = require('express')
const app = express()
const HOST = '0.0.0.0'
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.listen(PORT, HOST, () => {
  console.log(`Listening on ${HOST}:${PORT}`)
})