import type { MetadataRoute } from 'next'

const BASE_URL = "https://copy-coach.com"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api',
                '/feedback',
                '/chat',
                '/dashboard',
                '/*?*',
            ],
        },
        {
            userAgent: 'GPTBot',
            disallow: [
                '/',
            ],
        }],
        sitemap: `${BASE_URL}/sitemap.xml`,
    }
}