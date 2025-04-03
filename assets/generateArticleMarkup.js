function generateArticleMarkup(articles) {
    const head = document.querySelector('head');

    articles.forEach(article => {
        const { title, description, url, image, author, datePublished } = article;

        // Check if a script for this article already exists
        const existingScript = Array.from(head.querySelectorAll('script[type="application/ld+json"]'))
            .find(script => script.textContent.includes(`"url":"${url}"`));
        if (existingScript) {
            console.warn(`Schema for article "${title}" already exists. Skipping.`);
            return;
        }

        const schemaArticle = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "url": url,
            "image": image,
            "author": {
                "@type": "Person",
                "name": author
            },
            "datePublished": datePublished
        };

        const scriptArticle = document.createElement('script');
        scriptArticle.type = 'application/ld+json';
        scriptArticle.textContent = JSON.stringify(schemaArticle);
        head.appendChild(scriptArticle);
    });

    console.log("Article schema markup generated and added to the document.");
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
    const articles = [
        {
            title: "How to Build a Portfolio Website",
            description: "Learn how to create a stunning portfolio website step by step.",
            url: "https://ded23579.github.io/articles/portfolio-website",
            image: "https://ded23579.github.io/images/portfolio.webp",
            author: "Dedi Ir",
            datePublished: "2025-03-28"
        },
        {
            title: "The Art of Digital Illustration",
            description: "Explore the techniques and tools for creating digital illustrations.",
            url: "https://ded23579.github.io/articles/digital-illustration",
            image: "https://ded23579.github.io/images/illustration.webp",
            author: "Dedi Ir",
            datePublished: "2025-03-27"
        }
    ];

    generateArticleMarkup(articles);
});
