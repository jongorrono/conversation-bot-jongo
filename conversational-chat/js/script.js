// DOM Elements
const mainInput = document.getElementById('mainInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');
const clearSearch = document.getElementById('clearSearch');
const actionCards = document.querySelectorAll('.card');

// Debug version - helps ensure we're running the latest code
console.log('🚀 Script loaded - Version: 1.0.3 - Realistic Scoring System (Max 97%)');
console.log('📝 sendMessage function available:', typeof sendMessage);
console.log('🔍 DOM elements loaded:', {
    mainInput: !!mainInput,
    sendBtn: !!sendBtn,
    chatMessages: !!chatMessages
});

// Test function to manually trigger job description analysis
window.testJobDescription = function() {
    console.log('🧪 Testing job description function manually...');
    const testMessage = 'Design systems specialist for B2B companies';
    console.log('Test message:', testMessage);
    
    // Simulate the sendMessage function
    if (typeof sendMessage === 'function') {
        console.log('✅ sendMessage function exists, calling it...');
        sendMessage.call({}, testMessage);
    } else {
        console.log('❌ sendMessage function not found!');
    }
};

/* ---------- ChatGPT API Configuration ---------- */
// Import configuration (will be loaded from config.js)
const OPENAI_API_KEY = CONFIG?.OPENAI_API_KEY || 'your-openai-api-key-here';
const OPENAI_API_URL = CONFIG?.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions';

// Function to call ChatGPT API for role analysis
async function analyzeRoleWithChatGPT(jobDescription, userProfile) {
    try {
        const prompt = `You are an AI assistant helping to analyze job fit. 

JOB DESCRIPTION:
${jobDescription}

CANDIDATE PROFILE:
${userProfile}

Please analyze how well this candidate fits the role and provide:
1. A fit score (0-97, never use 100% as it's unrealistic)
2. Key strengths that align with the role
3. A natural language explanation of "Why It's a Match" - Analyze the specific job requirements, industry, company size, or unique aspects mentioned in the job description. Then create a compelling 2-3 sentence explanation that:
   - References specific elements from their job posting
   - Connects those requirements to Jon's relevant experience, projects, or working style
   - Mentions specific companies, projects, or methodologies that directly relate to what they're looking for
   - Shows understanding of their needs while highlighting Jon's unique value proposition

Format your response as JSON:
{
    "fitScore": 85,
    "strengths": ["strength1", "strength2"],
    "whyItsAMatch": "Intelligent, personalized explanation that analyzes their specific requirements and connects them to Jon's relevant background. Reference specific projects, companies, or working approaches that directly address their needs."
}

Note: Use realistic scores like 94%, 87%, 92%, etc. Never use 100% as it suggests perfect alignment which is unrealistic in real-world scenarios.`;

        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a professional HR analyst specializing in UX/Product Design roles. Provide accurate, helpful assessments.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        
        // Try to parse JSON response
        try {
            return JSON.parse(content);
        } catch (parseError) {
            // If parsing fails, return a structured fallback
            return {
                fitScore: 75,
                explanation: content,
                strengths: ['Analysis completed by AI'],
                developmentAreas: ['See detailed response above'],
                overallAssessment: 'AI analysis completed successfully'
            };
        }
    } catch (error) {
        console.error('ChatGPT API error:', error);
        return null;
    }
}

// Function to create user profile string from bio and projects data
function createUserProfile() {
    let profile = '';
    
    // Add bio information
    if (bioData.length > 0) {
        profile += 'WORK EXPERIENCE:\n';
        bioData.forEach(role => {
            profile += `- ${role.name}: ${role.title}\n`;
            profile += `  ${role.summary}\n\n`;
        });
    }
    
    // Add project information
    if (projectsData.length > 0) {
        profile += 'KEY PROJECTS:\n';
        projectsData.forEach(project => {
            profile += `- ${project.Title || project.title}: ${project.Description || project.description}\n`;
            profile += `  Domain: ${project.Domain || project.domain}\n`;
            profile += `  Skills: ${(project.SkillsUsed || project.skillsUsed || []).join(', ')}\n\n`;
        });
    }
    
    return profile;
}

/* ---------- Projects Data ---------- */

let projectsData = [];
let bioData = [];

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

