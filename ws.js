const url = require('url');
const WebSocket = require('ws');
const HttpsProxyAgent = require('https-proxy-agent');
require('dotenv').config()

// ENDPOINT = 'ws://localhost:3000/echo', http_proxy = 'http://127.0.0.1:8080'
const { ENDPOINT, http_proxy } = process.env;
console.log(`endpoint: ${ENDPOINT}, http proxy: ${http_proxy}`);

let wsOpts = {
  protocol: 'binary'
};

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
