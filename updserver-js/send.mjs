import dgram from 'dgram';

var client = dgram.createSocket('udp4');

client.send('Hello World!', 0, 12, 5500, '127.0.0.1', function (err, bytes) {
  client.close();
});
