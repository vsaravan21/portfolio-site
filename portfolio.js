// Portfolio data and functionality
// Main portfolio section data (used on index.html - "How I Think")
const portfolioData = [
    {
        id: 2,
        title: 'Omnyra',
        description: 'AI-native infrastructure redefining U.S. biosecurity systems',
        tags: ['Beneficiary Discovery', 'Lean Startup Methodology', 'Rapid Iteration'],
        image: 'images/omnyra-final (2).png',
        specialLayout: true
    },
    {
        id: 1,
        title: 'level up.',
        description: 'Build essential interpersonal skills through bite-sized experiences',
        tags: ['Mobile Product', 'User Research', 'UX Iteration & Testing'],
        image: 'images/levelup-new.png',
        specialLayout: true
    }
];

// Projects data (used on index.html - "What I Explore" section)
const projectsData = [
    {
        id: 6,
        title: 'Adapting GPT',
        description: 'Efficiently adapting one language model across multiple tasks.',
        tags: ['Parameter-Efficient Fine-Tuning', 'Transformer Architectures', 'Experimental Evaluation'],
        image: 'images/adapting-gpt2-flow-hires.png',
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
    },
    {
        id: 1,
        title: 'where you at?',
        description: 'Location powered social connection in real time',
        tags: ['Real-Time Social Systems', 'Location-Based UX', 'Privacy-Aware Design'],
        image: 'images/where.png',
        specialLayout: true
    },
    {
        id: 7,
        title: 'Codescape',
        description: 'Visualize architecture. Understand every code change.',
        comingSoon: true
    },
    {
        id: 8,
        title: 'Anchor',
        description: 'Voice-first commitment tracking, zero manual entry.',
        comingSoon: true
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
    },
    6: {
        title: 'Adapting GPT',
        image: 'images/adapting-gpt2-flow-hires.png',
        role: 'NLP Researcher',
        timeline: 'Jan 2025 - Apr 2025',
        team: ['Varsha Saravanan', 'Kristine Ma', 'Isaias Martinez'],
        skills: ['Transformer Model Development', 'Parameter-Efficient Fine-Tuning', 'Direct Preference Optimization', 'Experimental Evaluation & Analysis']
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Renders a set of minimal bordered text cards into the given container.
    // "selected work" (portfolio) cards show tags, "what i explore" (projects) cards don't.
    function renderCards(containerId, data, variant) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const isProjects = variant === 'projects';

        data.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'field-card' + (isProjects ? ' field-card-explore' : ' field-card-selected');

            let html = '';
            if (item.comingSoon) {
                html += `<span class="coming-soon-badge">Coming Soon</span>`;
            }
            html += `
                <h3 class="field-card-title">${item.title}</h3>
                <p class="field-card-desc">${item.description}</p>
            `;
            if (!isProjects) {
                html += `
                    <div class="field-card-tags">
                        ${item.tags.map(tag => `<span class="field-tag">${tag}</span>`).join('')}
                    </div>
                `;
            }
            card.innerHTML = html;

            // Coming-soon cards have no detail page yet — no hover, click, or navigation.
            if (item.comingSoon) {
                card.classList.add('field-card-disabled');
            } else {
                card.addEventListener('click', () => {
                    // Navigate to individual project page
                    const page = isProjects ? 'project.html' : 'portfolio-item.html';
                    window.location.href = `${page}?id=${item.id}&page=${variant}`;
                });
            }

            container.appendChild(card);
        });
    }

    renderCards('portfolioCards', portfolioData, 'portfolio');
    renderCards('exploreCards', projectsData, 'projects');
});

