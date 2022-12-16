const download = require('download')
const fs = require('fs')
const path = require('path')
const unzipper = require('unzipper')

const target_url = "https://github.com/HumanBrainProject/openMINDS/raw/documentation/openMINDS-v3.zip"
// download the file in nodejs
download(target_url).then(data => {
      fs.writeFileSync('openMINDS-v3.zip', data)
  fs.createReadStream('openMINDS-v3.zip')
    .pipe(unzipper.Extract({ path: path.join(__dirname, 'openminds') }))
})
