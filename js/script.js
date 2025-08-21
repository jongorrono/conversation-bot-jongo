// DOM Elements
const mainInput = document.getElementById('mainInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');
const clearSearch = document.getElementById('clearSearch');
const searchInput = document.querySelector('.search-input');
const actionCards = document.querySelectorAll('.card');

/* ---------- Projects Data ---------- */

let projectsData = [];

// Function to fetch projects data from API
async function fetchProjectsData() {
    try {
        console.log('Fetching projects data from API...');
        const response = await fetch('https://689f4cb03fed484cf879b9a0.mockapi.io/Apicall/Proyects');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        projectsData = data;
        console.log('Projects data fetched successfully:', data);
        return data;
    } catch (error) {
        console.error('Error fetching projects data:', error);
        // Fallback to default data if API fails
        projectsData = [
            {
                id: "1",
                order: "1",
                icon: "💡",
                title: "Designing an Engaging Developer Platform for ZARA",
                description: "As a UX Designer on the team, I contributed to the redesign of Zara Tools—the internal platform for the engineering community—helping boost adoption and daily use among developers. I improved internal processes and collaborated with multidisciplinary squads (engineering, content, design, PMs).",
                domain: "Fashion, B2C, Platform",
                skillsUsed: ["UX research", "design systems", "UX Design", "UI Design"],
                measurableResults: "🚀 +77% adoption in engineering community",
                link: ""
            }
        ];
        return projectsData;
    }
}

// Chat functionality
class ChatBot {
    constructor() {
        this.conversationHistory = [];
        this.isTyping = false;
    }

    // Add message to chat
    addMessage(content, type = 'user') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add to conversation history
        this.conversationHistory.push({ content, type, timestamp: Date.now() });
        
        return messageDiv;
    }

    // Show typing indicator
    showTypingIndicator() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            typingDiv.appendChild(dot);
        }
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Hide typing indicator
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
    }

    // Simulate bot response
    async generateResponse(userMessage) {
        this.showTypingIndicator();
        
        // Simulate processing time
        await new Promise(resolve => {
            const delay = 1500 + Math.random() * 1000;
            const timer = window.setTimeout(resolve, delay);
            return () => window.clearTimeout(timer);
        });
        
        this.hideTypingIndicator();
        
        // Generate contextual response based on user input
        const response = this.getContextualResponse(userMessage.toLowerCase());
        this.addMessage(response, 'bot');
    }

    // Get contextual response

getContextualResponse(message) {
    // normaliza: minus, guiones raros → '-', guiones → espacio, colapsa espacios
    const m = (message || "")
      .toLowerCase()
      .replace(/[\u2010-\u2015]/g, "-")  // guiones tipográficos → '-'
      .replace(/-/g, " ")                // guiones → espacio
      .replace(/\s+/g, " ")              // colapsa espacios
      .trim();
  
    const responses = {
      "saas":
        "I have extensive experience with SaaS platforms! I've worked on several SaaS products, including customer management systems, subscription billing platforms, and analytics dashboards. My expertise includes React, Node.js, and cloud infrastructure.",
      "case study":
        "Great choice! Let me share a case study about a SaaS platform I built for a startup. It included user authentication, subscription management, and real-time analytics. The project improved user engagement by 40% and reduced churn by 25%.",
      "company":
        "I'm passionate about companies that value innovation and user experience. I thrive in environments that encourage creative problem-solving and rapid iteration. My background in both design and development makes me a great fit for product-focused teams.",
      "about":
        "I'm Jon, a full-stack developer and designer with 5+ years of experience. I specialize in building intuitive user interfaces and scalable backend systems. I love solving complex problems and creating products that users actually enjoy using.",
      "experience":
        "My experience spans across multiple domains - from fintech to healthcare SaaS. I've led development teams, mentored junior developers, and shipped products used by thousands of users. I'm always learning and adapting to new technologies.",
      "project":
        "I've worked on projects ranging from mobile apps to enterprise web applications. Some highlights include a real-time collaboration tool, an AI-powered analytics platform, and a healthcare management system. Each project taught me something new about user needs and technical challenges."
    };
  
    // match por substring
    for (const [key, response] of Object.entries(responses)) {
      if (m.includes(key)) return response;
    }
  
    // fallback seguro
    const defaults = [
      "That's an interesting question! I'd be happy to share more about my experience in that area.",
      "I'd love to discuss that further. Could you tell me more about what specifically interests you?",
      "Great question! Let me share some insights from my experience working on similar challenges.",
      "I'm excited to talk about that! It's an area I'm particularly passionate about.",
      "That's a topic I've spent a lot of time thinking about. Let me share my perspective."
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
  }
  
    // Clear chat history
    clearChat() {
        chatMessages.innerHTML = '';
        this.conversationHistory = [];
    }
}

