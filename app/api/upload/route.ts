
import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const uploadType = formData.get("uploadType") as string || "gallery";

        if (!file) {
            return NextResponse.json(
                { success: false, error: "No file uploaded" },
                { status: 400 }
            );
        }

        // Generate unique filename with timestamp and upload type
        const timestamp = Date.now();
        const randomSuffix = Math.floor(Math.random() * 1000000);
        const fileExtension = file.name.split('.').pop();
        const uniqueFilename = `${uploadType}-${timestamp}-${randomSuffix}.${fileExtension}`;

        const blob = await put(uniqueFilename, file, {
            access: "public",
            addRandomSuffix: true,
        });

        return NextResponse.json({
            success: true,
            url: blob.url,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { success: false, error: "Upload failed" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const urlToDelete = searchParams.get("url");

        if (!urlToDelete) {
            return NextResponse.json(
                { success: false, error: "Missing url parameter" },
                { status: 400 }
            );
        }

        await del(urlToDelete);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json(
            { success: false, error: "Delete failed" },
            { status: 500 }
        );
    }
}
