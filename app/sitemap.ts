import { MetadataRoute } from 'next'

const BASE_URL = "https://copy-coach.com"

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${BASE_URL}/`,
        },
    ]
}