import sharp from 'sharp'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public')

/** Même géométrie que public/oryzons.svg — fond blanc, branches #000 */
const svgBlackOnWhite = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1024" height="1024">
  <rect width="24" height="24" fill="#ffffff"/>
  <path fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round"
    d="M12 2v4M12 18v4M2 12h4M18 12h4M5.64 5.64l2.83 2.83M15.54 15.54l2.83 2.83M5.64 18.36l2.83-2.83M15.54 8.46l2.83-2.83"/>
</svg>`

const png = await sharp(Buffer.from(svgBlackOnWhite)).png({ compressionLevel: 9 }).toBuffer()
writeFileSync(join(outDir, 'oryzons-logo-black-on-white.png'), png)
console.log('Wrote public/oryzons-logo-black-on-white.png (1024×1024)')

/** Favicons PNG pour onglets et résultats Google (les SVG sont souvent ignorés dans les SERP). Aligné sur public/favicon.svg. */
const svgFavicon = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#06141B"/>
  <path fill="none" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round"
    d="M16 5v4M16 23v4M5 16h4M23 16h4M8.52 8.52l2.83 2.83M20.66 20.66l2.83 2.83M8.52 23.48l2.83-2.83M20.66 11.34l2.83-2.83"/>
</svg>`

async function pngFavicon(size) {
  return sharp(Buffer.from(svgFavicon))
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer()
}

writeFileSync(join(outDir, 'favicon-48.png'), await pngFavicon(48))
writeFileSync(join(outDir, 'favicon-192.png'), await pngFavicon(192))
writeFileSync(join(outDir, 'apple-touch-icon.png'), await pngFavicon(180))
console.log('Wrote public/favicon-48.png, favicon-192.png, apple-touch-icon.png')
