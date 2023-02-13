
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

// console log the current directory

// change dir to be back two directories
// console.log that your server is up and running
// https.createServer(
// {
// key:fs.readFileSync('/etc/letsencrypt/live/www.brainalign.org/privkey.pem'),
// cert:fs.readFileSync('/etc/letsencrypt/live/www.brainalign.org/cert.pem'),
// ca:fs.readFileSync('/etc/letsencrypt/live/www.brainalign.org/fullchain.pem')},
// app).listen(port)
// Serve the react app for the default (/) route
// console.log(path.resolve(__dirname, '../build/static/'))
// app.use(express.static(path.resolve(__dirname, '../build/static/')));


app.get('/', function (req, res) {
  // res.render('index.html')
  console.log('runs')
  // render index_dev.html from src/frontend/authentication

  res.sendFile(path.join(__dirname, '../', 'src/', 'authentication', 'index_dev.html'))
})
// app cannot get the static files

app.get('/app', function (req, res) {
  console.log('here')

  res.sendFile(path.resolve(__dirname, '../build/', 'index.html'), (err) => { console.log(err) }) 

})



// api endpoint for getting the data from the api
app.get('/get_metadata', function (req, res) {
  console.log('metadata')
  // get the metadata from get_data and send it to the frontend
  // get_data().then(function (result) {
  //     res.send(result)
  // })
})

app.use(express.static(path.resolve(__dirname, '../build/')));


app.listen(port, () => console.log(`Listening on port ${port}`))
