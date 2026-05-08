import { createClient } from "webdav";
import { NextResponse } from "next/server";
import sharp from "sharp";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get("path");
  const format = searchParams.get("format") || "webp";

  if (!filePath) return new NextResponse("Path missing", { status: 400 });

  const client = createClient("https://webdav.hidrive.strato.com", {
    username: process.env.HIDRIVE_USERNAME,
    password: process.env.HIDRIVE_PASSWORD,
  });

  try {
    const fileBuffer = await client.getFileContents(filePath);

    if (format.toLowerCase() === "webp") {
      const webpBuffer = await sharp(fileBuffer as Buffer)
        .webp({ quality: 80, effort: 6 })
        .toBuffer();

      return new NextResponse(webpBuffer, {
        headers: {
          "Content-Type": "image/webp",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    const ext = filePath.split(".").pop()?.toLowerCase();
    const contentType = ext === "png" ? "image/png" : "image/jpeg";

    return new NextResponse(fileBuffer as Buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return new NextResponse("Image not found" + error, { status: 404 });
  }
}
