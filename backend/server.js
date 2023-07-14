// Get modules that are needed for the server
const express = require('express') // Express is a framework for creating web apps
const path = require('path') // Path is used for creating file paths
// const https = require('node:https');
// const fs = require('fs');             // Needed for deleting files that are uploaded to server
const fileUpload = require('express-fileupload')
// This app is deployed on OpenShift, and containers in OpenShift should bind to
// any address, which is designated with 0.0.0.0 and use port 8080 by default
const bodyParser = require('body-parser')
// const ip = process.env.IP || '0.0.0.0'
const port = process.env.PORT || 8080
const cors = require('cors')
const axios = require('axios')
const dotenv = require("dotenv")
const fs = require('fs')

console.log('env', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  var app = require('https-localhost')()
}
else {
  var app = express()
}

// Get environment variables from .env file
dotenv.config();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// cors enables cross origin resource sharing
cors({origin: '*'})
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors())
app.use(fileUpload({
  createParentPath: true
}))


app.get('/', function (req, res) {
  if (process.env.NODE_ENV === 'development') {
    // send user to localhost:3000
    res.redirect('https://localhost:3000' + req.url)
  }
  else {
    res.sendFile(path.resolve(__dirname, '../build/', 'index.html'), (err) => { console.log(err) }) 
  }

})
app.get('/app', function (req, res) {
  if (process.env.NODE_ENV === 'development') {
    // send user to localhost:3000
    res.redirect('https://localhost:3000' + req.url)
  }
  else {
    res.sendFile(path.resolve(__dirname, '../build/', 'index.html'), (err) => { console.log(err) }) 
  }

})


// api endpoint for getting the data from the api
app.get('/get_metadata', function (req, res) {
  // get the metadata from get_data and send it to the frontend
  // get_data().then(function (result) {
  //     res.send(result)
  // })
})


function get_token(code, res) {
  var target_url =
    "https://iam.ebrains.eu/auth/realms/hbp/protocol/openid-connect/token";
  //
 
  redirect_uri = process.env.REACT_APP_OIDC_CLIENT_REDIRECT_URL;
  
  console.log(process.env.REACT_APP_WORKBENCH_OIDC_CLIENT_ID, process.env.REACT_APP_WORKBENCH_OIDC_CLIENT_SECRET)
  console.log('redirect_uri:', redirect_uri)
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.REACT_APP_WORKBENCH_OIDC_CLIENT_ID,
    code: code,
    client_secret: process.env.REACT_APP_WORKBENCH_OIDC_CLIENT_SECRET,
    redirect_uri: `${redirect_uri}/app`,
  });
  
  // make POST request to get token
  axios({
    method: "post",
    url: target_url,
    data: params.toString(),
    config: {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  })
    .then((response) => {
      // send token to client
      //
      let token = response.data["access_token"];

      // set status to 200
      res.status(response.status);

      res.send(token);
    })
    .catch((error) => {
      res.status(error.response.status);
      res.send(error);
    });


}



app.get('/auth', function (req, res) {
  // get the code from the url
  var code = req.query.code; 
  get_token(code, res)
})

function GetUser(token) {
  // console.log('trying with token: ' + token)
  return new Promise((resolve, reject) => {
    requestURL = `https://core.kg.ebrains.eu/v3/users/me`;
    axios.get(requestURL, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(function (result) {
        resolve(result);
      })
      .catch(function (error) {
        console.log(error)
        reject(error);
      }
      );
  })

}
app.get('/getuser', function (req, res) {
  // get token from authorization header
  var token = req.headers.authorization
  console.log(token)
  GetUser(token).then(function (result) {
    res.send(result.data)
  })
})


function get_projects(user) {
  return new Promise((resolve, reject) => {
    // read from local storage
    //  the path is ./persistent_storage/projects.json
    // check if projects file exists
    if (!fs.existsSync('./persistent_storage/projects.json')) {
      // create the file
      fs.writeFileSync('./persistent_storage/projects.json', '[]')
    }

    let projects = JSON.parse(fs.readFileSync('./persistent_storage/projects.json', 'utf8'))
    let user_projects = projects.filter((project) => {
      if (project.owner === user) {
        return project
      }
    }
    )
    resolve(user_projects)

  })

}

function set_project(user, project, description, key, token) {
  console.log(user, project)
  return new Promise((resolve, reject) => {
    // read from local storage
    //  the path is ./persistent_storage/projects.json
    let projects = JSON.parse(fs.readFileSync('./persistent_storage/projects.json', 'utf8'))
    if (!fs.existsSync('./persistent_storage/projects.json')) {
      // create the file
      fs.writeFileSync('./persistent_storage/projects.json', '[]')
    }
    // add the project to the projects under the user
    projects.push({ key:key, owner: user, title: project, description: description})
    // write the projects to the local storage
    fs.writeFile('./persistent_storage/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        reject(err)
      }
      else {
        resolve('success')
      }
    })

  })
}

