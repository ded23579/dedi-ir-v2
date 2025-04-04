async function fetchRSS() {
    const url = "https://edu.abjad.eu.org/feed/";
    try {
        const response = await fetch(url);
        const text = await response.text();
        
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        const items = xml.querySelectorAll("item");

        let output = "";

        items.forEach(item => {
            let title = item.querySelector("title").textContent;
            let link = item.querySelector("link").textContent;
            let description = item.querySelector("description").textContent;
            let pubDate = item.querySelector("pubDate").textContent;
            let creator = item.querySelector("dc\\:creator")?.textContent || "Unknown";
            let categories = Array.from(item.querySelectorAll("category"))
                                .map(cat => `<span class="category">${cat.textContent}</span>`)
                                .join(', ');

            output += `
                <article class="rss-article">
                    <h2><a href="${link}" target="_blank">${title}</a></h2>
                    <p class="meta"><strong>By:</strong> ${creator} | <strong>Published:</strong> ${new Date(pubDate).toLocaleDateString()}</p>
                    <p class="categories">${categories}</p>
                    <p class="description">${description}</p>
                </article>
            `;
        });

        document.getElementById("rss-feed").innerHTML = output;
    } catch (error) {
        console.error("Error fetching RSS feed:", error);
        document.getElementById("rss-feed").innerHTML = "Gagal mengambil feed. Coba lagi nanti.";
    }
}

// Optimasi SEO: Tambahkan judul dinamis berdasarkan RSS Feed
async function updateTitle() {
    try {
        const response = await fetch("https://edu.abjad.eu.org/feed/");
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        const title = xml.querySelector("channel > title").textContent;
        document.title = `${title} - Artikel Terbaru`;
    } catch (error) {
        console.error("Gagal memperbarui judul halaman:", error);
    }
}

// Panggil fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    fetchRSS();
    updateTitle();
});
