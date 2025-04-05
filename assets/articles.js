document.addEventListener("DOMContentLoaded", function () {
    loadArticles();
});

function loadArticles() {
    const sheetUrl = 'https://script.google.com/macros/s/AKfycbzoZFeiNRnSBu9ou96JoH63RzKjNhFRUHke5FlrpCn081pwTvG4crBnlDZhIFTRuGer/exec'; // Ganti dengan URL API
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

            // Validate and normalize the data structure
            if (!Array.isArray(data)) {
                if (data.articles && Array.isArray(data.articles)) {
                    data = data.articles; // Use the articles array if present
                } else {
                    console.error('Invalid API response format. Expected an array.', data);
                    document.getElementById('content').innerHTML =
                        '<p>Failed to load articles. Invalid response format.</p>';
                    return;
                }
            }

            if (data.length === 0) {
                console.warn("No articles found in the API response.");
                document.getElementById('content').innerHTML =
                    '<p>No articles available at the moment.</p>';
                return;
            }

            // Process and render articles
            let articlesHTML = '<div class="articles-section"><h1>Articles</h1>';
            data.forEach((article, index) => {
                console.log(`Processing article at index ${index}:`, article); // Debugging each article

                // Handle potential field name mismatches
                const Title = article.Title || article.Tite || "Untitled";
                const Description = article.Description || "No description available.";
                const FeaturedImage = article.FeaturedImage || article.UrlContentImage || "";
                const UrlFeaturedImage = article.UrlFeaturedImage || "#";

                if (!Title || !Description) {
                    console.warn(`Invalid article data at index ${index}:`, article);
                    return;
                }

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
                            <a href="${UrlFeaturedImage}" class="read-more-btn" target="_blank">Read More</a>
                        </div>
                    </div>
                `;
            });
            articlesHTML += '</div>';

            document.getElementById('content').innerHTML = articlesHTML;
            window.articlesData = data; // Save data for further use
        })
        .catch(error => {
            console.error('Error fetching articles:', error);
            document.getElementById('content').innerHTML = '<p>Failed to load articles.</p>';
        });
}

function showFullArticle(index) {
    const article = window.articlesData[index];
    if (!article) {
        console.error("Article not found at index:", index);
        document.getElementById('content').innerHTML = '<p>Article not found.</p>';
        return;
    }

    const { Title, Description, FeaturedImage, Column4, UrlFeaturedImage } = article;
    const imageUrl = FeaturedImage && FeaturedImage.trim()
        ? FeaturedImage
        : 'images/default-image.webp';

    const fullArticleHTML = `
        <div class="full-article">
            <img src="${imageUrl}" alt="${Title}" class="article-image"
                onerror="this.src='images/default-image.webp';">
            <h1>${Title}</h1>
            <p>${Column4 || Description}</p> <!-- Fallback to Description if Column4 is missing -->
            <a href="${UrlFeaturedImage}" target="_blank" class="read-more-btn">Read Full Article</a>
            <button class="back-btn" onclick="loadArticles()">Back to Articles</button>
        </div>
    `;

    document.getElementById('content').innerHTML = fullArticleHTML;
}