// Function to fetch bio data from API
async function fetchBioData() {
    try {
        console.log('Fetching bio data from API...');
        const response = await fetch('https://689f4cb03fed484cf879b9a0.mockapi.io/Apicall/bio');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        bioData = data;
        console.log('Bio data fetched successfully:', data);
        return data;
    } catch (error) {
        console.error('Error fetching bio data:', error);
        bioData = [];
        return bioData;
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

      "company-fit":
        "🤝👋 Hi, great to meet you! Here you can explore Jon's profile and see how his skills and experience match your company's needs. Paste your job description or role title, and we'll check the fit together.",
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
    return "Wondering if Jon could be a strong match? Just paste the role title or description, and I'll map his skills against what you're looking for.";
  }
  
    // Clear chat history
    clearChat() {
        chatMessages.innerHTML = '';
        this.conversationHistory = [];
    }
}

// Initialize chat bot
const chatBot = new ChatBot();

// Predefined role fit scores
const predefinedRoleFits = {
    'design engineer': 92,
    'ux manager': 64,
    'design system': 82,
    'product designer': 84,
    'ux researcher': 85,
    'ui designer': 87,
    'interaction designer': 81,
    'service designer': 54,
    'front end designer': 93,
    'ux writer': 44,
    'accessibility specialist': 56,
    'human-centered design strategist': 76,
    'product strategist': 72,
    'branding specialist': 4,
    'ux/ui': 93,
    'ux design lead': 89,
    'ux lead': 89,
    'principal ux designer': 93,
    'digital product design engineer': 91,
    'web designer': 94,
    'lead ui/ux designer': 83,
    'senior ux designer': 94,
    'senior ux researcher': 82,
    'conversational ux designer': 77,
    'system designer': 78,
    'industrial product designer': 44,
    'ai designer': 84,
    'content designer': 64,
    'full stack engineer': 25,
    'saas': 89,
    'app ux': 84,
    'app ux/ui': 85,
    'software design': 95,
    'e-commerce ux/ui': 81
};

// Function to analyze role fit against Jon's profile
async function analyzeRoleFit(jobDescription) {
    const jobText = jobDescription.toLowerCase();
    
    // Check for predefined role fits first
    for (const [role, score] of Object.entries(predefinedRoleFits)) {
        if (jobText.includes(role.toLowerCase())) {
            console.log(`Predefined role fit found: ${role} with score ${score}%`);
            return {
                score: score,
                matchedSkills: ['Design systems', 'UX Design', 'Product Design'],
                relevantProjects: ['Design System Implementation', 'Product Design Projects'],
                relevantExperience: ['SENIOR PRODUCT DESIGNER', 'SENIOR UX DESIGNER ZARA'],
                summary: generateFitSummary(score, [], [], [])
            };
        }
    }
    
    let matchScore = 0;
    let matchedSkills = [];
    let relevantProjects = [];
    let relevantExperience = [];
    
    // Extract skills from projects data
    const allSkills = new Set();
    projectsData.forEach(project => {
        const skills = project.SkillsUsed || project.skillsUsed || [];
        if (Array.isArray(skills)) {
            skills.forEach(skill => allSkills.add(skill.toLowerCase()));
        }
    });
    
    // Use pre-fetched bio data for comprehensive matching
    if (bioData.length === 0) {
        console.log('Bio data not loaded, fetching now...');
        await fetchBioData();
    }
    
    // Extract skills from bio data (work experience)
    bioData.forEach(role => {
        if (role.title) {
            const titleSkills = role.title.split(',').map(skill => skill.trim().toLowerCase());
            titleSkills.forEach(skill => allSkills.add(skill));
        }
    });
    
    // Check for skill matches
    allSkills.forEach(skill => {
        if (jobText.includes(skill.toLowerCase())) {
            matchedSkills.push(skill);
            matchScore += 10; // 10 points per skill match
            console.log(`Skill match found: ${skill}`);
        }
    });
    
    // Check for domain matches from projects
    projectsData.forEach(project => {
        const domain = (project.Domain || project.domain || '').toLowerCase();
        if (domain && jobText.includes(domain.split(',')[0].trim())) {
            relevantProjects.push(project);
            matchScore += 15; // 15 points per domain match
        }
    });
    
    // Check for relevant work experience from bio
    bioData.forEach(role => {
        const roleName = (role.name || '').toLowerCase();
        const roleTitle = (role.title || '').toLowerCase();
        const roleSummary = (role.summary || '').toLowerCase();
        
        // Check if job description mentions any of these roles or their key aspects
        if (jobText.includes(roleName) || 
            roleTitle.split(',').some(skill => jobText.includes(skill.trim())) ||
            roleSummary.includes(jobText.split(' ').slice(0, 3).join(' '))) {
            relevantExperience.push(role);
            matchScore += 20; // 20 points per relevant experience match
            console.log(`Experience match found: ${role.name}`);
        }
    });
    
    // Check for experience level indicators
    if (jobText.includes('senior') || jobText.includes('lead') || jobText.includes('principal')) {
        matchScore += 25; // Jon has 10+ years experience
    }
    
    if (jobText.includes('ux') || jobText.includes('design') || jobText.includes('product')) {
        matchScore += 30; // Core expertise
    }
    
    // Check for industry matches
    if (jobText.includes('saas') || jobText.includes('healthcare') || jobText.includes('e-commerce') || 
        jobText.includes('government') || jobText.includes('education') || jobText.includes('automotive')) {
        matchScore += 15; // Industry experience bonus
    }
    
    // Cap score at 97 (more realistic than 100%)
    matchScore = Math.min(matchScore, 97);
    
    return {
        score: matchScore,
        matchedSkills: matchedSkills,
        relevantProjects: relevantProjects,
        relevantExperience: relevantExperience,
        summary: generateFitSummary(matchScore, matchedSkills, relevantProjects, relevantExperience)
    };
}

