const {
  readFileSync,
  writeFileSync
} = require('jsonfile')
const {
  join
} = require('path')

const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/')

const startUrl = `${owner}.github.io/${repo}`

const manifestPath = join(__dirname, 'public', 'app.webmanifest')

const manifest = readFileSync(manifestPath)
manifest.start_url = startUrl

writeFileSync(manifestPath, manifest, {
  spaces: 2
})
