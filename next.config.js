const withOffline = require('next-offline')

module.exports = withOffline({
  path: process.env.GITHUB_REPOSITORY !== undefined
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
    : '/'
})