// Function to generate fit summary
function generateFitSummary(score, skills, projects, experience) {
    if (score >= 75) {
        return `🟢 **75–100 (Excellent Fit)** - "Great match!" Jon's skills and experience align closely with what this role requires—making him a strong candidate to consider right away.`;
    } else if (score >= 50) {
        return `🟡 **50–75 (Good Fit)** - "Strong potential" Jon's experience connects well with many aspects of the role. With the right environment and team, this match could be very effective.`;
    } else if (score >= 25) {
        return `🟠 **25–50 (Partial Fit)** - "Some overlap" Jon shares a few skills relevant to this role, though other areas may not fully match. With growth or a different role focus, the fit could improve.`;
    } else {
        return `🔴 **0–25 (Low Fit)** - "Not the best fit" Jon's background doesn't strongly align with this role. But every company values different strengths—there might be better matches elsewhere.`;
    }
}

// Function to generate match title and subtitle based on score
function generateMatchDisplay(score) {
    if (score >= 75) {
        return {
            title: "Excellent Fit",
            subtitle: '"Great match!" Jon\'s skills and experience align closely with what this role requires.',
            cssClass: "good-fit"
        };
    } else if (score >= 50) {
        return {
            title: "Good Fit",
            subtitle: '"Strong potential" Jon\'s experience connects well with many aspects of the role. With the right environment and team, this match could be very effective.',
            cssClass: "good-fit"
        };
    } else if (score >= 25) {
        return {
            title: "Partial Fit",
            subtitle: '"Some overlap" Jon shares a few skills relevant to this role, though other areas may not fully match. With growth or a different role focus, the fit could improve.',
            cssClass: "partial-fit"
        };
    } else {
        return {
            title: "Low Fit",
            subtitle: '"Not the best fit" Jon\'s background doesn\'t strongly align with this role. But every company values different strengths—there might be better matches elsewhere.',
            cssClass: "low-fit"
        };
    }
}

