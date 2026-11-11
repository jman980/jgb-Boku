const bedrock = require('bedrock-protocol')

const client = bedrock.createClient({
  host: 'DragonBallzSMP.aternos.me',
  // 1. Replace 19132 with the specific 5-digit DynIP port shown on your Aternos page
  port: 12345, 
  username: 'PLAYDragonBallJ',
  offline: false,
  auth: 'microsoft'
})

// 2. Add an explicit connection timeout override for Render's network
client.on('connect_allowed', () => {
  console.log('Handshake allowed, establishing RakNet tunnel...')
})
