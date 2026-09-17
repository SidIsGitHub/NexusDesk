import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeImages() {
  const appScreenPath = path.join(__dirname, 'public', 'app-screen.png');
  
  if (fs.existsSync(appScreenPath)) {
    try {
      await sharp(appScreenPath)
        .resize(800) // The user asked for width="{800}"
        .webp({ quality: 80 })
        .toFile(path.join(__dirname, 'public', 'app-screen.webp'));
      console.log('Optimized app-screen.png to app-screen.webp');
    } catch (e) {
      console.error(e);
    }
  }
}

optimizeImages();