function edit_project(user, project, description, key) {
  return new Promise((resolve, reject) => {
    // read from local storage
    let projects = JSON.parse(fs.readFileSync('./persistent_storage/projects.json', 'utf8'))
    // find the project with the matching key
    let projectIndex = projects.findIndex(p => p.key === key)
    if (projectIndex === -1) {
      reject('Project not found')
    }
    else {
      // update the project with the new title and description
      projects[projectIndex].title = project
      projects[projectIndex].description = description
      // write the projects to the local storage
      fs.writeFile('./persistent_storage/projects.json', JSON.stringify(projects), (err) => {
        if (err) {
          reject(err)
        }
        else {
          resolve('success')
        }
      })
    }
  })
}
function writeTable(table, project, user) {
  return new Promise((resolve, reject) => {
    let folderPath = `./persistent_storage/${user}/`
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
    }
    let path = `./persistent_storage/${user}/${project}.json`
    // write the projects to the local storage
    fs.open(path, 'w', (err, fd) => {
      if(err) {
        console.log('Cannot open file: ' + err)
        reject(err)

      }
      else {
        fs.write(fd, table, (err) => {
          if(err) {
            console.log('Cannot write file: ' + err)
            reject(err)
          }
          else {
            resolve('success')
          }
        })
      }
  })
  })
  
}

function readTable (user, project) {
  let path = `./persistent_storage/${user}/${project}.json`
  return new Promise((resolve, reject) => {
    try{
      // check if the file exists
    if (!fs.existsSync(path)) {
      resolve(null)
     
    }
    else {
    let openFile = fs.readFileSync(path, 'utf8')
    let table = JSON.parse(openFile)
    resolve(table)
    }

    }
    catch(err) {
      console.log(err)
      reject(err)
    }

  })
}

function delete_project(user, project) {
  return new Promise((resolve, reject) => {
    let projects = JSON.parse(fs.readFileSync('./persistent_storage/projects.json', 'utf8'))
    console.log('user: ', user)
    console.log('project: ', project)
    console.log('projects: ', projects)
    let filtered_projects = projects.filter((proj) => {
      if (!((proj.owner == user) && (proj.title == project))) {
        return proj
      }
    }
    )

    // delete the project from the projects
 
    // write the projects to the local storage
    fs.writeFile('./persistent_storage/projects.json', JSON.stringify(filtered_projects), (err) => {
      if (err) {
        reject(err)
      }
      else {
        resolve('success')
      }
    })

  })
}

function initialise_collab(token, collabId) {
  
  return new Promise((resolve, reject) => {
    // collab creation endpoint
    let CollabURL = 'https://wiki.ebrains.eu/rest/v1/collabs';
    let body = {
      "name": collabId,
      "description": "This is a collab automatically generated by the EBRAINS workbench curation and registration tool, for any issues please contact harry.carey@medisin.uio.no",
      "title": collabId,
      "drive": false,
      "chat": false,
      "public": true,
    };
    console.log(body)
    let headers = {
      'Content-Type': 'application/json',
      'accept': '*/*',
      'Authorization': 'Bearer ' + token
    };
    
    let req = axios.post(CollabURL, body, { headers: headers })
    console.log('posted')
    req.then((response) => {
      console.log(response)
      let dataproxyURL = "https://data-proxy.ebrains.eu/api/v1/buckets"
      let body = {
        "bucket_name": collabId,
      }
      let headers = {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': 'Bearer ' + token
      };
      console.log('headers: ', headers)
      
      setTimeout(() => {
        let req = axios.post(dataproxyURL, body, { headers: headers })
        req.then((response) => {
          dataproxyURL = `https://data-proxy.ebrains.eu/api/v1/buckets/${collabId}`
          body = {
            is_public: true
          }
          let req = axios.put(dataproxyURL, body, { headers: headers })
        })
        req.catch((err) => {
          console.log(err)
        })
      }, 8000)
      
    })
    req.catch((err) => {
      console.log(err)
    }
    )
  })
}



