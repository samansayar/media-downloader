export type DownloadModeOption = 'auto' | 'audio' | 'mute'
export type DownloadVideoQuality = '8k+' | '4k' | '1440p' | '1080p' | '720p' | '480p' | '360p' | '240p' | '144p'
export type DownloadVideoQualityValue = 'max' | '4320' | '2160' | '1440' | '1080' | '720' | '480' | '360' | '240' | '144'
export type DownloadVideoCodec = 'h264' | 'av1' | 'vp9'


export type DownloaderResponse = {
    url: string;
    downloadMode: DownloadModeOption
    filename?: string
    quality: '8k+' | '4k' | '1440p' | '1080p' | '720p' | '480p' | '360p' | '240p' | '144p';
    codec: 'h264' | 'av1' | 'vp9';
    // Add other properties based on the Cobalt API response
};
