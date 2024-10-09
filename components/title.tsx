"use client"

import { motion } from "framer-motion"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

interface Platform {
    name: string
    description: string
}

const platforms: Platform[] = [
    { name: "YouTube", description: "Video and audio downloads" },
    { name: "TikTok", description: "Short-form video downloads" },
    { name: "Instagram", description: "videos Post/Reels downloads" },
    { name: "X (Twitter)", description: "Tweet and video downloads" },
    { name: "Facebook", description: "Video and post downloads" },
    { name: "Pinterest", description: "Image and video downloads" },
    { name: "SoundCloud", description: "Audio downloads" },
    { name: "Vimeo", description: "Video downloads" },
]

export default function TitleMedia() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="w-full">
                    <div className="w-full row mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`text-2xl select-none row-center gap-x-1 font-bold cursor-pointer`}
                        >
                            <span>Media Downloader</span>
                            <div className="-mt-2 text-muted-foreground"><QuestionMarkCircledIcon /></div>
                        </motion.h2>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className="lg:w-[380px]">
                <div className="grid gap-4">
                    <h3 className="font-medium leading-none">Supported Platforms</h3>
                    <ul className="grid gap-4">
                        {platforms.map((platform) => (
                            <li key={platform.name} className="flex items-center gap-2">
                                <Badge variant="secondary">{platform.name}</Badge>
                                <span className="text-xs text-muted-foreground">{platform.description}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </PopoverContent>
        </Popover>
    )
}
