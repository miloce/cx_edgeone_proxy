const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "*"
};

export async function onRequest({ request }) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS
    });
  }

  const incomingUrl = new URL(request.url);
  const targetPath = incomingUrl.pathname.replace(/^\/proxy/, "");
  const targetUrl = new URL(`https://mobilelearn.chaoxing.com${targetPath}${incomingUrl.search}`);

  const proxyRequest = new Request(targetUrl.toString(), request);
  proxyRequest.headers.set("Host", "mobilelearn.chaoxing.com");
  proxyRequest.headers.set("Referer", "https://mobilelearn.chaoxing.com");
  proxyRequest.headers.set("Origin", "https://mobilelearn.chaoxing.com");
  proxyRequest.headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36");

  const upstream = await fetch(proxyRequest);
  const headers = new Headers(upstream.headers);
  
  Object.entries(CORS_HEADERS).forEach(([key, value]) => headers.set(key, value));

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers
  });
}

export default onRequest;