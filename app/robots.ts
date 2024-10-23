import type { MetadataRoute } from 'next'

const BASE_URL = "https://copy-coach.com"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api',
                '/login',
                '/signup',
                '/feedback',
                '/chat',
                '/dashboard',
                '/pricing',
            ],
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    }
}