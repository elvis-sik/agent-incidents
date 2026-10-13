import { describe, expect, it } from 'vitest';
import { redirectRequest } from '../../workers/redirect';

describe('domain migration redirects', () => {
  it.each(['agent-incidents.jowimo.com', 'www.agent-incidents.com'])('preserves the path and encoded query for %s', (host) => {
    const response = redirectRequest(new Request(`http://${host}/incidents/a%2Fb/?q=tool%20use&value=a%2Bb&repeat=1&repeat=2`));
    expect(response.status).toBe(308);
    expect(response.headers.get('location')).toBe('https://agent-incidents.com/incidents/a%2Fb/?q=tool%20use&value=a%2Bb&repeat=1&repeat=2');
  });

  it('has one HTTPS destination, strips a development port and ignores redirect-like query values', () => {
    const response = redirectRequest(new Request('http://www.agent-incidents.com:8787/?next=https://example.org'));
    expect(response.headers.get('location')).toBe('https://agent-incidents.com/?next=https://example.org');
  });

  it('keeps a host-like path on the fixed destination', () => {
    const response = redirectRequest(new Request('https://agent-incidents.jowimo.com//example.org/a'));
    expect(response.headers.get('location')).toBe('https://agent-incidents.com//example.org/a');
  });

  it.each(['agent-incidents.com', 'example.org', 'www.agent-incidents.com.example.org'])('rejects unexpected source host %s without redirecting', (host) => {
    const response = redirectRequest(new Request(`https://${host}/`));
    expect(response.status).toBe(404);
    expect(response.headers.has('location')).toBe(false);
  });

  it('does not redirect its own destination again', () => {
    const first = redirectRequest(new Request('https://agent-incidents.jowimo.com/about/'));
    const destination = first.headers.get('location');
    expect(destination).toBe('https://agent-incidents.com/about/');
    const second = redirectRequest(new Request(destination!));
    expect(second.status).toBe(404);
    expect(second.headers.has('location')).toBe(false);
  });
});
