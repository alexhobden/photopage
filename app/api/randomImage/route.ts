import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    console.log("Trying API...");

    const imageDir = path.join(process.cwd(), "public/gallery");
    const images = fs.readdirSync(imageDir);

    if (images.length === 0) {
      return NextResponse.json({ error: "No images found" }, { status: 404 });
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];
    return NextResponse.json({ image: `/gallery/${randomImage}` });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
