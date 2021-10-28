const url = require('url');
const WebSocket = require('ws');
const HttpsProxyAgent = require('https-proxy-agent');
require('dotenv').config()


const { ENDPOINT = 'ws://localhost:3000/echo' } = process.env;
console.log(`trying to connect ${ENDPOINT}`);

let wsOpts = {
  protocol: 'binary'
};

const { http_proxy } = process.env;
if( http_proxy ){
  console.log(`using http proxy agent`);
  const parsed = url.parse(ENDPOINT);
  const opts = url.parse(http_proxy);
  opts.secureEndpoint = (parsed.protocol == 'wss:');

  const agent = new HttpsProxyAgent(opts);
  wsOpts.agent=agent;
}

const ws = new WebSocket(ENDPOINT, wsOpts);

// https://github.com/websockets/ws#use-the-nodejs-streams-api
const duplex = WebSocket.createWebSocketStream(ws, { encoding: 'utf8' });

duplex.pipe(process.stdout);
process.stdin.pipe(duplex);
