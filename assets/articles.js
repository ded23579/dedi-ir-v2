function loadArticles() {
    const sheetUrl = 'https://edu.abjad.eu.org/feed'; // Ganti dengan URL publik Google Sheets Anda

    fetch(sheetUrl)
        .then(response => response.text())
        .then(csvText => {
            const rows = csvText.split('\n').map(row => row.split(','));
            const articles = rows.slice(1); // Hilangkan header

            let articlesHTML = '<div class="articles-section"><h1>Articles</h1>';
            articles.forEach((article, index) => {
                // Validasi data
                if (article.length < 4 || !article[0].trim() || !article[1].trim()) {
                    console.warn(`Invalid article data at index ${index}:`, article);
                    return;
                }

                const [title, description, featuredImage, content] = article;

                // Validasi URL gambar
                const imageUrl = featuredImage && featuredImage.trim() ? featuredImage : 'images/default-image.webp';

                articlesHTML += `
                    <div class="article-card">
                        <div class="article-image-container">
                            <img src="${imageUrl}" alt="${title}" class="article-image" onerror="this.src='images/default-image.webp';">
                        </div>
                        <div class="article-content">
                            <h2>${title}</h2>
                            <p>${description}</p>
                            <button class="read-more-btn" onclick="showFullArticle(${index})">Read More</button>
                        </div>
                    </div>
                `;
            });
            articlesHTML += '</div>';

            document.getElementById('content').innerHTML = articlesHTML;

            // Simpan artikel untuk digunakan di fungsi "Read More"
            window.articlesData = articles;
        })
        .catch(error => {
            console.error('Error fetching articles:', error);
            document.getElementById('content').innerHTML = '<p>Failed to load articles.</p>';
        });
}

function showFullArticle(index) {
    const article = window.articlesData[index];
    const [title, description, featuredImage, content] = article;

    // Validasi URL gambar
    const imageUrl = featuredImage && featuredImage.trim() ? featuredImage : 'images/default-image.webp';

    const fullArticleHTML = `
        <div class="full-article">
            <img src="${imageUrl}" alt="${title}" class="article-image" onerror="this.src='images/default-image.webp';">
            <h1>${title}</h1>
            <p>${content}</p>
            <button class="back-btn" onclick="loadArticles()">Back to Articles</button>
        </div>
    `;

    document.getElementById('content').innerHTML = fullArticleHTML;
}
