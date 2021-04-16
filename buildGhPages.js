const {
  readFileSync,
  writeFileSync
} = require('jsonfile')
const {
  join
} = require('path')

const repo = process.env.GITHUB_REPOSITORY !== undefined &&process.env.GITHUB_REPOSITORY.split('/')[1]

const startUrl = `/${repo || ''}`

console.log('Start Url:', startUrl)

const manifestPath = join(__dirname, 'public', 'app.webmanifest')

console.log('Manifest Path', manifestPath)

console.log('Reading File')

const manifest = readFileSync(manifestPath)
manifest.start_url = startUrl

console.log('Writing File')

writeFileSync(manifestPath, manifest, {
  spaces: 2
})

console.log('Done')
