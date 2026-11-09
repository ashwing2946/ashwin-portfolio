import { useState, useEffect } from 'react';
import './App.css';

const certifications = [
  "Data Structures & Algorithms — Infosys Springboard / UC San Diego",
  "Advanced Blockchain Development",
  "Cloud Computing — NPTEL",
  "IoT Design Concepts — NPTEL",
  "Foundation of Cloud, IoT & Edge ML — NPTEL",
  "Databases and SQL for Data Science with Python",
  "UI/UX Design — Udacity",
];

const achievements = [
  "Event coordination — Vaidehi",
  "Silver medal — district-level badminton",
  "First prize — Republic Day procession",
  "Group performance — cultural events and Onam dance",
];

const navItems = [
  ['hero', 'Home'],
  ['about', 'About'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['education', 'Education'],
  ['contact', 'Contact'],
];

const EMAIL = 'ashwingvasantham@gmail.com';

const handleEmailClick = (e) => {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (!isMobile) {
    e.preventDefault();
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`,
      '_blank',
      'noopener,noreferrer'
    );
  }
};

function App() {
  // --- States ---
  const [theme, setTheme] = useState('dark');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSection, setActiveSection] = useState('hero');

  // Apply theme class to body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
        else {
    entry.target.classList.remove('show');
  }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.fade-in');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Track the section currently in view
useEffect(() => {
  const ids = navItems.map(([id]) => id);

  const onScroll = () => {
    const marker = window.innerHeight * 0.35;
    let current = ids[0];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= marker) current = id;
    }
    // Contact is short, so force it when the page bottom is reached
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = 'contact';
    }
    setActiveSection(current);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}, []);

  // --- Interactive Star Background Logic ---
  useEffect(() => {
    const canvas = document.getElementById('star-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars = [];
    const numStars = 100;
    let mouse = { x: -1000, y: -1000 };

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.2,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
      });
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; 

      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          star.x -= dx * 0.03;
          star.y -= dy * 0.03;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- Data ---
  const skills = [
    "Python", "SQL", "C++", "LLMs & VLMs", "AI Agents", "RAG", 
    "LangChain & LangGraph", "FastAPI", "TensorFlow & Pandas", 
    "React", "REST APIs", "Git & Automation"
  ];

  const experiences = [
    {
      role: "AI Engineer Intern",
      company: "Difinity Digital",
      duration: "Aug 2026 - Nov 2026",
      description: "Developing AI applications, agentic workflows, RAG pipelines, and VLM integrations to automate and enhance digital processes."
    }
  ];

  
const projects = [
  {
    id: "01",
    category: "Agents & VLM",
    categoryLabel: "VLM & AGENTS",
    highlight: "NVIDIA L4 + vLLM",
    highlightClass: "cyan-text",
    title: "Flowchart AI",
    subtitle: "VLM-Powered Diagram Understanding & Streaming Blueprint Engine",
    description: "Full-stack platform that parses complex flowchart imagery into validated JSON graph blueprints and delivers real-time streaming conversational analysis via LangGraph and vLLM on remote NVIDIA L4 GPU infrastructure.",
    tech: ["FastAPI", "LangGraph", "vLLM", "React", "OpenCV"]
  },
  {
    id: "02",
    category: "Agents & VLM",
    categoryLabel: "AGENTIC WORKFLOW",
    highlight: "LangGraph + OCR",
    highlightClass: "purple-text",
    title: "BGV Agent",
    subtitle: "Autonomous Background Verification Orchestrator",
    description: "Multi-step agentic workflow orchestrating email classification, OCR document extraction, requester authentication, employee matching, business-rule validation, human-in-the-loop approval routing, and audit logging.",
    tech: ["Python", "LangGraph", "FastAPI", "RAG"]
  },
  {
    id: "03",
    category: "ML & Vision",
    categoryLabel: "NLP CLASSIFICATION",
    highlight: "97% Accuracy",
    highlightClass: "green-text",
    title: "SMS Spam Classification",
    subtitle: "High-Precision NLP Message Filtering Pipeline",
    description: "Machine learning inference pipeline built with TF-IDF vectorization and Logistic Regression with custom threshold tuning, achieving 97% classification accuracy.",
    tech: ["Python", "Scikit-Learn", "TF-IDF"]
  },
  {
    id: "04",
    category: "ML & Vision",
    categoryLabel: "COMPUTER VISION",
    highlight: "TensorFlow + Deep Learning",
    highlightClass: "pink-text",
    title: "AI Face Recognition Attendance",
    subtitle: "Automated Biometric Attendance System",
    description: "Deep learning facial recognition pipeline built in Python and TensorFlow to automatically identify students and log real-time attendance records with a streamlined institutional interface.",
    tech: ["Python", "TensorFlow", "OpenCV"]
  },
  {
    id: "05",
    category: "ML & Vision",
    categoryLabel: "OBJECT DETECTION",
    highlight: "Near-Perfect Accuracy",
    highlightClass: "green-text",
    title: "YOLO-Based Object Detection & Counting",
    subtitle: "Real-Time Industrial Computer Vision System",
    description: "Trained and implemented YOLO and YOLO OBB models for real-time object detection and counting in an industrial environment. Developed detection workflows for multiple object categories, including orientation-aware detection using rotated bounding boxes. Achieved near-perfect detection accuracy while keeping application-specific details confidential.",
    tech: ["Python", "YOLO", "YOLO OBB", "Computer Vision", "Object Detection"]
  },
  {
    id: "06",
    category: "Software & Systems",
    categoryLabel: "SOCIAL MEDIA AUTOMATION",
    highlight: "Python Automation",
    highlightClass: "cyan-text",
    title: "Tweepy — Twitter Bot",
    subtitle: "Automated Social Media Engagement & Trend Analysis",
    description: "Developed a Python-based Twitter bot using Tweepy to automate replies, retweets, and data collection. Added trending-topic analysis, scheduled tweet functionality, and real-time engagement insights.",
    tech: ["Python", "Tweepy", "Twitter API", "Automation"]
  },
  {
    id: "07",
    category: "Software & Systems",
    categoryLabel: "3D CAD DESIGN",
    highlight: "3D Modelling",
    highlightClass: "purple-text",
    title: "Headset Surface Modelling",
    subtitle: "CAD Design for 3D Printing",
    description: "Designed a detailed 3D headset model in Autodesk for 3D printing, focusing on surface modelling, structural integrity, and ergonomic considerations while accounting for compatibility with different 3D printing materials.",
    tech: ["Autodesk", "3D Modelling", "CAD", "3D Printing"]
  },
  {
    id: "08",
    category: "Software & Systems",
    categoryLabel: "DATABASE MANAGEMENT",
    highlight: "SQL Database",
    highlightClass: "green-text",
    title: "Student Management Database",
    subtitle: "Relational Database & Query Management System",
    description: "Built an SQL-based database system to manage student records, using relational schemas and optimized queries for efficient data retrieval and data integrity. Incorporated role-based access control for improved security.",
    tech: ["SQL", "Database Design", "Relational Databases"]
  },
  {
    id: "09",
    category: "Software & Systems",
    categoryLabel: "IoT & AUTOMATION",
    highlight: "Smart Monitoring",
    highlightClass: "cyan-text",
    title: "Smart Irrigation System",
    subtitle: "IoT-Based Automated Water Management",
    description: "Developed an IoT-based irrigation system using real-time soil moisture monitoring. Integrated soil moisture sensors with a microcontroller to automate water distribution when required, reducing unnecessary water usage and manual intervention.",
    tech: ["IoT", "Soil Moisture Sensors", "Microcontroller", "Automation"]
  }
];


  // --- Filtering Logic ---
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All') return true;
    return project.category === activeFilter;
  });

  return (
    <div className="portfolio-container">
      <canvas id="star-canvas" className="star-canvas" />

      {/* Navigation */}
      <nav className="floating-nav fade-in">
      <div className="logo">ASHWIN G.</div>
      <ul className="nav-links">
      {navItems.map(([id, label]) => (
        <li key={id}>
        <a href={`#${id}`} className={activeSection === id ? 'active' : ''}>{label}</a>
      </li>
    ))}
  </ul>   
  </nav>

      {/* Hero Section */}
      <header id="hero" className="hero-section fade-in">
        <div className="hero-lean-wrapper">
          <img src="/ashwin-leaning.png" alt="Ashwin Girish" className="hero-lean-img" />
        </div>
        <div className="hero-content">
          <h1 className="hero-headline uppercase-name">
            ASHWIN<br/>GIRISH
          </h1>
          <p className="hero-subtitle">
            AI Engineer Intern specializing in <span className="highlight-blue">Agentic Workflows</span>, <span className="highlight-blue">Vision-Language Models (VLMs)</span>, and scalable production-ready architectures.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn-explore">Explore Work</a>
            <a href="#contact" className="btn-touch">Get in Touch</a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="section-container fade-in text-left">
        <h2 className="section-title">Beyond Models. Building Intelligence.</h2>
        
        <div className="about-grid">
          <div className="about-text-content">
            <p>
              I'm an AI Engineer Intern and Computer Science graduate (<strong>Chandigarh University, 2022–2026</strong>) passionate about turning ideas into intelligent, practical applications. I work across AI engineering , building systems that combine the capabilities of modern AI models with reliable, user-friendly software.
            </p>
            <p>
              From deploying quantized Vision-Language Models (VLMs) on NVIDIA L4 GPUs with vLLM and orchestrating multi-step agentic execution graphs in LangGraph, to designing FastAPI backends and responsive React interfaces, I focus on low latency, structured schema validation, and clean architecture.
            </p>
          </div>
          <div className="about-skills-card">
            <div className="about-skill-group">
              <h4 className="cyan-text">AI / ML Engineering</h4>
              <p>LLMs, VLMs, LangGraph, LangChain, vLLM, RAG, YOLO</p>
            </div>
            <div className="about-skill-divider"></div>
            <div className="about-skill-group">
              <h4 className="purple-text">Backend & GPU Infra</h4>
              <p>FastAPI, Python (uv/venv), REST APIs, NVIDIA L4 SSH Tunnels</p>
            </div>
            <div className="about-skill-divider"></div>
            <div className="about-skill-group">
              <h4 className="pink-text">Frontend & Design</h4>
              <p>React, Vite, Modern JavaScript (ES6+), Responsive CSS3</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-container fade-in text-left">
        <h2 className="section-title">Experience</h2>
        
        <div className="experience-card">
          <div className="exp-top-bar">
            <span className="exp-badge">Aug 2026 - Nov 2026</span>
            <span className="exp-tech-stack">vLLM • LangGraph • FastAPI • React • NVIDIA L4</span>
          </div>
          <h3 className="exp-role">AI Engineer Intern — Difinity Digital</h3>
          <p className="exp-company-sub">Flowchart AI & Enterprise Agentic Workflow Systems</p>
          <ul className="exp-bullets">
            <li>Developed <strong>Flowchart AI</strong>, a Vision-Language Model (VLM)-powered application to analyze complex flowcharts, process diagrams, and architectures into structured JSON blueprints.</li>
            <li>Implemented agentic AI workflows using <strong>LangChain</strong> and <strong>LangGraph</strong> for contextual diagram analysis, streaming conversational Q&A, and architectural insights.</li>
            <li>Deployed and served a quantized VLM using <strong>vLLM</strong> on an <strong>NVIDIA L4 GPU</strong>, integrating remote model inference through an SSH-secured tunnel with a FastAPI backend and React frontend.</li>
            <li>Designed an automated <strong>Background Verification (BGV)</strong> agentic workflow covering email classification, OCR extraction, requester authentication, employee matching, rule validation, and audit logging.</li>
            <li>Orchestrated end-to-end dataset preparation by managing <strong>data extraction</strong>, precise <strong>data labelling</strong>, and targeted <strong>data annotation</strong>, followed by strict <strong>data verification</strong> protocols to establish high-fidelity ground truth.</li>
            <li>Engineered and optimized custom computer vision pipelines by executing structured <strong>data training using YOLO</strong>, significantly improving the model's ability to accurately detect and classify complex graphical components.</li>
          </ul>
        </div>
      </section>

      
{/* Projects Section */}
<section id="projects" className="section-container fade-in text-left">
  <div className="projects-header">
    <div>
      <h2 className="section-title m-0">Systems & Applications</h2>
    </div>

    <div className="project-filters">
      <span
        className={`filter-pill ${activeFilter === 'All' ? 'active' : ''}`}
        onClick={() => setActiveFilter('All')}
      >
        All ({projects.length})
      </span>

      <span
        className={`filter-pill ${activeFilter === 'Agents & VLM' ? 'active' : ''}`}
        onClick={() => setActiveFilter('Agents & VLM')}
      >
        Agents & VLM
      </span>

      <span
        className={`filter-pill ${activeFilter === 'ML & Vision' ? 'active' : ''}`}
        onClick={() => setActiveFilter('ML & Vision')}
      >
        ML & Vision
      </span>

      <span
        className={`filter-pill ${activeFilter === 'Software & Systems' ? 'active' : ''}`}
        onClick={() => setActiveFilter('Software & Systems')}
      >
        Software & Systems
      </span>
    </div>
  </div>

  <div className="projects-grid">
    {filteredProjects.map((project) => (
      <div key={project.id} className="project-card">
        <div className="proj-meta">
          <span className="proj-num">
            {project.id} / {project.categoryLabel}
          </span>
          <span className={`proj-highlight ${project.highlightClass}`}>
            {project.highlight}
          </span>
        </div>

        <h3>{project.title}</h3>

        <p className={`proj-sub ${project.highlightClass}`}>
          {project.subtitle}
        </p>

        <p className="proj-desc">{project.description}</p>

        <div className="proj-tags">
          {project.tech.map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>

      

    {/* Skills Section */}
<section id="skills" className="section-container fade-in text-left">
  <h2 className="section-title">Technical Arsenal</h2>

  <div className="skills-layout">
    <div className="skills-column">
      <h3 className="cyan-text">AI & Machine Learning</h3>
      <div className="skills-tags">
        <span>LangGraph</span>
        <span>LangChain</span>
        <span>LLMs / VLMs</span>
        <span>RAG Pipelines</span>
        <span>vLLM</span>
        <span>YOLO</span>
        <span>YOLO OBB</span>
        <span>OpenCV</span>
        <span>Scikit-Learn</span>
        <span>TF-IDF</span>
        <span>Model Training</span>
        <span>Prompt Engineering</span>
      </div>
    </div>

    <div className="skills-column">
      <h3 className="purple-text">Backend & Programming</h3>
      <div className="skills-tags">
        <span>Python</span>
        <span>FastAPI</span>
        <span>REST APIs</span>
        <span>SQL</span>
        <span>Database Design</span>
        <span>Relational Databases</span>
        <span>Data Preprocessing</span>
        <span>Schema Validation</span>
      </div>
    </div>

    <div className="skills-column">
      <h3 className="pink-text">Frontend & Web</h3>
      <div className="skills-tags">
        <span>React.js</span>
        <span>Vite</span>
        <span>JavaScript (ES6+)</span>
        <span>HTML5</span>
        <span>CSS3</span>
        <span>UI / UX Design</span>
      </div>
    </div>

    <div className="skills-column">
      <h3 className="green-text">Tools, Automation & Systems</h3>
      <div className="skills-tags">
        <span>Git / GitHub</span>
        <span>VS Code</span>
        <span>vLLM Deployment</span>
        <span>GPU / SSH</span>
        <span>PaddleOCR</span>
        <span>Tweepy</span>
        <span>Twitter API</span>
        <span>Autodesk CAD</span>
        <span>3D Modelling</span>
        <span>IoT</span>
        <span>Microcontrollers</span>
      </div>
    </div>
  </div>
</section>


      {/* Contact Section */}
      <section id="contact" className="section-container text-center contact-section">
        <h2 className="section-title">Let's Build Something Exceptional</h2>
        <p className="contact-subtext">
          Whether you have questions about agentic deployments, Vision-Language Models, or engineering collaboration opportunities, feel free to reach out.
        </p>
        
        <div className="contact-buttons">
          <a href={`mailto:${EMAIL}`} onClick={handleEmailClick} className="btn-email">Email</a>
          <a href="https://www.linkedin.com/in/ashwin-girish-861259328/" target="_blank" rel="noreferrer" className="btn-social">
            LinkedIn
          </a>
          <a href="https://github.com/ashwing2946" target="_blank" rel="noreferrer" className="btn-social">
            GitHub
          </a>
        </div>
      </section>

    </div>
  );
}

export default App;