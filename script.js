const feeds = [
  'https://hnrss.org/frontpage'
];

const proxy = 'https://api.codetabs.com/v1/proxy/?quest=';

function fetchRSS(url) {
  fetch(proxy + encodeURIComponent(url))
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, 'text/xml');
      const items = xml.querySelectorAll('item');
      const container = document.getElementById('feed');

      items.forEach(item => {
        const title = item.querySelector('title')?.textContent;
        const link = item.querySelector('link')?.textContent;
        const description = item.querySelector('description')?.textContent;

        const article = document.createElement('div');
        article.className = 'article';
        article.innerHTML = `
          <a href="${link}" target="_blank">${title}</a>
          <p>${description}</p>
        `;

        container.appendChild(article);
      });
    })
    .catch(err => {
      console.error(`Failed to load ${url}:`, err);
    });
}

feeds.forEach(fetchRSS);