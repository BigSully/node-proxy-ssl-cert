const fetch = require('node-fetch');

let directfetch = async url => {
  const response = await fetch(url);
  const body = await response.text();

  return body;
}

let proxyfetch = async (url, proxyOpts) => {
  const HttpsProxyAgent = require('https-proxy-agent');
  const proxyAgent = new HttpsProxyAgent(proxyOpts);
  const response = await fetch(url, { agent: proxyAgent});
  const body = await response.text();

  return body;
}



(async () => {
  let { ENDPOINT: endpoint, http_proxy: httpProxy } = process.env;

  let r1 = await directfetch(endpoint);
  console.log(`direct fetch: ${r1}`);

  let r2 = await proxyfetch(endpoint, httpProxy);
  console.log(`proxied fetch: ${r2}`)

})();
