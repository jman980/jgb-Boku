const bedrock = require('bedrock-protocol');

console.log("Connecting PLAYDragonBallJ to DragonBallzSMP.aternos.me...");

const client = bedrock.createClient({
  host: 'DragonBallzSMP.aternos.me', 
  port: 19132,                       
  username: 'PLAYDragonBallJ',
  offline: false 
});

client.on('join', () => {
  console.log('🎉 PLAYDragonBallJ has successfully entered the game!');
});

client.on('error', (err) => {
  console.error('Connection error:', err);
});

client.on('close', () => {
  console.log('Connection lost. Restarting bot setup...');
});
