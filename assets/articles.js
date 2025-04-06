function loadArticles() {
    document.addEventListener('DOMContentLoaded', function() {
    const url = 'https://edu.abjad.eu.org/feed';
    fetchFeed(url);
});

async function fetchFeed(url) {
    try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fedu.abjad.eu.org%2Ffeed%2F`);
        const data = await response.json();

        if (data.status === 'ok') {
            displayFeed(data.items);
        } else {
            document.getElementById('feedContainer').innerHTML = 'Gagal mengambil feed: ' + data.message;
        }
    } catch (error) {
        console.error('Error fetching the feed:', error);
        document.getElementById('feedContainer').innerHTML = 'Terjadi kesalahan saat mengambil feed.';
    }
}

function displayFeed(items) {
    const feedContainer = document.getElementById('feedContainer');
    feedContainer.innerHTML = '';

    if (items.length === 0) {
        feedContainer.innerHTML = 'Tidak ada artikel yang ditemukan.';
        return;
    }

    items.forEach(item => {
        const feedItem = document.createElement('div');
        feedItem.classList.add('feed-item');
        feedItem.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <a href="${item.link}" target="_blank">Baca Selengkapnya</a>
        `;
        feedContainer.appendChild(feedItem);
    });
}
