"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X, ChevronRight, Loader2, Settings } from "lucide-react"
import { useDownloaderStore } from "@/lib/zustand/downloader.store"
import { OptionButtons } from "./option-buttons"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from 'sonner'
import axios, { AxiosResponse } from 'axios'
import { useSession } from "next-auth/react"
import DetailsLinkGenerated from "./details-link-generated"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { QuestionMarkCircledIcon, QuestionMarkIcon } from "@radix-ui/react-icons"
import { StarsBackground } from "@/components/ui/stars-background"
import SettingsMedia from "./settings"
import TitleMedia from "./title"
import { schemaDownloader } from "@/lib/zod.schema"
import { ShootingStars } from "./ui/shooting-stars"
import { ModeToggle } from "./theme-toggle"

type FormData = z.infer<typeof schemaDownloader>


export default function Section() {
    const { option, setOption, url, setUrl, codec, quality } = useDownloaderStore()
    const [isPending, startTransition] = useTransition()
    const [showDetails, setShowDetails] = useState(false)
    const [generatedLink, setGeneratedLink] = useState("")

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schemaDownloader),
        defaultValues: {
            option: option,
            url: url,
        },
    })

    const watchOption = watch('option')

    const handleFormSubmit = async (data: FormData) => {
        try {
            const response = await axios.post('/api/downloader', {
                url: data.url,
                downloadMode: data.option,
                codec,
                quality
            });

            handleSuccessfulResponse(response);
        } catch (error) {
            handleErrorResponse(error);
        } finally {
            updateStoreState(data);
        }
    };

    const onSubmit = (data: FormData) => {
        startTransition(() => handleFormSubmit(data));
    };

    function handleSuccessfulResponse(response: AxiosResponse) {
        if (response.data && response.data.url) {
            toast.success('Download link generated successfully');
            setGeneratedLink(response.data.url);
            setShowDetails(true);
        } else {
            toast.error('Failed to generate download link');
        }
    }

    function handleErrorResponse(error: unknown) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.error || 'An error occurred');
        } else {
            toast.error('An unexpected error occurred');
        }
    }

    function updateStoreState(data: FormData) {
        setOption(data.option);
        setUrl(data.url || '');
    }

    return (
        <section className="relative w-full mx-auto row" aria-label="Media Downloader Tool">

            <div className="relative w-full">

                <div className="mb-8">
                    <div className="mx-auto gap-x-2 gap-y-6 transition-all duration-200 ease-in justify-center text-center text-primary">
                        <div className="w-full row-between">
                            <ModeToggle />
                            <SettingsMedia />
                        </div>
                        <TitleMedia />
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[550px] mx-auto space-y-3">
                    <div className="relative">
                        <Input
                            autoComplete="off"
                            autoFocus
                            disabled={isPending}
                            type="url"
                            placeholder="Paste the Link Here"
                            {...register('url')}
                            className="pr-16 w-full bg-input"
                            aria-label="URL input"
                        />
                        <button
                            disabled={isPending}
                            type="button"
                            className="absolute right-1 top-1/2 -translate-y-1/2 p-1"
                            onClick={() => setValue('url', '')}
                            aria-label="Clear input"
                        >
                            <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button disabled={isPending} type="submit" className="absolute right-8 top-1/2 -translate-y-1/2 p-1" aria-label="Submit">
                            {isPending ? (
                                <Loader2 className="h-4 w-4 text-secondary-foreground animate-spin" />
                            ) : (
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            )}
                        </button>
                    </div>
                    {errors.url && <p className="text-destructive text-[13px]" role="alert">{errors.url.message}</p>}

                    <OptionButtons watchOption={watchOption} setValue={setValue} />
                </form>

                <DetailsLinkGenerated
                    show={showDetails}
                    onClose={() => setShowDetails(false)}
                    generatedLink={generatedLink}
                />
            </div>
        </section>
    )
}
