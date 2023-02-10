
// Get modules that are needed for the server
const express = require('express') // Express is a framework for creating web apps
const path = require('path') // Path is used for creating file paths
// const https = require('node:https');
// const fs = require('fs');             // Needed for deleting files that are uploaded to server
const fileUpload = require('express-fileupload')
// This app is deployed on OpenShift, and containers in OpenShift should bind to
// any address, which is designated with 0.0.0.0 and use port 8080 by default

// const ip = process.env.IP || '0.0.0.0'
const port = process.env.PORT || 8080
const cors = require('cors')

const app = express()
app.use(cors())
app.use(fileUpload({
  createParentPath: true
}))

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`))
// https.createServer(
// {
// key:fs.readFileSync('/etc/letsencrypt/live/www.brainalign.org/privkey.pem'),
// cert:fs.readFileSync('/etc/letsencrypt/live/www.brainalign.org/cert.pem'),
// ca:fs.readFileSync('/etc/letsencrypt/live/www.brainalign.org/fullchain.pem')},
// app).listen(port)
// Serve the react app for the default (/) route
app.get('/', function (req, res) {
  // res.render('index.html')
  // render index_dev.html from src/frontend/authentication
  res.sendFile(path.join(__dirname, '../frontend/authentication', 'index_dev.html'))
})

app.get('/app', function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'))
})

// api endpoint for getting the data from the api
app.get('/get_metadata', function (req, res) {
  // get the metadata from get_data and send it to the frontend
  // get_data().then(function (result) {
  //     res.send(result)
  // })
})
