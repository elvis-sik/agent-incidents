// The website serves static assets and a static 404 page.
export default {
  fetch(request: Request, env: Env): Promise<Response> {
    return env.ASSETS.fetch(request);
  }
} satisfies ExportedHandler<Env>;
