import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Amin Maghrebi',
    short_name: 'maghrebi.tech',
    start_url: '/fa',
    display: 'standalone',
    background_color: '#0A192F',
    theme_color: '#0A192F',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
