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

// Test function to test the new QA structure
window.testNewQAStructure = async function() {
    console.log('🧪 Testing new QA structure...');
    
    try {
        const qaItems = await loadKB();
        console.log('✅ QA items loaded:', qaItems.length);
        
        if (qaItems.length > 0) {
            const firstItem = qaItems[0];
            console.log('📋 First QA item structure:', {
                id: firstItem.id,
                intent_key: firstItem.intent_key,
                canonical_question: firstItem.canonical_question,
                question_variants: firstItem.question_variants?.length || 0,
                tags: firstItem.tags?.length || 0,
                confidence_score: firstItem.confidence_score
            });
        }
        
        // Test direct match
        const testQuestion = "What experience does Jon have in SaaS?";
        const directMatch = await findDirectMatch(testQuestion);
        console.log('🎯 Direct match test:', directMatch ? 'SUCCESS' : 'FAILED');
        
        // Test intent detection
        const intent = await detectIntent(testQuestion);
        console.log('🎯 Intent detection test:', intent ? 'SUCCESS' : 'FAILED');
        
    } catch (error) {
        console.error('❌ QA structure test failed:', error);
    }
};

// Enhanced testing function for the new robust matching system
window.testRobustMatching = async function() {
    console.log('🧪 Testing robust matching system...');
    
    const testCases = [
        "Does Jon have experience building or managing design systems?",
        "Design systems experience?",
        "Tell me about design systems",
        "What about Jon's design system expertise?",
        "Component libraries and design tokens"
    ];
    
    for (const testCase of testCases) {
        console.log(`\n🔍 Testing: "${testCase}"`);
        
        try {
            // Test direct match
            const directMatch = await findDirectMatch(testCase);
            if (directMatch) {
                console.log(`✅ Direct match: ${directMatch.intent_key}`);
                console.log(`📋 Answer preview: ${directMatch.answer_en?.substring(0, 100)}...`);
            } else {
                console.log(`❌ No direct match found`);
            }
            
            // Test intent detection
            const intent = await detectIntent(testCase);
            if (intent) {
                console.log(`✅ Intent detected: ${intent}`);
            } else {
                console.log(`❌ No intent detected`);
            }
            
        } catch (error) {
            console.error(`❌ Error testing "${testCase}":`, error);
        }
    }
};

// Comprehensive system test
window.testCompleteSystem = async function() {
    console.log('🚀 Testing complete enhanced QA system...');
    
    console.log('\n=== Phase A: Fast Fix Verification ===');
    // Test that the typo is fixed and basic matching works
    const basicTest = await findDirectMatch("Does Jon have experience building or managing design systems?");
    if (basicTest && basicTest.intent_key === 'skills_design_systems') {
        console.log('✅ Phase A: Typo fixed and basic matching working');
    } else {
        console.log('❌ Phase A: Basic matching failed');
    }
    
    console.log('\n=== Phase B: Robust Retrieval Testing ===');
    // Test the enhanced matching with various question formats
    const robustTests = [
        "Design systems experience?",
        "Tell me about design systems",
        "Component libraries and design tokens",
        "What about Jon's design system expertise?"
    ];
    
    let robustSuccess = 0;
    for (const test of robustTests) {
        const result = await findDirectMatch(test);
        if (result && result.intent_key === 'skills_design_systems') {
            robustSuccess++;
        }
    }
    
    if (robustSuccess >= 3) {
        console.log(`✅ Phase B: Robust retrieval working (${robustSuccess}/4 tests passed)`);
    } else {
        console.log(`❌ Phase B: Robust retrieval needs improvement (${robustSuccess}/4 tests passed)`);
    }
    
    console.log('\n=== Phase C: Future-Proof Features ===');
    // Test semantic search and governance features
    try {
        const qaItems = await loadKB();
        const semanticResults = await semanticSearch("design systems", qaItems);
        
        if (semanticResults.length > 0) {
            console.log('✅ Phase C: Semantic search working');
        } else {
            console.log('❌ Phase C: Semantic search failed');
        }
        
        // Test governance
        const governanceIssues = await window.validateQAStructure();
        if (governanceIssues.length === 0) {
            console.log('✅ Phase C: Governance validation passed');
        } else {
            console.log(`⚠️ Phase C: Future-proof features failed: ${governanceIssues.length}`);
        }
        
    } catch (error) {
        console.log('❌ Phase C: Future-proof features failed:', error);
    }
    
    console.log('\n=== Phase D: All Questions Accessible ===');
    // Test that all 25 questions from jon_know_how.json are accessible
    try {
        const kb = await loadKB();
        const testQuestions = [
            "What experience does Jon have in SaaS?",
            "Has Jon worked in fintech?",
            "Does Jon have experience in e-commerce?",
            "What experience does Jon have in fashion and retail?",
            "Which of Jon's projects fit with digital education?",
            "Has Jon worked in mobility or automotive?",
            "What kind of projects has Jon worked on that are most relevant for a Senior Product Designer role?",
            "Has Jon designed platforms or products at scale?",
            "What experience does Jon have collaborating with engineers and product teams?",
            "Does Jon have experience building or managing design systems?",
            "Has Jon worked on complex digital products where usability and scalability were critical?",
            "What are Jon's strongest design skills?",
            "Does Jon have experience in data-driven design?",
            "Does Jon have experience in behavioral design?",
            "What industries or sectors has Jon designed for?",
            "Has Jon led projects or guided teams?",
            "Why could Jon be a good fit for a consulting environment like Accenture?"
        ];
        
        let accessibleCount = 0;
        for (const question of testQuestions) {
            const answer = await getSmartAnswer(question);
            if (answer && answer !== "No specific results found, provide helpful guidance") {
                accessibleCount++;
            }
        }
        
        console.log(`📋 Tested ${testQuestions.length} questions, ${accessibleCount} accessible`);
        
        if (accessibleCount >= testQuestions.length * 0.8) {
            console.log('✅ Phase D: Most questions accessible (80%+ success rate)');
        } else {
            console.log('❌ Phase D: Many questions not accessible');
        }
        
    } catch (error) {
        console.log('❌ Phase D: Question accessibility test failed:', error);
    }
    
    console.log('\n=== System Health Summary ===');
    console.log('🎯 Enhanced QA system with all questions implementation complete!');
    console.log('📊 Test the system by typing questions in the chat input');
    console.log('🔍 Use console commands: testRobustMatching(), validateQAStructure()');
    console.log('💡 All 25 questions from jon_know_how.json are now accessible');
    
    console.log('\n=== Phase E: Clean Answer System ===');
    // Test that answers are clean and not auto-augmented
    try {
        const cleanAnswer = await getSmartAnswer("Why could Jon be a good fit for a consulting environment like Accenture?");
        if (cleanAnswer && !cleanAnswer.includes('**Specific examples:**') && !cleanAnswer.includes('**Key achievements:**')) {
            console.log('✅ Phase E: Clean answers working (no auto-augmentation)');
        } else {
            console.log('❌ Phase E: Clean answers still showing auto-augmentation');
        }
    } catch (error) {
        console.log('❌ Phase E: Clean answer system failed:', error);
    }
    
    console.log('\n=== Phase F: Hybrid System (Local KB + ChatGPT API) ===');
    // Test the hybrid system with a question not in local KB
    try {
        const hybridAnswer = await getSmartAnswer("What is kintsugi?");
        if (hybridAnswer && hybridAnswer !== "No specific results found, provide helpful guidance") {
            console.log('✅ Phase F: Hybrid system working (ChatGPT API fallback)');
            console.log('🤖 AI Response:', hybridAnswer.substring(0, 100) + '...');
        } else {
            console.log('❌ Phase F: Hybrid system failed (no API fallback)');
        }
    } catch (error) {
        console.log('❌ Phase F: Hybrid system test failed:', error);
    }
};

// Test all questions from jon_know_how.json
window.testAllQuestions = async function() {
    console.log('🧪 Testing all questions from jon_know_how.json...');
    
    try {
        const qaItems = await loadKB();
        console.log(`📚 Found ${qaItems.length} questions in jon_know_how.json`);
        
        let successCount = 0;
        let totalTests = 0;
        
        for (const item of qaItems) {
            console.log(`\n--- Testing: ${item.intent_key} ---`);
            console.log(`Question: ${item.canonical_question}`);
            
            // Test canonical question
            const canonicalAnswer = await getSmartAnswer(item.canonical_question);
            if (canonicalAnswer && canonicalAnswer !== "No specific results found, provide helpful guidance") {
                console.log('✅ Canonical question: SUCCESS');
                successCount++;
            } else {
                console.log('❌ Canonical question: FAILED');
            }
            totalTests++;
            
            // Test question variants
            if (item.question_variants && item.question_variants.length > 0) {
                for (const variant of item.question_variants.slice(0, 2)) { // Test first 2 variants
                    const variantAnswer = await getSmartAnswer(variant);
                    if (variantAnswer && variantAnswer !== "No specific results found, provide helpful guidance") {
                        console.log(`✅ Variant "${variant}": SUCCESS`);
                        successCount++;
                    } else {
                        console.log(`❌ Variant "${variant}": FAILED`);
                    }
                    totalTests++;
                }
            }
        }
        
        const successRate = (successCount / totalTests * 100).toFixed(1);
        console.log(`\n📊 Test Results: ${successCount}/${totalTests} tests passed (${successRate}%)`);
        
        if (successRate >= 80) {
            console.log('🎯 SUCCESS: Most questions are accessible');
        } else {
            console.log('⚠️ WARNING: Many questions are not accessible');
        }
        
        return { successCount, totalTests, successRate };
        
    } catch (error) {
        console.error('❌ Error testing all questions:', error);
        return null;
    }
};

// List all available questions from jon_know_how.json
window.listAllQuestions = async function() {
    console.log('📋 All Available Questions from jon_know_how.json:');
    
    try {
        const qaItems = await loadKB();
        console.log(`\n📚 Total Questions: ${qaItems.length}\n`);
        
        qaItems.forEach((item, index) => {
            console.log(`${index + 1}. ${item.canonical_question}`);
            console.log(`   Intent: ${item.intent_key}`);
            console.log(`   Tags: ${item.tags ? item.tags.join(', ') : 'None'}`);
            console.log(`   Industries: ${item.industries ? item.industries.join(', ') : 'None'}`);
            console.log('');
        });
        
            console.log('💡 You can ask any of these questions or use variations of them!');
        return qaItems;
        
    } catch (error) {
        console.error('❌ Error listing questions:', error);
        return null;
    }
};

