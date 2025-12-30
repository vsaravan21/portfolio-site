// Portfolio data and functionality
const portfolioData = [
    {
        id: 1,
        title: 'level up.',
        tagline: 'Build Essential Skills, One Experience at a Time',
        description: 'Mobile app for building essential skills through curated experiences',
        tags: ['Product Design', 'Mobile App', 'UI/UX', 'Skill Development'],
        image: 'images/levelup-new.png',
        specialLayout: true
    },
    {
        id: 2,
        title: 'Portfolio Title 2',
        description: 'Portfolio description placeholder text goes here',
        tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'],
        image: 'images/colored-image.png',
        specialLayout: false
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const portfolioCards = document.getElementById('portfolioCards');
    
    // Create portfolio cards
    portfolioData.forEach((portfolio, index) => {
        const portfolioCardWrapper = document.createElement('div');
        portfolioCardWrapper.className = 'portfolio-card-wrapper';
        
        const portfolioCard = document.createElement('div');
        portfolioCard.className = 'portfolio-card';
        
        if (portfolio.specialLayout) {
            // Special layout for level up. with banner image
            portfolioCard.className += ' portfolio-card-special';
            portfolioCard.innerHTML = `
                <img src="${portfolio.image}" alt="${portfolio.title}" class="portfolio-banner-image">
            `;
        } else {
            // Regular layout
            portfolioCard.style.backgroundColor = 'rgba(102, 126, 234, 0.15)';
            portfolioCard.innerHTML = `
                <div class="portfolio-visual-container">
                    <img src="${portfolio.image}" alt="${portfolio.title}" class="portfolio-main-image">
                </div>
                <div class="portfolio-card-name">${portfolio.title}</div>
            `;
        }
        
        const portfolioInfo = document.createElement('div');
        portfolioInfo.className = 'portfolio-info';
        portfolioInfo.innerHTML = `
            <h3 class="portfolio-info-title">${portfolio.title}</h3>
            <p class="portfolio-info-description">${portfolio.description}</p>
            <div class="portfolio-tags">
                ${portfolio.tags.map(tag => `<span class="portfolio-tag">${tag}</span>`).join('')}
            </div>
        `;
        
        portfolioCardWrapper.appendChild(portfolioCard);
        portfolioCardWrapper.appendChild(portfolioInfo);
        portfolioCards.appendChild(portfolioCardWrapper);
    });
});

