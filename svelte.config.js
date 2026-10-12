import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const output = process.env.INCIDENTS_DEMO === '1' ? 'build-demo' : 'build';

export default {
  preprocess: vitePreprocess(),
  kit: { adapter: adapter({ pages: output, assets: output, strict: true }) }
};
