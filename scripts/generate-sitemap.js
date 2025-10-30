import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { PDFDocument } from 'pdf-lib';

const sitemapPath = path.resolve('public', 'sitemap.xml');
const today = new Date().toISOString().split('T')[0];
const baseUrl = 'https://www.ibsnehu2025.org';

// Function to get the creation date of the PDF file using pdf-lib
async function getPDFCreationDate(pdfPath) {
  try {
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const creationDate = pdfDoc.getCreationDate();
    return creationDate ? creationDate.toISOString().split('T')[0] : null;
  } catch (error) {
    console.error(`Error fetching metadata for ${pdfPath}:`, error);
    return null;
  }
}

// Function to get file size in KB
function getFileSizeKB(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return Math.round(stats.size / 1024);
  } catch (error) {
    return null;
  }
}

// Function to get all PDF files in the public directory
function getAllPDFFiles() {
  const publicDir = path.resolve('public');
  const docsDir = path.resolve('public', 'docs');

  // Get PDF files from the docs directory
  let files = [];
  if (fs.existsSync(docsDir)) {
    const docsFiles = fs.readdirSync(docsDir);
    files = docsFiles
      .filter((file) => file.endsWith('.pdf'))
      .map((file) => path.join(docsDir, file));
  }

  return files;
}

// Function to get all image files for the main page
function getAllImageFiles() {
  const publicDir = path.resolve('public');
  const files = fs.readdirSync(publicDir, { recursive: true });
  return files
    .filter((file) => /\.(jpg|jpeg|png|webp|svg|gif)$/i.test(file))
    .map((file) => file.replace(/\\/g, '/'));
}

(async () => {
  // Get all PDF files and images
  const pdfFiles = getAllPDFFiles();
  const imageFiles = getAllImageFiles();

  // Start building sitemap content with enhanced namespace declarations
  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <news:news>
      <news:publication>
        <news:name>XLVIII All India Botanical Conference</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${today}</news:publication_date>
      <news:title>XLVIII All India Botanical Conference - IBS NEHU 2025</news:title>
      <news:keywords>botany, botanical conference, IBS, NEHU, plant science, research</news:keywords>
    </news:news>`;

  // Add key images for the main page
  const mainPageImages = imageFiles.filter((img) =>
    ['og-image.png', 'ibs.svg', 'nehu.svg', 'favicon.svg'].includes(path.basename(img)),
  );

  for (const img of mainPageImages) {
    const encodedImg = encodeURIComponent(img);
    sitemapContent += `
    <image:image>
      <image:loc>${baseUrl}/${encodedImg}</image:loc>
      <image:title>XLVIII All India Botanical Conference</image:title>
      <image:caption>Official logo and branding for IBS NEHU 2025 conference</image:caption>
    </image:image>`;
  }

  sitemapContent += `
  </url>
`;

  // Add each PDF file to the sitemap with enhanced metadata
  for (const pdfPath of pdfFiles) {
    const fileName = path.basename(pdfPath);
    const encodedFileName = encodeURIComponent(fileName);
    const pdfCreationDate = (await getPDFCreationDate(pdfPath)) || today;
    const fileSizeKB = getFileSizeKB(pdfPath);

    // Determine content type and priority based on filename
    let priority = 0.5;
    let changefreq = 'weekly';
    let keywords = 'botanical conference, IBS, NEHU, 2025';

    if (
      fileName.toLowerCase().includes('programme') ||
      fileName.toLowerCase().includes('schedule')
    ) {
      priority = 0.9;
      changefreq = 'daily';
      keywords += ', programme, schedule, timing';
    } else if (fileName.toLowerCase().includes('abstract')) {
      priority = 0.8;
      keywords += ', abstracts, research papers';
    } else if (fileName.toLowerCase().includes('accommodation')) {
      priority = 0.7;
      keywords += ', accommodation, hotel, lodging';
    } else if (fileName.toLowerCase().includes('transport')) {
      priority = 0.7;
      keywords += ', transport, travel, bus schedule';
    } else if (fileName.toLowerCase().includes('invitation')) {
      priority = 0.6;
      keywords += ', invitation, ceremony, lecture';
    }

    sitemapContent += `
  <url>
    <loc>${baseUrl}/docs/${encodedFileName}</loc>
    <lastmod>${pdfCreationDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <news:news>
      <news:publication>
        <news:name>XLVIII All India Botanical Conference</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pdfCreationDate}</news:publication_date>
      <news:title>${fileName.replace('.pdf', '').replace(/[-_]/g, ' ')}</news:title>
      <news:keywords>${keywords}</news:keywords>
    </news:news>`;

    if (fileSizeKB) {
      sitemapContent += `
    <!-- File size: ${fileSizeKB}KB -->`;
    }

    sitemapContent += `
  </url>`;

    console.log(
      `Added to sitemap: ${fileName} (${pdfCreationDate}) - Priority: ${priority}, Size: ${fileSizeKB}KB`,
    );
  }

  sitemapContent += `
</urlset>`;

  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  console.log(
    `Enhanced sitemap updated at ${sitemapPath} with ${pdfFiles.length} PDF files and ${mainPageImages.length} images`,
  );
  console.log(`Total images available: ${imageFiles.length}`);
})();
