const fs = require('fs');
const path = require('path');

// Path to the sitemap.xml file
const sitemapPath = path.join(__dirname, '../sitemap.xml');

// Function to update the sitemap.xml file
function updateSitemap() {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    const sitemapContent = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://ded23579.github.io/</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://ded23579.github.io/about</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://ded23579.github.io/contact</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://ded23579.github.io/articles</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>
    `;

    // Write the updated sitemap content to the file
    fs.writeFileSync(sitemapPath, sitemapContent.trim());
    console.log(`Sitemap updated successfully on ${currentDate}`);
}

// Run the update function
updateSitemap();
