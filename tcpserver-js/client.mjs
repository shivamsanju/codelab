import net from 'net';

let client = new net.Socket();
client.connect(8000, '127.0.0.1', () => {
  console.log('Connected');
  for (let i = 0; i < 10000000; i += 1) {
    client.write('Hello Server ' + i + '\n');
  }
  //   client.destroy();
});

client.on('close', function () {
  console.log('Connection closed');
});
