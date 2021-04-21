const withOffline = require('next-offline')

module.exports = withOffline({
  redirects: async () => [
    {
      source: '/',
      destination: '/lists',
      permanent: false
    }
  ]
})
