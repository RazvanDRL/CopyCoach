import { MetadataRoute } from 'next'

const BASE_URL = "https://copy-coach.com"

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${BASE_URL}/`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${BASE_URL}/faq`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
    ]
}