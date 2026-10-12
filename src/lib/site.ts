export const site = {
  name: 'Agent incidents',
  origin: 'https://agent-incidents.com',
  description: 'Public reports of AI agents taking unexpected actions, with sources and separate incident and reporting dates.',
  contactEmail: 'agent-incidents@jowimo.com',
  plannedEmail: 'tips@agent-incidents.com',
  plannedEmailStatus: 'setup-pending'
} as const;
export const canonicalUrl = (path: string) => new URL(path, site.origin).href;
