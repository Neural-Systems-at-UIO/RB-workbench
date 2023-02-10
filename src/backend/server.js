
// Get modules that are needed for the server
const express = require('express') // Express is a framework for creating web apps
const path = require('path') // Path is used for creating file paths
// const https = require('node:https');
// const fs = require('fs');             // Needed for deleting files that are uploaded to server
const fileUpload = require('express-fileupload')
const bodyparser = require('body-parser') // Body-parser is needed for parsing incoming request bodies
// This app is deployed on OpenShift, and containers in OpenShift should bind to
// any address, which is designated with 0.0.0.0 and use port 8080 by default

const ip = process.env.IP || '0.0.0.0'
const port = process.env.PORT || 8080
const cors = require('cors')

const app = express()
app.use(cors())
app.use(fileUpload({
  createParentPath: true
}))

function print_statement (req, res) {
  console.log('Request received')
  const url = 'https://core.kg-ppd.ebrains.eu/v3-beta/instances?stage=RELEASED&type=https%3A%2F%2Fopenminds.ebrains.eu%2FcontrolledTerms%2FBiologicalSex'
  const options = { headers: { Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfNkZVSHFaSDNIRmVhS0pEZDhXcUx6LWFlZ3kzYXFodVNJZ1RXaTA1U2k0In0.eyJleHAiOjE2NjM5NDQzNjcsImlhdCI6MTY2MzMzOTU2NywiYXV0aF90aW1lIjoxNjYzMzM5NTY3LCJqdGkiOiIxZGU1ZWVjYi04ZGI1LTQwZWItYjAzMS0wODg2ZGU2NjU2MmUiLCJpc3MiOiJodHRwczovL2lhbS5lYnJhaW5zLmV1L2F1dGgvcmVhbG1zL2hicCIsInN1YiI6IjJjZTUwZWQ4LWY0MmItNDYwYi04NGY3LWZhNTdkMDhmZDJjOCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImtnLW5leHVzLXNlcnZpY2UiLCJzZXNzaW9uX3N0YXRlIjoiMGQwYTZkMjQtYTM3Mi00NGUyLTlkNzgtY2Y0NWQyZmRmZWM3IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL25leHVzLWlhbS5odW1hbmJyYWlucHJvamVjdC5vcmciLCJodHRwczovL25leHVzLWlhbS1pbnQuaHVtYW5icmFpbnByb2plY3Qub3JnIl0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCBvcGVuaWQgZ3JvdXAgY2xiLndpa2kucmVhZCIsInNpZCI6IjBkMGE2ZDI0LWEzNzItNDRlMi05ZDc4LWNmNDVkMmZkZmVjNyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiSGFycnkgQ2FyZXkiLCJtaXRyZWlkLXN1YiI6IjMwMzk4MjMxMTg0ODA0MDUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwb2xhcmJlYW4iLCJnaXZlbl9uYW1lIjoiSGFycnkiLCJmYW1pbHlfbmFtZSI6IkNhcmV5IiwiZW1haWwiOiJoYXJyeS5jYXJleUBtZWRpc2luLnVpby5ubyJ9.7jJDnMM0Rbb5TigP9e4sntob0CnApBD4E6RrvGtvamcNmCDvnhQWUr5M2aONH5-sU0RFg8hzPHwTFin6JkKdH6qFqYUDj51cR6q57fEHpqJM1Wt_sUEY69rkr3kUD4xvAEIbyOCVsPQb1R91GkwGrowhcaJJxk-g92UxpMdf9SXPSv6iuyUT9_1NQrwFQacSmaV1zmFkzKWe1Q7ADDbZIeZdZkJwiVVLUC9XTEKWUJfAPKtUCgAJbJ-rX11nH070d_vVavaQJe4MdGGcu0naY0n7kCpdZS6yi8Ecw4qAjYDMzi24vLIGV4nDmrz5yuHaxQEJh6YrbWbUej72aRYMyA' } }
  // fetch from api and return value
  fetch(url, options)
    .then(res => res.json())
  // console log the response
    .then(json => console.log(json))
    .then(json => res.send(json))
    .catch(err => console.error('error:' + err))
};

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`))
// https.createServer(
//     {
// 	key:fs.readFileSync('/etc/letsencrypt/live/www.brainalign.org/privkey.pem'),
// 	cert:fs.readFileSync('/etc/letsencrypt/live/www.brainalign.org/cert.pem'),
// 	ca:fs.readFileSync('/etc/letsencrypt/live/www.brainalign.org/fullchain.pem')},
// 	app).listen(port)
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
