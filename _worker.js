// Deprecated entry kept only for compatibility reference.
// EdgeOne Pages Edge Functions should be placed under ./edge-functions.

export function onRequest() {
  return new Response("This project uses Edge Functions under /edge-functions.");
}

export default onRequest;