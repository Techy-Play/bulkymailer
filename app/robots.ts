import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://bulkymailer.au-acadex.com'

  const aiBots = [
    'GPTBot',
    'ChatGPT-User',
    'PerplexityBot',
    'ClaudeBot',
    'Claude-Web',
    'Google-Extended',
    'Amazonbot',
    'Bytespider',
    'CCBot',
    'cohere-ai',
  ]

  const allowPaths = [
    '/',
    '/#features',
    '/#templates',
    '/pricing',
    '/docs',
    '/features',
    '/about',
    '/blog',
    '/privacy',
    '/terms',
    '/login',
    '/register',
    '/llms.txt',
  ]

  const disallowPaths = [
    '/dashboard/',
    '/admin/',
    '/api/',
    '/_next/',
    '/reset-password',
    '/verify-otp',
  ]

  return {
    rules: [
      {
        userAgent: '*',
        allow: allowPaths,
        disallow: disallowPaths,
      },
      // Explicitly optimize for all Generative Engine AI bots (ChatGPT, Perplexity, Claude, Gemini)
      ...aiBots.map((bot) => ({
        userAgent: bot,
        allow: allowPaths,
        disallow: disallowPaths,
      })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