// Initialize chat bot
const chatBot = new ChatBot();

// Event Listeners

// Send message on button click
sendBtn.addEventListener('click', sendMessage);

// Send message on Enter key
mainInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Clear search functionality
clearSearch.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
});

// Action card interactions
actionCards.forEach(card => {
    card.addEventListener('click', () => {
        const action = card.dataset.action;
        
        // Add enhanced visual feedback
        card.style.transform = 'scale(0.95)';
        card.style.background = 'rgba(255, 255, 255, 0.15)';
        
        setTimeout(() => {
            card.style.transform = '';
            card.style.background = '';
        }, 150);
        
        // Handle the action
        handleCardAction(action);
    });
});

// Functions

function sendMessage() {
    const message = mainInput.value.trim();
    if (!message) return;

    // Add user message
    chatBot.addMessage(message, 'user');
    
    // Clear input
    mainInput.value = '';
    
    // Generate bot response
    chatBot.generateResponse(message);
}

async function handleCardAction(action) {
    if (action === 'case-study') {
        // Ensure projects data is loaded before showing
        if (projectsData.length === 0) {
            console.log('Projects data not loaded, fetching...');
            await fetchProjectsData();
        }
        // Small delay to ensure DOM is ready
        window.setTimeout(() => {
            showProjectsDisplay();
        }, 100);
        return;
    }

    if (action === 'company-fit') {
        chatBot.addMessage("How would you fit into our company culture and what value would you bring?", 'user');
        chatBot.generateResponse("company-fit");
        return;
    }

    if (action === 'about-jon') {
        // Show About Jon section
        showAboutJonSection();
        return;
    }
}

