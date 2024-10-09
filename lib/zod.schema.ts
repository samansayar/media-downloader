import { z } from "zod";

const supportedPlatforms = [
    { name: "Facebook", hostname: "facebook.com" },
    { name: "Instagram", hostname: "instagram.com" },
    { name: "Pinterest", hostname: "pinterest.com" },
    { name: "SoundCloud", hostname: "soundcloud.com" },
    { name: "TikTok", hostname: "tiktok.com" },
    { name: "x", hostname: "x.com" },
    { name: "Vimeo", hostname: "vimeo.com" },
    { name: "YouTube", hostnames: ["youtube.com", "www.youtube.com", "youtu.be"] },
];

export const schemaDownloader = z.object({
    option: z.enum(['auto', 'audio', 'mute']),
    url: z.string().url()
        .refine(
            (value) => {
                if (value === '') return true;
                try {
                    const url = new URL(value);
                    const platform = supportedPlatforms.find(p =>
                        Array.isArray(p.hostnames)
                            ? p.hostnames.includes(url.hostname)
                            : p.hostname && url.hostname.includes(p.hostname)
                    );

                    if (!platform) return false;

                    // Additional checks for YouTube
                    if (platform.name === "YouTube") {
                        const hasVideoId = url.searchParams.has('v') || // for youtube.com
                            url.pathname.length > 1; // for youtu.be
                        return url.protocol === 'https:' && hasVideoId;
                    }

                    return url.protocol === 'https:';
                } catch {
                    return false;
                }
            },
            {
                message: "Please make sure the URL is from a supported platform (Facebook, Instagram, Pinterest, SoundCloud, TikTok, Twitter, Vimeo, or YouTube)",
            }
        ),
})
