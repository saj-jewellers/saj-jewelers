import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

// Cache the auth client to avoid re-authenticating on every request
let driveClient: ReturnType<typeof google.drive> | null = null;

export const getDriveClient = () => {
    if (driveClient) return driveClient;

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    // Handle literal newlines or escaped newlines in env var
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const projectId = process.env.GOOGLE_PROJECT_ID;

    if (!clientEmail || !privateKey || !projectId) {
        throw new Error('Missing Google Drive credentials');
    }

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: clientEmail,
            private_key: privateKey,
            project_id: projectId,
        },
        scopes: SCOPES,
    });

    driveClient = google.drive({ version: 'v3', auth });
    return driveClient;
};

export interface Category {
    id: string;
    name: string;
}

export interface DriveImage {
    id: string;
    name: string;
    thumbnailLink: string | null | undefined;
    src: string | null | undefined;
}

export const getCategoryFolders = async (): Promise<Category[]> => {
    let drive;
    try {
        drive = getDriveClient();
    } catch (error) {
        console.warn("Google Drive credentials not set or unavailable:", error);
        return [];
    }

    // Read categories from file
    const categoryFilePath = path.join(process.cwd(), 'category.txt');
    let fileContent = '';
    try {
        fileContent = fs.readFileSync(categoryFilePath, 'utf-8');
    } catch (error) {
        console.error('Error reading category.txt:', error);
        return [];
    }

    // Parse lines like "1. Name" -> "Name"
    const categories = fileContent.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
            // Remove numbering like "1. "
            const match = line.match(/^\d+\.\s*(.+)/);
            return match ? match[1] : line;
        });

    const folders: Category[] = [];

    // We use Promise.all for speed, but be mindful of rate limits.
    // Sequential is safer for reliability with free tier.
    for (const category of categories) {
        try {
            const res = await drive.files.list({
                q: `mimeType = 'application/vnd.google-apps.folder' and name = '${category}' and trashed = false`,
                fields: 'files(id, name)',
                pageSize: 1,
            });

            if (res.data.files && res.data.files.length > 0) {
                // Use the ID from drive and name from our list (or drive)
                folders.push({
                    id: res.data.files[0].id!,
                    name: category,
                });
            } else {
                console.warn(`Category folder not found in Drive: ${category}`);
            }
        } catch (error) {
            console.error(`Error fetching folder for ${category}:`, error);
        }
    }

    return folders;
};

export const getImagesInFolder = async (folderId: string): Promise<DriveImage[]> => {
    let drive;
    try {
        drive = getDriveClient();
    } catch (error) {
        console.warn("Google Drive credentials not set or unavailable:", error);
        return [];
    }

    try {
        const res = await drive.files.list({
            q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
            fields: 'files(id, name, thumbnailLink)', // request thumbnailLink
            pageSize: 1000, // Max page size
            orderBy: 'createdTime desc',
        });

        let allFiles = res.data.files || [];
        let nextPageToken = res.data.nextPageToken;

        // Loop to fetch remaining pages if any
        while (nextPageToken) {
            const nextRes = await drive.files.list({
                q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
                fields: 'files(id, name, thumbnailLink), nextPageToken',
                pageSize: 1000,
                orderBy: 'createdTime desc',
                pageToken: nextPageToken
            });

            if (nextRes.data.files) {
                allFiles = allFiles.concat(nextRes.data.files);
            }
            nextPageToken = nextRes.data.nextPageToken;
        }

        return allFiles.map(file => {
            // Enhance thumbnail link for high res
            // Default is usually =s220. We want a larger version for the gallery.
            // =s400 for grid, =s1200 or no param for full view.
            // But for list, we return one object.
            const originalThumb = file.thumbnailLink;
            // Strip the size param to get full size or large size
            // e.g. https://...=s220
            const highRes = originalThumb?.replace(/=s\d+$/, '=s1200'); // 1200px width/height

            return {
                id: file.id!,
                name: file.name!,
                thumbnailLink: originalThumb,
                src: highRes,
            };
        }) || [];
    } catch (error) {
        console.error(`Error fetching images for folder ${folderId}:`, error);
        return [];
    }
};
