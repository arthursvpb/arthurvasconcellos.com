import { describe, expect, it } from 'vitest';
import { personalApps, type PersonalApp } from '@/lib/apps-registry';

describe('personalApps registry', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(personalApps)).toBe(true);
    expect(personalApps.length).toBeGreaterThan(0);
  });

  it('every entry has required fields and sane shapes', () => {
    for (const app of personalApps) {
      expect(app.slug).toMatch(/^[a-z0-9-]+$/);
      expect(app.name.length).toBeGreaterThan(0);
      expect(app.description.length).toBeGreaterThan(0);
      expect(app.href).toMatch(/^https:\/\/[a-z0-9-]+\.arthurvasconcellos\.com$/);
      expect(app.repo).toMatch(/^https:\/\/github\.com\/arthursvpb\/[a-z0-9-]+$/);
      expect(['live', 'beta', 'soon']).toContain(app.status);
    }
  });

  it('href subdomain matches slug so the routing contract stays consistent', () => {
    for (const app of personalApps) {
      expect(app.href).toBe(`https://${app.slug}.arthurvasconcellos.com`);
    }
  });

  it('slugs are unique', () => {
    const slugs = personalApps.map((a: PersonalApp) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
