"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import { Credenza, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '@/components/ui/credenza'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useDownloaderStore } from '@/lib/zustand/downloader.store'
import { DownloadVideoQuality, DownloadVideoQualityValue } from '@/types/tools'


const videoQualities: { label: DownloadVideoQuality; value: DownloadVideoQualityValue }[] = [
    { label: '8k+', value: 'max' },
    { label: '4k', value: '2160' },
    { label: '1440p', value: '1440' },
    { label: '1080p', value: '1080' },
    { label: '720p', value: '720' },
    { label: '480p', value: '480' },
    { label: '360p', value: '360' },
    { label: '240p', value: '240' },
    { label: '144p', value: '144' },
];

const videoCodecs = [
    { id: 'h264', name: 'h264 (mp4)', description: 'Best compatibility, average bitrate. Max quality is 1080p.' },
    { id: 'av1', name: 'av1 (webm)', description: 'Best quality, efficiency, and bitrate. Supports 8k & HDR.' },
    { id: 'vp9', name: 'vp9 (webm)', description: 'Same quality & bitrate as av1, but file is approximately two times bigger. Supports 4k & HDR.' },
] as const

export default function SettingsMedia() {
    const { quality, codec, setQuality, setCodec } = useDownloaderStore()

    return (
        <div className="relative z-40">
            <Credenza>
                <CredenzaTrigger asChild>
                    <Button type="button" variant="ghost" size="icon" aria-label="Open settings"><Settings /></Button>
                </CredenzaTrigger>
                <CredenzaContent>
                    <CredenzaHeader>
                        <CredenzaTitle>Settings</CredenzaTitle>
                    </CredenzaHeader>
                    <div className="px-4 pb-4 space-y-6 divide-y divide-muted">
                        <QualitySection quality={quality as DownloadVideoQualityValue} setQuality={setQuality as any} />
                        <CodecSection codec={codec} setCodec={setCodec} />
                    </div>
                </CredenzaContent>
            </Credenza>
        </div>
    )
}

function QualitySection({ quality, setQuality }: { quality: DownloadVideoQualityValue; setQuality: (quality: DownloadVideoQualityValue) => void }) {
    return (
        <div className='space-y-2'>
            <h3 className="text-lg font-medium">Video Quality</h3>
            <RadioGroup value={quality} onValueChange={setQuality} className="flex flex-wrap gap-1.5 py-4" aria-label="Select video quality">
                {videoQualities.map((q) => (
                    <QualityOption key={q.value} quality={q} />
                ))}
            </RadioGroup>
            <p className="text-sm text-muted-foreground">
                {"If preferred video quality isn't available, next best is picked instead."}
            </p>
        </div>
    )
}


function QualityOption({ quality }: { quality: { label: DownloadVideoQuality; value: DownloadVideoQualityValue } }) {
    return (
        <div>
            <RadioGroupItem value={quality.value} id={`quality-${quality.value}`} className="peer sr-only" />
            <Label
                htmlFor={`quality-${quality.value}`}
                className="flex px-3 py-2 bg-muted hover:bg-muted/80 border border-input rounded-md cursor-pointer peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
            >
                {quality.label}
            </Label>
        </div>
    )
}

function CodecSection({ codec, setCodec }: { codec: string; setCodec: (codec: any) => void }) {
    return (
        <div className='space-y-2 pt-4'>
            <h3 className="text-lg font-medium">YouTube Video Codec and Container</h3>
            <RadioGroup value={codec} onValueChange={setCodec} className="space-y-2.5 py-4">
                {videoCodecs.map((c) => (
                    <CodecOption key={c.id} codec={c} />
                ))}
            </RadioGroup>
            <p className="text-sm text-muted-foreground/80">
                {"av1 and vp9 aren't as widely supported as h264."}
            </p>
        </div>
    )
}

function CodecOption({ codec }: { codec: typeof videoCodecs[number] }) {
    return (
        <div className="flex items-center space-x-3">
            <RadioGroupItem value={codec.id} id={`codec-${codec.id}`} />
            <Label htmlFor={`codec-${codec.id}`} className="row-col gap-y-1">
                <span className="font-medium">{codec.name}</span>
                <span className="lg:text-sm text-xs text-muted-foreground/80">{codec.description}</span>
            </Label>
        </div>
    )
}
