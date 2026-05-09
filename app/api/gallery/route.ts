import { createClient } from "webdav";
import { NextResponse } from "next/server";

export async function GET() {
  // 1. Client initialisieren
  const client = createClient("https://webdav.hidrive.strato.com", {
    username: process.env.HIDRIVE_USERNAME,
    password: process.env.HIDRIVE_PASSWORD,
  });

  try {
    // 2. Inhalt eines bestimmten Ordners auslesen (z.B. /public/bilder)
    // Achte auf den korrekten Pfad in deinem HiDrive
    const directoryItems = await client.getDirectoryContents(
      "/users/alexhobden/Webseite",
    );
    console.log(directoryItems.map((i) => i.filename));

    // Nur Dateien filtern, die Bilder sind
    const images = directoryItems
      .filter(
        (item) =>
          item.type === "file" && /\.(jpg|jpeg|png|webp)$/i.test(item.filename),
      )
      .map((item) => ({
        name: item.basename,
        // Wir schicken dem Frontend einen Link zu unserer eigenen Proxy-Route
        url: `/api/image?path=${encodeURIComponent(item.filename)}&format=webp`,
      }));

    return NextResponse.json(images);
  } catch (error) {
    console.error("Fehler beim Laden der HiDrive Daten:", error);
    return NextResponse.json({ error: "Fehler beim Laden" }, { status: 500 });
  }
}
