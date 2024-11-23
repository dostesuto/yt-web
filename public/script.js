document.getElementById('searchButton').addEventListener('click', async function () {
    const query = document.getElementById('searchInput').value;

    if (!query) {
        alert("検索ワードを入力してください！");
        return;
    }

    const response = await fetch(`/src/search.php?q=${encodeURIComponent(query)}`);
    if (response.ok) {
        const results = await response.json();
        displayResults(results);
    } else {
        alert("データの取得に失敗しました。");
    }
});

function displayResults(results) {
    const videoResults = document.getElementById('videoResults');
    videoResults.innerHTML = '';

    results.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
            <div class="info">
                <div class="title">${video.snippet.title}</div>
                <div class="channel">${video.snippet.channelTitle}</div>
            </div>
        `;
        videoResults.appendChild(card);
    });
}
