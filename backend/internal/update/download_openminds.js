// This module downloads the latest version of openMINDS from GitHub and unzips it to the data folder.

// Todo: 
// - Make function promise based  
// - Use https instead of download package
// - Only get instances and schema.tpl.json folders from openMINDS zip-file

const download = require('download')
//const https = require('https');
const fs = require('fs')
const path = require('path')
const unzipper = require('unzipper')

module.exports = downloadOpenMINDS;

function downloadOpenMINDS() {

  const TARGET_URL = 'https://github.com/HumanBrainProject/openMINDS/raw/documentation/openMINDS-v3.zip'
  const DOWNLOAD_DIR = path.join(__dirname, '..', '..', 'data')

  makeDirectory(DOWNLOAD_DIR)

  console.log('Downloading openMINDS...')

  // Download the openMINDS version
  download(TARGET_URL).then(data => {
    const tempFilePath = path.join(DOWNLOAD_DIR, 'openMINDS-v3.zip')
    
    fs.writeFile(tempFilePath, data, (err) => {
      if (err) { console.log(err) }
      console.log('Download completed')
      
      console.log('Unzipping folder...')
      fs.createReadStream(tempFilePath)
        .pipe(unzipper.Extract({ path: path.join(DOWNLOAD_DIR, 'openMINDS-v3') })
          .on('close', () => {console.log('Completed.'); deleteFile(tempFilePath)} )
        )
    })
  })
}

//* Helper functions *//
function makeDirectory(directoryPath) {
    // Create the directory if it does not exist and ignore the error if it already exists
    fs.mkdir(directoryPath, err => {
      if (err && err.code !== 'EEXIST') {
        throw err
      } 
    })
}

function deleteFile(filePath) {
  // Delete the file and log error if it fails
  fs.rm(filePath, (err) => {
    if (err) {
      console.log(err)
    }
  })
}



// Can we use https instead of download? Why does it not work?
// https.get(targetUrl, (res) => {
//   // Image will be stored at this path
//   const downloadPath = path.join(__dirname, 'data_test', 'openminds')

//   const filePath = fs.createWriteStream(downloadPath);
//   res.pipe(filePath);
//   filePath.on('finish', () => {
//       filePath.close();
//       fs.createReadStream('openMINDS-v3.zip')
//        .pipe(unzipper.Extract({ path: path.join(__dirname, 'data', 'openminds_unzipped') }))

//       console.log('Download Completed'); 
//   })
// })