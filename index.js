import bedrock from 'bedrock-protocol';
import http from 'http';

const CONFIG = {
  aternosIp: 'DragonBallzSMP.aternos.me', 
  aternosPort: 19132, 
  botGamertag: 'YourBotXboxGamerTag', // ⚠️ CHANGE THIS to your bot's Xbox Name
  motd: 'Join here to play on DragonBallzSMP!'
};

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('DragonBallzSMP 24/7 Friends Tab Portal is running!\n');
});
server.listen(process.env.PORT || 10000, () => {
  console.log('Web heartbeat environment listening successfully.');
});

function startBedrockBroadcast() {
  console.log(`Connecting ${PLAYDragonBallJ} to DragonBallzSMP.aternos.me...`);
  
  const client = bedrock.createClient({
    host: CONFIG.aternosIp,
    port: CONFIG.aternosPort,
    username: PLAYDragonBallJ,
    offline: false, 
    skipPing: true
  });

  client.on('spawn', () => {
    console.log('===========================================================');
    console.log('🎉 SUCCESS! Your bot is now broadcasting over Xbox Live.');
    console.log(`👉 Tell players to add "${PLAYDragonBallJ}" on Xbox.`);
    console.log('They will see a "Join Game" button right on their Friends Tab!');
    console.log('===========================================================');
  });

  client.on('error', (err) => {
    console.error('Session encountered an infrastructure error:', err.message);
  });

  client.on('close', () => {
    console.log('Connection dropped. Restarting the Xbox broadcast loop in 20 seconds...');
    setTimeout(startBedrockBroadcast, 20000);
  });
}

startBedrockBroadcast();
