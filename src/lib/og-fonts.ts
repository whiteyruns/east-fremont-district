import fs from "fs/promises";
import path from "path";

// Fonts for the build-time OG images, vendored under public/fonts/og (latin
// subsets, WOFF, OFL). They used to be fetched from Google Fonts during
// `next build`; a bad response there ("Unsupported OpenType signature <!DO",
// Oct 7 2026) failed a production deploy, so they're read from disk now.
export type OgFont =
  | "Nosifer-Regular"
  | "CormorantGaramond-Medium"
  | "CormorantGaramond-SemiBold"
  | "CormorantGaramond-MediumItalic"
  | "JetBrainsMono-Medium";

export async function loadOgFont(name: OgFont): Promise<ArrayBuffer> {
  const buf = await fs.readFile(
    path.join(process.cwd(), "public/fonts/og", `${name}.woff`),
  );
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}
