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
        title: 'where you at?',
        description: 'Location powered social connection in real time',
        tags: ['Real-Time Social Systems', 'Location-Based UX', 'Privacy-Aware Design'],
        image: 'images/where.png',
        specialLayout: true
    },
    {
        id: 2,
        title: 'TripCompassSF',
        description: 'Personalized, Budget and Time-Aware Itineraries',
        tags: ['Personalized Product Systems', 'Constraint-Aware Planning', 'ML-Driven Decision Making'],
        image: 'images/Frame 16 (1).png',
        specialLayout: true
    },
    {
        id: 3,
        title: 'Whisk(ers)',
        description: 'Cozy escape-room puzzle game built around exploration and problem solving',
        tags: ['Puzzle Systems', 'Narrative Flow', 'Iterative Prototyping'],
        image: 'images/image 5.png',
        specialLayout: true
    },
    {
        id: 4,
        title: 'let them eat cake.',
        description: 'A social deduction party game focused on playful deception and social bonding.',
        tags: ['Social Game Design', 'Rapid Iteration', 'Player Interaction Systems'],
        image: 'images/letthem.png',
        specialLayout: true
    },
    {
        id: 5,
        title: 'Stanford Management Group',
        description: 'Product-Focused Consulting Engagements with Grammarly and Fizz',
        tags: ['Product Vision', 'User Research & Interviewing', 'Go-to-Market Strategy'],
        image: 'images/SMG-Image.jpeg',
        specialLayout: true
    }
];

// Project details data for individual project pages
const projectDetails = {
    1: {
        title: 'where you at?',
        image: 'images/where.png',
        role: 'Full Stack Product Engineer',
        timeline: 'Nov 2025 - Dec 2025',
        team: ['Varsha Saravanan', 'Joshua Bahk'],
        skills: ['Full-Stack Mobile Development', 'User Centered Design', 'API Integration', 'Real-Time Social Features']
    },
    2: {
        title: 'TripCompassSF',
        image: 'images/Frame 16 (1).png',
        role: 'AI Engineer',
        timeline: 'Oct 2025 - Dec 2025',
        team: ['Varsha Saravanan', 'Isaias Martinez'],
        skills: ['Preference Modeling', 'Feature Engineering', 'Search Optimization', 'System Evaluation']
    },
    3: {
        title: 'Whisk(ers)',
        image: 'images/image 5.png',
        role: 'Game Designer & Developer',
        timeline: 'May 2025 - June 2025',
        team: ['Varsha Saravanan', 'Kristine Ma', 'Sarah Teaw'],
        skills: ['Unity 2D Development', 'Onboarding & Hint Design', 'Escape Room Mechanics', 'Playtesting & Iteration']
    },
    4: {
        title: 'let them eat cake.',
        image: 'images/letthem.png',
        role: 'Game Designer',
        timeline: 'April 2025 - May 2025',
        team: ['Varsha Saravanan', 'Kristine Ma', 'Yosief Abraham', 'Yinlin Zhao'],
        skills: ['Narrative Systems', 'Game Mechanics Design', 'Playtesting & Iteration', 'Rule System Design']
    },
    5: {
        title: 'Stanford Management Group',
        image: 'images/SMG-Image.jpeg',
        role: 'Consultant',
        timeline: 'Oct 2023 - June 2024',
        team: ['Varsha Saravanan'],
        skills: ['Product Research & Synthesis', 'Feature Recommendations', 'Strategic Thinking & Business Acumen', 'Stakeholder Communication']
    }
};

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

