// Load project/portfolio item details
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = parseInt(urlParams.get('id'));
    const pageType = urlParams.get('page') || 'projects';
    
    // Import the data arrays
    const script = document.createElement('script');
    script.src = 'portfolio.js';
    script.onload = () => {
        const dataArray = pageType === 'projects' ? projectsData : portfolioData;
        const project = dataArray.find(p => p.id === projectId);
        
        if (project) {
            renderProjectDetail(project);
        } else {
            document.getElementById('projectDetailContainer').innerHTML = '<p>Project not found</p>';
        }
    };
    document.head.appendChild(script);
});

function renderProjectDetail(project) {
    const container = document.getElementById('projectDetailContainer');
    
    let imageHTML = '';
    if (project.specialLayout && project.image) {
        imageHTML = `<img src="${project.image}" alt="${project.title}" class="project-detail-image">`;
    } else if (project.image) {
        imageHTML = `<img src="${project.image}" alt="${project.title}" class="project-detail-image">`;
    }
    
    container.innerHTML = `
        <div class="project-detail-content">
            ${imageHTML}
            <div class="project-detail-info">
                <h1 class="project-detail-title">${project.title}</h1>
                ${project.tagline ? `<p class="project-detail-tagline">${project.tagline}</p>` : ''}
                <p class="project-detail-description">${project.description}</p>
                <div class="project-detail-tags">
                    ${project.tags.map(tag => `<span class="portfolio-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

