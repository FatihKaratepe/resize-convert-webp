const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './input';
const outputDir = './output';
const targetWidth = 600;

const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.avif'];

async function processImages() {
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = await fs.promises.readdir(inputDir);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();

      if (!validExtensions.includes(ext)) continue;

      const inputPath = path.join(inputDir, file);
      const fileName = path.parse(file).name;
      const outputPath = path.join(outputDir, `${fileName}.webp`);

      try {
        await sharp(inputPath)
          .resize({
            width: targetWidth,
            withoutEnlargement: true,
          })
          .webp({ quality: 100, effort: 6 })
          .toFile(outputPath);

        console.log(`✅ Success: ${file} → ${fileName}.webp`);
      } catch (err) {
        console.error(`❌ Error (${file}):`, err.message);
      }
    }

    console.log('🎉 Completed!');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

processImages();