// Function to generate intelligent match explanation based on input text
function generateIntelligentMatchExplanation(inputText) {
    const text = inputText.toLowerCase();
    
    // Analyze the input and create personalized explanations
    if (text.includes('senior') || text.includes('lead') || text.includes('principal')) {
        return `Based on your requirements for a senior-level position, Jon's 10+ years of experience leading design teams at companies like ZARA and his track record of mentoring junior designers makes him an ideal candidate. His experience in design systems and strategic thinking demonstrates the leadership qualities you're looking for.`;
    }
    
    if (text.includes('saas') || text.includes('b2b')) {
        return `Given your focus on SaaS/B2B products, Jon's experience designing complex enterprise platforms and his work on internal tools at ZARA directly aligns with your needs. His understanding of business user workflows and technical constraints will be valuable for your product.`;
    }
    
    if (text.includes('startup') || text.includes('fast-paced')) {
        return `For a fast-paced startup environment, Jon's experience working across multiple industries and his ability to quickly adapt to new challenges makes him a great fit. His work on rapid prototyping and iterative design processes aligns perfectly with startup culture.`;
    }
    
    if (text.includes('design system') || text.includes('component')) {
        return `Since you're looking for design system expertise, Jon's extensive work building and maintaining design systems at ZARA and other companies directly addresses your needs. His technical background allows him to create scalable, developer-friendly design solutions.`;
    }
    
    if (text.includes('ux research') || text.includes('user research')) {
        return `For UX research-focused roles, Jon's experience conducting user interviews, usability testing, and translating insights into actionable design decisions makes him well-suited. His work on user-centered design processes demonstrates his research-driven approach.`;
    }
    
    if (text.includes('mobile') || text.includes('app')) {
        return `Given your mobile app focus, Jon's experience designing responsive interfaces and his understanding of mobile user behavior patterns will be valuable. His work on cross-platform design ensures consistency across different devices.`;
    }
    
    if (text.includes('accessibility') || text.includes('inclusive')) {
        return `For accessibility-focused design, Jon's experience creating inclusive user experiences and his knowledge of WCAG guidelines makes him a strong candidate. His commitment to designing for all users aligns with your accessibility goals.`;
    }
    
    // Default intelligent response
    return `Based on your specific requirements, Jon's extensive experience in product design and UX, combined with his technical background and proven track record in design systems, makes him an excellent candidate. His work at ZARA and other companies demonstrates his ability to deliver user-centered solutions that directly address the needs you've outlined.`;
}

// Functions

