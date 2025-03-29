import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { imageName: string } }
) {
  const { imageName } = params;

  // Construct the public image URL
  const imageUrl = `${imageName}`;

  // Return the URL (or a 404 if needed)
  return NextResponse.json({ image: imageUrl });
}
