/* ═══════════════════════════════════════════
   PREMIUM PORTFOLIO — ANIMATION ENGINE
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── LUCIDE ICONS ──
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // ── SCROLL REVEAL (IntersectionObserver) ──
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── NAVBAR SCROLL EFFECT ──
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const st = window.scrollY;
    if (st > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = st;
  }, { passive: true });

  // ── SMOOTH SCROLLING FOR ANCHOR LINKS ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      // Close mobile menu
      if (window.innerWidth < 640) {
        const menu = document.getElementById('mobile-menu');
        const button = document.getElementById('mobile-menu-button');
        if (menu && button) {
          menu.style.display = 'none';
          button.setAttribute('aria-expanded', 'false');
          const menuIcon = button.querySelector('[data-lucide="menu"]');
          const closeIcon = button.querySelector('[data-lucide="x"]');
          if (menuIcon) menuIcon.classList.remove('hidden');
          if (closeIcon) closeIcon.classList.add('hidden');
        }
      }
    });
  });

  // ── MOBILE MENU TOGGLE ──
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuButton && mobileMenu) {
    const menuIcon = menuButton.querySelector('[data-lucide="menu"]');
    const closeIcon = menuButton.querySelector('[data-lucide="x"]');
    if (closeIcon) closeIcon.classList.add('hidden');

    menuButton.addEventListener('click', () => {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', !isExpanded);
      if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
        mobileMenu.style.display = 'block';
        if (menuIcon) menuIcon.classList.add('hidden');
        if (closeIcon) closeIcon.classList.remove('hidden');
      } else {
        mobileMenu.style.display = 'none';
        if (menuIcon) menuIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
      }
    });
  }

  // ── CURSOR GLOW (desktop only) ──
  if (window.innerWidth > 768) {
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    document.body.appendChild(glow);
    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  // ── 3D TILT EFFECT ON CARDS ──
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // ── BUTTON MAGNETIC HOVER ──
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.03)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0) scale(1)';
    });
  });

  // ── BUTTON RIPPLE EFFECT ──
  document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute; border-radius:50%; pointer-events:none;
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
        background:rgba(255,255,255,0.3);
        transform:scale(0); opacity:1;
        animation: rippleAnim 0.6s ease-out forwards;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Inject ripple keyframes
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `@keyframes rippleAnim { to { transform: scale(2.5); opacity: 0; } }`;
  document.head.appendChild(rippleStyle);

  // ── SKILLS GENERATOR ──
  const categorizedSkills = [
    { category: "Backend Engineering", icon: "server", skills: ["FastAPI", "Python", "REST API Architecture", "SQLAlchemy (Async)", "Pydantic Validation", "JWT Authentication", "RBAC Authorization", "Rate Limiting", "Circuit Breaker Pattern", "Middleware Engineering", "Clean Architecture"] },
    { category: "AI / Machine Learning", icon: "brain", skills: ["TensorFlow", "Keras", "Scikit-learn", "Hugging Face Transformers", "LangChain", "FAISS", "NLP (Natural Language Processing)", "Computer Vision", "Sentiment Analysis", "Speech Emotion Recognition", "Deep Learning", "LLM Applications", "RAG Pipelines", "Vector Databases (FAISS, ChromaDB, Pinecone)"] },
    { category: "Databases & Data Layer", icon: "database", skills: ["PostgreSQL", "MongoDB", "Cloud SQL", "SQLAlchemy ORM", "Redis Caching", "Query Optimization", "Schema Design", "Data Modeling"] },
    { category: "Cloud & DevOps", icon: "cloud", skills: ["Google Cloud Platform (GCP)", "Compute Engine", "Cloud Storage", "VPC", "GKE (Kubernetes Engine)", "Cloud Build", "AWS (EC2, S3)", "Docker", "Kubernetes", "Terraform (IaC)", "GitHub Actions (CI/CD)", "Jenkins", "Nginx", "Linux"] },
    { category: "System Design & Architecture", icon: "layout-grid", skills: ["Microservices Architecture", "Distributed Systems", "Async Processing (Celery)", "Message Queues (Redis)", "API Gateway Patterns", "Event-Driven Design", "System Design", "Scalability Patterns"] },
    { category: "Programming Languages & Frameworks", icon: "code", skills: ["Python", "Java", "JavaScript", "FastAPI", "Next.js", "Flask", "Streamlit", "HTML/CSS", "TailwindCSS"] },
    { category: "Testing & Quality", icon: "shield-check", skills: ["PyTest", "Test Driven Development", "Integration Testing", "Structured Logging", "Observability", "Performance Tuning"] },
    { category: "Data Structures & Algorithms", icon: "binary", skills: ["Data Structures & Algorithms", "BFS / DFS", "Dynamic Programming", "Binary Search", "Hash Maps", "Trees & Graphs"] }
  ];

  const skillsContainer = document.getElementById('skills-container');
  if (skillsContainer) {
    skillsContainer.innerHTML = '';
    categorizedSkills.forEach((group, gi) => {
      const header = document.createElement('h3');
      header.className = 'skill-category-header reveal reveal-delay-' + Math.min(gi % 4 + 1, 4);
      header.innerHTML = `<i data-lucide="${group.icon}" class="w-5 h-5"></i> ${group.category}`;
      skillsContainer.appendChild(header);

      const grid = document.createElement('div');
      grid.className = 'flex flex-wrap gap-2 reveal reveal-delay-' + Math.min(gi % 4 + 1, 4);
      grid.style.display = 'flex';
      grid.style.flexWrap = 'wrap';
      grid.style.gap = '8px';

      group.skills.forEach(skill => {
        const pill = document.createElement('span');
        pill.className = 'skill-pill';
        pill.textContent = skill;
        grid.appendChild(pill);
      });
      skillsContainer.appendChild(grid);
    });
    if (typeof lucide !== 'undefined') lucide.createIcons();
    // Re-observe new reveal elements
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
  }

  // ── PROJECTS GENERATOR ──
  const projectsData = [
    { title: "InfraWatch — Infrastructure Monitoring REST API", category: "DevOps / Cloud Automation", desc: "Production-grade infrastructure monitoring REST API built with Flask & psutil. Exposes CPU, memory, disk, and network metrics via 6 REST endpoints. Features a multi-stage Dockerfile, Docker Compose + Nginx reverse proxy, a 4-job GitHub Actions CI/CD pipeline (test → build → push → deploy), AWS EC2 deployment with Elastic IP, and 5 production bash automation scripts (deploy, backup, restore, health-check, cleanup).", stack: ["Python", "Flask", "Docker", "Docker Compose", "Nginx", "GitHub Actions", "AWS EC2", "psutil", "Gunicorn", "Bash Scripting", "CI/CD", "pytest"], image: "infrawatch_card.png", link: "https://github.com/SudheerKonduboina/devops_demo" },
    { title: "AI Assistant", category: "AI Systems / Backend Engineering", desc: "Enterprise-grade AI Governance Assistant built using FastAPI with modular clean architecture. Implements role-based governance workflows, RAG-based intent recognition, background task orchestration using Celery & Redis, structured observability, security hardening, and production-ready reliability patterns.", stack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy Async", "JWT Authentication", "Llama 3.1 (Groq)", "Celery", "Redis", "Docker", "Docker Compose", "Structured Logging", "Rate Limiting", "Circuit Breaker Pattern"], image: "ai_assistant_card.png", link: "https://github.com/SudheerKonduboina/Assistant-AI" },
    { title: "Slooze Enterprise Food Ordering Platform", category: "Full Stack / Enterprise Backend", desc: "Production-grade enterprise food ordering system featuring RBAC authorization, country-based access control, distributed architecture, Next.js frontend, FastAPI backend, Redis caching, and Dockerized microservice deployment behind NGINX reverse proxy.", stack: ["FastAPI", "Next.js", "PostgreSQL", "Redis", "JWT", "RBAC", "Docker", "Docker Compose", "Nginx", "TailwindCSS", "Framer Motion"], image: "slooze_platform_card.png", link: "https://github.com/SudheerKonduboina/slooze-enterprise-food-ordering" },
    { title: "INSIGHT-AI — Multilingual AI Health Triage Chatbot", category: "AI / NLP / Healthcare", desc: "Built a multilingual AI health triage chatbot using RAG. Embedded 40+ MB medical documents into a FAISS vector DB for contextual & safe medical answers. Designed responsive UI with voice and multilingual support.", stack: ["Python", "LangChain", "FAISS", "Streamlit", "Gemini AI", "RAG"], image: "insight_ai_card.png", link: "https://github.com/SudheerKonduboina/INSIGHT-AI" },
    { title: "DevOps – CI/CD + Kubernetes Project", category: "DevOps / Kubernetes", desc: "Designed and deployed a Node.js app with automated CI/CD. Wrote Dockerfile and Kubernetes manifests (YAML). Gained practical K8s + Docker integration experience.", stack: ["Node.js", "Docker", "Kubernetes", "YAML", "GitHub Actions"], image: "kubernetes_devops_card.png", link: "https://github.com/SudheerKonduboina/devops-demo-assignment/tree/main/.github" },
    { title: "Voice Sentiment Assistant — Speech Emotion Recognition", category: "AI / Speech Processing", desc: "Built an ML model that detects emotions from voice input. Extracted MFCC & Chroma features and trained a CNN + SVM hybrid model. Created an interactive dashboard for monitoring.", stack: ["Python", "TensorFlow", "Librosa", "Scikit-Learn", "SpeechRecognition"], image: "voice_sentiment_card.png", link: "https://github.com/SudheerKonduboina/ai-voice-sentimentanalysis-bot" },
    { title: "AI Text Generator — Transformer-Based Text Generation", category: "NLP / Deep Learning", desc: "Developed a transformer-based text generation model with sentiment control. Added chat history and downloadable responses in a Streamlit front-end.", stack: ["Python", "TensorFlow", "Hugging Face", "Streamlit", "Keras"], image: "ai_text_generator_card.png", link: "https://github.com/SudheerKonduboina/ai-text-generator-sentiment" },
    { title: "AI Outbound Sales Agent", category: "AI / LLM / Voice Automation", desc: "Enterprise-grade AI outbound sales agent that reads leads from an Excel CRM, conducts dynamic qualification conversations via a local LLM (Ollama/llama.cpp), and retrieves product context through a hybrid TF-IDF RAG pipeline. Features atomic file-locking for concurrent CRM safety, a React 18 real-time analytics dashboard with theme persistence, structured outcome extraction, and 196 passing tests at 100% coverage.", stack: ["Python", "FastAPI", "React 18", "Vite 5", "Ollama", "LLM", "TF-IDF RAG", "openpyxl", "Docker", "GitHub Actions", "TailwindCSS", "pytest"], image: "ai_sales_agent_card.png", link: "https://github.com/SudheerKonduboina/AI_voice_sales_agent" },
    { title: "AI Learning Assistant", category: "AI / RAG / Backend Engineering", desc: "RAG-powered FastAPI backend for hyper-personalized software engineering curriculum generation, portfolio project recommendation, and contextual mentorship. Features per-session FAISS vector isolation (zero data leakage), Groq LLM with exponential backoff & auto-correction reprompting for malformed JSON, semantic task chunking, adaptive embeddings (SentenceTransformers → TF-IDF fallback), and multi-turn conversation memory.", stack: ["Python", "FastAPI", "Groq LLM", "FAISS", "RAG", "SentenceTransformers", "TF-IDF", "Pydantic v2", "Tenacity", "pytest"], image: "ai_learning_assistant_card.png", link: "https://github.com/SudheerKonduboina/ai_learning_assistant" },
    { title: "HR InsightX — Automated HR Intelligence Dashboard", category: "Data Analytics / Excel Automation", desc: "Enterprise-grade Excel HR automation product built with Python & openpyxl. Transforms raw employee data across India & US into a real-time executive dashboard with 100% formula-driven KPIs (zero hardcoded values). Features an automated alert engine for intern exits & probation confirmations, dynamic org hierarchy mapping, 5 chart types, a 14-sheet Data→Model→View workbook architecture, and 16/16 QA requirements passed.", stack: ["Python", "openpyxl", "Excel", "Data Modeling", "Dashboard Design", "COUNTIF / INDEX-MATCH", "Conditional Formatting", "Automation"], image: "hr_insightx_card.png", link: "https://github.com/SudheerKonduboina/HR_InsightX" }
  ];

  const projectsGrid = document.getElementById('projects-grid');
  const projectTemplate = document.getElementById('project-card-template');
  if (projectsGrid && projectTemplate) {
    projectsGrid.innerHTML = '';
    projectsData.forEach((project, pi) => {
      const card = projectTemplate.content.cloneNode(true).querySelector('.project-card-item');
      card.classList.add('tilt-card', 'reveal', 'reveal-delay-' + Math.min(pi % 4 + 1, 4));
      card.querySelector('img').src = project.image;
      card.querySelector('img').alt = project.title + " preview";
      card.querySelector('.category-tag').textContent = project.category;
      card.querySelector('h3').textContent = project.title;
      card.querySelector('.project-description').textContent = project.desc;
      card.querySelector('.view-repo-link').href = project.link;

      const badgesContainer = card.querySelector('.tech-stack-badges');
      project.stack.forEach(tech => {
        const badge = document.createElement('span');
        badge.className = 'tech-badge';
        badge.textContent = tech;
        badgesContainer.appendChild(badge);
      });
      projectsGrid.appendChild(card);
    });
    // Re-observe
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
    // Re-init tilt
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -3;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 3;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // ── CONTACT FORM HANDLER ──
  const contactForm = document.getElementById('contact-form');
  const statusMessage = document.getElementById('status-message');
  if (contactForm && statusMessage) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const submitButton = contactForm.querySelector('button[type="submit"]');
      statusMessage.className = 'p-4 rounded-xl text-center font-semibold text-white bg-loading';
      statusMessage.style.display = 'block';
      statusMessage.textContent = 'Sending message...';
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          statusMessage.className = 'p-4 rounded-xl text-center font-semibold text-white';
          statusMessage.style.background = '#5B7F67';
          statusMessage.textContent = '✅ Message received successfully! I will be in touch soon.';
          contactForm.reset();
        } else {
          let msg = 'Oops! There was an issue sending your message.';
          try { const d = await response.json(); msg = d.error || msg; } catch(e) {}
          statusMessage.style.background = '#dc2626';
          statusMessage.textContent = msg;
        }
      } catch (error) {
        statusMessage.style.background = '#dc2626';
        statusMessage.textContent = 'Network error. Please check your connection and try again.';
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
        setTimeout(() => { statusMessage.style.display = 'none'; }, 7000);
      }
    });
  }
});