async function sendMessage() {
    const message = mainInput.value.trim();
    if (!message) return;
    
    console.log('sendMessage called with:', message);
    console.log('Message length:', message.length);

    // Add user message
    chatBot.addMessage(message, 'user');
    
    // Clear input
    mainInput.value = '';
    
    // Check if this might be a job description for company fit analysis
    // Look for job-related keywords or if the message is long enough to be a description
    const jobKeywords = ['designer', 'ux', 'product', 'developer', 'engineer', 'manager', 'lead', 'senior', 'researcher', 'architect', 'specialist', 'consultant', 'analyst', 'coordinator', 'director', 'head', 'principal'];
    const hasJobKeywords = jobKeywords.some(keyword => message.toLowerCase().includes(keyword));
    const isLongDescription = message.length > 30;
    const isLikelyJobDescription = hasJobKeywords || isLongDescription;
    
    console.log('=== JOB DESCRIPTION DETECTION START ===');
    console.log('Job description detection:', {
        message: message,
        hasJobKeywords: hasJobKeywords,
        isLongDescription: isLongDescription,
        isLikelyJobDescription: isLikelyJobDescription,
        matchedKeywords: jobKeywords.filter(keyword => message.toLowerCase().includes(keyword))
    });
    console.log('=== JOB DESCRIPTION DETECTION END ===');
    
    if (isLikelyJobDescription) {
        console.log('🎯 JOB DESCRIPTION DETECTED! Starting analysis...');
        
        // Show loading message
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message bot';
        loadingDiv.innerHTML = `
            <div class="message-content">
                <div style="color: rgba(255, 255, 255, 0.8);">
                    🔍 Analyzing role fit... Please wait a moment.
                </div>
            </div>
        `;
        chatMessages.appendChild(loadingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Try ChatGPT API first, fallback to custom algorithm
        const userProfile = createUserProfile();
        let chatGPTResult = null;
        
        // Check if ChatGPT API is configured
        if (OPENAI_API_KEY !== 'your-openai-api-key-here') {
            try {
                chatGPTResult = await analyzeRoleWithChatGPT(message, userProfile);
                console.log('ChatGPT analysis result:', chatGPTResult);
            } catch (error) {
                console.log('ChatGPT API failed, using custom algorithm:', error);
            }
        }
        
        if (chatGPTResult) {
            // Use ChatGPT result
            loadingDiv.remove();
            
            const analysisDiv = document.createElement('div');
            analysisDiv.className = 'message bot';
            analysisDiv.innerHTML = `
                <div class="message-content">
                    <div class="role-fit-analysis">
                        <!-- Match Box -->
                        <div class="excellent-match-box ${generateMatchDisplay(chatGPTResult.fitScore).cssClass}">
                            <div class="match-info">
                                <div class="checkmark-icon">✓</div>
                                <div class="match-text">
                                    <div class="match-title">${generateMatchDisplay(chatGPTResult.fitScore).title}</div>
                                    <div class="match-subtitle">${generateMatchDisplay(chatGPTResult.fitScore).subtitle}</div>
                                </div>
                            </div>
                            <div class="match-percentage">${chatGPTResult.fitScore}%</div>
                        </div>
                        
                        <!-- Profile Card - Only show if score >= 50% -->
                        ${chatGPTResult.fitScore >= 50 ? `
                        <div class="profile-card">
                            <div class="profile-photo">
                                <img src="img/about-me.jpg" alt="Jon Gorroño" class="profile-image">
                            </div>
                            <div class="profile-details">
                                <div class="profile-section">
                                    <div class="section-label">MATCHED SKILLS</div>
                                    <div class="section-content">${chatGPTResult.strengths.length > 0 ? chatGPTResult.strengths.join(', ') : 'Design systems'}</div>
                                </div>
                                
                                <div class="profile-section">
                                    <div class="section-label">WHY IT'S A MATCH</div>
                                    <div class="section-content">${chatGPTResult.whyItsAMatch || 'Jon\'s extensive experience in product design and UX, combined with his technical background and proven track record in design systems, makes him an excellent candidate for this role.'}</div>
                                </div>
                            </div>
                        </div>
                        ` : ''}
                        
                        <div class="ai-analysis-note">
                            🤖 <strong>AI Analysis:</strong> Powered by ChatGPT for intelligent role matching
                        </div>
                    </div>
                </div>
            `;
            chatMessages.appendChild(analysisDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } else {
            // Fallback to custom algorithm
            analyzeRoleFit(message).then(fitAnalysis => {
                console.log('Custom role fit analysis completed:', fitAnalysis);
                loadingDiv.remove();
                
                const analysisDiv = document.createElement('div');
                analysisDiv.className = 'message bot';
                analysisDiv.innerHTML = `
                    <div class="message-content">
                        <div class="role-fit-analysis">
                            <!-- Match Box -->
                            <div class="excellent-match-box ${generateMatchDisplay(fitAnalysis.score).cssClass}">
                                <div class="match-info">
                                    <div class="checkmark-icon">✓</div>
                                    <div class="match-text">
                                        <div class="match-title">${generateMatchDisplay(fitAnalysis.score).title}</div>
                                        <div class="match-subtitle">${generateMatchDisplay(fitAnalysis.score).subtitle}</div>
                                    </div>
                                </div>
                                <div class="match-percentage">${fitAnalysis.score}%</div>
                            </div>
                            
                            <!-- Profile Card - Only show if score >= 50% -->
                            ${fitAnalysis.score >= 50 ? `
                            <div class="profile-card">
                                <div class="profile-photo">
                                    <img src="img/about-me.jpg" alt="Jon Gorroño" class="profile-image">
                                </div>
                                <div class="profile-details">
                                    <div class="profile-section">
                                        <div class="section-label">MATCHED SKILLS</div>
                                        <div class="section-content">${fitAnalysis.matchedSkills.length > 0 ? fitAnalysis.matchedSkills.join(', ') : 'Design systems'}</div>
                                    </div>
                                    
                                    <div class="profile-section">
                                        <div class="section-label">WHY IT'S A MATCH</div>
                                        <div class="section-content">${generateIntelligentMatchExplanation(message)}</div>
                                    </div>
                                </div>
                            </div>
                            ` : ''}
                            
                            <div class="ai-analysis-note">
                                💡 <strong>Custom Algorithm:</strong> Using local analysis for role matching
                            </div>
                        </div>
                    </div>
                `;
                chatMessages.appendChild(analysisDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }).catch(error => {
                loadingDiv.remove();
                const errorDiv = document.createElement('div');
                errorDiv.className = 'message bot';
                errorDiv.innerHTML = `
                    <div class="message-content">
                        <div style="color: rgba(255, 255, 255, 0.8);">
                            ❌ Sorry, there was an error analyzing the role fit. Please try again.
                        </div>
                    </div>
                `;
                chatMessages.appendChild(errorDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            });
        }
        
        return;
    }
    
    // If it's not a job description, check if it might be a follow-up to company-fit
    // This handles cases where users type job descriptions without specific keywords
    if (message.length > 20 && chatBot.conversationHistory.length > 0) {
        const lastMessage = chatBot.conversationHistory[chatBot.conversationHistory.length - 1];
        if (lastMessage && lastMessage.content.toLowerCase().includes('company-fit')) {
            console.log('Detected follow-up to company-fit, analyzing as job description');
            
            // Show loading message
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'message bot';
            loadingDiv.innerHTML = `
                <div class="message-content">
                    <div style="color: rgba(255, 255, 255, 0.8);">
                        🔍 Analyzing role fit... Please wait a moment.
                    </div>
                </div>
            `;
            chatMessages.appendChild(loadingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Try to analyze with custom algorithm
            analyzeRoleFit(message).then(fitAnalysis => {
                console.log('Follow-up role fit analysis completed:', fitAnalysis);
                loadingDiv.remove();
                
                const analysisDiv = document.createElement('div');
                analysisDiv.className = 'message bot';
                analysisDiv.innerHTML = `
                    <div class="message-content">
                        <div class="role-fit-analysis">
                            <!-- Match Box -->
                            <div class="excellent-match-box ${generateMatchDisplay(fitAnalysis.score).cssClass}">
                                <div class="match-info">
                                    <div class="checkmark-icon">✓</div>
                                    <div class="match-text">
                                        <div class="match-title">${generateMatchDisplay(fitAnalysis.score).title}</div>
                                        <div class="match-subtitle">${generateMatchDisplay(fitAnalysis.score).subtitle}</div>
                                    </div>
                                </div>
                                <div class="match-percentage">${fitAnalysis.score}%</div>
                            </div>
                            
                            <!-- Profile Card - Only show if score >= 50% -->
                            ${fitAnalysis.score >= 50 ? `
                            <div class="profile-card">
                                <div class="profile-photo">
                                    <img src="img/about-me.jpg" alt="Jon Gorroño" class="profile-image">
                                </div>
                                <div class="profile-details">
                                    <div class="profile-section">
                                        <div class="section-label">MATCHED SKILLS</div>
                                        <div class="section-content">${fitAnalysis.matchedSkills.length > 0 ? fitAnalysis.matchedSkills.join(', ') : 'Design systems'}</div>
                                    </div>
                                    
                                    <div class="profile-section">
                                        <div class="section-label">WHY IT'S A MATCH</div>
                                        <div class="section-content">${generateIntelligentMatchExplanation(message)}</div>
                                    </div>
                                </div>
                            </div>
                            ` : ''}
                            
                            <div class="ai-analysis-note">
                                💡 <strong>Follow-up Analysis:</strong> Detected as job description after company-fit
                            </div>
                        </div>
                    </div>
                `;
                chatMessages.appendChild(analysisDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }).catch(error => {
                loadingDiv.remove();
                const errorDiv = document.createElement('div');
                errorDiv.className = 'message bot';
                errorDiv.innerHTML = `
                    <div class="message-content">
                        <div style="color: rgba(255, 255, 255, 0.8);">
                            ❌ Sorry, there was an error analyzing the role fit. Please try again.
                        </div>
                    </div>
                `;
                chatMessages.appendChild(errorDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            });
            
            return;
        }
    }
    
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
        chatBot.addMessage("company-fit", 'user');
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
    
    // Fetch bio data from API
    await fetchBioData();
    
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
clearSearch.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Clear the main chat input
    mainInput.value = '';
    
    // Clear the chat messages and show welcome message
    chatBot.clearChat();
    showWelcomeMessage();
    
    // Focus on the main input
    mainInput.focus();
    
    console.log('Clear button clicked - Chat cleared and reset');
});

// Action card interactions
actionCards.forEach(card => {
    card.addEventListener('click', () => {
        const action = card.dataset.action;
        
        // Add enhanced visual feedback
        card.style.transform = 'scale(0.95)';
        card.style.background = 'rgba(255, 255, 255, 0.15)';
        
        window.setTimeout(() => {
            card.style.transform = '';
            card.style.background = '';
        }, 150);
        
        // Handle the action
        handleCardAction(action);
    });
});
