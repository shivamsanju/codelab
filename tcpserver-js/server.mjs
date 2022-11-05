import net from 'net';

const server = net.createServer((socket) => {
  console.log(
    'Tcp handshake successful with ' +
      socket.remoteAddress +
      ':' +
      socket.remotePort
  );
  socket.write('Hello client!');
  socket.on('data', (data) => {
    console.log('Recieved data: ' + data.toString());
  });

  socket.on('error', (e) => {
    console.log('Socket closed: ' + e.toString());
  });
});

server.listen(8000, '127.0.0.1');
