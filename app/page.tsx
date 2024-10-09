import React from 'react'
import { Metadata } from 'next'
import { setting } from '@/lib/site'
import Section from '@/components/section'


export const metadata: Metadata = {
    metadataBase: new URL(setting.url),
    title: {
        absolute: 'Free Media Downloader | Download Videos, Audio, Images from Social Media',
    },
    authors: [
        { name: 'Saman Sayyar', url: 'https://github.com/samansayar' },
        { name: 'Saman Sayyar', url: 'https://www.linkedin.com/in/saman-sayyar/' },
        { name: 'سامان سیار', url: 'https://www.linkedin.com/in/saman-sayyar/' }
    ],
    description: 'Download media from YouTube, Facebook, Instagram, TikTok, Twitter, and more with our fast, free, and easy-to-use Media Downloader tool. no Signup required. Support for multiple formats.',
    keywords: ['media downloader', 'video downloader', 'audio downloader', 'YouTube downloader', 'Facebook video downloader', 'Instagram downloader', 'TikTok downloader', 'Twitter video downloader', 'free downloader', 'social media downloader'],
    openGraph: {
        title: 'Free Media Downloader - Videos, Audio, Images from Social Platforms',
        description: 'Easily download media from YouTube, Facebook, Instagram, TikTok, Twitter, and more. Free, fast, and no Signup required. Multiple format support.',
        type: 'website',
        url: '/tools/downloader',
        images: [
            {
                url: '/og-image-media-downloader.jpg',
                width: 1200,
                height: 630,
                alt: 'Free Media Downloader Tool',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Media Downloader | Social Media Content Saver',
        description: 'Download videos, audio, and images from YouTube, Facebook, Instagram, TikTok, Twitter, and more. Fast, free, no Signup.',
        images: ['/twitter-image-media-downloader.jpg'],
    },
}

type Props = Record<string, never>;

export default function DownloaderPage({ }: Props) {
    return (
        <main className='lg:container lg:px-4 px-0 w-full relative'>
            <h1 className="sr-only">Free Media Downloader for Social Platforms</h1>
            <Section />
        </main>
    )
}
