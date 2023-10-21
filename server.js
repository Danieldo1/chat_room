
const http = require('http'); 
const CONSTANTS = require('./utils/constants.js');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');
const { log } = require('console');

const { PORT, CLIENT,SERVER } = CONSTANTS;

const server = http.createServer((req, res) => {
  const filePath = ( req.url === '/' ) ? '/public/index.html' : req.url;

  const extname = path.extname(filePath);
  let contentType = 'text/html';
  if (extname === '.js') contentType = 'text/javascript';
  else if (extname === '.css') contentType = 'text/css';

  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(`${__dirname}/${filePath}`, 'utf8').pipe(res);
});


const wsServer = new WebSocket.Server({ server });

wsServer.on('connection', ( socket) => {
  console.log('Client connected');

  socket.on('message', (data) => {

    const {type, payload} = JSON.parse(data);

    switch (type) {
      case CLIENT.MESSAGE.NEW_USER:
        const time= new Date().toLocaleString()
        payload.time=time
        const dataWTime={
          type: SERVER.BROADCAST.NEW_USER_WITH_TIME,
          payload
        }
        broadcast(JSON.stringify(dataWTime));
        break;
      case CLIENT.MESSAGE.NEW_MESSAGE:
        broadcast(data, socket);
        break;
      default:
     break
    }

    
  })
});

function broadcast(data, socketToOmit) {
  wsServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== socketToOmit) {
      client.send(data);
    }
  });
}

server.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${server.address().port}`);
});

