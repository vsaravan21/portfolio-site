// Work experience data and category tab/timeline interaction
// Order matches the tab layout: Product Management, Leadership, Teaching & Research, Startups
const worldData = {
    categories: [
        {
            id: 'product-management',
            label: 'Product Management',
            subtitle: 'Building products that matter',
            experiences: [
                {
                    role: 'Product Manager',
                    organization: 'Microsoft',
                    timeRange: 'Jun 2026 – Present',
                    impact: 'Lead product direction and co-build a generative UI capability that translates natural-language requests into personalized Windows experiences, including the first working prototype for custom desktop widgets.'
                },
                {
                    role: 'Product Manager',
                    organization: 'Microsoft',
                    timeRange: 'Jun 2025 – Sep 2025',
                    impact: 'Shipped Windows Search Bar features to 1B+ devices, driving app discoverability and real-time feedback through cross-team execution with Windows, AI, and Bing orgs.'
                },
                {
                    role: 'Product Manager',
                    organization: 'Rubrik',
                    timeRange: 'Jun 2024 – Sep 2024',
                    impact: 'Built AI-powered threat hunting integrations with Microsoft Sentinel and shaped a 12-month GTM strategy for expansion into virtualization with Red Hat.'
                },
                {
                    role: 'Product Manager',
                    organization: 'Develop For Good',
                    timeRange: 'May 2024 – Aug 2024',
                    impact: 'Led a 6-person design team 0→1 to deliver an educational mobile app with personalized learning plans for 489K students in Atlanta Public Schools.'
                },
                {
                    role: 'Product Manager',
                    organization: 'Astoria AI',
                    timeRange: 'Jun 2023 – Sep 2023',
                    impact: 'Defined and scoped core AI talent features by translating user research into end-to-end product flows at an early-stage startup.'
                },
                {
                    role: 'Technology & Product',
                    organization: 'Evolwe AI',
                    timeRange: 'Feb 2023 – Jun 2023',
                    impact: 'Drove product strategy through competitive and user research, informing feature prioritization and market positioning in the AI-assisted gaming space.'
                }
            ]
        },
        {
            id: 'leadership',
            label: 'Leadership',
            subtitle: 'Empowering teams to excel',
            experiences: [
                {
                    role: 'Co-founder & Vice President',
                    organization: 'Stanford Initiative for Domestic Violence Awareness & Prevention',
                    timeRange: 'Sep 2023 – Present',
                    impact: 'Launched 3 domestic violence awareness programs with local high schools, impacting 120 students, and completed 40-hour DV awareness training.'
                },
                {
                    role: 'Co–Vice President of Marketing & Communications',
                    organization: 'Stanford Marketing',
                    timeRange: 'May 2024 – Jun 2025',
                    impact: 'Led marketing and communications strategy, overseeing brand direction and campaigns across student initiatives.'
                },
                {
                    role: 'Product Lead',
                    organization: 'Develop For Good',
                    timeRange: 'Sep 2024 – Mar 2025',
                    impact: 'Led 2 PMs, 1 designer, and 2 engineering managers across two nonprofit projects, delivering two 0→1 product prototypes within a two-week sprint.'
                }
            ]
        },
        {
            id: 'teaching-research',
            label: 'Teaching & Research',
            subtitle: 'Sharing knowledge & advancing fields',
            experiences: [
                {
                    organization: 'Inspirit AI',
                    timeRange: 'Jul 2026 – Present',
                    impact: 'Teach small cohorts of students foundational AI and machine learning concepts while mentoring them in building personalized, real-world AI projects.'
                },
                {
                    organization: 'Stanford Research',
                    timeRange: 'Mar 2026 – Present',
                    impact: 'Research whether personalized LLMs can represent patients’ values and context-dependent decisions in end-of-life care, developing a 10-dimension framework for evaluating clinical deployment.'
                },
                {
                    organization: 'Hacking for Defense (MS&E297), Stanford University',
                    timeRange: 'Jan 2026 - Present',
                    impact: 'Recruit 8 cross disciplinary student teams, coordinate with government sponsors, and coach teams in Lean Startup methodology to produce high-impact national security and dual-use technology solutions.'
                },
                {
                    organization: 'Introduction to Public Speaking (ENGR103), Stanford University',
                    timeRange: 'Apr 2025 – Present',
                    impact: 'Coached 80+ students on narrative, persuasive, and technical communication through structured lessons, workshops, and feedback.'
                },
                {
                    organization: 'Department of Computer Science (PinCS Lab), Stanford University',
                    timeRange: 'Apr 2024 – Mar 2025',
                    impact: 'Built interactive, web based learning modules that teach science concepts using introductory computer science principles for high school students.'
                },
                {
                    organization: 'Department of Management Science & Engineering, Stanford University',
                    timeRange: 'Aug 2023 – Apr 2024',
                    impact: 'Researched the impact of hybrid workplaces on organizational culture and team dynamics.'
                },
                {
                    organization: 'Department of Geology, Environment, and Sustainability, Hofstra University',
                    timeRange: 'Jul 2020 – Sep 2022',
                    impact: 'Created a sub-county community resilience index and first-authored a published research paper at 16.'
                }
            ]
        },
        {
            id: 'startups',
            label: 'Startups',
            subtitle: 'From idea to impact',
            experiences: [
                {
                    role: 'Venture Scout',
                    organization: 'GoAhead Ventures',
                    timeRange: 'Aug 2025 – Present',
                    impact: 'Investing in pre-seed and seed-stage founders, sourcing and evaluating early-stage startups across emerging technology domains.'
                },
                {
                    role: 'Co-founder & Head of Product',
                    organization: 'Omnyra',
                    timeRange: 'Feb 2025 – Oct 2025',
                    impact: 'Drove product vision, GTM, and frontend development for an AI-native biosecurity platform backed by the FBI and DIU, with 3 pilots and 150+ stakeholder interviews informing product direction.'
                }
            ]
        }
    ]
};

