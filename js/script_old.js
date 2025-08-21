/* ===========================
   JONGO Chat — script.js
   =========================== */


/* ---------- DOM Elements ---------- */
const mainInput    = document.getElementById('mainInput');
const sendBtn      = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');
const clearSearch  = document.getElementById('clearSearch');
const searchInput  = document.querySelector('.search-input');
const actionCards  = document.querySelectorAll('.card');

/* ---------- Projects Data ---------- */

const projectsData = [
  {
    id: 1,
    title: "Designing an Engaging Developer Platform for ZARA",
    icon: "💡",
    iconClass: "design",
    description:
      "As a UX Designer on the team, I contributed to the redesign of Zara Tools—the internal platform for the engineering community—helping boost adoption and daily use among developers. I improved internal processes and collaborated with multidisciplinary squads (engineering, content, design, PMs), delivering value every two weeks.",
    impact: "+77% adoption in engineering community",
    caseStudyUrl: null
  },
  {
    id: 2,
    title: "Redesigning Data Dashboards for Gestamp",
    icon: "📊",
    iconClass: "data",
    description:
      "I redesigned complex data dashboards to improve user experience and data visualization for manufacturing analytics. The new design focused on clarity, efficiency, and actionable insights for stakeholders.",
    impact: "+45% user engagement, +32% task completion rate",
    caseStudyUrl: null
  },
  {
    id: 3,
    title: "UX Design for the University of San Jorge",
    icon: "🎓",
    iconClass: "education",
    description:
      "Led the UX design for the university's digital platform, focusing on student experience and administrative efficiency. Created intuitive navigation and streamlined processes for academic services.",
    impact: "+28% student satisfaction, +41% digital service adoption",
    caseStudyUrl: null
  },
  {
    id: 4,
    title: "Optimizing Campaigns through a Revamped Experience",
    icon: "🚩",
    iconClass: "marketing",
    description:
      "Redesigned marketing campaign management tools to improve workflow efficiency and campaign performance tracking. The new interface reduced setup time and improved analytics visibility.",
    impact: "+52% campaign setup speed, +38% conversion tracking accuracy",
    caseStudyUrl: "https://www.jongodesign.com/case-marketing.html"
  },
  {
    id: 5,
    title: "Simplifying Cybersecurity for Non-Technical Users",
    icon: "🔒",
    iconClass: "security",
    description:
      "Created an intuitive cybersecurity interface that made complex security concepts accessible to non-technical users. The design focused on clarity and actionable security recommendations.",
    impact: "+67% security awareness, +43% policy compliance",
    caseStudyUrl: "https://www.jongodesign.com/case-cibersecurity.html"
  },
  {
    id: 6,
    title: "Improving the e-drivers Charging Experience",
    icon: "🔋",
    iconClass: "tech",
    description:
      "I reduced frustration at electric charging points by redesigning the app to be clear, fast, and useful. I was responsible for the entire end-to-end design process.",
    impact: "Charge completion rate: +39%, Activation rate: +43%, Reviews in store: +59%",
    caseStudyUrl: "https://www.jongodesign.com/case-mobility.html"
  }
];
/* ---------- Small formatter (markdown-lite → HTML) ---------- */
function formatText(s) {
  const esc = String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return esc
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/_(.+?)_/g, "<em>$1</em>")
    .replace(/^•\s/gm, "&bull; ")
    .replace(/\n/g, "<br>");
}

/* ---------- API helper (legacy endpoints) ---------- */
async function callAPI(kind, jdText) {
  const base = "https://689f4cb03fed484cf879b9a0.mockapi.io/Apicall";
  try {
    if (kind === "bio") {
      const r = await fetch(`${base}/bio`);
      const [row] = await r.json();
      if (!row) return "No bio found.";
      return `**${row.name}** — ${row.title}\n\n${row.summary}`;
    }
    if (kind === "projects") {
      const r = await fetch(`${base}/projects`);
      const items = await r.json();
      if (!Array.isArray(items) || !items.length) return "No projects found.";
      return items.map(p =>
        `• **${p.Title}** — ${p.MeasurableResults}\n  _Domain:_ ${Array.isArray(p.Domain) ? p.Domain.join(", ") : p.Domain}`
      ).join("\n");
    }
    if (kind === "score") {
      const r = await fetch("https://jon-score.free.beeceptor.com/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jdText })
      });
      const s = await r.json();
      if (!("score" in s)) return "No score available.";
      return `Fit score: **${s.score}/100**\nStrengths: ${s.matched_skills.join(", ")}\nGaps: ${s.gaps.join(", ") || "—"}\nWhy: ${s.rationale}`;
    }
  } catch (e) {
    console.error(e);
    return "Hmm, I couldn't reach the API. Please try again.";
  }
  return "Not sure what to fetch.";
}

