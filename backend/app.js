require('dotenv').config()
const cors = require('cors')
const express = require('express')
const glob = require('glob')

const app = express();
const HOST = process.env.BACKEND_HOST || '0.0.0.0';
const PORT = process.env.BACKEND_PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Nothing is here, sorry')
});

// Attach path for every file in api folder
glob("./api/**/*.js", function (er, files) {
  files.forEach(function(file) {
    const item = file.substr(1).split('.js')[0];
    const [path, method] = item.split('.');

    console.log('using', method, path);
    app[method](path, (req, res) => {
      if ('production' != process.env.NODE_ENV) {
        console.log('[invoke ' + method + ' ' + path + ']', req.body);
      }
      const callback = require(file);
      if (callback && typeof(callback) == 'function') {
        return callback(req, res);
      }
      else {
        res.status(404).send({success: false});
      }
    });
  })
})

app.listen(PORT, HOST, () => {
  console.log(`Listening on ${HOST}:${PORT}`)
});