import bedrock from 'bedrock-protocol';
import http from 'http';

const CONFIG = {
  aternosIp: 'DragonBallzSMP.aternos.me', 
  aternosPort: 19132, 
  botGamertag: 'PLAYDragonBallJ', 
  motd: 'Join here to play on DragonBallzSMP!',
  renderUrl: 'https://onrender.com' // ⚠️ REPLACE with your actual Render Web Service URL
};

// 1. RENDER WEB SERVER & PERMANENT KEEP-ALIVE LOOP
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('DragonBallzSMP 24/7 Friends Tab Portal is actively running!\n');
});

server.listen(process.env.PORT || 10000, () => {
  console.log('Web heartbeat environment listening successfully.');
});

// Self-pinging mechanism: Prevents Render free tier from sleeping
setInterval(() => {
  http.get(CONFIG.renderUrl, (res) => {
    console.log('Self-ping successful: Staying awake 24/7!');
  }).on('error', (err) => {
    console.error('Self-ping warning:', err.message);
  });
}, 300000); // Pings every 5 minutes


// 2. XBOX LIVE RECRUITMENT AND AUTOMATIC ROUTING ENGINE
function startBedrockBroadcast() {
  console.log(`Connecting ${CONFIG.botGamertag} to DragonBallzSMP.aternos.me...`);
  
  const client = bedrock.createClient({
    host: CONFIG.aternosIp,
    port: CONFIG.aternosPort,
    username: CONFIG.botGamertag,
    offline: false, 
    skipPing: true
  });

  let antiAfkInterval;

  client.on('spawn', () => {
    console.log('===========================================================');
    console.log('🎉 SUCCESS! Your bot is now broadcasting over Xbox Live.');
    console.log(`👉 Tell players to add "${CONFIG.botGamertag}" on Xbox.`);
    console.log('They will see a "Join Game" button right on their Friends Tab!');
    console.log('===========================================================');

    // Anti-AFK Loop: Sends a tiny movement or packet every 2 minutes so Aternos doesn't kick the bot
    antiAfkInterval = setInterval(() => {
      if (client.status === bedrock.ClientStatus.Playing) {
        // Send a blank chat command or swing animation packet to reset the server's idle kick timer
        client.write('animate', { action_id: 1, runtime_entity_id: client.entityId });
        console.log('Sent Anti-AFK heartbeat to Aternos server.');
      }
    }, 120000);
  });

  client.on('error', (err) => {
    console.error('Session encountered an infrastructure error:', err.message);
  });

  client.on('close', () => {
    console.log('Connection dropped. Clearing timers and restarting loop in 20 seconds...');
    clearInterval(antiAfkInterval);
    setTimeout(startBedrockBroadcast, 20000);
  });
}

// 3. START ENGINE
startBedrockBroadcast();
