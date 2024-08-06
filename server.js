import { WebSocketServer } from 'ws';

const server = new WebSocketServer({ port: 8080 });
const clients = [];

server.on('connection', (ws) => {
  if (clients.length < 2) {
    const player = { ws, id: clients.length + 1 };
    clients.push(player);
    ws.send(JSON.stringify({ type: 'player', id: player.id }));

    if (clients.length === 2) {
      // Notify both players that the game can start
      clients.forEach(client => {
        client.ws.send(JSON.stringify({ type: 'start', message: 'Game starting!' }));
      });
    }
  } else {
    ws.send(JSON.stringify({ type: 'error', message: 'Game is full' }));
    ws.close();
  }

  ws.on('message', (message) => {
    // Ensure message is a string and is valid JSON
    if (typeof message === 'string') {
      try {
        const data = JSON.parse(message);
        // Broadcast the message to the other player
        clients.forEach(client => {
          if (client.ws !== ws) {
            client.ws.send(JSON.stringify(data));
          }
        });
      } catch (e) {
        console.error('Invalid JSON message format:', e);
      }
    } else {
      console.error('Received non-string message');
    }
  });

  ws.on('close', () => {
    const index = clients.findIndex(client => client.ws === ws);
    if (index !== -1) {
      clients.splice(index, 1);
      // Notify the other player that the opponent has left
      if (clients.length === 1) {
        clients[0].ws.send(JSON.stringify({ type: 'opponent_left', message: 'Opponent left the game' }));
      }
    }
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
