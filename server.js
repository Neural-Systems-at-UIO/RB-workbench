
// Get modules that are needed for the server
const express = require('express');        // Express is a framework for creating web apps
const path = require('path');              // Path is used for creating file paths
const https = require('node:https');
const fs = require('fs');             // Needed for deleting files that are uploaded to server
const fileUpload = require('express-fileupload');
const bodyparser = require('body-parser'); // Body-parser is needed for parsing incoming request bodies
// This app is deployed on OpenShift, and containers in OpenShift should bind to
// any address, which is designated with 0.0.0.0 and use port 8080 by default

const ip = process.env.IP || '0.0.0.0';
const port = process.env.PORT || 8080;
var cors = require('cors');


const app = express();
app.use(cors())
app.use(fileUpload({
    createParentPath: true
}));


// Configure the renderer? 
app.set('view engine', 'ejs'); //Necessary??
app.set('views', path.join(__dirname, '/build'));  //Necessary??
app.use(express.static(path.join(__dirname, '/build')));


function print_statement(req, res) {
    console.log("Request received");
    const url = 'https://core.kg-ppd.ebrains.eu/v3-beta/instances?stage=RELEASED&type=https%3A%2F%2Fopenminds.ebrains.eu%2FcontrolledTerms%2FBiologicalSex'
    const options = { headers: { Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfNkZVSHFaSDNIRmVhS0pEZDhXcUx6LWFlZ3kzYXFodVNJZ1RXaTA1U2k0In0.eyJleHAiOjE2NjM5NDQzNjcsImlhdCI6MTY2MzMzOTU2NywiYXV0aF90aW1lIjoxNjYzMzM5NTY3LCJqdGkiOiIxZGU1ZWVjYi04ZGI1LTQwZWItYjAzMS0wODg2ZGU2NjU2MmUiLCJpc3MiOiJodHRwczovL2lhbS5lYnJhaW5zLmV1L2F1dGgvcmVhbG1zL2hicCIsInN1YiI6IjJjZTUwZWQ4LWY0MmItNDYwYi04NGY3LWZhNTdkMDhmZDJjOCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImtnLW5leHVzLXNlcnZpY2UiLCJzZXNzaW9uX3N0YXRlIjoiMGQwYTZkMjQtYTM3Mi00NGUyLTlkNzgtY2Y0NWQyZmRmZWM3IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL25leHVzLWlhbS5odW1hbmJyYWlucHJvamVjdC5vcmciLCJodHRwczovL25leHVzLWlhbS1pbnQuaHVtYW5icmFpbnByb2plY3Qub3JnIl0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCBvcGVuaWQgZ3JvdXAgY2xiLndpa2kucmVhZCIsInNpZCI6IjBkMGE2ZDI0LWEzNzItNDRlMi05ZDc4LWNmNDVkMmZkZmVjNyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiSGFycnkgQ2FyZXkiLCJtaXRyZWlkLXN1YiI6IjMwMzk4MjMxMTg0ODA0MDUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwb2xhcmJlYW4iLCJnaXZlbl9uYW1lIjoiSGFycnkiLCJmYW1pbHlfbmFtZSI6IkNhcmV5IiwiZW1haWwiOiJoYXJyeS5jYXJleUBtZWRpc2luLnVpby5ubyJ9.7jJDnMM0Rbb5TigP9e4sntob0CnApBD4E6RrvGtvamcNmCDvnhQWUr5M2aONH5-sU0RFg8hzPHwTFin6JkKdH6qFqYUDj51cR6q57fEHpqJM1Wt_sUEY69rkr3kUD4xvAEIbyOCVsPQb1R91GkwGrowhcaJJxk-g92UxpMdf9SXPSv6iuyUT9_1NQrwFQacSmaV1zmFkzKWe1Q7ADDbZIeZdZkJwiVVLUC9XTEKWUJfAPKtUCgAJbJ-rX11nH070d_vVavaQJe4MdGGcu0naY0n7kCpdZS6yi8Ecw4qAjYDMzi24vLIGV4nDmrz5yuHaxQEJh6YrbWbUej72aRYMyA" } };
    //fetch from api and return value
    fetch(url, options)
        .then(res => res.json())
        // console log the response
        .then(json => console.log(json))
        .then(json => res.send(json))
        .catch(err => console.error('error:' + err));

};

// a function which gets the data from the api and returns it to the frontend
// const get_data = async (req, res) => {
//     var column_values = ['BiologicalSex', 'AgeCategory', 'Species', 'Age', 'Weight', 'Strain', 'Pathology', 'Phenotype', 'Handedness', 'Laterality', 'Origin', 'Sampletype']
//     var list_of_keyvals = {}
//     var list_of_keyval_definitions = {}
//     for (var i = 0; i < column_values.length; i++) {
//         const url = 'https://core.kg-ppd.ebrains.eu/v3-beta/instances?stage=RELEASED&type=https%3A%2F%2Fopenminds.ebrains.eu%2FcontrolledTerms%2F' + column_values[i]
//         const options = { headers: { Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfNkZVSHFaSDNIRmVhS0pEZDhXcUx6LWFlZ3kzYXFodVNJZ1RXaTA1U2k0In0.eyJleHAiOjE2NjM5NDQzNjcsImlhdCI6MTY2MzMzOTU2NywiYXV0aF90aW1lIjoxNjYzMzM5NTY3LCJqdGkiOiIxZGU1ZWVjYi04ZGI1LTQwZWItYjAzMS0wODg2ZGU2NjU2MmUiLCJpc3MiOiJodHRwczovL2lhbS5lYnJhaW5zLmV1L2F1dGgvcmVhbG1zL2hicCIsInN1YiI6IjJjZTUwZWQ4LWY0MmItNDYwYi04NGY3LWZhNTdkMDhmZDJjOCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImtnLW5leHVzLXNlcnZpY2UiLCJzZXNzaW9uX3N0YXRlIjoiMGQwYTZkMjQtYTM3Mi00NGUyLTlkNzgtY2Y0NWQyZmRmZWM3IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL25leHVzLWlhbS5odW1hbmJyYWlucHJvamVjdC5vcmciLCJodHRwczovL25leHVzLWlhbS1pbnQuaHVtYW5icmFpbnByb2plY3Qub3JnIl0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCBvcGVuaWQgZ3JvdXAgY2xiLndpa2kucmVhZCIsInNpZCI6IjBkMGE2ZDI0LWEzNzItNDRlMi05ZDc4LWNmNDVkMmZkZmVjNyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiSGFycnkgQ2FyZXkiLCJtaXRyZWlkLXN1YiI6IjMwMzk4MjMxMTg0ODA0MDUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwb2xhcmJlYW4iLCJnaXZlbl9uYW1lIjoiSGFycnkiLCJmYW1pbHlfbmFtZSI6IkNhcmV5IiwiZW1haWwiOiJoYXJyeS5jYXJleUBtZWRpc2luLnVpby5ubyJ9.7jJDnMM0Rbb5TigP9e4sntob0CnApBD4E6RrvGtvamcNmCDvnhQWUr5M2aONH5-sU0RFg8hzPHwTFin6JkKdH6qFqYUDj51cR6q57fEHpqJM1Wt_sUEY69rkr3kUD4xvAEIbyOCVsPQb1R91GkwGrowhcaJJxk-g92UxpMdf9SXPSv6iuyUT9_1NQrwFQacSmaV1zmFkzKWe1Q7ADDbZIeZdZkJwiVVLUC9XTEKWUJfAPKtUCgAJbJ-rX11nH070d_vVavaQJe4MdGGcu0naY0n7kCpdZS6yi8Ecw4qAjYDMzi24vLIGV4nDmrz5yuHaxQEJh6YrbWbUej72aRYMyA" } };
//         //fetch from api and return value
//         const data = fetch(url, options)
//             .then(res => res.json())
//             // console log the response
//             .then(json => { return json })
//         const e = await data;
//         // add the option names to a list
//         var list_of_names = []
//         var list_of_definitions = []
//         for (var j = 0; j < e["data"].length; j++) {
//             list_of_names.push(e["data"][j]["https://openminds.ebrains.eu/vocab/name"])
//             list_of_definitions.push(e["data"][j]["https://openminds.ebrains.eu/vocab/definition"])

//         }
//         Object.assign(list_of_keyvals, { [column_values[i]]: list_of_names })
//         Object.assign(list_of_keyval_definitions, { [column_values[i]]: list_of_definitions })
//     };
//     // console log the list of keyvals
//     console.log(list_of_keyvals)
//     // write object to json file 
//     // fs.writeFile('src/metadata.json', JSON.stringify(list_of_keyvals), (err) => {
//     //     if (err) throw err;
//     //     console.log('The file has been saved!');
//     // });
//     // fs.writeFile('src/metadata-definitions.json', JSON.stringify(list_of_keyval_definitions), (err) => {
//     //     if (err) throw err;
//     //     console.log('The file has been saved!');
//     // });
//     // return the list of keyvals and definitions
//     return [list_of_keyvals, list_of_keyval_definitions]

// }
// get_data()
// run get_data once per day
// setInterval(get_data, 86400000);
// function that gets from api and returns to frontend

// This is the route that the frontend will use to get the data from the api

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
// https.createServer(
//     {
// 	key:fs.readFileSync('/etc/letsencrypt/live/www.brainalign.org/privkey.pem'),
// 	cert:fs.readFileSync('/etc/letsencrypt/live/www.brainalign.org/cert.pem'),
// 	ca:fs.readFileSync('/etc/letsencrypt/live/www.brainalign.org/fullchain.pem')},
// 	app).listen(port)
// Serve the react app for the default (/) route
app.get('/', function (req, res) {
    res.render('index.html')
});

// api endpoint for getting the data from the api
app.get('/get_metadata', function (req, res) {
    // get the metadata from get_data and send it to the frontend
    // get_data().then(function (result) {
    //     res.send(result)
    // })
});


