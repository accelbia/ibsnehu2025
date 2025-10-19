import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { PDFDocument } from 'pdf-lib';

const sitemapPath = path.resolve('public', 'sitemap.xml');
const today = new Date().toISOString().split('T')[0];

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

(async () => {
  const brochurePath = path.resolve('public', 'Pre and Post Conference Event Brochure.pdf');
  const brochureCreationDate = (await getPDFCreationDate(brochurePath)) || today;

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://ibsnehu2025.org/</loc>
      <lastmod>${today}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>

    <url>
      <loc>https://www.ibsnehu2025.org/Pre%20and%20Post%20Conference%20Event%20Brochure.pdf</loc>
      <lastmod>${brochureCreationDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.5</priority>
    </url>
  </urlset>`;

  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  console.log(`Sitemap updated at ${sitemapPath}`);
})();
