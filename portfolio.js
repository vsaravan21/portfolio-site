// Portfolio data and functionality
// Main portfolio section data (used on index.html - "How I Think")
const portfolioData = [
    {
        id: 1,
        title: 'level up.',
        description: 'Build essential interpersonal skills through bite-sized experiences',
        tags: ['Mobile Product', 'User Research', 'UX Iteration & Testing'],
        image: 'images/levelup-new.png',
        specialLayout: true
    },
    {
        id: 2,
        title: 'Omnyra',
        description: 'AI-native infrastructure redefining U.S. biosecurity systems',
        tags: ['Beneficiary Discovery', 'Lean Startup Methodology', 'Rapid Iteration'],
        image: 'images/omnyra-final (2).png',
        specialLayout: true
    }
];

// Projects page data (used on projects.html - "What I Explore")
const projectsData = [
    {
        id: 1,
        title: 'Omnyra',
        description: 'AI-native infrastructure redefining U.S. biosecurity systems',
        tags: ['Beneficiary Discovery', 'Lean Startup Methodology', 'Rapid Iteration'],
        image: 'images/omnyra-final (2).png',
        specialLayout: true
    },
    {
        id: 2,
        title: 'where you at',
        description: 'AI-native biosecurity platform',
        tags: ['Product Design', 'Startup', 'AI', 'Biosecurity'],
        image: 'images/where.png',
        specialLayout: true
    },
    {
        id: 3,
        title: 'TripCompassSF',
        tagline: 'Build Essential Skills, One Experience at a Time',
        description: 'Mobile app for building essential skills through curated experiences',
        tags: ['Product Design', 'Mobile App', 'UI/UX', 'Skill Development'],
        image: 'images/Frame 16 (1).png',
        specialLayout: true
    },
    {
        id: 4,
        title: 'Whiskers',
        description: 'AI-native biosecurity platform',
        tags: ['Product Design', 'Startup', 'AI', 'Biosecurity'],
        image: 'images/image 5.png',
        specialLayout: true
    },
    {
        id: 5,
        title: 'Project Placeholder 1',
        description: 'Coming soon - New project in development',
        tags: ['Coming Soon'],
        image: 'images/letthem.png',
        specialLayout: true
    },
    {
        id: 6,
        title: 'Project Placeholder 2',
        description: 'Coming soon - New project in development',
        tags: ['Coming Soon'],
        image: 'images/image 3.png',
        specialLayout: true
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const portfolioCards = document.getElementById('portfolioCards');
    if (!portfolioCards) return;
    
    // Determine which page we're on and use the appropriate data
    const isProjectsPage = window.location.pathname.includes('projects.html');
    const dataToUse = isProjectsPage ? projectsData : portfolioData;
    
    // Create portfolio cards
    dataToUse.forEach((portfolio, index) => {
        const portfolioCardWrapper = document.createElement('div');
        portfolioCardWrapper.className = 'portfolio-card-wrapper';
        
        const portfolioCard = document.createElement('div');
        portfolioCard.className = 'portfolio-card';
        
        if (portfolio.specialLayout) {
            // Special layout for level up. with banner image
            portfolioCard.className += ' portfolio-card-special';
            let imageClass = (portfolio.id === 2 || portfolio.id === 4) ? 'portfolio-banner-image portfolio-banner-small' : 'portfolio-banner-image';
            // Add specific class for Fizz image to adjust opacity
            if (portfolio.title === 'Fizz') {
                imageClass += ' portfolio-image-fizz';
            }
            // Add opacity class for bottom left image (id 5 in projects page)
            if (portfolio.id === 6) {
                imageClass += ' portfolio-image-bottom-left';
            }
            portfolioCard.innerHTML = `
                <img src="${portfolio.image}" alt="${portfolio.title}" class="${imageClass}">
            `;
        } else {
            // Regular layout for placeholders
            portfolioCard.style.backgroundColor = 'rgba(102, 126, 234, 0.15)';
            if (portfolio.image) {
                portfolioCard.innerHTML = `
                    <div class="portfolio-visual-container">
                        <img src="${portfolio.image}" alt="${portfolio.title}" class="portfolio-main-image">
                    </div>
                    <div class="portfolio-card-name">${portfolio.title}</div>
                `;
            } else {
                // Placeholder without image
                portfolioCard.innerHTML = `
                    <div class="portfolio-visual-container" style="background: linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(102, 126, 234, 0.2) 100%); display: flex; align-items: center; justify-content: center;">
                        <div style="font-size: 3rem; color: rgba(147, 51, 234, 0.4);">+</div>
                    </div>
                    <div class="portfolio-card-name">${portfolio.title}</div>
                `;
            }
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
        
        // Make the entire card wrapper clickable
        portfolioCardWrapper.style.cursor = 'pointer';
        portfolioCardWrapper.addEventListener('click', () => {
            // Navigate to individual project page
            const page = isProjectsPage ? 'project.html' : 'portfolio-item.html';
            window.location.href = `${page}?id=${portfolio.id}&page=${isProjectsPage ? 'projects' : 'portfolio'}`;
        });
        
        portfolioCards.appendChild(portfolioCardWrapper);
    });
});

