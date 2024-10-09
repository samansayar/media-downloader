import { MetadataRoute } from 'next'
import { setting } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        sitemap: `${setting.url}/sitemap.xml`,
        host: setting.url,
    }
}