// Function to display projects in an attractive format
function showProjectsDisplay() {
    // Clear existing chat messages with fade out effect
    chatMessages.style.opacity = '0';
    chatMessages.style.transform = 'translateY(20px)';
    
    window.setTimeout(() => {
        chatMessages.innerHTML = '';
        
        // Create projects header
        const projectsHeader = document.createElement('div');
        projectsHeader.className = 'projects-header';
        projectsHeader.innerHTML = `
            <h2 class="projects-title">Here are some of Jon's recent project:</h2>
        `;
        chatMessages.appendChild(projectsHeader);
        
        // Create projects container
        const projectsContainer = document.createElement('div');
        projectsContainer.className = 'projects-container';
        
        // Check if projects data is available
        if (!projectsData || projectsData.length === 0) {
            const noDataMessage = document.createElement('div');
            noDataMessage.className = 'project-item';
            noDataMessage.innerHTML = `
                <div class="project-header">
                    <div class="project-title">Loading projects... (Data length: ${projectsData ? projectsData.length : 'undefined'})</div>
                </div>
            `;
            projectsContainer.appendChild(noDataMessage);
            console.log('Projects data not available:', projectsData);
            return;
        }
        
        console.log('Projects data available:', projectsData);
        
        // Add each project as expandable items
        projectsData.forEach((project, index) => {
            console.log(`Processing project ${index}:`, project);
            console.log(`Skills used for project ${index}:`, project.SkillsUsed || project.skillsUsed, typeof (project.SkillsUsed || project.skillsUsed));
            
            // Skip invalid projects
            if (!project || typeof project !== 'object') {
                console.warn(`Skipping invalid project at index ${index}:`, project);
                return;
            }
            
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';
            projectItem.dataset.projectId = project.id;
            
            const hasCaseStudy = (project.Link && project.Link !== '' && project.Link !== '#') || (project.link && project.link !== '' && project.link !== '#');
            
            projectItem.innerHTML = `
                <div class="project-header">
                    <div class="project-icon">
                        <span class="project-emoji">${project.icon || '📋'}</span>
                    </div>
                    <div class="project-title">${project.Title || project.title || 'Untitled Project'}</div>
                    <div class="expand-indicator">+</div>
                </div>
                <div class="project-details" id="project-details-${project.id}" style="display: none;">
                    <div class="project-description">${project.Description || project.description || 'No description available'}</div>
                    <div class="project-domain">
                        <div class="project-label">DOMAIN</div>
                        <div class="project-content">${project.Domain || project.domain || 'Not specified'}</div>
                    </div>
                    <div class="project-skills">
                        <div class="project-label">SKILLS USED</div>
                        <div class="project-content">${Array.isArray(project.SkillsUsed) ? project.SkillsUsed.join(', ') : (Array.isArray(project.skillsUsed) ? project.skillsUsed.join(', ') : (project.SkillsUsed || project.skillsUsed || 'Not specified'))}</div>
                    </div>
                    <div class="project-impact">
                        <div class="project-label">MEASURABLE RESULTS</div>
                        <div class="project-content">${project.MeasurableResults || project.measurableResults || 'Not available'}</div>
                    </div>
                    ${hasCaseStudy ? 
                        `<a href="${project.Link || project.link}" target="_blank" class="case-study-link">
                            <span class="link-icon">+</span>
                            View case study
                        </a>` : ''
                    }
                </div>
            `;
            
            // Add click event listener to the project header
            const projectHeader = projectItem.querySelector('.project-header');
            projectHeader.addEventListener('click', () => {
                const detailsElement = projectItem.querySelector('.project-details');
                const expandIndicator = projectItem.querySelector('.expand-indicator');
                
                console.log('Project header clicked, current display:', detailsElement.style.display);
                console.log('Details element:', detailsElement);
                console.log('Details content:', detailsElement.innerHTML);
                
                if (detailsElement.style.display === 'none' || detailsElement.style.display === '') {
                    // Expand
                    console.log('Expanding project details...');
                    detailsElement.style.display = 'block';
                    detailsElement.style.visibility = 'visible';
                    detailsElement.style.opacity = '1';
                    detailsElement.style.height = 'auto';
                    expandIndicator.textContent = '-';
                    projectItem.classList.add('expanded');
                    
                    // Force a reflow to ensure styles are applied
                    detailsElement.offsetHeight;
                    
                    console.log('Project expanded, display:', detailsElement.style.display, 'visibility:', detailsElement.style.visibility);
                } else {
                    // Collapse
                    console.log('Collapsing project details...');
                    detailsElement.style.transition = 'all 0.3s ease';
                    detailsElement.style.opacity = '0';
                    detailsElement.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        detailsElement.style.display = 'none';
                        expandIndicator.textContent = '+';
                        projectItem.classList.remove('expanded');
                    }, 300);
                }
            });
            
            projectsContainer.appendChild(projectItem);
        });
        
        chatMessages.appendChild(projectsContainer);
        
        // Fade in the new content
        chatMessages.style.transition = 'all 0.5s ease';
        chatMessages.style.opacity = '1';
        chatMessages.style.transform = 'translateY(0)';
        
        // Scroll to top smoothly
        chatMessages.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 200);
}

