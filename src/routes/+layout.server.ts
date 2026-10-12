import { loadCollection } from '$lib/server/content';
import { calendarDateSchema } from '$lib/content/schema';
import metadata from '../../content/site.json';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  const collection = await loadCollection({ demo: process.env.INCIDENTS_DEMO === '1' });
  return {
    incidents: collection.incidents,
    providers: collection.providers,
    demo: collection.demo,
    updatedDate: calendarDateSchema.parse(metadata.updatedDate)
  };
};