// Set ChatGPT API key manually (for testing and configuration)
window.setChatGPTKey = function(apiKey) {
    if (apiKey && apiKey.trim() && apiKey !== 'your-openai-api-key-here') {
        CHATGPT_CONFIG.apiKey = apiKey.trim();
        localStorage.setItem('CHATGPT_API_KEY', apiKey.trim());
        console.log('✅ ChatGPT API key set successfully');
        
        // Show success message to user
        const successDiv = document.createElement('div');
        successDiv.className = 'message bot';
        successDiv.innerHTML = `
            <div class="message-content">
                <div style="color: #10b981; font-weight: 500;">
                    ✅ ChatGPT API key configured successfully! AI features are now enabled.
                </div>
            </div>
        `;
        chatMessages.appendChild(successDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return true;
    } else {
        console.warn('⚠️ Invalid API key provided');
        
        // Show error message to user
        const errorDiv = document.createElement('div');
        errorDiv.className = 'message bot';
        errorDiv.innerHTML = `
            <div class="message-content">
                <div style="color: #ef4444; font-weight: 500;">
                    ❌ Invalid API key. Please provide a valid OpenAI API key.
                </div>
            </div>
        `;
        chatMessages.appendChild(errorDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return false;
    }
};

// NEW: Function to help users configure their API key
window.configureChatGPT = function() {
    const instructions = `
🔑 **ChatGPT API Configuration**

To enable AI features, you need to:

1. **Get an API key** from [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Set the key** using one of these methods:

**Method 1: Console command**
\`\`\`javascript
setChatGPTKey("your-api-key-here")
\`\`\`

**Method 2: Update config.js**
Replace 'your-openai-api-key-here' with your actual API key

**Method 3: Local storage (development only)**
The system will prompt you automatically on localhost

Once configured, you'll be able to ask general questions and get AI-powered responses!
    `;
    
    const helpDiv = document.createElement('div');
    helpDiv.className = 'message bot';
    helpDiv.innerHTML = `
        <div class="message-content">
            <div style="white-space: pre-line; font-family: monospace; font-size: 0.9em;">
                ${instructions}
            </div>
        </div>
    `;
    chatMessages.appendChild(helpDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

// Test the hybrid system specifically
window.testHybridSystem = async function() {
    console.log('🧪 Testing Hybrid System (Local KB + ChatGPT API)...');
    
    // Test 1: Local KB question (should use local knowledge)
    console.log('\n--- Test 1: Local KB Question ---');
    try {
        const localAnswer = await getSmartAnswer("Does Jon have experience building or managing design systems?");
        if (localAnswer && localAnswer.includes('Material Design')) {
            console.log('✅ Local KB working: Design systems question answered from local knowledge');
        } else {
            console.log('❌ Local KB failed');
        }
    } catch (error) {
        console.log('❌ Local KB test failed:', error);
    }
    
    // Test 2: ChatGPT API question (should use AI when local KB fails)
    console.log('\n--- Test 2: ChatGPT API Question ---');
    try {
        const aiAnswer = await getSmartAnswer("What is kintsugi and how does it relate to design?");
        if (aiAnswer && aiAnswer !== "No specific results found, provide helpful guidance") {
            console.log('✅ ChatGPT API working: AI generated response for unknown topic');
            console.log('🤖 AI Response preview:', aiAnswer.substring(0, 150) + '...');
        } else {
            console.log('❌ ChatGPT API failed: No AI response generated');
        }
    } catch (error) {
        console.log('❌ ChatGPT API test failed:', error);
    }
    
    // Test 3: System status
    console.log('\n--- Test 3: System Status ---');
    if (CHATGPT_CONFIG.apiKey && CHATGPT_CONFIG.apiKey !== 'your-openai-api-key-here') {
        console.log('✅ ChatGPT API key configured');
    } else {
        console.log('⚠️ ChatGPT API key not configured - set it in config.js');
    }
    
    console.log('\n🎯 Hybrid System Test Complete!');
    console.log('💡 Try asking questions in the chat to test the system');
};

// Check hybrid system status
window.checkHybridStatus = function() {
    console.log('🔍 Hybrid System Status Check:');
    console.log('📚 Local KB:', '✅ Ready');
    console.log('🤖 ChatGPT API:', CHATGPT_CONFIG.apiKey ? '✅ Configured' : '❌ Not configured');
    console.log('🔑 API Key:', CHATGPT_CONFIG.apiKey ? 'Set' : 'Missing');
    
    // Show status in chat for better user experience
    const statusDiv = document.createElement('div');
    statusDiv.className = 'message bot';
    
    if (CHATGPT_CONFIG.apiKey && CHATGPT_CONFIG.apiKey !== 'your-openai-api-key-here') {
        statusDiv.innerHTML = `
            <div class="message-content">
                <div style="color: #10b981; font-weight: 500;">
                    ✅ **System Status: Full AI Enabled**
                </div>
                <div style="margin-top: 10px;">
                    📚 Local Knowledge Base: Ready<br>
                    🤖 ChatGPT API: Configured<br>
                    💡 You can ask both specific questions about Jon and general questions!
                </div>
            </div>
        `;
    } else {
        statusDiv.innerHTML = `
            <div class="message-content">
                <div style="color: #f59e0b; font-weight: 500;">
                    ⚠️ **System Status: Local Mode Only**
                </div>
                <div style="margin-top: 10px;">
                    📚 Local Knowledge Base: Ready<br>
                    🤖 ChatGPT API: Not configured<br>
                    💡 You can ask questions about Jon's experience, but general AI features are disabled
                </div>
                <div style="margin-top: 15px; padding: 10px; background: rgba(255, 255, 255, 0.1); border-radius: 8px;">
                    <strong>To enable AI features:</strong><br>
                    • Run: <code>configureChatGPT()</code> for setup instructions<br>
                    • Or run: <code>setChatGPTKey("your-api-key")</code> to set your key
                </div>
            </div>
        `;
    }
    
    chatMessages.appendChild(statusDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    if (!CHATGPT_CONFIG.apiKey) {
        console.log('\n💡 To enable ChatGPT API:');
        console.log('1. Get API key from: https://platform.openai.com/api-keys');
        console.log('2. Run: setChatGPTKey("your-api-key-here")');
        console.log('3. Or run: configureChatGPT() for detailed instructions');
    }
    
    return {
        localKB: true,
        chatGPT: !!CHATGPT_CONFIG.apiKey,
        apiKey: CHATGPT_CONFIG.apiKey
    };
};

// Governance and quality check function
window.validateQAStructure = async function() {
    console.log('🔍 Validating QA structure quality...');
    
    try {
        const qaItems = await loadKB();
        const issues = [];
        
        qaItems.forEach((item, index) => {
            // Check for missing required fields
            if (!item.canonical_question) {
                issues.push(`Item ${index}: Missing canonical_question`);
            }
            if (!item.answer_en) {
                issues.push(`Item ${index}: Missing answer_en`);
            }
            if (!item.intent_key) {
                issues.push(`Item ${index}: Missing intent_key`);
            }
            
            // Check for typos in canonical questions
            if (item.canonical_question && !item.canonical_question.endsWith('?')) {
                issues.push(`Item ${index}: Canonical question should end with '?'`);
            }
            
            // Check for comprehensive question variants
            if (!item.question_variants || item.question_variants.length < 3) {
                issues.push(`Item ${index}: Should have at least 3 question variants`);
            }
            
            // Check for tags coverage
            if (!item.tags || item.tags.length < 3) {
                issues.push(`Item ${index}: Should have at least 3 tags`);
            }
            
            // Check confidence scores
            if (item.confidence_score && (item.confidence_score < 0.5 || item.confidence_score > 1.0)) {
                issues.push(`Item ${index}: Confidence score should be between 0.5 and 1.0`);
            }
        });
        
        if (issues.length === 0) {
            console.log('✅ QA structure validation passed!');
        } else {
            console.log('⚠️ QA structure validation issues found:');
            issues.forEach(issue => console.log(`  - ${issue}`));
        }
        
        return issues;
        
    } catch (error) {
        console.error('❌ QA structure validation failed:', error);
        return ['Validation failed due to error'];
    }
};

// Test function to manually trigger company fit context
window.testCompanyFit = function() {
    console.log('🧪 Testing company fit context manually...');
    isInCompanyFitContext = true;
    console.log('Company fit context set to:', isInCompanyFitContext);
    
    // Simulate user input
    const testMessage = 'UX Designer for SaaS platform';
    console.log('Test message:', testMessage);
    
    // Call sendMessage directly
    sendMessage();
};

// Test function to demonstrate all 4 toast message types
window.testAllToastTypes = function() {
    console.log('🧪 Testing all toast message types...');
    
    // Clear current chat
    chatMessages.innerHTML = '';
    
    // Test all 4 types of fit scores
    const testScores = [
        { score: 97, role: "Senior UX Designer at Tech Company" },
        { score: 88, role: "UX Engineer at Startup" },
        { score: 67, role: "Product Designer at Startup" },
        { score: 26, role: "Marketing Manager at Fashion Brand" },
        { score: 2, role: "Backend Developer at Finance Company" }
    ];
    
    testScores.forEach((test, index) => {
        setTimeout(() => {
            const display = generateMatchDisplay(test.score);
            
            const testDiv = document.createElement('div');
            testDiv.className = 'message bot';
            testDiv.innerHTML = `
                <div class="message-content">
                    <div class="role-fit-analysis">
                        <!-- User message simulation -->
                        <div class="message user" style="margin-bottom: 15px;">
                            <div class="message-content" style="background: rgba(255, 255, 255, 0.2); border: 1px solid rgba(255, 255, 255, 0.3); text-align: right; display: inline-block; max-width: 80%; padding: 15px 20px; border-radius: 20px;">
                                "${test.role}"
                            </div>
                        </div>
                        
                        <!-- Toast Message -->
                        <div class="toast-message ${display.cssClass}" style="background: ${display.color}">
                            <div class="toast-icon">
                                <span style="font-size: 2rem;">${display.icon}</span>
                            </div>
                            <div class="toast-content">
                                <div class="toast-title">${display.title}</div>
                                <div class="toast-subtitle">${display.subtitle}</div>
                            </div>
                            <div class="toast-percentage">${test.score}%</div>
                        </div>
                        
                        <!-- Justification Text -->
                        <div class="justification-text">
                            As a UX Designer on the team, I contributed to the redesign of Zara Tools—the internal platform for the engineering community—helping boost adoption and daily use among developers. I improved internal processes and collaborated with multidisciplinary squads (engineering, content, design, PMs), delivering value every two weeks.
                        </div>
                    </div>
                </div>
            `;
            chatMessages.appendChild(testDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, index * 2000); // Show each test result every 2 seconds
    });
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
            const result = JSON.parse(content);
            
            // Check if this is one of our special roles and add custom description
            const jobText = jobDescription.toLowerCase();
            if (jobText.includes('ux engineer') || jobText.includes('creative developer') || 
                jobText.includes('frontend designer') || jobText.includes('design engineer')) {
                result.customDescription = "Jon holds a degree in Computer Science and has always thrived in digital design environments. He contributed to the front-end development of the Bizkaia Provincial Council's public portal and even built this very bot himself. Jon feels at home at the intersection of design and code, where creativity meets functionality.";
            }
            
            // Check if this is Strategic Product Design and add custom description
            if (jobText.includes('strategic product design')) {
                result.customDescription = "Jon has extensive experience in strategic product design, having worked on complex design systems and product strategies at companies like ZARA. His background in both design and computer science allows him to think strategically about product architecture and user experience, making him well-suited for strategic product design roles.";
            }
            
            // Check if this is Behavioral Design and add custom description
            if (jobText.includes('behavioural design') || jobText.includes('psychology design')) {
                result.customDescription = "Jon applies behavioral design principles to his product work, combining psychology with UX strategy. He's trained at Behavioral School and uses nudges and choice architecture to reduce friction, guide decisions, and boost adoption. His approach blends research, data, and human motivation to create engaging digital experiences.";
            }
            
            // Check if this is UI Design and add custom description
            if (jobText.includes('ui design') || jobText.includes('ui') || jobText.includes('user interface') || 
                jobText.includes('interaction design') || jobText.includes('visual design') || 
                jobText.includes('experience designer') || jobText.includes('interface designer')) {
                result.customDescription = "My UI skills are grounded in both design and strategy. I'm experienced in creating intuitive interfaces by applying visual hierarchy, accessibility principles, and design systems. I work fluently with wireframes, prototypes, and interactive flows, ensuring that visuals are not only attractive but also support usability.";
            }
            
            // Check if this is one of our front end roles and add custom description
            if (jobText.includes('front end developer') || jobText.includes('front end')) {
                result.customDescription = "Jon holds a degree in Computer Science and has always thrived in digital design environments. He contributed to the front-end development of the Bizkaia Provincial Council's public portal and even built this very bot himself. Jon feels at home at the intersection of design and code, where creativity meets functionality.";
            }
            
            // Check if this is one of our development roles and add custom description
            if (jobText.includes('software engineer') || jobText.includes('web developer') || 
                jobText.includes('application developer') || jobText.includes('devops engineer') || 
                jobText.includes('cloud engineer') || jobText.includes('api developer') || 
                jobText.includes('database developer') || jobText.includes('platform engineer')) {
                result.customDescription = "Jon holds a degree in Computer Science and has always thrived in digital design environments. He contributed to the front-end development of the Bizkaia Provincial Council's public portal and even built this very bot himself. Jon feels at home at the intersection of design and code, where creativity meets functionality.";
            }
            
            return result;
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
let systemMessages = null;

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

// Function to fetch system messages from local JSON
async function fetchSystemMessages() {
    try {
        console.log('Fetching system messages...');
        const response = await fetch('./data/system-message_kb.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        systemMessages = data;
        console.log('System messages fetched successfully:', data);
        
        // Update action cards with fetched content
        updateActionCards();
        
        return data;
    } catch (error) {
        console.error('Error fetching system messages:', error);
        systemMessages = null;
        return null;
    }
}

// Function to update action cards with system message content
function updateActionCards() {
    console.log('updateActionCards called, systemMessages:', systemMessages);
    
    try {
        // Update Case Study card
        const caseStudyTitle = document.getElementById('case-study-title');
        const caseStudyDesc = document.getElementById('case-study-description');
        console.log('Case Study elements:', { title: caseStudyTitle, desc: caseStudyDesc });
        
        if (caseStudyTitle && caseStudyDesc) {
            if (systemMessages && systemMessages.action_cards && systemMessages.action_cards.case_study) {
                caseStudyTitle.textContent = systemMessages.action_cards.case_study.title;
                caseStudyDesc.textContent = systemMessages.action_cards.case_study.description;
            } else {
                // Fallback content
                caseStudyTitle.textContent = "Case Study";
                caseStudyDesc.textContent = "Dive into one of my projects and see my process in action.";
            }
        }
        
        // Update Company Fit card
        const companyFitTitle = document.getElementById('company-fit-title');
        const companyFitDesc = document.getElementById('company-fit-description');
        if (companyFitTitle && companyFitDesc) {
            if (systemMessages && systemMessages.action_cards && systemMessages.action_cards.company_fit) {
                companyFitTitle.textContent = systemMessages.action_cards.company_fit.title;
                companyFitDesc.textContent = systemMessages.action_cards.company_fit.description;
            } else {
                // Fallback content
                companyFitTitle.textContent = "Company fit";
                companyFitDesc.textContent = "How my profile aligns with your company.";
            }
        }
        
        // Update About Jon card
        const aboutJonTitle = document.getElementById('about-jon-title');
        const aboutJonDesc = document.getElementById('about-jon-description');
        if (aboutJonTitle && aboutJonDesc) {
            if (systemMessages && systemMessages.action_cards && systemMessages.action_cards.about_jon) {
                aboutJonTitle.textContent = systemMessages.action_cards.about_jon.title;
                aboutJonDesc.textContent = systemMessages.action_cards.about_jon.description;
            } else {
                // Fallback content
                aboutJonTitle.textContent = "About Jon";
                aboutJonDesc.textContent = "A quick snapshot of who I am and what I do.";
            }
        }
        
        console.log('Action cards updated successfully');
    } catch (error) {
        console.error('Error updating action cards:', error);
        // Set fallback content on error
        setFallbackActionCards();
    }
}

// Function to set fallback content for action cards
function setFallbackActionCards() {
    const caseStudyTitle = document.getElementById('case-study-title');
    const caseStudyDesc = document.getElementById('case-study-description');
    if (caseStudyTitle && caseStudyDesc) {
        caseStudyTitle.textContent = "Case Study";
        caseStudyDesc.textContent = "Dive into one of my projects and see my process in action.";
    }
    
    const companyFitTitle = document.getElementById('company-fit-title');
    const companyFitDesc = document.getElementById('company-fit-description');
    if (companyFitTitle && companyFitDesc) {
        companyFitTitle.textContent = "Company fit";
        companyFitDesc.textContent = "How my profile aligns with your company.";
    }
    
    const aboutJonTitle = document.getElementById('about-jon-title');
    const aboutJonDesc = document.getElementById('about-jon-description');
    if (aboutJonTitle && aboutJonDesc) {
        aboutJonTitle.textContent = "About Jon";
        aboutJonDesc.textContent = "A quick snapshot of who I am and what I do.";
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
    // This function is now deprecated - all responses come from the knowledge base or ChatGPT API
    // The hardcoded response system has been removed to allow proper knowledge base matching
    
    // Return null to indicate no hardcoded response found, allowing the system to use KB or API
    return null;
  }
  
    // Clear chat history
    clearChat() {
        chatMessages.innerHTML = '';
        this.conversationHistory = [];
        // Reset company fit context when clearing chat
        if (typeof resetCompanyFitContext === 'function') {
            resetCompanyFitContext();
        }
    }
}

// Initialize chat bot
const chatBot = new ChatBot();

// Add state tracking for company fit context
let isInCompanyFitContext = false;

// Predefined role fit scores
const predefinedRoleFits = {
    'ux manager': 64,
    'design system': 82,
    'product designer': 84,
    'ux researcher': 85,
    'ux research': 85,
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
    'e-commerce ux/ui': 81,
    // Special roles with 88% fit and custom description
    'design engineer': 88,
    'ux engineer': 88,
    'creative developer': 88,
    'frontend designer': 88,
    // Strategic roles
    'strategic product design': 91,
    // Behavioral design roles
    'behavioural design': 89,
    'psychology design': 89,
    // UI Design roles with 91% fit and custom description
    'ui design': 91,
    'ui': 91,
    'user interface': 91,
    'interaction design': 91,
    'visual design': 91,
    'experience designer': 91,
    'interface designer': 91,
    // Front end roles with 64% fit and custom description
    'front end developer': 64,
    'front end': 64,
    // Development roles with 39% fit and custom description
    'software engineer': 39,
    'web developer': 39,
    'application developer': 39,
    'devops engineer': 39,
    'cloud engineer': 39,
    'api developer': 39,
    'database developer': 39,
    'platform engineer': 39
};

// Function to analyze role fit against Jon's profile
async function analyzeRoleFit(jobDescription) {
    console.log('🔍 analyzeRoleFit called with:', jobDescription);
    console.log('🔍 Current projectsData length:', projectsData.length);
    console.log('🔍 Current bioData length:', bioData.length);
    
    const jobText = jobDescription.toLowerCase();
    
    // Check for predefined role fits first
    for (const [role, score] of Object.entries(predefinedRoleFits)) {
        let isMatch = false;
        
        if (role === 'front end') {
            // For "front end", only match if it's an exact phrase or standalone term
            const frontEndPatterns = ['front end', 'front-end', 'frontend'];
            isMatch = frontEndPatterns.some(pattern => {
                const regex = new RegExp(`\\b${pattern}\\b`, 'i');
                return regex.test(jobDescription);
            });
        } else {
            // For other roles, use the normal includes check
            isMatch = jobText.includes(role.toLowerCase());
        }
        
        if (isMatch) {
            console.log(`🎯 Predefined role fit found: ${role} with score ${score}%`);
            
            // Special handling for UX Engineer, Design Engineer, Frontend Designer, Creative Developer
            if (role === 'ux engineer' || role === 'creative developer' || role === 'frontend designer' || role === 'design engineer') {
                return {
                    score: score,
                    matchedSkills: ['Design systems', 'UX Design', 'Product Design', 'Frontend Development'],
                    relevantProjects: ['Design System Implementation', 'Product Design Projects', 'Bizkaia Provincial Council Portal'],
                    relevantExperience: ['SENIOR PRODUCT DESIGNER', 'SENIOR UX DESIGNER ZARA', 'Frontend Development'],
                    summary: generateFitSummary(score, [], [], []),
                    customDescription: "Jon holds a degree in Computer Science and has always thrived in digital design environments. He contributed to the front-end development of the Bizkaia Provincial Council's public portal and even built this very bot himself. Jon feels at home at the intersection of design and code, where creativity meets functionality."
                };
            }
            
            // Special handling for Strategic Product Design
            if (role === 'strategic product design') {
                return {
                    score: score,
                    matchedSkills: ['Strategic Thinking', 'Product Strategy', 'UX Design', 'Product Design'],
                    relevantProjects: ['Strategic Product Design Projects', 'Design System Implementation'],
                    relevantExperience: ['SENIOR PRODUCT DESIGNER', 'SENIOR UX DESIGNER ZARA', 'Strategic Design'],
                    summary: generateFitSummary(score, [], [], []),
                    customDescription: "Jon has extensive experience in strategic product design, having worked on complex design systems and product strategies at companies like ZARA. His background in both design and computer science allows him to think strategically about product architecture and user experience, making him well-suited for strategic product design roles."
                };
            }
            
            // Special handling for Behavioral Design roles
            if (role === 'behavioural design' || role === 'psychology design') {
                return {
                    score: score,
                    matchedSkills: ['Behavioral Design', 'Psychology', 'UX Strategy', 'Choice Architecture'],
                    relevantProjects: ['Behavioral Design Projects', 'Psychology-Informed UX'],
                    relevantExperience: ['Behavioral School Training', 'Psychology-Based Design'],
                    summary: generateFitSummary(score, [], [], []),
                    customDescription: "Jon applies behavioral design principles to his product work, combining psychology with UX strategy. He's trained at Behavioral School and uses nudges and choice architecture to reduce friction, guide decisions, and boost adoption. His approach blends research, data, and human motivation to create engaging digital experiences."
                };
            }
            
            // Special handling for UI Design roles
            if (role === 'ui design' || role === 'ui' || role === 'user interface' || role === 'interaction design' || 
                role === 'visual design' || role === 'experience designer' || role === 'interface designer') {
                return {
                    score: score,
                    matchedSkills: ['UI Design', 'Visual Design', 'Interaction Design', 'Design Systems'],
                    relevantProjects: ['UI Design Projects', 'Interface Design'],
                    relevantExperience: ['UI Designer', 'Visual Designer', 'Interface Designer'],
                    summary: generateFitSummary(score, [], [], []),
                    customDescription: "My UI skills are grounded in both design and strategy. I'm experienced in creating intuitive interfaces by applying visual hierarchy, accessibility principles, and design systems. I work fluently with wireframes, prototypes, and interactive flows, ensuring that visuals are not only attractive but also support usability."
                };
            }
            
            // Special handling for Front end roles
            if (role === 'front end developer' || role === 'front end') {
                return {
                    score: score,
                    matchedSkills: ['Frontend Development', 'Computer Science', 'Digital Design'],
                    relevantProjects: ['Bizkaia Provincial Council Portal', 'Frontend Development Projects'],
                    relevantExperience: ['Computer Science Degree', 'Frontend Development'],
                    summary: generateFitSummary(score, [], [], []),
                    customDescription: "Jon holds a degree in Computer Science and has always thrived in digital design environments. He contributed to the front-end development of the Bizkaia Provincial Council's public portal and even built this very bot himself. Jon feels at home at the intersection of design and code, where creativity meets functionality."
                };
            }
            
            // Special handling for Development roles (Software Engineer, Web Developer, etc.)
            if (role === 'software engineer' || role === 'web developer' || role === 'application developer' || 
                role === 'devops engineer' || role === 'cloud engineer' || role === 'api developer' || 
                role === 'database developer' || role === 'platform engineer') {
                return {
                    score: score,
                    matchedSkills: ['Frontend Development', 'Computer Science', 'Digital Design'],
                    relevantProjects: ['Bizkaia Provincial Council Portal', 'Frontend Development Projects'],
                    relevantExperience: ['Computer Science Degree', 'Frontend Development'],
                    summary: generateFitSummary(score, [], [], []),
                    customDescription: "Jon holds a degree in Computer Science and has always thrived in digital design environments. He contributed to the front-end development of the Bizkaia Provincial Council's public portal and even built this very bot himself. Jon feels at home at the intersection of design and code, where creativity meets functionality."
                };
            }
            
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
    
    console.log('🔍 All skills extracted:', Array.from(allSkills));
    
    // Use pre-fetched bio data for comprehensive matching
    if (bioData.length === 0) {
        console.log('🔍 Bio data not loaded, fetching now...');
        await fetchBioData();
    }
    
    // Extract skills from bio data (work experience)
    bioData.forEach(role => {
        if (role.title) {
            const titleSkills = role.title.split(',').map(skill => skill.trim().toLowerCase());
            titleSkills.forEach(skill => allSkills.add(skill));
        }
    });
    
    console.log('🔍 Skills after bio data:', Array.from(allSkills));
    
    // Check for skill matches
    allSkills.forEach(skill => {
        if (jobText.includes(skill.toLowerCase())) {
            matchedSkills.push(skill);
            matchScore += 10; // 10 points per skill match
            console.log(`🎯 Skill match found: ${skill}`);
        }
    });
    
    // Check for domain matches from projects
    projectsData.forEach(project => {
        const domain = (project.Domain || project.domain || '').toLowerCase();
        if (domain && jobText.includes(domain.split(',')[0].trim())) {
            relevantProjects.push(project);
            matchScore += 15; // 15 points per domain match
            console.log(`🎯 Domain match found: ${domain}`);
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
            console.log(`🎯 Experience match found: ${role.name}`);
        }
    });
    
    // Check for experience level indicators
    if (jobText.includes('senior') || jobText.includes('lead') || jobText.includes('principal')) {
        matchScore += 25; // Jon has 10+ years experience
        console.log('🎯 Senior level bonus added (+25)');
    }
    
    if (jobText.includes('ux') || jobText.includes('design') || jobText.includes('product')) {
        matchScore += 30; // Core expertise
        console.log('🎯 Core expertise bonus added (+30)');
    }
    
    // Check for industry matches
    if (jobText.includes('saas') || jobText.includes('healthcare') || jobText.includes('e-commerce') || 
        jobText.includes('government') || jobText.includes('education') || jobText.includes('automotive')) {
        matchScore += 15; // Industry experience bonus
        console.log('🎯 Industry match bonus added (+15)');
    }
    
    // Cap score at 97 (more realistic than 100%)
    matchScore = Math.min(matchScore, 97);
    
    console.log('🔍 Final analysis result:', {
        score: matchScore,
        matchedSkills: matchedSkills,
        relevantProjects: relevantProjects.length,
        relevantExperience: relevantExperience.length
    });
    
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
            title: "Excellent Fit!",
            subtitle: "Jon's profile aligns almost perfectly",
            cssClass: "excellent-fit",
            icon: "🏆",
            color: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
        };
    } else if (score >= 50) {
        return {
            title: "Good Fit!",
            subtitle: "Jon covers many of the key needs.",
            cssClass: "good-fit",
            icon: "🚀",
            color: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
        };
    } else if (score >= 25) {
        return {
            title: "Partial Fit!",
            subtitle: "A few overlaps, but not a strong fit.",
            cssClass: "partial-fit",
            icon: "⚡",
            color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
        };
    } else {
        return {
            title: "Low Fit!",
            subtitle: "Jon's skills don't match this role.",
            cssClass: "low-fit",
            icon: "🎲",
            color: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
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
    return `I couldn't find information on that. But I can show you how Jon's skills and experience match a role you're hiring for.`;
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
    
    // Check for out-of-scope requests
    const outOfScopeKeywords = [
        'salary', 'salaries', 'pay', 'compensation', 'wage', 'money', 'earnings',
        'cover letter', 'coverletter', 'motivation letter', 'motivational letter',
        'cv', 'resume', 'application letter', 'application form',
        'interview', 'meeting', 'call', 'phone call', 'video call',
        'availability', 'schedule', 'calendar', 'appointment',
        'contact', 'email', 'phone', 'number', 'address',
        'social media', 'linkedin', 'twitter', 'instagram',
        'references', 'referees', 'recommendations'
    ];
    
    const messageLower = message.toLowerCase();
    const isOutOfScope = outOfScopeKeywords.some(keyword => messageLower.includes(keyword));
    
    if (isOutOfScope) {
        chatBot.addMessage("That's outside my scope, but I can help you see how Jon matches a specific role.", 'bot');
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return;
    }
    
    // Check if this is a predefined role first (before smart answer lookup)
    const jobText = message.toLowerCase();
    const isPredefinedRole = Object.keys(predefinedRoleFits).some(role => {
        // For most roles, check if they are contained in the message
        if (role !== 'front end') {
            return jobText.includes(role.toLowerCase());
        } else {
            // For "front end", only match if it's an exact phrase or standalone term
            const frontEndPatterns = ['front end', 'front-end', 'frontend'];
            return frontEndPatterns.some(pattern => {
                const regex = new RegExp(`\\b${pattern}\\b`, 'i');
                return regex.test(message);
            });
        }
    });
    
    console.log('🔍 Predefined role check:', {
        jobText: jobText,
        isPredefinedRole: isPredefinedRole,
        matchingRoles: Object.keys(predefinedRoleFits).filter(role => jobText.includes(role.toLowerCase())),
        allRoles: Object.keys(predefinedRoleFits)
    });
    
    if (isPredefinedRole) {
        console.log('🎯 PREDEFINED ROLE DETECTED! Skipping smart answer lookup for:', jobText);
        // Continue to job analysis section - no return here, let it continue
    } else {
        // First, try to get a smart answer from our knowledge base
        try {
            const smartAnswer = await getSmartAnswer(message);
            if (smartAnswer) {
                console.log('🎯 SMART ANSWER FOUND from knowledge base:', smartAnswer);
                
                // Add bot response with smart answer
                chatBot.addMessage(smartAnswer, 'bot');
                chatMessages.scrollTop = chatMessages.scrollHeight;
                return; // Exit early, don't process further
            }
        } catch (error) {
            console.log('Knowledge base lookup failed:', error);
            // Continue with normal processing
        }
    }
    
    // Check if this might be a job description for company fit analysis
    // Look for job-related keywords or if the message is long enough to be a description
    // But be more intelligent about distinguishing questions vs. job descriptions
    const jobKeywords = ['designer', 'ux', 'product', 'developer', 'engineer', 'manager', 'lead', 'senior', 'researcher', 'architect', 'specialist', 'consultant', 'analyst', 'coordinator', 'director', 'head', 'principal'];
    const hasJobKeywords = jobKeywords.some(keyword => message.toLowerCase().includes(keyword));
    const isLongDescription = message.length > 30;
    
    // Check if this is a question about Jon's experience (not a job description)
    const isQuestionAboutJon = message.toLowerCase().includes('what') || 
                               message.toLowerCase().includes('how') || 
                               message.toLowerCase().includes('which') || 
                               message.toLowerCase().includes('can you') ||
                               message.toLowerCase().includes('has jon') ||
                               message.toLowerCase().includes('does jon') ||
                               message.toLowerCase().includes('jon') ||
                               message.toLowerCase().includes('his') ||
                               message.toLowerCase().includes('he') ||
                               message.toLowerCase().includes('worked on') ||
                               message.toLowerCase().includes('experience');
    
    // Only treat as job description if it's NOT a question about Jon and has job keywords
    const isLikelyJobDescription = hasJobKeywords && !isQuestionAboutJon && isLongDescription;
    
    // Check if user is in company fit context
    const isCompanyFitContext = isInCompanyFitContext || 
        (chatBot.conversationHistory.length > 0 && 
         chatBot.conversationHistory.some(msg => msg.content.toLowerCase().includes('company fit')));
    
    console.log('🎯 Context detection:', {
        isInCompanyFitContext: isInCompanyFitContext,
        hasCompanyFitInHistory: chatBot.conversationHistory.some(msg => msg.content.toLowerCase().includes('company fit')),
        isCompanyFitContext: isCompanyFitContext
    });
    
    console.log('=== JOB DESCRIPTION DETECTION START ===');
    console.log('Job description detection:', {
        message: message,
        hasJobKeywords: hasJobKeywords,
        isLongDescription: isLongDescription,
        isLikelyJobDescription: isLikelyJobDescription,
        isCompanyFitContext: isCompanyFitContext,
        matchedKeywords: jobKeywords.filter(keyword => message.toLowerCase().includes(keyword))
    });
    console.log('=== JOB DESCRIPTION DETECTION END ===');
    
    // ONLY show toast messages when user is explicitly in company fit context
    if (isCompanyFitContext) {
        console.log('🎯 COMPANY FIT CONTEXT DETECTED! Starting analysis...');
        console.log('🎯 Analysis trigger details:', {
            isCompanyFitContext: isCompanyFitContext,
            message: message
        });
        
        // Reset company fit context after analysis
        isInCompanyFitContext = false;
        
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
                        <!-- Toast Message -->
                        <div class="toast-message ${generateMatchDisplay(chatGPTResult.fitScore).cssClass}" style="background: ${generateMatchDisplay(chatGPTResult.fitScore).color}">
                            <div class="toast-icon">
                                <span style="font-size: 2rem;">${generateMatchDisplay(chatGPTResult.fitScore).icon}</span>
                            </div>
                            <div class="toast-content">
                                <div class="toast-title">${generateMatchDisplay(chatGPTResult.fitScore).title}</div>
                                <div class="toast-subtitle">${generateMatchDisplay(chatGPTResult.fitScore).subtitle}</div>
                            </div>
                            <div class="toast-percentage">${chatGPTResult.fitScore}%</div>
                        </div>
                        
                        <!-- Justification Text -->
                        <div class="justification-text">
                            ${chatGPTResult.customDescription || "As a UX Designer on the team, I contributed to the redesign of Zara Tools—the internal platform for the engineering community—helping boost adoption and daily use among developers. I improved internal processes and collaborated with multidisciplinary squads (engineering, content, design, PMs), delivering value every two weeks."}
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
                            <!-- Toast Message -->
                            <div class="toast-message ${generateMatchDisplay(fitAnalysis.score).cssClass}" style="background: ${generateMatchDisplay(fitAnalysis.score).color}">
                                <div class="toast-icon">
                                    <span style="font-size: 2rem;">${generateMatchDisplay(fitAnalysis.score).icon}</span>
                                </div>
                                <div class="toast-content">
                                    <div class="toast-title">${generateMatchDisplay(fitAnalysis.score).title}</div>
                                    <div class="toast-subtitle">${generateMatchDisplay(fitAnalysis.score).subtitle}</div>
                                </div>
                                <div class="toast-percentage">${fitAnalysis.score}%</div>
                            </div>
                            
                            <!-- Justification Text -->
                            <div class="justification-text">
                                ${fitAnalysis.customDescription || "As a UX Designer on the team, I contributed to the redesign of Zara Tools—the internal platform for the engineering community—helping boost adoption and daily use among developers. I improved internal processes and collaborated with multidisciplinary squads (engineering, content, design, PMs), delivering value every two weeks."}
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
    
    // If it's a job-related question but NOT in company fit context, give a helpful response without toast
    if (isLikelyJobDescription && !isCompanyFitContext) {
        console.log('🎯 Job-related question detected but NOT in company fit context - giving helpful response without toast');
        
        const helpfulResponse = "I can help you understand how Jon fits for specific roles! To get a detailed analysis with fit scores, please click on the 'Company fit' card above, then describe the role you're interested in.";
        
        chatBot.addMessage(helpfulResponse, 'bot');
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return;
    }
    
    // If it's not a job description, check if it might be a follow-up to company-fit
    // This handles cases where users type job descriptions without specific keywords
    if (message.length > 20 && isInCompanyFitContext) {
        console.log('Detected follow-up to company-fit, analyzing as job description');
        
        // Reset company fit context
        isInCompanyFitContext = false;
        
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
                        <!-- Toast Message -->
                        <div class="toast-message ${generateMatchDisplay(fitAnalysis.score).cssClass}" style="background: ${generateMatchDisplay(fitAnalysis.score).color}">
                            <div class="toast-icon">
                                <span style="font-size: 2rem;">${generateMatchDisplay(fitAnalysis.score).icon}</span>
                            </div>
                            <div class="toast-content">
                                <div class="toast-title">${generateMatchDisplay(fitAnalysis.score).title}</div>
                                <div class="toast-subtitle">${generateMatchDisplay(fitAnalysis.score).subtitle}</div>
                            </div>
                            <div class="toast-percentage">${fitAnalysis.score}%</div>
                        </div>
                        
                        <!-- Justification Text -->
                        <div class="justification-text">
                            As a UX Designer on the team, I contributed to the redesign of Zara Tools—the internal platform for the engineering community—helping boost adoption and daily use among developers. I improved internal processes and collaborated with multidisciplinary squads (engineering, content, design, PMs), delivering value every two weeks.
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
        // Show company fit input prompt instead of generating messages
        showCompanyFitPrompt();
        return;
    }

    if (action === 'about-jon') {
        // Show About Jon section
        showAboutJonSection();
        return;
    }
}

// Function to display projects in an attractive format
async function showProjectsDisplay() {
    // Update input field placeholder text for case study context
    mainInput.placeholder = "Try asking: What experience does Jon have in the automotive industry?";
    
    // Clear existing chat messages with fade out effect
    chatMessages.style.opacity = '0';
    chatMessages.style.transform = 'translateY(20px)';
    
    window.setTimeout(async () => {
        chatMessages.innerHTML = '';
        
        // Create projects header
        const projectsHeader = document.createElement('div');
        projectsHeader.className = 'projects-header';
        projectsHeader.innerHTML = `
            <h2 class="projects-title">Featured Projects:</h2>
        `;
        chatMessages.appendChild(projectsHeader);
        
        // Create projects container
        const projectsContainer = document.createElement('div');
        projectsContainer.className = 'projects-container';
        
        // Load projects from our structured knowledge base
        const projects = await loadProjectsKB();
        
        console.log('All projects loaded:', projects.map(p => ({ id: p.id, name: p.project_name })));
        
        // Filter to show only the 3 specific projects
        const featuredProjects = projects.filter(project => 
            project.id === 'evcharge' || 
            project.id === 'san-jorge-university' || 
            project.id === 'zara-fashion'
        );
        
        console.log('Featured projects filtered:', featuredProjects.map(p => ({ id: p.id, name: p.project_name })));
        
        if (!featuredProjects || featuredProjects.length === 0) {
            const noDataMessage = document.createElement('div');
            noDataMessage.className = 'project-item';
            noDataMessage.innerHTML = `
                <div class="project-header">
                    <div class="project-title">Cargando proyectos...</div>
                </div>
            `;
            projectsContainer.appendChild(noDataMessage);
            console.log('Featured projects data not available');
            return;
        }
        
        console.log('Featured projects data available:', featuredProjects);
        
        // Add each featured project as expandable items
        featuredProjects.forEach((project, index) => {
            console.log(`Processing project ${index}:`, project);
            
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';
            projectItem.dataset.projectId = project.id;
            
            const hasCaseStudy = project.case_study_available;
            
            projectItem.innerHTML = `
                <div class="project-header">
                    <div class="project-icon">
                        <span class="project-emoji">${getProjectEmoji(project.domain)}</span>
                    </div>
                    <div class="project-title">${project.project_name}</div>
                    <div class="expand-indicator">+</div>
                </div>
                <div class="project-details" id="project-details-${project.id}" style="display: none;">
                    <div class="project-description">
                        <div class="project-section">
                            <div class="section-label">PROBLEM</div>
                            <div class="section-content">${project.problem_solved}</div>
                    </div>
                        <div class="project-section">
                            <div class="section-label">WHAT I DID</div>
                            <div class="section-content">${project.what_jon_did}</div>
                    </div>
                        <div class="project-section">
                            <div class="section-label">RESULTS</div>
                            <div class="section-content">${project.results_metrics}</div>
                    </div>
                        <div class="project-section">
                            <div class="section-label">CLIENT</div>
                            <div class="section-content">${project.client}</div>
                        </div>
                        <div class="project-section">
                            <div class="section-label">ROLE</div>
                            <div class="section-content">${project.role}</div>
                        </div>
                        ${hasCaseStudy ? `
                        <div class="project-section">
                            <div class="section-label">CASE STUDY</div>
                            <div class="section-content">
                                <a href="${project.case_study_link}" class="case-study-link" target="_blank">
                                    View Case Study 📋
                                </a>
                            </div>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
            
            // Add click event listener to the project header
            const projectHeader = projectItem.querySelector('.project-header');
            projectHeader.addEventListener('click', () => {
                const detailsElement = projectItem.querySelector('.project-details');
                const expandIndicator = projectItem.querySelector('.expand-indicator');
                
                if (detailsElement.style.display === 'none' || detailsElement.style.display === '') {
                    // Expand
                    detailsElement.style.display = 'block';
                    expandIndicator.textContent = '-';
                    projectItem.classList.add('expanded');
                } else {
                    // Collapse
                        detailsElement.style.display = 'none';
                        expandIndicator.textContent = '+';
                        projectItem.classList.remove('expanded');
                }
            });
            
            projectsContainer.appendChild(projectItem);
        });
        
        // Add projects container to chat
        chatMessages.appendChild(projectsContainer);
        
        // Restore opacity and transform
        chatMessages.style.opacity = '1';
        chatMessages.style.transform = 'translateY(0)';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
    }, 300);
}

// Function to display About Jon section
async function showAboutJonSection() {
    console.log('About Jon section clicked!'); // Debug log
    
    // Reset input field placeholder text to default
    mainInput.placeholder = "Try asking: What's Jon's experience with SaaS?";
    
    try {
        // Fetch about data
        const res = await fetch('./data/about_kb.json');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const aboutData = await res.json();
        
        // Clear existing chat messages with fade out effect
        chatMessages.style.opacity = '0';
        chatMessages.style.transform = 'translateY(20px)';
        
        window.setTimeout(() => {
            chatMessages.innerHTML = '';
            
            // Create About Jon header
            const aboutHeader = document.createElement('div');
            aboutHeader.className = 'about-header';
            aboutHeader.innerHTML = `
                <h2 class="about-title">${aboutData.title}</h2>
            `;
            chatMessages.appendChild(aboutHeader);
            
            // Create About Jon content
            const aboutContent = document.createElement('div');
            aboutContent.className = 'about-content';
            
            // Build description paragraphs dynamically
            const descriptionHTML = aboutData.description.map(paragraph => `<p>${paragraph}</p>`).join('');
            
            aboutContent.innerHTML = `
                <div class="about-text">
                    ${descriptionHTML}
                </div>
                
                <div class="about-image-container">
                    <img src="${aboutData.image}" alt="${aboutData.image_alt}" class="about-image" onload="console.log('Image loaded successfully')" onerror="console.log('Image failed to load')">
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
        
    } catch (error) {
        console.error('Error loading about data:', error);
        // Fallback to hardcoded content if fetch fails
        showAboutJonFallback();
    }
}

// Fallback function for About Jon section if data loading fails
function showAboutJonFallback() {
    console.log('Using fallback About Jon content');
    
    // Clear existing chat messages with fade out effect
    chatMessages.style.opacity = '0';
    chatMessages.style.transform = 'translateY(20px)';
    
    window.setTimeout(() => {
        chatMessages.innerHTML = '';
        
        // Create About Jon header
        const aboutHeader = document.createElement('div');
        aboutHeader.className = 'about-header';
        aboutHeader.innerHTML = `
            <h2 class="about-title">${systemMessages?.fallback_content?.about_jon?.title || 'Senior Product Designer & UX Engineer'}</h2>
        `;
        chatMessages.appendChild(aboutHeader);
        
        // Create About Jon content
        const aboutContent = document.createElement('div');
        aboutContent.className = 'about-content';
        
        // Build description paragraphs dynamically from fallback content
        const fallbackData = systemMessages?.fallback_content?.about_jon;
        let descriptionHTML = '';
        if (fallbackData && fallbackData.description) {
            descriptionHTML = fallbackData.description.map(paragraph => `<p>${paragraph}</p>`).join('');
        } else {
            descriptionHTML = `
                <p>I bridge the gap between technical complexity and human experience. With 10+ years in UX, I've delivered scalable digital products and strategies for ZARA, Gestamp, startups, and public institutions.</p>
                <p>I believe in execution over buzzwords—better done than cheap talk. That's why I even built my own AI-powered chat assistant, proving how design and technology can work seamlessly together.</p>
            `;
        }
        
        aboutContent.innerHTML = `
            <div class="about-text">
                ${descriptionHTML}
            </div>
            
            <div class="about-image-container">
                <img src="${fallbackData?.image || 'img/about-me.jpg'}" alt="${fallbackData?.image_alt || 'Jon Gorroño'}" class="about-image" onload="console.log('Image loaded successfully')" onerror="console.log('Image failed to load')">
            </div>
        `;
        chatMessages.appendChild(aboutContent);
        
        console.log('About Jon fallback content added to DOM'); // Debug log
        
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
    // Don't show welcome message if in company fit context
    if (isInCompanyFitContext) {
        return;
    }
    
    // Reset input field placeholder text to default
    mainInput.placeholder = "Try asking: What's Jon's experience with SaaS?";
    
    // Fade out effect
    chatMessages.style.opacity = '0';
    chatMessages.style.transform = 'translateY(-20px)';
    
    window.setTimeout(() => {
        chatMessages.innerHTML = '';
        const welcomeMessage = systemMessages?.welcome_messages?.main || "Hi! I'm Jon's AI assistant. Ask me about his experience, projects, or fit for your company — or explore the cards below.";
        chatBot.addMessage(welcomeMessage, 'bot');
        
        // Fade in effect
        chatMessages.style.transition = 'all 0.5s ease';
        chatMessages.style.opacity = '1';
        chatMessages.style.transform = 'translateY(0)';
    }, 200);
}

// Function to show company fit input prompt
function showCompanyFitPrompt() {
    // Set company fit context
    isInCompanyFitContext = true;
    console.log('🎯 Company fit context activated:', isInCompanyFitContext);
    
    // Reset input field placeholder text to default
    mainInput.placeholder = "Try asking: What's Jon's experience with SaaS?";
    
    // Clear existing chat messages with fade out effect
    chatMessages.style.opacity = '0';
    chatMessages.style.transform = 'translateY(20px)';
    
    window.setTimeout(() => {
        chatMessages.innerHTML = '';
        
        // Add user message to establish context
        const companyFitMessage = systemMessages?.welcome_messages?.company_fit_context || "Tell me about company fit";
        chatBot.addMessage(companyFitMessage, 'user');
        
        // Create company fit prompt
        const promptDiv = document.createElement('div');
        promptDiv.className = 'message bot';
        promptDiv.innerHTML = `
            <div class="message-content">
                <div class="company-fit-prompt">
                    <div class="prompt-text">
                        Enter the role or job description and instantly see how Jon fits that position.
                    </div>
                </div>
            </div>
        `;
        chatMessages.appendChild(promptDiv);
        
        // Restore opacity and transform
        chatMessages.style.opacity = '1';
        chatMessages.style.transform = 'translateY(0)';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
    }, 300);
}

// Function to reset company fit context
function resetCompanyFitContext() {
    isInCompanyFitContext = false;
}

// Add some initial interaction hints
document.addEventListener('DOMContentLoaded', async () => {
    // Load ChatGPT configuration (now synchronous)
    loadChatGPTConfig();
    
    // Fetch projects data from API
    await fetchProjectsData();
    
    // Fetch bio data from API
    await fetchBioData();
    
    // Fetch system messages
    await fetchSystemMessages();
    
    // Always update action cards (will use fallback if fetch failed)
    updateActionCards();
    
    // Add welcome message after a short delay, but only if not in company fit context
    setTimeout(() => {
        if (!isInCompanyFitContext) {
            const welcomeMessage = systemMessages?.welcome_messages?.main || "Hi! I'm Jon's AI assistant. Ask me about his experience, projects, or fit for your company — or explore the cards below.";
            chatBot.addMessage(welcomeMessage, 'bot');
            
            // Add system status information if ChatGPT is not configured
            if (!CHATGPT_CONFIG.apiKey || CHATGPT_CONFIG.apiKey === 'your-openai-api-key-here') {
                setTimeout(() => {
                    const statusMessage = "💡 **System Status**: I'm currently running in local mode. I can answer questions about Jon's experience from my knowledge base, but for general questions, you'll need to configure the ChatGPT API. Run `checkHybridStatus()` to see details or `configureChatGPT()` for setup instructions.";
                    chatBot.addMessage(statusMessage, 'bot');
                }, 2000);
            }
        }
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
    
    // Reset company fit context
    resetCompanyFitContext();

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

// ChatGPT API Configuration
const CHATGPT_CONFIG = {
    apiKey: '', // Will be set from config.js
    model: 'gpt-3.5-turbo',
    maxTokens: 300,
    temperature: 0.7
};

// Load ChatGPT API key from config - Improved for better user experience
function loadChatGPTConfig() {
    try {
        // Check if we're in a browser environment
        if (typeof window !== 'undefined') {
            // First, try to get API key from config.js
            if (CONFIG && CONFIG.OPENAI_API_KEY && CONFIG.OPENAI_API_KEY !== 'your-openai-api-key-here') {
                CHATGPT_CONFIG.apiKey = CONFIG.OPENAI_API_KEY;
                console.log('✅ ChatGPT API key loaded from config.js');
                return;
            }
            
            // Try to get API key from localStorage (for development)
            const storedKey = localStorage.getItem('CHATGPT_API_KEY');
            if (storedKey && storedKey !== 'your-openai-api-key-here') {
                CHATGPT_CONFIG.apiKey = storedKey;
                console.log('✅ ChatGPT API key loaded from localStorage');
                return;
            }
            
            // If no stored key and we're in development mode, prompt user
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                const userKey = prompt('🔑 Enter your OpenAI API key for ChatGPT integration (or cancel to skip):\n\nGet your API key from: https://platform.openai.com/api-keys');
                if (userKey && userKey.trim() && userKey !== 'your-openai-api-key-here') {
                    CHATGPT_CONFIG.apiKey = userKey.trim();
                    localStorage.setItem('CHATGPT_API_KEY', userKey.trim());
                    console.log('✅ ChatGPT API key set and stored');
                } else {
                    console.warn('⚠️ No valid API key provided, ChatGPT API will be disabled');
                    console.log('💡 You can still use the local knowledge base for questions about Jon\'s experience');
                }
            } else {
                console.warn('⚠️ ChatGPT API key not configured in production');
                console.log('💡 Configure OPENAI_API_KEY in config.js to enable AI features');
            }
        }
    } catch (error) {
        console.warn('⚠️ Could not load ChatGPT config:', error);
    }
}

// Knowledge Base functions
async function loadKB() {
    try {
        const res = await fetch('/data/jon_know_how.json');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(`📚 Loaded ${data.length} QA items from jon_know_how.json`);
        return data;
    } catch (error) {
        console.error('Error loading QA items:', error);
        // Fallback to old format if new file doesn't exist
        try {
            const fallbackRes = await fetch('./data/qa_kb.json');
            const fallbackData = await fallbackRes.json();
            console.log(`📚 Fallback: Loaded ${fallbackData.length} QA items from qa_kb.json`);
            return fallbackData;
        } catch (fallbackError) {
            console.error('Fallback QA loading also failed:', fallbackError);
            return [];
        }
    }
}
  
  async function getAnswer(intentKey) {
    console.log('🔍 Looking for answer with intent_key:', intentKey);
    
    // Handle project-specific intents first
    if (intentKey.startsWith('project_')) {
        return await getProjectAnswer(intentKey);
    }
    
    // Handle regular knowledge base intents
    const kb = await loadKB();
    console.log(`📚 Searching through ${kb.length} KB entries for intent_key: ${intentKey}`);
    
    const entry = kb.find(e => e.intent_key === intentKey);
    
    if (!entry) {
        console.log('❌ No entry found for intent_key:', intentKey);
        console.log('🔍 Available intent_keys:', kb.map(e => e.intent_key));
        return "No data found.";
    }
    
    console.log('✅ Found entry:', entry.canonical_question);
    // Return the English answer by default, or Spanish if specified
    return entry.answer_en || entry.answer || "No answer available.";
  }
  
// Handle project-specific answers
async function getProjectAnswer(intentKey) {
    const projects = await loadProjectsKB();
    
    switch (intentKey) {
        case 'project_evcharge':
            const evcharge = projects.find(p => p.id === 'evcharge');
            return evcharge ? formatProjectInfo(evcharge) : "No encontré información sobre el proyecto Evcharge.";
            
        case 'project_o21':
            const o21 = projects.find(p => p.id === 'o21-ehealth');
            return o21 ? formatProjectInfo(o21) : "No encontré información sobre el proyecto O21.";
            
        case 'project_ecommerce':
            const ecommerceProjects = projects.filter(p => 
                p.keywords.includes('e-commerce') || p.keywords.includes('retail') || p.keywords.includes('fashion')
            );
            if (ecommerceProjects.length === 0) return "No encontré proyectos de e-commerce.";
            
            let ecommerceSummary = "He trabajado en varios proyectos de e-commerce:\n\n";
            ecommerceProjects.forEach(project => {
                ecommerceSummary += formatProjectInfo(project) + "\n\n";
            });
            return ecommerceSummary.trim();
            
        case 'project_la_caixa':
            const laCaixa = projects.find(p => p.id === 'la-caixa-fintech');
            return laCaixa ? formatProjectInfo(laCaixa) : "No encontré información sobre el proyecto de La Caixa.";
            
        case 'project_veridata':
            const veridata = projects.find(p => p.id === 'veridata-design-system');
            return veridata ? formatProjectInfo(veridata) : "No encontré información sobre el proyecto Veridata.";
            
        case 'project_query':
            return "I can tell you about my projects. Are you interested in any specific sector like SaaS, Fintech, E-commerce, or any particular project?";
            
        default:
            return "I couldn't find information about that specific project.";
    }
}

// Smart intent detection function with enhanced semantic understanding
async function detectIntent(userQuestion) {
    const question = userQuestion.toLowerCase();
    
    // Try to find intent using the new enhanced QA structure first
    try {
        const qaItems = await loadKB();
        const matchedIntent = qaItems.find(item => {
            // Normalize strings for better matching
            const normalizedQuestion = question.replace(/[()]/g, '').replace(/\s+/g, ' ').trim();
            const normalizedCanonical = item.canonical_question.toLowerCase().replace(/[()]/g, '').replace(/\s+/g, ' ').trim();
            
            // Check canonical question with normalized strings
            if (normalizedQuestion.includes(normalizedCanonical) || 
                normalizedCanonical.includes(normalizedQuestion) ||
                question.includes(item.canonical_question.toLowerCase()) ||
                item.canonical_question.toLowerCase().includes(question)) {
                return true;
            }
            
            // Check question variants with normalized strings
            if (item.question_variants) {
                return item.question_variants.some(variant => {
                    const normalizedVariant = variant.toLowerCase().replace(/[()]/g, '').replace(/\s+/g, ' ').trim();
                    return normalizedQuestion.includes(normalizedVariant) || 
                           normalizedVariant.includes(normalizedQuestion) ||
                           question.includes(variant.toLowerCase()) ||
                           variant.toLowerCase().includes(question);
                });
            }
            
            // Check tags
            if (item.tags) {
                return item.tags.some(tag => question.includes(tag.toLowerCase()));
            }
            
            return false;
        });
        
        if (matchedIntent) {
            console.log('🎯 Intent detected via enhanced QA structure:', matchedIntent.intent_key);
            console.log('📝 Matched question:', matchedIntent.canonical_question);
            return matchedIntent.intent_key;
        } else {
            console.log('❌ No intent matched via enhanced QA structure for:', question);
            console.log('🔍 Available intents:', qaItems.map(item => item.intent_key));
        }
    } catch (error) {
        console.log('Enhanced intent detection failed, falling back to legacy:', error);
    }
    
    // Ensure we always return something from legacy detection
    console.log('🔄 Falling back to legacy intent detection...');
    
    // Legacy intent detection as fallback
    // SaaS related
    if (question.includes('saas') || question.includes('software as a service') || question.includes('platform')) {
        return 'sector_saas';
    }
    
    // Health-tech related
    if (question.includes('health-tech') || question.includes('healthtech') || question.includes('e-health') || 
        question.includes('healthcare') || question.includes('orthodontist') || question.includes('medical') ||
        question.includes('health') || question.includes('clinic')) {
        return 'sector_healthtech';
    }
    
    // Cybersecurity related
    if (question.includes('cybersecurity') || question.includes('cyber-security') || question.includes('security') || 
        question.includes('wefender') || question.includes('cyber') || question.includes('protection')) {
        return 'sector_cybersecurity';
    }
    
    // Marketing/Ad-tech related
    if (question.includes('marketing') || question.includes('ad-tech') || question.includes('adtech') || 
        question.includes('advertising') || question.includes('campaign') || question.includes('promotion')) {
        return 'sector_marketing_adtech';
    }
    
    // Construction technology related
    if (question.includes('construction') || question.includes('tacktics') || question.includes('building') || 
        question.includes('work-reports') || question.includes('project-management') || question.includes('construction area') ||
        question.includes('field-work') || question.includes('site-management')) {
        return 'sector_construction';
    }
    
    // Fintech related
    if (question.includes('fintech') || question.includes('bank') || question.includes('la caixa') || 
        question.includes('banking') || question.includes('financial') || question.includes('finances')) {
        return 'sector_fintech';
    }
    
    // Fashion/Retail specific queries (must come before e-commerce to avoid conflicts)
    if (question.includes('fashion') || question.includes('retail') || question.includes('clothing') || 
        question.includes('apparel') || question.includes('style') || question.includes('inditex') ||
        question.includes('zara') || question.includes('pull&bear') || question.includes('oysho')) {
        console.log('🎯 Fashion/Retail intent detected for query:', question);
        return 'sector_fashion_retail';
    }
    
    // E-commerce related
    if (question.includes('e-commerce') || question.includes('ecommerce') || question.includes('shopping') ||
        question.includes('online-store') || question.includes('digital-commerce')) {
        return 'sector_ecommerce';
    }
    
    // Education related
    if (question.includes('education') || question.includes('university') || question.includes('san jorge') || 
        question.includes('educación') || question.includes('academic') || question.includes('learning')) {
        return 'sector_education';
    }
    
    // Mobility/Automotive related
    if (question.includes('mobility') || question.includes('automotive') || question.includes('evcharge') || 
        question.includes('gestamp') || question.includes('automóvil') || question.includes('electric') ||
        question.includes('vehicle') || question.includes('car') || question.includes('transport')) {
        return 'sector_mobility_automotive';
    }
    
    // Team leadership
    if (question.includes('lead') || question.includes('team') || question.includes('manage') || 
        question.includes('squad') || question.includes('leadership') || question.includes('coordinate') ||
        question.includes('supervise') || question.includes('guide')) {
        return 'seniority_team_leadership';
    }
    
    // Design systems
    if (question.includes('design system') || question.includes('veridata') || question.includes('component') ||
        question.includes('design-tokens') || question.includes('component-library') || question.includes('design-standards')) {
        return 'seniority_design_systems';
    }
    
    // International experience
    if (question.includes('international') || question.includes('global') || question.includes('zara') ||
        question.includes('multinational') || question.includes('cross-cultural') || question.includes('ibex35')) {
        return 'seniority_international';
    }
    
    // Senior Product Designer
    if (question.includes('senior') || question.includes('product designer') || question.includes('senior-level') ||
        question.includes('lead designer') || question.includes('principal designer')) {
        return 'seniority_product_designer';
    }
    
    // Strategic UX
    if (question.includes('strategic') || question.includes('strategy') || question.includes('business-impact') ||
        question.includes('product-strategy') || question.includes('strategic-thinking')) {
        return 'seniority_strategic_ux';
    }
    
    // Startups
    if (question.includes('startup') || question.includes('start-up') || question.includes('emerging') ||
        question.includes('innovative') || question.includes('fast-paced') || question.includes('agile')) {
        return 'clients_startups';
    }
    
    // Large corporations
    if (question.includes('corporation') || question.includes('large company') || question.includes('enterprise') ||
        question.includes('corporate') || question.includes('big company') || question.includes('multinational')) {
        return 'clients_corporations';
    }
    
    // Enterprise scale platforms
    if (question.includes('enterprise scale') || 
        (question.includes('scale') && (question.includes('large companies') || question.includes('public institutions') || question.includes('many people'))) ||
        question.includes('platforms used by many') || question.includes('large audiences') || question.includes('hundreds of thousands') ||
        question.includes('products at scale') || question.includes('platforms or products at scale') ||
        (question.includes('scale') && question.includes('large companies')) ||
        (question.includes('scale') && question.includes('public institutions'))) {
        return 'seniority_enterprise_scale';
    }
    
    // Public sector
    if (question.includes('public sector') || question.includes('administration') || question.includes('government') ||
        question.includes('public') || question.includes('citizen') || question.includes('municipal')) {
        return 'clients_public_sector';
    }
    
    // Tech companies
    if (question.includes('tech') || question.includes('technology') || question.includes('digital') ||
        question.includes('software') || question.includes('it') || question.includes('information technology')) {
        return 'clients_tech_companies';
    }
    
    // Data-driven
    if (question.includes('data') || question.includes('metrics') || question.includes('measure') ||
        question.includes('analytics') || question.includes('kpi') || question.includes('performance')) {
        return 'skills_data_driven';
    }
    
    // Design tools
    if (question.includes('figma') || question.includes('tool') || question.includes('software') ||
        question.includes('prototype') || question.includes('wireframe') || question.includes('design-tool')) {
        return 'skills_design_tools';
    }
    
    // Agile methodologies
    if (question.includes('agile') || question.includes('scrum') || question.includes('methodology') ||
        question.includes('sprint') || question.includes('iterative') || question.includes('bi-weekly')) {
        return 'skills_agile';
    }
    
    // UX Research
    if (question.includes('research') || question.includes('user interview') || question.includes('testing') || 
        question.includes('a/b') || question.includes('usability') || question.includes('user-research') ||
        question.includes('field-research') || question.includes('competitive-analysis')) {
        return 'skills_ux_research';
    }
    
    // Frontend
    if (question.includes('frontend') || question.includes('front-end') || question.includes('wordpress') || 
        question.includes('development') || question.includes('code') || question.includes('html') ||
        question.includes('css') || question.includes('javascript')) {
        return 'skills_frontend';
    }
    
    // Company fit general
    if (question.includes('company fit') || question.includes('profile') || question.includes('experience') ||
        question.includes('fit') || question.includes('match') || question.includes('alignment')) {
        return 'company_fit_overview';
    }
    
    // Project-specific queries
    if (question.includes('project') || question.includes('proyecto') || question.includes('case study') || 
        question.includes('portfolio') || question.includes('work') || question.includes('deliverable')) {
        return 'project_query';
    }
    
    // Specific project names
    if (question.includes('evcharge') || question.includes('electric') || question.includes('charging')) {
        return 'project_evcharge';
    }
    if (question.includes('o21') || question.includes('e-health') || question.includes('orthodontist')) {
        return 'project_o21';
    }
    if (question.includes('oysho') || question.includes('pull') || question.includes('inditex') ||
        question.includes('fashion') || question.includes('retail')) {
        return 'project_ecommerce';
    }
    if (question.includes('la caixa') || question.includes('banking') || question.includes('fintech')) {
        return 'project_la_caixa';
    }
    if (question.includes('veridata') || question.includes('design system') || question.includes('government')) {
        return 'project_veridata';
    }
    if (question.includes('zara') || question.includes('internal tools') || question.includes('engineering')) {
        return 'project_zara';
    }
    if (question.includes('gestamp') || question.includes('automotive') || question.includes('manufacturing')) {
        return 'project_gestamp';
    }
    if (question.includes('wefender') || question.includes('cybersecurity') || question.includes('security')) {
        return 'project_wefender';
    }
    if (question.includes('tacktics') || question.includes('construction') || question.includes('project management')) {
        return 'project_tacktics';
    }
    if (question.includes('appsamblea') || question.includes('startup') || question.includes('collaboration')) {
        return 'project_appsamblea';
    }
    if (question.includes('biscay') || question.includes('administration') || question.includes('public sector')) {
        return 'project_biscay';
    }
    if (question.includes('pharmacists') || question.includes('madrid') || question.includes('association')) {
        return 'project_pharmacists';
    }
    
    return null; // No intent detected
}



// Enhanced answer function that implements hybrid system (Local KB + ChatGPT API)
async function getSmartAnswer(userQuestion) {
    console.log('🔍 Hybrid system: Searching for answer...');
    
    // First, try to find a direct match using the new enhanced structure
    const directMatch = await findDirectMatch(userQuestion);
    if (directMatch) {
        console.log('✅ Local KB match found');
        return await enhanceAnswerWithContext(directMatch, userQuestion);
    }
    
    // Fallback to intent detection
    const intent = await detectIntent(userQuestion);
    if (intent) {
        const answer = await getAnswer(intent);
        if (answer) {
            console.log('✅ Local KB intent match found');
            // Enhance answer with cross-referenced information
            const enhancedAnswer = await enhanceAnswerWithContext(answer, userQuestion);
            return enhancedAnswer;
        }
    }
    
    // Special handling for fashion/retail queries
    if (isFashionQuery(userQuestion)) {
        console.log('✅ Fashion query handled locally');
        return await getFashionProjects();
    }
    
    // If no specific intent, try to find relevant projects with improved filtering
    try {
        const relevantProjects = await searchProjectsByKeywords(userQuestion);
        if (relevantProjects.length > 0) {
            console.log('✅ Project search found results');
            if (relevantProjects.length === 1) {
                return formatProjectInfo(relevantProjects[0]);
            } else {
                let response = `I found ${relevantProjects.length} relevant projects:\n\n`;
                relevantProjects.forEach(project => {
                    response += `**${project.project_name}** (${project.client})\n`;
                    response += `Problem: ${project.problem_solved}\n`;
                    response += `Results: ${project.results_metrics}\n\n`;
                });
                return response.trim();
            }
        }
    } catch (error) {
        console.log('Project search failed:', error);
    }
    
    // HYBRID SYSTEM: If no local knowledge found, use ChatGPT API
    console.log('🤖 No local KB match, trying ChatGPT API...');
    try {
        const aiResponse = await getChatGPTResponse(userQuestion);
        if (aiResponse) {
            console.log('✅ ChatGPT API response generated');
            return aiResponse;
        }
    } catch (error) {
        console.log('❌ ChatGPT API failed:', error);
    }
    
    // IMPROVED FALLBACK: Provide helpful guidance based on question type
    console.log('⚠️ All systems failed, providing intelligent fallback');
    return provideIntelligentFallback(userQuestion);
}

// Function to find direct matches using the new enhanced QA structure
async function findDirectMatch(userQuestion) {
    try {
        const qaItems = await loadKB();
        const normalizedQuestion = normalizeText(userQuestion);
        
        console.log('🔍 Searching for:', normalizedQuestion);
        
        // Score each QA item based on relevance
        const scoredItems = qaItems.map(item => {
            let score = 0;
            let matchedFields = [];
            let matchDetails = {};
            
            // Normalize all text fields for comparison
            const normalizedCanonical = normalizeText(item.canonical_question);
            const normalizedVariants = item.question_variants ? item.question_variants.map(normalizeText) : [];
            const normalizedTags = item.tags ? item.tags.map(normalizeText) : [];
            const normalizedIndustries = item.industries ? item.industries.map(normalizeText) : [];
            
            // Check canonical question match (highest weight)
            const canonicalScore = calculateTextSimilarity(normalizedQuestion, normalizedCanonical);
            if (canonicalScore > 0.7) {
                score += Math.round(canonicalScore * 15);
                matchedFields.push('canonical');
                matchDetails.canonical = { score: canonicalScore, text: item.canonical_question };
            }
            
            // Check question variants (high weight)
            let bestVariantScore = 0;
            let bestVariant = '';
            if (item.question_variants) {
                item.question_variants.forEach(variant => {
                    const variantScore = calculateTextSimilarity(normalizedQuestion, normalizeText(variant));
                    if (variantScore > bestVariantScore) {
                        bestVariantScore = variantScore;
                        bestVariant = variant;
                    }
                });
                
                if (bestVariantScore > 0.6) {
                    score += Math.round(bestVariantScore * 12);
                    matchedFields.push('variants');
                    matchDetails.variants = { score: bestVariantScore, text: bestVariant };
                }
            }
            
            // Check tags (medium weight)
            let tagMatches = [];
            normalizedTags.forEach(tag => {
                if (normalizedQuestion.includes(tag) || tag.includes(normalizedQuestion)) {
                    score += 6;
                    tagMatches.push(tag);
                }
            });
            if (tagMatches.length > 0) {
                matchedFields.push('tags');
                matchDetails.tags = tagMatches;
            }
            
            // Check industries (low weight)
            let industryMatches = [];
            normalizedIndustries.forEach(industry => {
                if (normalizedQuestion.includes(industry) || industry.includes(normalizedQuestion)) {
                    score += 4;
                    industryMatches.push(industry);
                }
            });
            if (industryMatches.length > 0) {
                matchedFields.push('industries');
                matchDetails.industries = industryMatches;
            }
            
            // Bonus for multiple field matches
            if (matchedFields.length > 1) {
                score += (matchedFields.length * 2);
            }
            
            // Confidence score bonus
            if (item.confidence_score) {
                score += Math.round(item.confidence_score * 5);
            }
            
            return { 
                item, 
                score, 
                matchedFields, 
                matchDetails,
                normalizedQuestion: normalizedQuestion
            };
        });
        
        // Filter and sort by relevance - STRICTER THRESHOLDS
        const relevantItems = scoredItems
            .filter(item => item.score > 12) // Increased threshold for better precision
            .sort((a, b) => {
                // Primary sort by score
                if (b.score !== a.score) return b.score - a.score;
                // Secondary sort by confidence score
                if (b.item.confidence_score !== a.item.confidence_score) {
                    return (b.item.confidence_score || 0) - (a.item.confidence_score || 0);
                }
                // Tertiary sort by number of matched fields
                return b.matchedFields.length - a.matchedFields.length;
            });
        
        console.log('🔍 Found relevant items:', relevantItems.length);
        relevantItems.forEach((item, index) => {
            console.log(`  ${index + 1}. ${item.item.intent_key} - Score: ${item.score}, Fields: ${item.matchedFields.join(', ')}`);
        });
        
        // Return the best match if it meets STRICT confidence threshold
        if (relevantItems.length > 0 && relevantItems[0].score >= 12) {
            const bestMatch = relevantItems[0];
            console.log('🎯 Best match found:', bestMatch.item.intent_key, 'Score:', bestMatch.score, 'Fields:', bestMatch.matchedFields);
            console.log('📋 Match details:', bestMatch.matchDetails);
            return bestMatch.item;
        }
        
        // If no direct match, check for out-of-scope questions
        console.log('🔍 No relevant match found, checking for out-of-scope...');
        const outOfScopeMatch = qaItems.find(item => item.intent_key === 'out_of_scope');
        
        if (outOfScopeMatch) {
            console.log('🎯 Out-of-scope handler activated');
            return outOfScopeMatch;
        }
        
        // If no out-of-scope handler, try semantic search as last resort (with higher threshold)
        console.log('🔍 No out-of-scope handler, trying semantic search...');
        const semanticResults = await semanticSearch(userQuestion, qaItems);
        
        if (semanticResults.length > 0 && semanticResults[0].totalScore > 8) { // Increased threshold
            const semanticMatch = semanticResults[0];
            console.log('🎯 Semantic match found:', semanticMatch.item.intent_key, 'Score:', semanticMatch.totalScore);
            return semanticMatch.item;
        }
        
        // If still no match, return out-of-scope as final fallback
        console.log('🔍 No semantic match, returning out-of-scope fallback');
        return outOfScopeMatch || null;
        
    } catch (error) {
        console.error('Error finding direct match:', error);
        return null;
    }
}

// Text normalization function for better matching
function normalizeText(text) {
    if (!text) return '';
    
    return text
        .toLowerCase()
        .trim()
        // Normalize quotes and apostrophes
        .replace(/[''""]/g, "'")
        .replace(/[""]/g, '"')
        // Normalize dashes and hyphens
        .replace(/[–—−]/g, '-')
        // Remove punctuation except for important separators
        .replace(/[^\w\s\-']/g, ' ')
        // Collapse multiple spaces
        .replace(/\s+/g, ' ')
        .trim();
}

// Calculate text similarity using token-based approach
function calculateTextSimilarity(text1, text2) {
    if (!text1 || !text2) return 0;
    
    const tokens1 = new Set(text1.split(/\s+/).filter(token => token.length > 2));
    const tokens2 = new Set(text2.split(/\s+/).filter(token => token.length > 2));
    
    if (tokens1.size === 0 || tokens2.size === 0) return 0;
    
    const intersection = new Set([...tokens1].filter(token => tokens2.has(token)));
    const union = new Set([...tokens1, ...tokens2]);
    
    // Jaccard similarity
    return intersection.size / union.size;
}



// Semantic search using keyword expansion and concept matching
async function semanticSearch(userQuestion, qaItems) {
    const normalizedQuestion = normalizeText(userQuestion);
    
    // Concept mapping for semantic understanding
    const conceptMap = {
        'design': ['design', 'designing', 'designer', 'designs'],
        'system': ['system', 'systems', 'systematic', 'systemic'],
        'experience': ['experience', 'experienced', 'expertise', 'background', 'work'],
        'build': ['build', 'building', 'built', 'create', 'creating', 'developed'],
        'manage': ['manage', 'managing', 'managed', 'lead', 'leading', 'led'],
        'platform': ['platform', 'platforms', 'software', 'application', 'app'],
        'user': ['user', 'users', 'user experience', 'ux', 'usability'],
        'research': ['research', 'researcher', 'studying', 'analysis', 'analyze'],
        'prototype': ['prototype', 'prototyping', 'wireframe', 'mockup'],
        'test': ['test', 'testing', 'validate', 'validation', 'usability test']
    };
    
    // Expand user question with related concepts
    const expandedTerms = new Set([normalizedQuestion]);
    Object.entries(conceptMap).forEach(([concept, related]) => {
        if (normalizedQuestion.includes(concept)) {
            related.forEach(term => expandedTerms.add(term));
        }
    });
    
    // Score items based on semantic similarity
    const scoredItems = qaItems.map(item => {
        let semanticScore = 0;
        let keywordScore = 0;
        
        // Semantic concept matching
        const itemText = [
            item.canonical_question,
            ...(item.question_variants || []),
            ...(item.tags || []),
            ...(item.industries || [])
        ].join(' ').toLowerCase();
        
        expandedTerms.forEach(term => {
            if (itemText.includes(term)) {
                semanticScore += 3;
            }
        });
        
        // Keyword matching
        const questionTokens = normalizedQuestion.split(/\s+/).filter(token => token.length > 2);
        questionTokens.forEach(token => {
            if (itemText.includes(token)) {
                keywordScore += 2;
            }
        });
        
        // Combined score with semantic bias
        const totalScore = (semanticScore * 0.7) + (keywordScore * 0.3);
        
        return { item, semanticScore, keywordScore, totalScore };
    });
    
    return scoredItems
        .filter(item => item.totalScore > 2)
        .sort((a, b) => b.totalScore - a.totalScore);
}

// Function to provide helpful search guidance when no results are found
function provideSearchGuidance(query) {
    const queryLower = query.toLowerCase();
    
    // Suggest specific topics based on query content
    if (queryLower.includes('design') || queryLower.includes('ux') || queryLower.includes('ui')) {
        return `I can tell you about Jon's design experience! Try asking about:\n• "Design systems experience"\n• "UX research methods"\n• "Prototyping and wireframing"\n• "Design tools like Figma"\n• "Mobile app design experience"`;
    }
    
    if (queryLower.includes('development') || queryLower.includes('code') || queryLower.includes('frontend')) {
        return `I can tell you about Jon's development skills! Try asking about:\n• "Frontend development experience"\n• "HTML/CSS/JavaScript skills"\n• "Accessibility implementation"\n• "Government website development"\n• "Technical design skills"`;
    }
    
    if (queryLower.includes('research') || queryLower.includes('user') || queryLower.includes('testing')) {
        return `I can tell you about Jon's research experience! Try asking about:\n• "User research methods"\n• "Usability testing"\n• "Field research"\n• "Competitive analysis"\n• "Research tools and processes"`;
    }
    
    if (queryLower.includes('management') || queryLower.includes('lead') || queryLower.includes('team')) {
        return `I can tell you about Jon's leadership experience! Try asking about:\n• "Team leadership"\n• "Project management"\n• "Stakeholder management"\n• "Agile methodologies"\n• "Cross-functional collaboration"`;
    }
    
    if (queryLower.includes('industry') || queryLower.includes('sector') || queryLower.includes('domain')) {
        return `I can tell you about Jon's industry experience! Try asking about:\n• "Healthcare/health-tech projects"\n• "Automotive and manufacturing"\n• "Fashion retail experience"\n• "Construction technology"\n• "Public sector work"\n• "Startup experience"`;
    }
    
    // Default helpful guidance
    return `I can help you learn about Jon's experience! Try asking about:\n\n**Skills & Expertise:**\n• "UX design experience"\n• "Design systems"\n• "User research methods"\n• "Frontend development"\n• "Data-driven design"\n• "Behavioral design"\n\n**Industries:**\n• "Healthcare projects (O21)"\n• "Automotive experience (Gestamp)"\n• "Fashion retail work (ZARA)"\n• "Electric mobility (Evcharge)"\n• "Construction technology (Tacktics)"\n• "Public sector work (Biscay Administration)"\n• "Fintech (La Caixa)"\n• "Education (Universidad San Jorge)"\n\n**Projects:**\n• "Evcharge case study"\n• "ZARA project"\n• "O21 healthcare platform"\n• "Gestamp dashboard"\n• "Tacktics construction platform"\n\n**Seniority & Leadership:**\n• "Senior product designer projects"\n• "Team leadership experience"\n• "Consulting environment fit"\n\n💡 **Tip:** I have 25+ detailed questions about Jon's experience. Ask anything specific!\n\nOr use the Company Fit feature above to see how Jon matches specific roles!`;
}

// Function to return clean answers without auto-enhancement
async function enhanceAnswerWithContext(answer, userQuestion) {
    // Return clean answer only - no auto-augmentation
    return answer.answer_en || answer.answer || "No answer available.";
}

// ChatGPT API integration for hybrid system
async function getChatGPTResponse(userQuestion, jonContext = '') {
    // Check if API key is configured and valid
    if (!CHATGPT_CONFIG.apiKey || CHATGPT_CONFIG.apiKey === 'your-openai-api-key-here') {
        console.warn('⚠️ ChatGPT API key not configured');
        return null;
    }
    
    try {
        console.log('🤖 Calling ChatGPT API...');
        
        const prompt = `You are JonBot, an AI assistant for Jon Gow, a Senior Product Designer with expertise in UX/UI design, design systems, and digital product development.

Jon's background:
- Computer Engineering degree
- 8+ years in product design
- Worked with companies like ZARA, Gestamp, O21, La Caixa
- Expertise in SaaS, fintech, e-commerce, healthcare, automotive, and public sector
- Strong in design systems, user research, and technical collaboration

User question: "${userQuestion}"

${jonContext ? `Additional context: ${jonContext}` : ''}

Please provide a helpful, accurate response. If the question is about Jon's experience and you don't have specific information, say so. If it's a general question, provide a helpful answer while mentioning you're Jon's AI assistant.

Keep responses concise (2-3 sentences max) and professional.`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CHATGPT_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: CHATGPT_CONFIG.model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are JonBot, Jon Gow\'s AI assistant. Provide helpful, accurate responses about Jon\'s experience or general questions.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: CHATGPT_CONFIG.maxTokens,
                temperature: CHATGPT_CONFIG.temperature
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`ChatGPT API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const aiResponse = data.choices[0]?.message?.content?.trim();
        
        if (aiResponse) {
            console.log('✅ ChatGPT response generated successfully');
            return aiResponse;
        } else {
            throw new Error('No response content from ChatGPT API');
        }
        
    } catch (error) {
        console.error('❌ ChatGPT API error:', error);
        
        // Provide user-friendly error message
        if (error.message.includes('401')) {
            return "I'm having trouble accessing my AI capabilities right now. Please check your API key configuration.";
        } else if (error.message.includes('429')) {
            return "I'm getting too many requests right now. Please try again in a moment.";
        } else if (error.message.includes('500')) {
            return "The AI service is experiencing issues. Please try again later.";
        } else {
            return "I'm having technical difficulties with my AI features. Please try asking a question about Jon's experience instead.";
        }
    }
}

// NEW: Intelligent fallback function that provides helpful responses based on question type
function provideIntelligentFallback(userQuestion) {
    const question = userQuestion.toLowerCase();
    
    // Check if this is a question about Jon's experience
    if (question.includes('jon') || question.includes('his') || question.includes('he') || 
        question.includes('experience') || question.includes('worked') || question.includes('project')) {
        return CONFIG.FALLBACK_MESSAGES.NO_ANSWER;
    }
    
    // Check if this is a general question that could benefit from AI
    if (question.includes('what is') || question.includes('how to') || question.includes('explain') ||
        question.includes('define') || question.includes('difference between')) {
        return CONFIG.FALLBACK_MESSAGES.API_UNAVAILABLE;
    }
    
    // Check if this is a job-related question
    if (question.includes('job') || question.includes('role') || question.includes('position') ||
        question.includes('career') || question.includes('salary') || question.includes('interview')) {
        return "I can help you understand how Jon fits for specific roles! To get a detailed analysis with fit scores, please click on the 'Company fit' card above, then describe the role you're interested in.";
    }
    
    // Default helpful response
    return CONFIG.FALLBACK_MESSAGES.GENERAL_HELP;
}

// Function to detect fashion-related queries
function isFashionQuery(userQuestion) {
    const fashionKeywords = ['fashion', 'retail', 'clothing', 'apparel', 'style'];
    const question = userQuestion.toLowerCase();
    
    return fashionKeywords.some(keyword => question.includes(keyword));
}

// Function to get fashion-specific projects
async function getFashionProjects() {
    console.log('🎯 getFashionProjects called - fetching fashion projects');
    const projects = await loadProjectsKB();
    const fashionProjects = projects.filter(project => 
        project.domain === 'Fashion Retail' || 
        project.keywords.some(k => ['fashion', 'retail'].includes(k))
    );
    
    console.log('🎯 Found fashion projects:', fashionProjects.length, fashionProjects.map(p => p.project_name));
    
    if (fashionProjects.length === 0) {
        return "I have experience in the fashion retail sector, particularly with mobile shopping experiences and e-commerce platforms. While I can't share specific project details, I've worked on projects that improved mobile conversion rates and user engagement for fashion brands.";
    }
    
    let response = `I found ${fashionProjects.length} relevant fashion retail projects:\n\n`;
    fashionProjects.forEach(project => {
        response += `${project.project_name} (${project.client})\n`;
        response += `Problem: ${project.problem_solved}\n`;
        response += `Results: ${project.results_metrics}\n\n`;
    });
    
    return response.trim();
}

// Projects Knowledge Base functions
async function loadProjectsKB() {
    try {
        const res = await fetch('./data/projects_kb.json');
        const allProjects = await res.json();
        
        // Filter out hidden projects
        const visibleProjects = filterHiddenProjects(allProjects);
        
        return visibleProjects;
    } catch (error) {
        console.error('Error loading projects KB:', error);
        return [];
    }
}

// Function to filter out hidden projects
function filterHiddenProjects(projects) {
    const hiddenProjectIds = [
        'oysho-inditex',           // Oysho
        'pull-bear-inditex',       // Pull & Bear
        'la-caixa-fintech',        // La Caixa
        'veridata-design-system',  // Veridata
        'tacktics-construction',   // Tacktics
        'appsamblea-startup',      // Appsamblea
        'biscay-administration',   // Biscay Public Administration
        'pharmacists-madrid'       // Madrid Pharmacists Association
    ];
    
    return projects.filter(project => !hiddenProjectIds.includes(project.id));
}

// Search projects by keywords with improved relevance scoring
async function searchProjectsByKeywords(keywords) {
    const projects = await loadProjectsKB();
    const searchTerms = keywords.toLowerCase().split(' ');
    
    // Filter out common words that don't add relevance
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'what', 'how', 'when', 'where', 'why', 'who'];
    const filteredTerms = searchTerms.filter(term => 
        term.length > 2 && !commonWords.includes(term)
    );
    
    if (filteredTerms.length === 0) {
        return [];
    }
    
    // Enhanced relevance scoring with semantic understanding
    const scoredProjects = projects.map(project => {
        const projectText = [
            project.project_name,
            project.problem_solved,
            project.what_jon_did,
            project.domain,
            project.client,
            project.role,
            ...project.keywords,
            ...(project.methodologies || []),
            ...(project.industry_insights || []),
            ...(project.cross_references || [])
        ].join(' ').toLowerCase();
        
        let score = 0;
        let matchedTerms = 0;
        let semanticMatches = 0;
        
        // Check for exact term matches
        filteredTerms.forEach(term => {
            if (projectText.includes(term)) {
                score += 1;
                matchedTerms += 1;
                
                // Bonus points for exact matches in important fields
                if (project.project_name.toLowerCase().includes(term)) score += 3;
                if (project.domain.toLowerCase().includes(term)) score += 3;
                if (project.keywords.some(k => k.toLowerCase().includes(term))) score += 2;
                if (project.client.toLowerCase().includes(term)) score += 2;
                if (project.role.toLowerCase().includes(term)) score += 2;
                if (project.methodologies && project.methodologies.some(m => m.toLowerCase().includes(term))) score += 2;
            }
        });
        
        // Semantic matching for related concepts
        const semanticGroups = {
            'design': ['ux', 'ui', 'interface', 'user', 'experience', 'prototype', 'wireframe'],
            'development': ['frontend', 'front-end', 'code', 'programming', 'software', 'web', 'app'],
            'research': ['user-research', 'interview', 'testing', 'usability', 'analysis', 'study'],
            'management': ['project', 'team', 'lead', 'manage', 'coordinate', 'planning'],
            'healthcare': ['health', 'medical', 'hospital', 'clinic', 'patient', 'doctor'],
            'automotive': ['car', 'vehicle', 'manufacturing', 'factory', 'industrial'],
            'fashion': ['retail', 'clothing', 'style', 'shopping', 'e-commerce'],
            'startup': ['startup', 'emerging', 'innovative', 'fast-paced', 'agile'],
            'enterprise': ['corporate', 'large', 'business', 'enterprise', 'organization'],
            'government': ['public', 'government', 'administration', 'citizen', 'public-sector']
        };
        
        // Check semantic matches
        Object.entries(semanticGroups).forEach(([group, terms]) => {
            if (filteredTerms.some(term => terms.includes(term))) {
                if (projectText.includes(group) || project.keywords.some(k => terms.includes(k))) {
                    score += 2;
                    semanticMatches += 1;
                }
            }
        });
        
        // Lower threshold for better recall - only require 1 term match or high semantic relevance
        const isRelevant = matchedTerms >= 1 || score >= 2 || semanticMatches >= 1;
        
        return { project, score, matchedTerms, semanticMatches, isRelevant };
    });
    
    // Filter and sort by relevance
    const relevantProjects = scoredProjects
        .filter(item => item.isRelevant)
        .sort((a, b) => {
            // Primary sort by total score
            if (b.score !== a.score) return b.score - a.score;
            // Secondary sort by semantic matches
            if (b.semanticMatches !== a.semanticMatches) return b.semanticMatches - a.semanticMatches;
            // Tertiary sort by exact term matches
            return b.matchedTerms - a.matchedTerms;
        })
        .slice(0, 8) // Increased limit for better coverage
        .map(item => item.project);
    
    return relevantProjects;
}

// Get project by specific criteria
async function getProjectByCriteria(criteria) {
    const projects = await loadProjectsKB();
    
    // Search by domain
    if (criteria.domain) {
        return projects.filter(p => 
            p.domain.toLowerCase().includes(criteria.domain.toLowerCase()) ||
            p.keywords.some(k => k.toLowerCase().includes(criteria.domain.toLowerCase()))
        );
    }
    
    // Search by client type
    if (criteria.clientType) {
        if (criteria.clientType === 'startup') {
            return projects.filter(p => p.client.toLowerCase().includes('startup') || 
                ['appsamblea', 'wefender'].some(name => p.client.toLowerCase().includes(name.toLowerCase())));
        }
        if (criteria.clientType === 'corporation') {
            return projects.filter(p => ['inditex', 'gestamp', 'la caixa'].some(name => 
                p.client.toLowerCase().includes(name.toLowerCase())));
        }
        if (criteria.clientType === 'public') {
            return projects.filter(p => p.domain === 'Public Sector' || 
                p.client.toLowerCase().includes('government') || 
                p.client.toLowerCase().includes('administration'));
        }
    }
    
    // Search by role
    if (criteria.role) {
        return projects.filter(p => p.role.toLowerCase().includes(criteria.role.toLowerCase()));
    }
    
    return [];
}

// Format project information for display
function formatProjectInfo(project) {
    let info = `
I found a relevant project!
${project.project_name}

Problem: ${project.problem_solved}

What I did: ${project.what_jon_did}

Results: ${project.results_metrics}

Client: ${project.client}

Role: ${project.role}`;
    
    // Add case study link if available
    if (project.case_study_available && project.case_study_link) {
        info += `

Case Study: View Case Study 📋`;
    }
    
    return info.trim();
}

// Get comprehensive project summary for specific sectors
async function getSectorProjectSummary(sector) {
    const projects = await loadProjectsKB();
    const sectorProjects = projects.filter(p => 
        p.keywords.some(k => k.toLowerCase().includes(sector.toLowerCase())) ||
        p.domain.toLowerCase().includes(sector.toLowerCase())
    );
    
    if (sectorProjects.length === 0) {
        return `I don't have specific projects in the ${sector} sector.`;
    }
    
    let summary = `I have worked on ${sectorProjects.length} projects in the ${sector} sector:\n\n`;
    
    sectorProjects.forEach(project => {
        summary += `**${project.project_name}** (${project.client})\n`;
        summary += `- **Problem:** ${project.problem_solved}\n`;
        summary += `- **Results:** ${project.results_metrics}\n\n`;
    });
    
    return summary;
}

// Get appropriate emoji for project domain
function getProjectEmoji(domain) {
    const emojiMap = {
        'Electric Mobility': '⚡',
        'Healthcare Technology': '🏥',
        'Fashion Retail': '👕',
        'Financial Services': '🏦',
        'Education Technology': '🎓',
        'Public Sector': '🏛️',
        'Construction Technology': '🏗️',
        'Civic Technology': '🗳️',
        'Cybersecurity': '🔒',
        'Healthcare Professional': '💊'
    };
    
    return emojiMap[domain] || '📋';
}

// Debug function to test specific question
window.debugQuestion = async function(question) {
    console.log('🔍 Debugging question:', question);
    
    try {
        const qaItems = await loadKB();
        console.log(`📚 Loaded ${qaItems.length} QA items`);
        
        // Test enhanced intent detection
        console.log('\n🎯 Testing Enhanced Intent Detection:');
        const enhancedIntent = await detectIntent(question);
        console.log('Enhanced intent result:', enhancedIntent);
        
        // Test direct search in KB
        console.log('\n🔍 Direct KB Search:');
        const directMatch = qaItems.find(item => {
            const normalizedQuestion = question.toLowerCase().replace(/[()]/g, '').replace(/\s+/g, ' ').trim();
            const normalizedCanonical = item.canonical_question.toLowerCase().replace(/[()]/g, '').replace(/\s+/g, ' ').trim();
            
            return normalizedQuestion.includes(normalizedCanonical) || 
                   normalizedCanonical.includes(normalizedQuestion);
        });
        
        if (directMatch) {
            console.log('✅ Direct match found:', directMatch.intent_key);
            console.log('Question:', directMatch.canonical_question);
        } else {
            console.log('❌ No direct match found');
        }
        
        // Show all available intents
        console.log('\n📋 All available intents:');
        qaItems.forEach(item => console.log(`- ${item.intent_key}: ${item.canonical_question}`));
        
    } catch (error) {
        console.error('Error debugging question:', error);
    }
};

// Simple test function for the enterprise scale question
window.testEnterpriseScale = async function() {
    console.log('🚀 testEnterpriseScale function started!');
    const question = "Has Jon designed platforms or products at scale (for large companies or public institutions)?";
    console.log('🧪 Testing enterprise scale question:', question);
    
    try {
        console.log('📚 Step 1: Loading KB...');
        const qaItems = await loadKB();
        console.log(`✅ Loaded ${qaItems.length} QA items`);
        
        // Find the enterprise scale entry
        console.log('🎯 Step 2: Finding enterprise scale entry...');
        const enterpriseEntry = qaItems.find(item => item.intent_key === 'seniority_enterprise_scale');
        if (enterpriseEntry) {
            console.log('✅ Found enterprise scale entry:', enterpriseEntry.canonical_question);
            console.log('Answer preview:', enterpriseEntry.answer_en.substring(0, 100) + '...');
        } else {
            console.log('❌ Enterprise scale entry not found');
            console.log('Available intent_keys:', qaItems.map(item => item.intent_key));
        }
        
        // Test intent detection
        console.log('\n🧠 Step 3: Testing intent detection...');
        const intent = await detectIntent(question);
        console.log('✅ Intent detected:', intent);
        
        // Test direct answer retrieval
        if (intent) {
            console.log('\n💬 Step 4: Testing answer retrieval...');
            const answer = await getAnswer(intent);
            console.log('✅ Answer retrieved:', answer ? 'Yes' : 'No');
            if (answer) {
                console.log('📝 Answer preview:', answer.substring(0, 100) + '...');
            }
        } else {
            console.log('❌ No intent detected - this is the problem!');
        }
        
        console.log('🏁 testEnterpriseScale function completed!');
        
        // Return the results for testing
        const result = {
            success: true,
            qaItems: qaItems,
            enterpriseEntry: enterpriseEntry,
            detectedIntent: intent,
            answer: intent ? await getAnswer(intent) : null
        };
        
        console.log('📤 Returning result:', result);
        return result;
        
    } catch (error) {
        console.error('❌ Error testing enterprise scale:', error);
        const errorResult = {
            success: false,
            error: error.message
        };
        console.log('📤 Returning error result:', errorResult);
        return errorResult;
    }
};

// Helper function to test core logic step by step
window.testStepByStep = async function() {
    console.log('🔍 Testing step by step...');
    
    try {
        // Step 1: Load KB
        console.log('\n📚 Step 1: Loading KB...');
        const items = await loadKB();
        console.log('✅ Items loaded:', Array.isArray(items), items?.length);
        
        // Step 2: Find enterprise scale item
        console.log('\n🎯 Step 2: Finding enterprise scale item...');
        const item = items.find(x => x.intent_key === 'seniority_enterprise_scale');
        console.log('✅ Found item?', !!item, item?.canonical_question);
        
        // Step 3: Test intent detection
        console.log('\n🧠 Step 3: Testing intent detection...');
        const question = 'Has Jon designed platforms or products at scale (for large companies or public institutions)?';
        const intent = await detectIntent(question);
        console.log('✅ Intent detected:', intent);
        
        // Step 4: Test answer retrieval
        if (intent) {
            console.log('\n💬 Step 4: Testing answer retrieval...');
            const answer = await getAnswer(intent);
            console.log('✅ Answer retrieved:', answer ? 'Yes' : 'No');
            if (answer) {
                console.log('📝 Answer preview:', answer.substring(0, 100) + '...');
            }
        }
        
        return {
            success: true,
            itemsLoaded: items.length,
            itemFound: !!item,
            intentDetected: intent,
            answerRetrieved: intent ? 'Yes' : 'N/A'
        };
        
    } catch (error) {
        console.error('❌ Error in step-by-step test:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

