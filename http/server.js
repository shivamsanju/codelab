// Create web server - http module
import http from 'http';
import fs from 'fs';

const PORT = 2000;
const HOSTNAME = 'localhost';

const home = fs.readFileSync('./index.html');

const server = http.createServer((req, res) => {
  if (req.url == '/') {
    return res.end(home);
  }
  if (req.url == '/about') {
    return res.end('About');
  }
  if (req.url == '/contact') {
    return res.end('Contact');
  }
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`server is listening on http://${HOSTNAME}:${PORT}`);
});
