
// Get modules that are needed for the server
const express = require('express');        // Express is a framework for creating web apps
const path = require('path');              // Path is used for creating file paths
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
    const url = 'https://core.kg-ppd.ebrains.eu/v3-beta/instances?stage=RELEASED&type=https%3A%2F%2Fopenminds.ebrains.eu%2FcontrolledTerms%2FBiologicalSex'
    const options = { headers: { Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfNkZVSHFaSDNIRmVhS0pEZDhXcUx6LWFlZ3kzYXFodVNJZ1RXaTA1U2k0In0.eyJleHAiOjE2NjMwNzkyMDUsImlhdCI6MTY2MjQ3NDQwNSwiYXV0aF90aW1lIjoxNjYyNDc0NDA1LCJqdGkiOiI1MzllMTM1My0wMDlmLTRiM2QtYTY2NC1mZGQxMDYxNDVhODgiLCJpc3MiOiJodHRwczovL2lhbS5lYnJhaW5zLmV1L2F1dGgvcmVhbG1zL2hicCIsInN1YiI6IjJjZTUwZWQ4LWY0MmItNDYwYi04NGY3LWZhNTdkMDhmZDJjOCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImtnLW5leHVzLXNlcnZpY2UiLCJzZXNzaW9uX3N0YXRlIjoiN2ZhZTZhNjAtMDI5My00NzA5LTg3YTYtNDA3ZTRmNjYzMTA4IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL25leHVzLWlhbS5odW1hbmJyYWlucHJvamVjdC5vcmciLCJodHRwczovL25leHVzLWlhbS1pbnQuaHVtYW5icmFpbnByb2plY3Qub3JnIl0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCBvcGVuaWQgZ3JvdXAgY2xiLndpa2kucmVhZCIsInNpZCI6IjdmYWU2YTYwLTAyOTMtNDcwOS04N2E2LTQwN2U0ZjY2MzEwOCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiSGFycnkgQ2FyZXkiLCJtaXRyZWlkLXN1YiI6IjMwMzk4MjMxMTg0ODA0MDUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwb2xhcmJlYW4iLCJnaXZlbl9uYW1lIjoiSGFycnkiLCJmYW1pbHlfbmFtZSI6IkNhcmV5IiwiZW1haWwiOiJoYXJyeS5jYXJleUBtZWRpc2luLnVpby5ubyJ9.maWm9G_n0vqNYOEXqlgoKOjVgWzLpQyLwM7KNHZoba122ljShcDDwE7uVYbS8Huj2HL88zFweCA7N01TKXLFigP6NkX8t_2IJ84lmxtb2oyics_YEUgRiNoPvxJC7nkOWQLmvQrg88rC0LKk8-NInh2JmGjaCncbaXjiA4UuBC502gIxBuIFWg28LnWg13X_xPmh-DPm3We6kXrSSXgdq5IAv2nebcBcSgyYuWoxOvAjkZf88s2jM6oxTXJprXcJpW7Hp5JRmi5Y0fDKgn8WV1FtVgcFD3DHLhZBEYSMW3h5OWTZMNZF9gNmEVl6Tgbt9_NwHeVMO5k2I8JpbjOYww" } };
    //fetch from api and return value
    fetch(url, options)
        .then(res => res.json())
        // console log the response
        .then(json => console.log(json))
        .then(json => res.send(json))
        .catch(err => console.error('error:' + err));

};

// a function which gets the data from the api and returns it to the frontend
const get_data = async (req, res) => {
    var column_values = ['BiologicalSex', 'AgeCategory', 'Species', 'Age', 'Weight', 'Strain', 'Pathology', 'Phenotype', 'Handedness', 'Laterality', 'Origin', 'Sampletype']
    var list_of_keyvals = {}
    for (var i = 0; i < column_values.length; i++) {
        const url = 'https://core.kg-ppd.ebrains.eu/v3-beta/instances?stage=RELEASED&type=https%3A%2F%2Fopenminds.ebrains.eu%2FcontrolledTerms%2F' + column_values[i]
        const options = { headers: { Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfNkZVSHFaSDNIRmVhS0pEZDhXcUx6LWFlZ3kzYXFodVNJZ1RXaTA1U2k0In0.eyJleHAiOjE2NjMwNzkyMDUsImlhdCI6MTY2MjQ3NDQwNSwiYXV0aF90aW1lIjoxNjYyNDc0NDA1LCJqdGkiOiI1MzllMTM1My0wMDlmLTRiM2QtYTY2NC1mZGQxMDYxNDVhODgiLCJpc3MiOiJodHRwczovL2lhbS5lYnJhaW5zLmV1L2F1dGgvcmVhbG1zL2hicCIsInN1YiI6IjJjZTUwZWQ4LWY0MmItNDYwYi04NGY3LWZhNTdkMDhmZDJjOCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImtnLW5leHVzLXNlcnZpY2UiLCJzZXNzaW9uX3N0YXRlIjoiN2ZhZTZhNjAtMDI5My00NzA5LTg3YTYtNDA3ZTRmNjYzMTA4IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL25leHVzLWlhbS5odW1hbmJyYWlucHJvamVjdC5vcmciLCJodHRwczovL25leHVzLWlhbS1pbnQuaHVtYW5icmFpbnByb2plY3Qub3JnIl0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCBvcGVuaWQgZ3JvdXAgY2xiLndpa2kucmVhZCIsInNpZCI6IjdmYWU2YTYwLTAyOTMtNDcwOS04N2E2LTQwN2U0ZjY2MzEwOCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiSGFycnkgQ2FyZXkiLCJtaXRyZWlkLXN1YiI6IjMwMzk4MjMxMTg0ODA0MDUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwb2xhcmJlYW4iLCJnaXZlbl9uYW1lIjoiSGFycnkiLCJmYW1pbHlfbmFtZSI6IkNhcmV5IiwiZW1haWwiOiJoYXJyeS5jYXJleUBtZWRpc2luLnVpby5ubyJ9.maWm9G_n0vqNYOEXqlgoKOjVgWzLpQyLwM7KNHZoba122ljShcDDwE7uVYbS8Huj2HL88zFweCA7N01TKXLFigP6NkX8t_2IJ84lmxtb2oyics_YEUgRiNoPvxJC7nkOWQLmvQrg88rC0LKk8-NInh2JmGjaCncbaXjiA4UuBC502gIxBuIFWg28LnWg13X_xPmh-DPm3We6kXrSSXgdq5IAv2nebcBcSgyYuWoxOvAjkZf88s2jM6oxTXJprXcJpW7Hp5JRmi5Y0fDKgn8WV1FtVgcFD3DHLhZBEYSMW3h5OWTZMNZF9gNmEVl6Tgbt9_NwHeVMO5k2I8JpbjOYww" } };
        //fetch from api and return value
        const data = fetch(url, options)
            .then(res => res.json())
            // console log the response
            .then(json => { return json })
        const e = await data;
        // add the option names to a list
        var list_of_names = []
        for (var j = 0; j < e["data"].length; j++) {
            list_of_names.push(e["data"][j]["https://openminds.ebrains.eu/vocab/name"])
        }
        Object.assign(list_of_keyvals, { [column_values[i]]: list_of_names })
    };
    // console log the list of keyvals
    console.log(list_of_keyvals)
    // write object to json file 
    fs.writeFile('src/metadata.json', JSON.stringify(list_of_keyvals), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}
get_data()
// run get_data once per day
setInterval(get_data, 86400000);
// function that gets from api and returns to frontend

// This is the route that the frontend will use to get the data from the api

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// Serve the react app for the default (/) route
app.get('/', function (req, res) {
    res.render('index.html')
});

