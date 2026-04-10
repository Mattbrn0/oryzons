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
