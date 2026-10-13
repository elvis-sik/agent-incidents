/** Only the retired subdomain and www alias are migration entry points. */
const sourceHosts = new Set(['agent-incidents.jowimo.com', 'www.agent-incidents.com']);

export function redirectRequest(request: Request): Response {
  const target = new URL(request.url);
  if (!sourceHosts.has(target.hostname)) {
    return new Response('Unknown redirect host', { status: 404 });
  }
  target.protocol = 'https:';
  target.hostname = 'agent-incidents.com';
  target.port = '';
  // URL fragments stay in the browser and are not part of an HTTP request.
  target.hash = '';
  return new Response(null, { status: 308, headers: { Location: target.href } });
}

export default { fetch: redirectRequest } satisfies ExportedHandler;
