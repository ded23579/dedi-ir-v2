document.addEventListener("DOMContentLoaded", function () {
    loadArticles('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fedu.abjad.eu.org%2Ffeed%2F');
});

function loadArticles(sheetUrl) {
    console.log("Fetching from URL:", sheetUrl); // Debugging

    fetch(sheetUrl)
        .then(response => {
            console.log("Response status:", response.status); // Debugging HTTP Status
            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            console.log("Fetched data:", data); // Debugging response data

            // Validasi dan normalisasi struktur data
            if (!data || !data.items || !Array.isArray(data.items)) {
                console.error('Invalid API response format. Expected an array.', data);
                document.getElementById('content').innerHTML =
                    '<p>Failed to load articles. Invalid response format.</p>';
                return;
            }

            if (data.items.length === 0) {
                console.warn("No articles found in the API response.");
                document.getElementById('content').innerHTML =
                    '<p>No articles available at the moment.</p>';
                return;
            }

            // Proses dan render artikel
            let articlesHTML = '<div class="articles-section"><h1>Articles</h1>';
            data.items.forEach((article, index) => {
                console.log(`Processing article at index ${index}:`, article); // Debugging setiap artikel

                // Ambil data artikel
                const Title = article.title || "Untitled";
                const Description = article.description || "No description available.";
                const FeaturedImage = article.thumbnail || ""; // Ganti dengan field yang sesuai
                const UrlContentImage = article.link || "#";

                const imageUrl = FeaturedImage.trim()
                    ? FeaturedImage
                    : 'images/default-image.webp';

                articlesHTML += ` 
                    <div class="article-card">
                        <div class="article-image-container">
                            <img src="${imageUrl}" alt="${Title}" class="article-image"
                                onerror="this.src='images/default-image.webp';">
                        </div>
                        <div class="article-content">
                            <h2>${Title}</h2>
                            <p>${Description}</p>
                            <a href="${UrlContentImage}" class="read-more-btn" target="_blank">Read More</a>
                        </div>
                    </div>
                `;
            });
            articlesHTML += '</div>';

            document.getElementById('content').innerHTML = articlesHTML;
            window.articlesData = data.items; // Simpan data untuk penggunaan lebih lanjut
        })
        .catch(error => {
            console.error('Error fetching articles:', error);
            document.getElementById('content').innerHTML = '<p>Failed to load articles.</p>';
        });
}
