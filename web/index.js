const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');

http.listen(80);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/features', (req, res) => {
  res.sendFile(`${__dirname}/features.html`);
});

io.on('connection', (socket) => {
  socket.on('stats', () => {
    let stats = JSON.parse(fs.readFileSync(__dirname + '/stats.json'));
    io.emit('stats', stats);
  });
});

app.on('listening', () => {
    console.log('Server online and listening for connections.');
});
