const bedrock = require('bedrock-protocol');
const { SocksClient } = require('socks');

// 1. Get a free SOCKS5 proxy from an online provider (like Webshare)
const proxyOptions = {
  proxy: {
    host: 'YOUR_PROXY_IP_ADDRESS', // Enter proxy server address
    port: 1080,                   // Enter proxy port (usually 1080 or 8080)
    type: 5                       // Type 5 specifies SOCKS5
  },
  command: 'connect',
  destination: {
    host: 'DragonBallzSMP.aternos.me', // Your Aternos connection address
    port: 19132                       // Minecraft Bedrock default port
  }
};

// 2. Establish the proxy tunnel before launching the client connection
SocksClient.createConnection(proxyOptions)
  .then(info => {
    console.log('Proxy tunnel successfully established.');
    
    const client = bedrock.createClient({
      // Pass the established proxy socket directly to Bedrock
      socket: info.socket, 
      host: 'DragonBallzSMP.aternos.me',
      port: 19132,
      username: 'PLAYDragonBallJ',
      offline: false
    });

    client.on('join', () => {
      console.log('PLAYDragonBallJ has successfully entered the game!');
    });

    client.on('error', (err) => {
      console.error('Bedrock client error:', err);
    });
  })
  .catch(err => {
    console.error('Failed to connect through proxy network:', err);
  });
