import { DownloadModeOption, DownloadVideoCodec, DownloadVideoQualityValue } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface DownloaderState {
    option: DownloadModeOption
    url: string
    quality: DownloadVideoQualityValue
    codec: DownloadVideoCodec
    setOption: (option: DownloadModeOption) => void
    setUrl: (url: string) => void
    setQuality: (quality: DownloadVideoQualityValue) => void
    setCodec: (codec: DownloadVideoCodec) => void
}

export const useDownloaderStore = create<DownloaderState>()(
    persist(
        (set) => ({
            option: 'auto',
            url: '',
            quality: '1080',
            codec: 'h264',
            setOption: (option) => set({ option }),
            setUrl: (url) => set({ url }),
            setQuality: (quality) => set({ quality }),
            setCodec: (codec) => set({ codec }),
        }),
        {
            name: "settings",
            partialize: (state) => ({ option: state.option, quality: state.quality, codec: state.codec }),
        }
    )
)
