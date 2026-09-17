import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateIcons() {
  const inputPath = path.join(__dirname, 'public', 'nexusdesk-logo.png');
  
  if (!fs.existsSync(inputPath)) {
    console.error('Logo not found at', inputPath);
    return;
  }

  try {
    // Generate 32x32 favicon.png (the user requested .ico, but we can do favicon.png and rename to .ico or just use .png which works fine)
    await sharp(inputPath)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(__dirname, 'public', 'favicon.ico')); // A renamed PNG is widely supported as .ico in modern browsers, or we can use an ico encoder. Let's just output as png and rename.
    console.log('Created public/favicon.ico');

    // Generate 512x512 apple-touch-icon.png
    await sharp(inputPath)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(__dirname, 'public', 'apple-touch-icon.png'));
    console.log('Created public/apple-touch-icon.png');

  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
