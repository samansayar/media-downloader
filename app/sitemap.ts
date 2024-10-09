import { setting } from '@/lib/site'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {

    // Define your routes here
    const routes = [
        '',
    ]

    const sitemap: MetadataRoute.Sitemap = routes.map(route => ({
        url: `${setting.url}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }))

    return sitemap
}
