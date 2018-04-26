const net = require('net');
const fs = require('fs');

const HOST = '127.0.0.1';
const PORT = 80;

let req_regex = /(GET)|(POST)|([\/]?\S+)/gm;
let post_regex = /(counter=)|([0-9]\d+)/gm;

var server = net.createServer(function(socket) {
  socket.on('data', (data) => {
    let req = dataHandler(data);
    console.log(req);

    socket.write(reqHandler(req.method, req.url), () => {
      socket.end();
    });
  });

  socket.on('error', function(err) {
    console.error(err.stack);
  });
});

server.listen(PORT, HOST, function () {
  console.log(`Server running on localhost:${PORT}.`);
});

function dataHandler(data) {
  let matches = (data.toString()).match(req_regex);
  return {"method":matches[0], "url":matches[1]};
}

function reqHandler(method, url) {
  if (method === "GET") {
    if (url === "/") { return buildHTML('visitor count: ' + getCounter()); } 
    if (url === "/visit") { updateCounter(); return buildHTML('new visitor count: ' + getCounter()); }  
    if (url !== "/" || url !== "/visit") { return buildHTML(404); }
  } 
  
  if (method === "POST") {
    let matches = url.match(post_regex);
    if(matches[0] === "counter=" && !isNaN(matches[1]) && typeof matches[1] !== "undefined") {
      setCounter(parseInt(matches[1]));
      return buildHTML("POST REQUEST: VALUE SET.");
    } else {
      console.log("No valid counter value");
      return buildHTML("FAILED POST REQUEST");
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

function setCounter(val) {
  let obj = {"counter":val};
  fs.writeFileSync('./tcp_server.json', JSON.stringify(obj, null, 2), 'utf-8');
}