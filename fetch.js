const fetch = require('node-fetch');

let directfetch = async ({ url }) => {
  const response = await fetch(url);
  const body = await response.text();

  return body;
}

let proxyfetch = async ({ url, httpProxy }) => {
  const HttpsProxyAgent = require('https-proxy-agent');
  const proxyAgent = new HttpsProxyAgent(httpProxy);
  const response = await fetch(url, { agent: proxyAgent});
  const body = await response.text();

  return body;
}



(async () => {
  let url = 'https://httpbin.org/ip';
  let httpProxy = 'http://127.0.0.1:8118';
  let r1 = await directfetch({url});
  console.log(`direct fetch: ${r1}`)

  let r2 = await proxyfetch({url, httpProxy});
  console.log(`proxied fetch: ${r2}`)

})();
