export const prerender = true;
import { site } from '$lib/site';
export const GET = () => new Response(process.env.INCIDENTS_DEMO === '1' ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