/* ---------- Company Fit (backend) ---------- */
async function analyzeRole(roleText) {
  console.log('[FIT] POST /api/company-fit', roleText);
  const res = await fetch("http://127.0.0.1:3000/api/company-fit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roleText })
  });
  if (!res.ok) {
    console.error('[FIT] HTTP error', res.status);
    return "I couldn’t reach your local API (is the server running on :3000?).";
  }
  const data = await res.json();
  if (data.error) return "⚠️ " + data.error;
  return data.text;
}

/* ---------- Projects Display Functions ---------- */
function displayProjects() {
  const list = document.getElementById('projectsList');
  if (!list) return;
  list.innerHTML = '';
  projectsData.forEach(project => {
    list.appendChild(createProjectElement(project));
  });
}


function createProjectElement(project) {
  const projectDiv = document.createElement('div');
  projectDiv.className = 'project-item';
  projectDiv.dataset.projectId = project.id;

  const header = document.createElement('div');
  header.className = 'project-header';

  const title = document.createElement('div');
  title.className = 'project-title';

  const icon = document.createElement('div');
  icon.className = `project-icon ${project.iconClass}`;
  icon.textContent = project.icon;

  const titleText = document.createElement('span');
  titleText.textContent = project.title;

  title.appendChild(icon);
  title.appendChild(titleText);

  const toggle = document.createElement('div');
  toggle.className = 'project-details-toggle';
  toggle.textContent = '+ Details';
  toggle.dataset.expanded = 'false';

  header.appendChild(title);
  header.appendChild(toggle);

  const details = document.createElement('div');
  details.className = 'project-details';

  const description = document.createElement('div');
  description.className = 'project-description';
  description.textContent = project.description;

  const impact = document.createElement('div');
  impact.className = 'project-impact';
  impact.innerHTML = `<span class="rocket">🚀</span> Impact: ${project.impact}`;

  details.appendChild(description);
  details.appendChild(impact);

  if (project.caseStudyUrl) {
    const caseStudyBtn = document.createElement('a');
    caseStudyBtn.href = project.caseStudyUrl;
    caseStudyBtn.className = 'case-study-button';
    caseStudyBtn.textContent = '+ View case study';
    caseStudyBtn.target = '_blank';
    details.appendChild(caseStudyBtn);
  }

  projectDiv.appendChild(header);
  projectDiv.appendChild(details);

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleProject(projectDiv, toggle);
  });

  return projectDiv;
}

function toggleProject(projectElement, toggle) {
  const details = projectElement.querySelector('.project-details');
  const isExpanded = toggle.dataset.expanded === 'true';
  if (isExpanded) {
    details.classList.remove('expanded');
    toggle.textContent = '+ Details';
    toggle.dataset.expanded = 'false';
  } else {
    details.classList.add('expanded');
    toggle.textContent = '— Details';
    toggle.dataset.expanded = 'true';
  }
}

/* ---------- Chat Bot ---------- */
class ChatBot {
  constructor() {
    this.conversationHistory = [];
    this.isTyping = false;
    this.awaitingCompanyFit = false; // route NEXT message to backend
  }

