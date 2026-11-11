const bedrock = require('bedrock-protocol')

const targetHost = process.env.TARGET_HOST || 'DragonBallzSMP.aternos.me'
const targetPort = Number(process.env.TARGET_PORT || 19132)
const listenHost = process.env.LISTEN_HOST || '0.0.0.0'
const listenPort = Number(process.env.LISTEN_PORT || 19132)

if (!Number.isInteger(targetPort) || targetPort < 1 || targetPort > 65535) {
  throw new Error('TARGET_PORT must be a valid UDP port')
}

if (!Number.isInteger(listenPort) || listenPort < 1 || listenPort > 65535) {
  throw new Error('LISTEN_PORT must be a valid UDP port')
}

const server = new bedrock.Server({
  host: listenHost,
  port: listenPort,
  maxPlayers: 100,
  raknetBackend: 'jsp-raknet',
  motd: {
    motd: 'DragonBallz SMP',
    levelName: 'Connecting...'
  }
})

server.on('connect', (player) => {
  player.on('join', () => {
    console.log(`Transferring ${player.profile?.name || 'player'} to ${targetHost}:${targetPort}`)
    player.queue('transfer', {
      server_address: targetHost,
      port: targetPort,
      reload_world: true
    })
  })

  player.on('close', () => {
    console.log(`Lobby connection closed: ${player.profile?.name || 'player'}`)
  })
})

server.listen()
  .then(() => console.log(`Transfer lobby listening on ${listenHost}:${listenPort} (UDP)`))
  .catch((error) => {
    console.error('Failed to start transfer lobby:', error)
    process.exitCode = 1
  })
