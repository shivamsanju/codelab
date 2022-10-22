import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';

const app = express();

const server = http.createServer(app);
const wss = new WebSocketServer({ server: server, clientTracking: true });

wss.on('connection', function connection(ws) {
  console.log('A new client connected');
  ws.send('connection: Welcome new client');

  ws.on('message', function incoming(message) {
    console.log('message received: ' + message);
    let sleep = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    sleep(500).then(() => {
      wss.clients.forEach((client) =>
        client.send(wss.clients + ' sent: ' + message)
      );
    });
  });
});

app.get('/', (req, res) => {
  return res.sendFile(process.cwd() + '/index.html');
});

server.listen(3000, () => {
  console.log('listening on port 3000');
});