  addMessage(content, type = 'user') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    if (content.includes('<img') || content.includes('<br>')) {
      messageContent.innerHTML = content;
    } else {
      messageContent.innerHTML = formatText(content);
    }

    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    this.conversationHistory.push({ content, type, timestamp: Date.now() });
    return messageDiv;
  }

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

  hideTypingIndicator() {
    const ti = document.getElementById('typing-indicator');
    if (ti) ti.remove();
    this.isTyping = false;
  }

  // === API-aware response ===
  async generateResponse(userMessage) {
    this.showTypingIndicator();
    await new Promise(r => setTimeout(r, 400));

    let reply;
    const m = userMessage.toLowerCase();
    console.log('generateResponse:', m);

    if (m === "about") {
      reply = this.getContextualResponse(m);

    } else if (m === "company-fit") {
      // Ask for role and arm intercept so the NEXT message goes to backend
      reply = this.getContextualResponse(m);
      this.awaitingCompanyFit = true;
      console.log('Flag armed: awaitingCompanyFit =', this.awaitingCompanyFit);

    } else if (m.includes("bio") || m.includes("about")) {
      reply = await callAPI("bio");

    } else if (m.includes("project") || m.includes("case")) {
      if (m.length < 20) reply = await callAPI("projects");
      else reply = await callAPI("score", userMessage);

    } else if (m.includes("score") || (m.includes("fit") && m !== "company-fit")) {
      const jd = userMessage.split(":").slice(1).join(":").trim() || userMessage;
      reply = await callAPI("score", jd);

    } else {
      const words = userMessage.trim().split(/\s+/);
      if (words.length >= 3) { // allow short titles like "UX Lead Vodafone"
        reply = await callAPI("score", userMessage);
      } else {
        reply = this.getContextualResponse(m);
      }
    }

    this.hideTypingIndicator();
    this.addMessage(reply, 'bot');
  }

  getContextualResponse(message) {
    const responses = {
      'saas': "I've worked on multiple SaaS products—admin consoles, subscriptions and analytics dashboards.",
      'case study': "Happy to walk you through a case. Ask for 'projects' to see highlights and results.",
      'company-fit': "🤝 Let's see how Jon's background fits your role. Please paste the job description or just the role title below.",
      'company': "I thrive where design and engineering collaborate tightly. Systems thinking + measurable impact.",
      'about': `<strong>Jon Gorroño</strong> — UX Designer & Design Engineer<br><br>I'm a passionate designer who bridges the gap between design and engineering. I specialize in creating user experiences that are not only beautiful but also technically feasible and measurable in their impact.<br><br>With expertise in SaaS platforms, data dashboards, and complex enterprise tools, I focus on systems thinking and user-centered design that drives real business results.<br><br><img src="img/about-me.jpg" alt="Jon Gorroño" style="width: 100%; height: auto; border-radius: 20px; margin: 20px 0; display: block; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">`,
      'experience': "Ask for **projects** to see quantified results and domains.",
      'project': "Try **projects** and I'll pull them from the code."
    };

    for (const [key, res] of Object.entries(responses)) {
      if (message === key || message.startsWith(key + ' ')) return res;
    }

    const defaults = [
      "Ask for **bio**, **projects**, or **score: <paste job description>**.",
      "Try: **projects** to see quantified case studies.",
      "Paste a JD like: **score: university edtech student**."
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
  }

  clearChat() {
    chatMessages.innerHTML = '';
    this.conversationHistory = [];
  }
}

/* ---------- Init ---------- */
const chatBot = new ChatBot();
window.chatBot = chatBot;   // expose for console

/* ---------- Events ---------- */
sendBtn.addEventListener('click', sendMessage);
mainInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

clearSearch.addEventListener('click', () => {
  if (searchInput) {
    searchInput.value = '';
    searchInput.focus();
  }
});

