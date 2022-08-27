import GhostContentAPI from '@tryghost/content-api'

// Create API instance with site credentials
const ghostClient = new GhostContentAPI({
  url: process.env.GHOST_CONTENT_API_URL!,
  key: process.env.GHOST_CONTENT_API_KEY!,
  version: 'v5.0',
})

export default ghostClient
