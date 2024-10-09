import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { setting } from "@/lib/site";
import { DownloaderResponse, DownloadModeOption, DownloadVideoCodec, DownloadVideoQuality } from "@/types";

const allowedOrigins = [setting.host];
export const revalidate = 0;

export async function POST(req: NextRequest) {
    const { origin } = extractRequestInfo(req);

    if (!isOriginAllowed(origin)) {
        return createErrorResponse("Unauthorized", 403);
    }
    try {
        const { url, downloadMode, quality, codec } = await req.json();

        const downloaderData = await getDownloaderData(url, downloadMode, quality, codec);

        if (downloaderData) {
            return createSuccessResponse(downloaderData, origin);
        } else {
            return createErrorResponse("Failed to process the download request", 404);
        }
    } catch (error) {
        console.error("Error in API route:", error);
        return createErrorResponse("Internal server error", 500);
    }
}

async function getDownloaderData(url: string, downloadMode: DownloadModeOption, quality: DownloadVideoQuality, codec: DownloadVideoCodec): Promise<DownloaderResponse | null> {
    const options = {
        method: 'POST',
        url: 'http://196.61.9.10:9000',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        data: {
            url: url,
            downloadMode,
            filenameStyle: 'basic',
            videoQuality: quality,
            youtubeVideoCodec: codec
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error: any) {
        if (error?.response?.data) {
            console.error(error?.response?.data?.error);
            return null
        }
        console.error("Error in retrieving or processing data:::", error);
        return null;
    }
}

function extractRequestInfo(req: NextRequest) {
    return {
        origin: req.headers.get('host'),
        apiToken: req.headers.get('x-api-token'),
        ipAddress: req.ip,
        userAgent: req.headers.get('user-agent')
    };
}

function isOriginAllowed(origin: string | null) {
    return origin && allowedOrigins.includes(origin);
}

function createErrorResponse(message: string, status: number) {
    return NextResponse.json({ error: message }, { status });
}

function createSuccessResponse(data: any, origin: string | null) {
    return NextResponse.json(data, {
        headers: {
            'Access-Control-Allow-Origin': origin || '',
            'Access-Control-Allow-Methods': 'POST',
            'Cache-Control': 'no-store',
        }
    });
}