actionCards.forEach(card => {
  card.addEventListener('click', () => {
    const action = card.dataset.action;

    // Case Study: toggle projects list
    if (action === 'case-study') {
      let projectsSection = document.querySelector('.projects-section');
      if (!projectsSection) {
        // crear sección y lista si no existen
        projectsSection = document.createElement('section');
        projectsSection.className = 'projects-section hidden';
        projectsSection.style.display = 'none';
        const list = document.createElement('div');
        list.id = 'projectsList';
        projectsSection.appendChild(list);
        chatMessages.parentElement.appendChild(projectsSection);
      }
    
      if (projectsSection.style.display === 'none' || projectsSection.style.display === '') {
        projectsSection.style.display = 'block';
        setTimeout(() => projectsSection.classList.remove('hidden'), 10);
        displayProjects();
        card.style.background = 'rgba(255, 255, 255, 0.15)';
        card.style.borderColor = 'rgba(255, 255, 255, 0.6)';
    
        const welcomeMessage = chatMessages.querySelector('.message.bot');
        if (welcomeMessage && welcomeMessage.textContent.includes("Hi! I'm Jon's AI assistant")) {
          welcomeMessage.remove();
        }
      } else {
        projectsSection.classList.add('hidden');
        setTimeout(() => { projectsSection.style.display = 'none'; }, 300);
        card.style.background = 'rgba(255, 255, 255, 0.1)';
        card.style.borderColor = 'rgba(255, 255, 255, 0.3)';
      }
      return;
    }
    

    // Company Fit → ask + arm in generateResponse
    if (action === 'company-fit') {
      chatBot.awaitingCompanyFit = true;           // <-- arm flag
      chatBot.addMessage('company-fit', 'user');
      chatBot.addMessage(
        "🤝 Let's see how Jon's background fits your role. Please paste the job description or just the role title below.",
        'bot'
      );
      // small click animation
      card.style.transform = 'scale(0.95)';
      setTimeout(() => (card.style.transform = ''), 150);
      return;                                      // <-- do NOT call generateResponse()
    }

    // About Jon
    if (action === 'about-jon') {
      chatBot.addMessage("about", 'user');
      chatBot.generateResponse("about");
      card.style.transform = 'scale(0.95)';
      setTimeout(() => (card.style.transform = ''), 150);
      return;
    }
  });
});

/* ---------- Send message (single source of truth) ---------- */
function setSendButtonLoading(loading) {
  if (loading) {
    sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    sendBtn.disabled = true;
  } else {
    sendBtn.innerHTML = '<i class="fas fa-comment"></i>';
    sendBtn.disabled = false;
  }
}

function sendMessage() {
  const message = mainInput.value.trim();
  if (!message) return;

  console.log("[FIT] sendMessage start; awaiting?", chatBot.awaitingCompanyFit, "message:", message);

  // Intercept the very next message after "company-fit" and call backend
  if (chatBot.awaitingCompanyFit) {
    chatBot.awaitingCompanyFit = false;
    setSendButtonLoading(true);
    chatBot.addMessage(message, 'user');
    mainInput.value = '';
    chatBot.showTypingIndicator();

    console.log("[FIT] calling analyzeRole() with:", message);
    analyzeRole(message)
      .then(text => chatBot.addMessage(text, 'bot'))
      .catch(err => chatBot.addMessage("⚠️ Error: " + err.message, 'bot'))
      .finally(() => {
        chatBot.hideTypingIndicator();
        setSendButtonLoading(false);
      });
    return; // do not fall through
  }

  // Default flow
  setSendButtonLoading(true);
  chatBot.addMessage(message, 'user');
  mainInput.value = '';
  chatBot.generateResponse(message).finally(() => setSendButtonLoading(false));
}

/* ---------- UX niceties ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const projectsSection = document.querySelector('.projects-section');
  if (projectsSection) {
    projectsSection.style.display = 'none';
    projectsSection.classList.add('hidden');
  }

  setTimeout(() => {
    chatBot.addMessage(
      "Hi! I'm Jon's AI assistant. Ask for **bio**, **projects**, or try **score: university edtech student**.",
      'bot'
    );
  }, 600);
});

function smoothScrollToBottom() {
  chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
}

const observer = new MutationObserver(() => smoothScrollToBottom());
observer.observe(chatMessages, { childList: true, subtree: true });

actionCards.forEach(card => {
  card.addEventListener('mouseenter', () => card.style.cursor = 'pointer');
  card.addEventListener('mouseleave', () => card.style.cursor = 'default');
});

mainInput.addEventListener('focus', () => {
  mainInput.parentElement.style.borderColor = 'rgba(255,255,255,0.8)';
  mainInput.parentElement.style.background = 'rgba(255,255,255,0.15)';
});

mainInput.addEventListener('blur', () => {
  mainInput.parentElement.style.borderColor = 'rgba(255,255,255,0.3)';
  mainInput.parentElement.style.background = 'rgba(255,255,255,0.1)';
});