// await fetch("https://data-proxy.ebrains.eu/api/v1/buckets", {
//     "credentials": "include",
//     "headers": {
//         "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0",
//         "Accept": "*/*",
//         "Accept-Language": "en-US,en;q=0.5",
//         "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfNkZVSHFaSDNIRmVhS0pEZDhXcUx6LWFlZ3kzYXFodVNJZ1RXaTA1U2k0In0.eyJleHAiOjE2ODg0ODM4MTAsImlhdCI6MTY4ODA0MTQ5MCwiYXV0aF90aW1lIjoxNjg3ODc5MDEwLCJqdGkiOiJkNmY0NTFkYi0yMzUxLTRkMWYtYjQ3YS0zZmJjYjA4NzZjZTkiLCJpc3MiOiJodHRwczovL2lhbS5lYnJhaW5zLmV1L2F1dGgvcmVhbG1zL2hicCIsImF1ZCI6WyJ4d2lraSIsInRlYW0iXSwic3ViIjoiMmNlNTBlZDgtZjQyYi00NjBiLTg0ZjctZmE1N2QwOGZkMmM4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiTG9jYWxEZXZlbG9wbWVudFNlcnZlciIsInNlc3Npb25fc3RhdGUiOiI1ZDBlY2ZlNy1kMzc5LTQ0ODEtODRjNi02NTNhODI0ZWU4ZDAiLCJhY3IiOiIwIiwic2NvcGUiOiJwcm9maWxlIGNsYi53aWtpLndyaXRlIHJvbGVzIGVtYWlsIG9wZW5pZCBjbGIud2lraS5yZWFkIHRlYW0iLCJzaWQiOiI1ZDBlY2ZlNy1kMzc5LTQ0ODEtODRjNi02NTNhODI0ZWU4ZDAiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkhhcnJ5IENhcmV5IiwibWl0cmVpZC1zdWIiOiIzMDM5ODIzMTE4NDgwNDA1IiwicHJlZmVycmVkX3VzZXJuYW1lIjoicG9sYXJiZWFuIiwiZ2l2ZW5fbmFtZSI6IkhhcnJ5IiwiZmFtaWx5X25hbWUiOiJDYXJleSIsImVtYWlsIjoiaGFycnkuY2FyZXlAbWVkaXNpbi51aW8ubm8ifQ.kL6Y-r3XIsMIfmAdY35ZY8zW3qKqzjOknL555T3ZiZ2zgPlwdGYDwIeUwlXAwHk5yJh-GkDCtdktFv2bOstDXtplDQ_pdfgFsSZd2_tYbdiFRQq0DcgrZrA96vFPgkqsvd8b-CZnTGHIBSse8h89FcPOkiVY0cgqeWGiSKjUIuqABx_T5OeoV1aSaDvRzIkTYTVIhsd2JFEGcgNTOZacnkEgXbu_pmJsH5TYBIlIiruI1BU7v7XtYqzwhdEawk0vVuvGnx2rxvwvHFvj02JkLrBXiRWZwzYyw1SfawGxs_AmxWHsJPOLPjpHlQ9kpW-TVZdyxAj_lIYRe1K1YauIdw",
//         "Content-Type": "application/json",
//         "Sec-Fetch-Dest": "empty",
//         "Sec-Fetch-Mode": "cors",
//         "Sec-Fetch-Site": "same-origin"
//     },
//     "referrer": "https://data-proxy.ebrains.eu/api/docs",
//     "body": "{\n  \"bucket_name\": \"c0a98079-1468-987-9321-b6e7475f3276\"\n}",
//     "method": "POST",
//     "mode": "cors"
// });




app.post('/delete_project', function (req, res) {
  let project = req.body.project
  let user = req.body.user
  delete_project(user, project).then(function (result) {
    res.send('ok')
  })
})

app.post('/writeTable', function (req, res) {
  let table = req.body.table
  let project = req.body.project
  let user = req.body.user
  // convert the table to a string
  table = JSON.stringify(table)
  writeTable(table, project, user).then(function (result) {
    res.send(result)
  })
})


app.get('/readTable', function (req, res) {
  let project = req.query.project
  let user = req.query.user
  readTable(user, project).then(function (result) {
    if (result === null) {
      res.send(JSON.stringify('no table'))
    }
    else {
      res.send(result)
    }
  })
})


app.get('/get_projects', function (req, res) {
  console.log('here')
  console.log(req.method)
  let user = req.query.user
  get_projects(user).then(function (result) {
    res.send(result)
  })
})

app.post('/set_project', function (req, res) {

  let user = req.body.user
  let project = req.body.project
  let description = req.body.description
  let key = req.body.key
  let token = req.headers.authorization
  initialise_collab(token, key)
  console.log('set project token is ', token)
  set_project(user, project, description, key, token).then(function (result) {
    res.send(result)
  })
})


app.post('/edit_project', function (req, res) {
  let user = req.body.user
  let project = req.body.project
  let description = req.body.description
  let key = req.body.key
  edit_project(user, project, description, key).then(function (result) {
    res.send(result)
  })
})

app.use(express.static(path.resolve(__dirname, '../build/')));


app.listen(port, () => console.log(`Listening on port ${port}`))