// Function to display About Jon section
function showAboutJonSection() {
    console.log('About Jon section clicked!'); // Debug log
    
    // Clear existing chat messages with fade out effect
    chatMessages.style.opacity = '0';
    chatMessages.style.transform = 'translateY(20px)';
    
    window.setTimeout(() => {
        chatMessages.innerHTML = '';
        
        // Create About Jon header
        const aboutHeader = document.createElement('div');
        aboutHeader.className = 'about-header';
        aboutHeader.innerHTML = `
            <h2 class="about-title">Senior Product Designer & UX Engineer</h2> <!-- No dash character -->
        `;
        chatMessages.appendChild(aboutHeader);
        
        // Create About Jon content
        const aboutContent = document.createElement('div');
        aboutContent.className = 'about-content';
        aboutContent.innerHTML = `
            <div class="about-text">
                <p>I'm Jon Gorroño, a designer who bridges the gap between technical complexity and human experience. With 10+ years of experience, I specialize in transforming complex systems into simple, intuitive, and visually compelling products.</p>
                
                <p>My unique background—an IT degree from Deusto and a Master's in Design from Barcelona—allows me to design with a developer's mindset and code with a designer's eye. I've delivered digital products, design systems, and UX strategies for global corporations (Inditex/ZARA, Gestamp), agile startups, and public institutions.</p>
                
                <p>I believe design has the power to make technology effortless and enjoyable—turning challenges into solutions that truly work for people.</p>
            </div>
            
            <div class="about-image-container">
                <img src="img/about-me.jpg" alt="Jon Gorroño" class="about-image" onload="console.log('Image loaded successfully')" onerror="console.log('Image failed to load')">
            </div>
        `;
        chatMessages.appendChild(aboutContent);
        
        console.log('About Jon content added to DOM'); // Debug log
        
        // Fade in the new content
        chatMessages.style.transition = 'all 0.5s ease';
        chatMessages.style.opacity = '1';
        chatMessages.style.transform = 'translateY(0)';
        
        // Scroll to top smoothly
        chatMessages.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 200);
}

// Function to show welcome message and return to chat
function showWelcomeMessage() {
    // Fade out effect
    chatMessages.style.opacity = '0';
    chatMessages.style.transform = 'translateY(-20px)';
    
    window.setTimeout(() => {
        chatMessages.innerHTML = '';
        chatBot.addMessage("Hi! I'm Jon's AI assistant. Ask me about his experience, projects, or fit for your company — or explore the cards below.", 'bot');
        
        // Fade in effect
        chatMessages.style.transition = 'all 0.5s ease';
        chatMessages.style.opacity = '1';
        chatMessages.style.transform = 'translateY(0)';
    }, 200);
}

// Add some initial interaction hints
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch projects data from API
    await fetchProjectsData();
    
    // Add welcome message after a short delay
    setTimeout(() => {
        chatBot.addMessage("Hi! I’m Jon’s AI assistant. Ask me about his experience, projects, or fit for your company — or explore the cards below.", 'bot');
    }, 1000);
});

// Add smooth scrolling for chat messages
function smoothScrollToBottom() {
    chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: 'smooth'
    });
}

// Auto-scroll to bottom when new messages are added
const observer = new MutationObserver(() => {
    smoothScrollToBottom();
});

observer.observe(chatMessages, {
    childList: true,
    subtree: true
});

// Add keyboard navigation for cards
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        // Handle tab navigation for accessibility
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const firstFocusableElement = document.querySelector(focusableElements);
        const focusableContent = document.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    }
});

// Add hover effects for better interactivity
actionCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.cursor = 'pointer';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.cursor = 'default';
    });
});

// Add input focus management
mainInput.addEventListener('focus', () => {
    mainInput.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.8)';
    mainInput.parentElement.style.background = 'rgba(255, 255, 255, 0.15)';
});

mainInput.addEventListener('blur', () => {
    mainInput.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    mainInput.parentElement.style.background = 'rgba(255, 255, 255, 0.1)';
});

// Add loading state for send button
function setSendButtonLoading(loading) {
    if (loading) {
        sendBtn.innerHTML = '⏳';
        sendBtn.disabled = true;
    } else {
        sendBtn.innerHTML = '💬';
        sendBtn.disabled = false;
    }
}

// Enhanced send message function with loading state
function sendMessage() {
    const message = mainInput.value.trim();
    if (!message) return;

    setSendButtonLoading(true);
    
    // Add user message
    chatBot.addMessage(message, 'user');
    
    // Clear input
    mainInput.value = '';
    
    // Generate bot response
    chatBot.generateResponse(message).finally(() => {
        setSendButtonLoading(false);
    });
}
