document.addEventListener("DOMContentLoaded", function () {
    loadArticles();
});

function loadArticles() {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTNvUFMN3vIP52HLRYDh6FxIInXBsHedagEnPogxb2RnnMQI1NqKq6Dof1jcgjIw-cs6oHigSYEKgnO/pub?output=csv'; // Ganti dengan URL API
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

            // Periksa apakah data adalah array, jika tidak cek apakah ada objek articles
            if (!Array.isArray(data)) {
                if (data.articles && Array.isArray(data.articles)) {
                    data = data.articles; // Gunakan array dari properti articles
                } else {
                    console.error('Invalid API response format. Expected an array.', data);
                    document.getElementById('content').innerHTML =
                        '<p>Failed to load articles. Invalid response format.</p>';
                    return;
                }
            }

            // Proses dan render artikel
            let articlesHTML = '<div class="articles-section"><h1>Articles</h1>';
            data.forEach((article, index) => {
                if (!article.Title || !article.Description) {
                    console.warn(`Invalid article data at index ${index}:`, article);
                    return;
                }

                const { Title, Description, FeaturedImage, Content, ContentImage, MetaTitle, MetaDescription, Keywords } = article;
                const imageUrl = FeaturedImage && FeaturedImage.trim()
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
                            <button class="read-more-btn" onclick="showFullArticle(${index})">Read More</button>
                        </div>
                    </div>
                `;
            });
            articlesHTML += '</div>';

            document.getElementById('content').innerHTML = articlesHTML;
            window.articlesData = data; // Simpan data untuk Read More
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

    const { Title, Description, FeaturedImage, Content, ContentImage, MetaTitle, MetaDescription, Keywords } = article;
    const imageUrl = FeaturedImage && FeaturedImage.trim()
        ? FeaturedImage
        : 'images/default-image.webp';

    const fullArticleHTML = `
        <div class="full-article">
            <img src="${imageUrl}" alt="${Title}" class="article-image"
                onerror="this.src='images/default-image.webp';">
            <h1>${Title}</h1>
            <p>${Content}</p>
            <div class="meta-info">
                <h3>Meta Information</h3>
                <p><strong>Meta Title:</strong> ${MetaTitle}</p>
                <p><strong>Meta Description:</strong> ${MetaDescription}</p>
                <p><strong>Keywords:</strong> ${Keywords}</p>
            </div>
            <button class="back-btn" onclick="loadArticles()">Back to Articles</button>
        </div>
    `;

    document.getElementById('content').innerHTML = fullArticleHTML;
}
