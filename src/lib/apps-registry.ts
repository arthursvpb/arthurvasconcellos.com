export type AppStatus = 'live' | 'beta' | 'soon';

export interface PersonalApp {
  slug: string;
  name: string;
  description: string;
  href: string;
  repo: string;
  status: AppStatus;
}

export const personalApps: PersonalApp[] = [
  {
    slug: 'invoice',
    name: 'Invoice Generator',
    description: 'Local-first invoice and cancellation PDFs for contractors.',
    href: 'https://invoice.arthurvasconcellos.com',
    repo: 'https://github.com/arthursvpb/invoice-generator',
    status: 'live',
  },
  {
    slug: 'url',
    name: 'URL Shortener',
    description: 'Short links with access counts and one-click CSV export.',
    href: 'https://url.arthurvasconcellos.com',
    repo: 'https://github.com/arthursvpb/av-url-shortener',
    status: 'live',
  },
];
