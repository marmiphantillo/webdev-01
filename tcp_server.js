const net = require('net');
const fs = require('fs');

const HOST = '127.0.0.1';
const PORT = 80;

let regex = /(GET)|(POST)|([\/]?\S+)/gm;

var server = net.createServer(function(socket) {
  socket.once('data', (data) => {
    socket.write(dataHandler(data), () => {
      socket.end();
    })
  });

  socket.on('error', function(err) {
    console.error(err.stack);
  });
});

server.listen(PORT, HOST, function () {
  console.log(`Server running on localhost:${PORT}.`);
});

function dataHandler(data) {
  let matches = (data.toString()).match(regex);
  let method = matches[0];
  let url = matches[1];

  if (method === "GET") {
    if (url === "/") {
      return buildHTML('visitor count: ' + getCounter());
    } else if (url === "/visit") {
      updateCounter();
      return buildHTML('new visitor count: ' + getCounter());
    } else {
      return buildHTML(404);
    }
  }
}

function buildHTML(msg) {
  return `<html><body><h1>${msg}</h1></body></html>`;
}

function getCounter() {
  let obj = JSON.parse(fs.readFileSync('./tcp_server.json', 'utf8'));
  return obj.counter;
}

function updateCounter() {
  let newCounter = getCounter() + 1;
  let obj = {"counter":newCounter};
  fs.writeFileSync('./tcp_server.json', JSON.stringify(obj, null, 2), 'utf-8');
}