// Categories whose rows show only the organization (role is either redundant or not applicable)
const CATEGORIES_WITHOUT_ROLE = new Set(['product-management', 'teaching-research']);

// Initialize the category tab / timeline browser
document.addEventListener('DOMContentLoaded', function() {
    const tabsContainer = document.getElementById('categoryTabs');
    const panelContainer = document.getElementById('categoryPanel');

    if (!tabsContainer || !panelContainer) return;

    let activeCategory = worldData.categories.find(c => c.id === 'product-management') || worldData.categories[0];

    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function renderTabs() {
        tabsContainer.innerHTML = '';
        worldData.categories.forEach(category => {
            const tab = document.createElement('div');
            tab.className = 'cattab' + (category.id === activeCategory.id ? ' active' : '');
            tab.textContent = category.label;
            tab.setAttribute('role', 'tab');
            tab.setAttribute('tabindex', '0');
            tab.setAttribute('aria-selected', category.id === activeCategory.id ? 'true' : 'false');
            tab.addEventListener('click', () => selectCategory(category));
            tab.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectCategory(category);
                }
            });
            tabsContainer.appendChild(tab);
        });
    }

    function selectCategory(category) {
        if (category.id === activeCategory.id) return;
        activeCategory = category;
        renderTabs();
        renderPanel();
    }

    function timelineRow(exp, showRole) {
        const heading = showRole ? `${escapeHTML(exp.role)}, ${escapeHTML(exp.organization)}` : escapeHTML(exp.organization);
        return `
            <div class="work-row">
                <div class="work-row-time">${escapeHTML(exp.timeRange)}</div>
                <div class="work-row-body"><span class="work-row-org">${heading}</span><span class="work-row-impact"> — ${escapeHTML(exp.impact)}</span></div>
            </div>
        `;
    }

    function renderPanel() {
        const showRole = !CATEGORIES_WITHOUT_ROLE.has(activeCategory.id);
        const html = activeCategory.experiences.map(exp => timelineRow(exp, showRole)).join('');
        panelContainer.innerHTML = html;
    }

    renderTabs();
    renderPanel();
});
