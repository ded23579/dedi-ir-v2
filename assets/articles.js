async function fetchArticles() {
    const sheetUrl = 'https://script.google.com/macros/s/AKfycbzoZFeiNRnSBu9ou96JoH63RzKjNhFRUHke5FlrpCn081pwTvG4crBnlDZhIFTRuGer/exec';
    console.log("Fetching from URL:", sheetUrl); // Debugging

    try {
        const response = await fetch(sheetUrl);
        console.log("Response status:", response.status); // Debugging HTTP Status
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Debugging response data

        // Periksa apakah data adalah array, jika tidak cek apakah ada objek articles
        if (!Array.isArray(data)) {
            if (data.articles && Array.isArray(data.articles)) {
                return data.articles; // Gunakan array dari properti articles
            } else {
                throw new Error('Invalid API response format. Expected an array.');
            }
        }
        return data;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw new Error('Failed to load articles.');
    }
}

function generateArticlesHTML(articles) {
    let articlesHTML = '<div class="articles-section"><h1>Articles</h1>';
    articles.forEach((article, index) => {
        if (!article.Title || !article.Description) {
            console.warn(`Invalid article data at index ${index}:`, article);
            return;
        }

        const { Title, Description, FeaturedImage } = article;
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
                    <button class="read-more-btn" data-index="${index}">Read More</button>
                </div>
            </div>
        `;
    });
    articlesHTML += '</div>';
    return articlesHTML;
}

function generateFullArticleHTML(article) {
    const { Title, FeaturedImage, Content, MetaTitle, MetaDescription, Keywords } = article;
    const imageUrl = FeaturedImage && FeaturedImage.trim()
        ? FeaturedImage
        : 'images/default-image.webp';

    return `
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
            <button class="back-btn">Back to Articles</button>
        </div>
    `;
}

// Usage example (assuming you have a way to use these functions):
// Fetch articles and generate HTML
fetchArticles().then(articles => {
    const articlesHTML = generateArticlesHTML(articles);
    console.log(articlesHTML); // You can render this HTML as needed
}).catch(error => {
    console.error(error);
});

// Example of generating full article HTML
const exampleArticle = {
    Title: "Example Title",
    FeaturedImage: "example.jpg",
    Content: "Example content...",
    MetaTitle: "Example Meta Title",
    MetaDescription: "Example Meta Description",
    Keywords: "example, keywords"
};
const fullArticleHTML = generateFullArticleHTML(exampleArticle);
console.log(fullArticleHTML); // You can render this HTML as needed
