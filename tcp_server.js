const net = require('net');
const fs = require('fs');

const HOST = '127.0.0.1';
const PORT = 80;

let regex = /(GET)|(POST)|([\/]?\S+)/gm;

console.log(getCounter());

var server = net.createServer(function(socket) {
  let client = socket.remoteAddress + ":" + socket.remotePort;
  console.log(`Client "${client} connected.`);

  socket.on('data', (data) => {
    socket.write(dataHandler(data), () => {
      console.log('Client disconnected.');
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

function dataHandler(data, option) {
  let matches = (data.toString()).match(regex);
  let method = matches[0];
  let url = matches[1];

  if (method === "GET") {
    if (url === "/") {
      return buildHTML(`visitor count: ${count}`);
    } else if (url === "/visit") {
      count++;
      return buildHTML(`new visitor count: ${count}`);
    } else {
      return buildHTML(404);
    }
  }
}

function buildHTML(msg) {
  return `<html><body><h1>${msg}</h1></body></html>`;
}

function getCounter() {
  var obj;
  fs.readFileSync('./tcp_server.json', 'utf8', function (err, data) {
    if (err) throw err;
    console.log(obj);
    return obj = JSON.parse(data);
  });
}

function updateCounter() {
  fs.writeFile(json_file, JSON.stringify(getCounter(), null, 2), (err) => {
    if(err) {
      console.log(err);
    } else {
      console.log('tcp_server.json updated.');
    }
  })
}