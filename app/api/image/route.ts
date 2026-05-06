import { createClient } from "webdav";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get("path");

  if (!filePath) return new NextResponse("Path missing", { status: 400 });

  const client = createClient("https://webdav.hidrive.strato.com", {
    username: process.env.HIDRIVE_USERNAME,
    password: process.env.HIDRIVE_PASSWORD,
  });

  try {
    // Das Bild als Buffer von HiDrive laden
    const fileBuffer = await client.getFileContents(filePath);

    // Den richtigen Content-Type setzen (z.B. image/jpeg)
    const ext = filePath.split(".").pop()?.toLowerCase();
    const contentType = ext === "png" ? "image/png" : "image/jpeg";

    return new NextResponse(fileBuffer as Buffer, {
      headers: { "Content-Type": contentType },
    });
  } catch (error) {
    return new NextResponse("Image not found" + error, { status: 404 });
  }
}
