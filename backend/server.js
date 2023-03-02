
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
const fs = require('fs')

console.log('env', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  
  var app = require('https-localhost')()
  
}
else {
  var app = express()
}
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
require("dotenv").config();

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
  console.log('metadata')
  // get the metadata from get_data and send it to the frontend
  // get_data().then(function (result) {
  //     res.send(result)
  // })
})


function get_token(code, res) {
  var target_url =
    "https://iam.ebrains.eu/auth/realms/hbp/protocol/openid-connect/token";
  //
  if (process.env.NODE_ENV === "production") {
    redirect_uri = process.env.REACT_APP_PROD_URL;
  }
  else if (process.env.NODE_ENV === "development") {
    redirect_uri = process.env.REACT_APP_DEV_URL;
  }
  console.log(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.CLIENT_ID,
    code: code,
    client_secret: process.env.CLIENT_SECRET,
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
      // ;
      // 
      // console.log(error)
      // ;
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
        // ;
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
    let user_projects = projects.map((project) => {
      if (project.owner === user) {
        return project
      }
    }
    )
    console.log('user', user)
    console.log('user projects: ', user_projects)
    resolve(user_projects)

  })

}

function set_project(user, project, description) {
  console.log('-------------------------------------')
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
    projects.push({ owner: user, title: project, description: description})
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
    result["ActiveTableName"] = 'Subject'
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
  set_project(user, project, description).then(function (result) {
    res.send(result)
  })
})
app.use(express.static(path.resolve(__dirname, '../build/')));


app.listen(port, () => console.log(`Listening on port ${port}`))
