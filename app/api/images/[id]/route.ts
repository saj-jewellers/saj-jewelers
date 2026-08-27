import { getDriveClient } from "@/lib/googleDrive";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const drive = getDriveClient();
        const response = await drive.files.get(
            { fileId: id, alt: 'media' },
            { responseType: 'stream' }
        );

        // Google returns a Node Readable stream, we need to convert to Web Stream response
        // But NextResponse accepts body as any for now, or we can use the stream directly
        const stream = response.data;

        const headers = new Headers();
        headers.set('Content-Type', response.headers['content-type'] as string || 'image/jpeg');
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');

        // @ts-expect-error - streaming response adaptation
        return new NextResponse(stream, { headers });
    } catch (error) {
        console.error("Error serving image:", error);
        return new NextResponse("Error fetching image", { status: 500 });
    }
}
