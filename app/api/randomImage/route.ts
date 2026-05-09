import { NextResponse } from "next/server";
import { createClient } from "webdav";

export async function GET() {
  const client = createClient("https://webdav.hidrive.strato.com", {
    username: process.env.HIDRIVE_USERNAME,
    password: process.env.HIDRIVE_PASSWORD,
  });

  try {
    console.log("Trying API...");

    const directoryItems = await client.getDirectoryContents(
      "/users/alexhobden/Webseite",
    );
    console.log("Directory items: %o", directoryItems);

    // Nur Dateien filtern, die Bilder sind
    const images = directoryItems
      .filter(
        (item) =>
          item.type === "file" && /\.(jpg|jpeg|png|webp)$/i.test(item.filename),
      )
      .map((item) => ({
        name: item.basename,
        url: `/api/image?path=${encodeURIComponent(item.filename)}&format=webp`,
      }));

    if (images.length === 0) {
      return NextResponse.json({ error: "No images found" }, { status: 404 });
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];
    console.log("Random image selected: %o", randomImage);
    return NextResponse.json(randomImage);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
