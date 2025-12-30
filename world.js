// World visualization data and interactions
// Categories ordered clockwise from top: Product Management (top), Teaching & Research (right), Startups (bottom), Leadership (left)
const worldData = {
    categories: [
        {
            id: 'product-management',
            label: 'Product Management',
            subtitle: 'Building products that matter',
            count: 5,
            experiences: [
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
            id: 'teaching-research',
            label: 'Teaching & Research',
            subtitle: 'Sharing knowledge & advancing fields',
            count: 5,
            experiences: [
                {
                    role: 'Teaching',
                    organization: 'Hacking for Defense (MS&E297), Stanford University',
                    timeRange: 'Coming soon',
                    impact: 'Guiding student teams in applying the Lean Launchpad framework to solve real-world national security challenges.'
                },
                {
                    role: 'Teaching',
                    organization: 'Introduction to Public Speaking (ENGR103), Stanford University',
                    timeRange: 'April 2025 – Present',
                    impact: 'Taught and coached students on narrative, persuasive, and technical communication through structured workshops and feedback.'
                },
                {
                    role: 'Research',
                    organization: 'Department of Computer Science (PinCS Lab), Stanford University',
                    timeRange: 'Apr 2024 – Mar 2025',
                    impact: 'Built an interactive, web-based module using computer science to teach STEM concepts and pedagogy.'
                },
                {
                    role: 'Research',
                    organization: 'Department of Management Science & Engineering, Stanford University',
                    timeRange: 'Aug 2023 – Apr 2024',
                    impact: 'Researched the impact of hybrid workplaces on organizational culture and team dynamics.'
                },
                {
                    role: 'Research',
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
            count: 2,
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
        },
        {
            id: 'leadership',
            label: 'Leadership',
            subtitle: 'Empowering teams to excel',
            count: 3,
            experiences: [
                {
                    role: 'Co-founder & Vice President',
                    organization: 'Stanford Initiative for Domestic Violence Awareness & Prevention',
                    timeRange: 'Sep 2023 – Present',
                    impact: 'Launched 3 domestic violence awareness programs with local high schools, impacting 120 students, and completed 40-hour DV advocacy training.'
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
        }
    ]
};

// Configuration constants
const nodeSize = 140; // Diameter of orbiting nodes
const nodeRadius = nodeSize / 2; // Radius of orbiting nodes
const orbitPadding = 24; // Padding between big circle edge and node center
const angularVelocity = 0.00002; // rad/frame (gentle motion - ~0.02 rad/sec at 60fps)

// Specific angles for each category (clockwise from top: Product Management, Teaching & Research, Startups, Leadership)
const categoryAngles = {
    'product-management': -Math.PI / 2,   // -90° (top)
    'teaching-research': 0,                // 0° (right)
    'startups': Math.PI / 2,              // 90° (bottom)
    'leadership': Math.PI                 // 180° (left)
};

// Initialize world visualization
document.addEventListener('DOMContentLoaded', function() {
    const worldContainer = document.querySelector('.world-container');
    const worldCenter = document.querySelector('.world-center');
    const orbitingCircles = document.getElementById('orbitingCircles');
    const timelineOverlay = document.getElementById('timelineOverlay');
    const dimOverlay = document.getElementById('dimOverlay');
    const closeTimeline = document.getElementById('closeTimeline');
    
    let selectedCategory = null;
    let animationFrame = null;
    let isAnimating = true;
    let globalRotation = 0;
    
    // Dimensions (will be updated by ResizeObserver)
    let containerWidth = 0;
    let containerHeight = 0;
    let centerX = 0;
    let centerY = 0;
    let worldRadius = 0;
    let orbitRadius = 0;
    
    // Store node elements and their data
    const nodes = [];
    
    // Create debug visualization elements
    const debugContainer = document.createElement('div');
    debugContainer.className = 'debug-visualization';
    debugContainer.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5;';
    
    const orbitRing = document.createElement('div');
    orbitRing.className = 'orbit-ring';
    orbitRing.style.cssText = 'position: absolute; border: 1px dashed rgba(147, 51, 234, 0.3); border-radius: 50%; pointer-events: none;';
    
    debugContainer.appendChild(orbitRing);
    worldContainer.appendChild(debugContainer);
    
    // Calculate dimensions and positions
    function calculateDimensions() {
        const rect = worldContainer.getBoundingClientRect();
        containerWidth = rect.width;
        containerHeight = rect.height;
        
        centerX = containerWidth / 2;
        centerY = containerHeight / 2;
        
        // Get world (big circle) radius from its rendered size
        const centerRect = worldCenter.getBoundingClientRect();
        const worldWidth = centerRect.width;
        const worldHeight = centerRect.height;
        worldRadius = Math.min(worldWidth, worldHeight) / 2;
        
        // Calculate orbit radius: worldRadius + nodeRadius + padding
        // This ensures nodes sit OUTSIDE the big circle
        orbitRadius = worldRadius + nodeRadius + orbitPadding;
        
        // Ensure orbit doesn't go out of bounds
        const maxRadius = Math.min(centerX, centerY) - nodeRadius;
        orbitRadius = Math.min(orbitRadius, maxRadius);
        
        // Update debug visualization
        orbitRing.style.width = (orbitRadius * 2) + 'px';
        orbitRing.style.height = (orbitRadius * 2) + 'px';
        orbitRing.style.left = (centerX - orbitRadius) + 'px';
        orbitRing.style.top = (centerY - orbitRadius) + 'px';
    }
    
    // Position a node based on its angle - enforces strict orbit constraint
    function positionNode(node, angle) {
        // Calculate node center position on orbit
        const nodeCenterX = centerX + orbitRadius * Math.cos(angle);
        const nodeCenterY = centerY + orbitRadius * Math.sin(angle);
        
        // Verify distance constraint (within 1px tolerance)
        const distance = Math.sqrt(
            Math.pow(nodeCenterX - centerX, 2) + 
            Math.pow(nodeCenterY - centerY, 2)
        );
        
        // Verify node is outside big circle
        const minDistance = worldRadius + nodeRadius;
        const isOutside = distance >= minDistance - 1; // 1px tolerance
        
        if (!isOutside) {
            console.warn(`Node ${node.categoryId} is too close to world center. Distance: ${distance}, Required: ${minDistance}`);
        }
        
        // Calculate top-left position for absolute positioning
        const left = nodeCenterX - nodeRadius;
        const top = nodeCenterY - nodeRadius;
        
        node.element.style.left = left + 'px';
        node.element.style.top = top + 'px';
        node.element.style.transform = 'translate(0, 0)'; // No transform needed since we calculate exact position
    }
    
    // Create orbiting circles
    worldData.categories.forEach((category, index) => {
        const circle = document.createElement('div');
        circle.className = 'orbit-circle';
        circle.dataset.categoryId = category.id;
        circle.style.width = nodeSize + 'px';
        circle.style.height = nodeSize + 'px';
        
        const label = document.createElement('span');
        label.className = 'circle-label';
        label.textContent = category.label;
        circle.appendChild(label);
        
        const subtitle = document.createElement('span');
        subtitle.className = 'circle-subtitle';
        subtitle.textContent = category.subtitle;
        circle.appendChild(subtitle);
        
        orbitingCircles.appendChild(circle);
        
        // Get the specific angle for this category
        const baseAngle = categoryAngles[category.id] || 0;
        
        // Store node data
        const node = {
            element: circle,
            categoryId: category.id,
            category: category,
            baseAngle: baseAngle,
            isPaused: false
        };
        
        nodes.push(node);
        
        // Hover effect - pause motion
        circle.addEventListener('mouseenter', function() {
            if (!selectedCategory) {
                circle.classList.add('hovered');
                circle.classList.add('paused');
                node.isPaused = true;
            }
        });
        
        circle.addEventListener('mouseleave', function() {
            if (!selectedCategory) {
                circle.classList.remove('hovered');
                circle.classList.remove('paused');
                node.isPaused = false;
            }
        });
        
        // Click effect
        circle.addEventListener('click', function() {
            if (selectedCategory === category.id) {
                closeTimelineHandler();
            } else {
                openTimeline(category);
            }
        });
    });
    
    // Initial positioning
    calculateDimensions();
    nodes.forEach(node => {
        positionNode(node, node.baseAngle + globalRotation);
    });
    
    // Orbital animation - use global rotation to maintain even spacing
    let lastTime = performance.now();
    function animate(currentTime) {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        
        if (isAnimating) {
            // Update global rotation angle
            globalRotation += angularVelocity * (deltaTime / 16.67); // Normalize to 60fps
            
            // Keep angle in [0, 2π] range
            if (globalRotation > 2 * Math.PI) {
                globalRotation -= 2 * Math.PI;
            }
            
            // Update each node's position based on baseAngle + globalRotation
            nodes.forEach(node => {
                if (!node.element.classList.contains('selected') && !node.isPaused) {
                    const currentAngle = node.baseAngle + globalRotation;
                    positionNode(node, currentAngle);
                }
            });
        }
        
        animationFrame = requestAnimationFrame(animate);
    }
    
    // Start animation
    animate(performance.now());
    
    // ResizeObserver for responsive positioning - recalculates orbit radius on size changes
    const resizeObserver = new ResizeObserver(entries => {
        calculateDimensions(); // Recalculate all dimensions including orbit radius
        nodes.forEach(node => {
            if (!node.element.classList.contains('selected')) {
                // Reposition with updated orbit radius
                positionNode(node, node.baseAngle + globalRotation);
            }
        });
    });
    
    resizeObserver.observe(worldContainer);
    resizeObserver.observe(worldCenter);
    
    // Also handle window resize to ensure orbit adjusts
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            calculateDimensions(); // Recalculate all dimensions including orbit radius
            nodes.forEach(node => {
                if (!node.element.classList.contains('selected')) {
                    positionNode(node, node.baseAngle + globalRotation);
                }
            });
        }, 100); // Debounce resize events
    });
    
    // Open timeline
    function openTimeline(category) {
        selectedCategory = category.id;
        isAnimating = false; // Pause all animation
        
        // Dim background
        dimOverlay.classList.add('active');
        
        // Select circle and move to center
        const node = nodes.find(n => n.categoryId === category.id);
        if (!node) return;
        
        const circle = node.element;
        circle.classList.add('selected');
        circle.classList.remove('paused');
        node.isPaused = false;
        
        // Animate circle to center
        const expandedSize = 200;
        const expandedRadius = expandedSize / 2;
        setTimeout(() => {
            // Position center at (centerX, centerY)
            circle.style.left = (centerX - expandedRadius) + 'px';
            circle.style.top = (centerY - expandedRadius) + 'px';
            circle.style.width = expandedSize + 'px';
            circle.style.height = expandedSize + 'px';
            circle.style.transform = 'translate(0, 0) scale(1.2)';
        }, 10);
        
        // Show timeline
        const timelineContent = document.getElementById('timelineContent');
        
        // Group experiences by role (Teaching vs Research)
        const teachingExps = category.experiences.filter(exp => exp.role === 'Teaching');
        const researchExps = category.experiences.filter(exp => exp.role === 'Research');
        
        let timelineHTML = `<div class="timeline-list">`;
        
        // If this category has Teaching/Research sections, use them
        if (teachingExps.length > 0 || researchExps.length > 0) {
            // Add Teaching section if there are teaching experiences
            if (teachingExps.length > 0) {
                timelineHTML += `<h2 class="timeline-section-header">Teaching</h2>`;
                teachingExps.forEach((exp, index) => {
                    timelineHTML += `
                        <div class="timeline-item" style="animation-delay: ${index * 0.1}s">
                            <div class="timeline-marker"></div>
                            <div class="timeline-details">
                                <div class="timeline-role">${exp.organization}</div>
                                <div class="timeline-time">${exp.timeRange}</div>
                                <div class="timeline-impact">${exp.impact}</div>
                            </div>
                        </div>
                    `;
                });
            }
            
            // Add Research section if there are research experiences
            if (researchExps.length > 0) {
                timelineHTML += `<h2 class="timeline-section-header">Research</h2>`;
                researchExps.forEach((exp, index) => {
                    timelineHTML += `
                        <div class="timeline-item" style="animation-delay: ${(teachingExps.length + index) * 0.1}s">
                            <div class="timeline-marker"></div>
                            <div class="timeline-details">
                                <div class="timeline-role">${exp.organization}</div>
                                <div class="timeline-time">${exp.timeRange}</div>
                                <div class="timeline-impact">${exp.impact}</div>
                            </div>
                        </div>
                    `;
                });
            }
        } else {
            // For other categories, show title and all experiences
            timelineHTML += `<h2 class="timeline-title">${category.label}</h2>`;
            category.experiences.forEach((exp, index) => {
                // Product Management doesn't show roles, others do
                const showRole = category.id !== 'product-management';
                timelineHTML += `
                    <div class="timeline-item" style="animation-delay: ${index * 0.1}s">
                        <div class="timeline-marker"></div>
                        <div class="timeline-details">
                            ${showRole ? `<div class="timeline-role">${exp.role}</div><div class="timeline-org">${exp.organization}</div>` : `<div class="timeline-role">${exp.organization}</div>`}
                            <div class="timeline-time">${exp.timeRange}</div>
                            <div class="timeline-impact">${exp.impact}</div>
                        </div>
                    </div>
                `;
            });
        }
        
        timelineHTML += `</div>`;
        timelineContent.innerHTML = timelineHTML;
        
        timelineOverlay.classList.add('active');
    }
    
    // Close timeline
    function closeTimelineHandler() {
        if (!selectedCategory) return;
        
        const node = nodes.find(n => n.categoryId === selectedCategory);
        if (!node) return;
        
        const circle = node.element;
        circle.classList.remove('selected');
        circle.classList.remove('hovered');
        circle.classList.remove('paused');
        
        // Reset circle position and size
        circle.style.width = nodeSize + 'px';
        circle.style.height = nodeSize + 'px';
        circle.style.transform = 'translate(0, 0)';
        
        // Reposition to orbit
        positionNode(node, node.baseAngle + globalRotation);
        
        dimOverlay.classList.remove('active');
        timelineOverlay.classList.remove('active');
        
        selectedCategory = null;
        isAnimating = true; // Resume animation
    }
    
    closeTimeline.addEventListener('click', closeTimelineHandler);
    dimOverlay.addEventListener('click', closeTimelineHandler);
});
