import { useState, useEffect } from 'react';

// Form Data Interfaces
interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  year: string;
  grade: string;
}

interface ProjectEntry {
  id: string;
  name: string;
  tech: string;
  description: string;
  link: string;
}

interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

interface ResumeState {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  skills: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
}

const DEFAULT_STATE: ResumeState = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  github: '',
  summary: '',
  skills: '',
  experience: [],
  education: [],
  projects: [],
  certifications: [],
};

const SAMPLE_DATA: ResumeState = {
  fullName: 'Phulkeshwar Mahto',
  jobTitle: 'Full Stack Engineer',
  email: 'phulkeshwarmahto@gmail.com',
  phone: '+91-9988776655',
  location: 'Ranchi, Jharkhand',
  linkedin: 'linkedin.com/in/phulkeshwarmahto',
  github: 'github.com/phulkeshwarmahto',
  summary: 'B.Tech Computer Engineering student at NIAMT Ranchi with hands-on experience in MERN stack development. Built production-grade apps including a WebRTC calling platform, AI health assistant, and disaster relief coordination system. Open-source contributor and founder of Garam Softwares.',
  skills: 'React, Node.js, Express, MongoDB, PostgreSQL, Socket.IO, Redis, Tailwind CSS, JavaScript, C++, Git',
  experience: [
    {
      id: 'sample-exp-1',
      company: 'UptoSkills',
      role: 'Backend Developer Intern',
      duration: 'Jan 2025–Present',
      description: 'Analyzed Fastify/PostgreSQL codebase.\nTraced 60+ API endpoints.\nDelivered gap analysis document.',
    },
  ],
  education: [
    {
      id: 'sample-edu-1',
      institution: 'NIAMT Ranchi',
      degree: 'B.Tech Computer Engineering',
      year: '2024–2028',
      grade: '8.7 CGPA',
    },
  ],
  projects: [
    {
      id: 'sample-proj-1',
      name: 'Call.io',
      tech: 'WebRTC, Socket.IO, Redis',
      description: 'Anonymous calling platform scaled to 100k users.\nIntegrated WebRTC peer connections.\nManaged rooms with Socket.IO.',
      link: 'callrandom.vercel.app',
    },
  ],
  certifications: [
    {
      id: 'sample-cert-1',
      name: 'Full Stack Developer Certificate',
      issuer: 'Garam Softwares',
      year: '2025',
    },
  ],
};

export default function App() {
  // 1. MULTIPLE PROFILE STORAGE SYSTEM
  const [profiles, setProfiles] = useState<{ [name: string]: ResumeState }>({
    'Default': DEFAULT_STATE
  });
  const [currentProfileName, setCurrentProfileName] = useState<string>('Default');
  const [newProfileName, setNewProfileName] = useState<string>('');

  // Local state copy representing the active form inputs
  const [state, setState] = useState<ResumeState>(DEFAULT_STATE);

  // FAQ Active Accordion
  const [faqActive, setFaqActive] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setFaqActive(faqActive === index ? null : index);
  };

  // Dynamic FAQ JSON-LD Injection for deep SEO
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How can I make my resume ATS-friendly?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To make your resume ATS (Applicant Tracking System) friendly, use a clean single-column layout, standard headings, avoid tables or graphic elements, write list-based bullet points, and include relevant technical keywords matching the job description."
          }
        },
        {
          "@type": "Question",
          "name": "What is the recommended resume length?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For students and professionals with under 5 years of experience, a single-page (1 page) resume is highly recommended. Ensure spacing and margins are adjusted to fit your profile neatly without crowding."
          }
        },
        {
          "@type": "Question",
          "name": "Should I create multiple resume variants?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Customizing your resume for different targeted roles (e.g. Frontend vs Backend) increases your callback rates. Use the built-in profile variants manager to store and switch between different targeted profiles."
          }
        },
        {
          "@type": "Question",
          "name": "How does the ATS score checker work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our built-in ATS checker analyzes the structured components of your resume (contact information, job summary length, technical skill tag counts, bullet points formatting) and evaluates conformity to industry best practices."
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-jsonld';
    script.innerHTML = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('faq-jsonld');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // 2. STYLING VARIANTS STATE
  const [fontTheme, setFontTheme] = useState<'serif' | 'sans' | 'mono'>('serif');
  const [spacing, setSpacing] = useState<'compact' | 'normal' | 'spacious'>('normal');

  // Load profiles from LocalStorage on mount
  useEffect(() => {
    const savedProfiles = localStorage.getItem('resume_profiles_list');
    const savedActiveName = localStorage.getItem('resume_active_profile_name');
    
    if (savedProfiles) {
      try {
        const parsed = JSON.parse(savedProfiles);
        setProfiles(parsed);
        const activeName = savedActiveName || Object.keys(parsed)[0] || 'Default';
        setCurrentProfileName(activeName);
        if (parsed[activeName]) {
          setState(parsed[activeName]);
        }
      } catch (e) {
        // Fallback
        setProfiles({ 'Default': DEFAULT_STATE });
        setState(DEFAULT_STATE);
      }
    } else {
      // Re-initialize with sample data to start beautifully
      const initialProfiles = { 'Default': SAMPLE_DATA };
      setProfiles(initialProfiles);
      setState(SAMPLE_DATA);
      localStorage.setItem('resume_profiles_list', JSON.stringify(initialProfiles));
      localStorage.setItem('resume_active_profile_name', 'Default');
    }
  }, []);

  // Update profile in list when local state changes
  useEffect(() => {
    if (currentProfileName) {
      setProfiles(prev => {
        const updated = { ...prev, [currentProfileName]: state };
        localStorage.setItem('resume_profiles_list', JSON.stringify(updated));
        return updated;
      });
    }
  }, [state, currentProfileName]);

  // Create new profile
  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newProfileName.trim();
    if (!name) return;
    if (profiles[name]) {
      alert('Profile name already exists');
      return;
    }
    const updated = { ...profiles, [name]: DEFAULT_STATE };
    setProfiles(updated);
    setCurrentProfileName(name);
    setState(DEFAULT_STATE);
    setNewProfileName('');
    localStorage.setItem('resume_profiles_list', JSON.stringify(updated));
    localStorage.setItem('resume_active_profile_name', name);
  };

  // Delete profile
  const handleDeleteProfile = () => {
    if (Object.keys(profiles).length <= 1) {
      alert('Cannot delete the last remaining profile');
      return;
    }
    const remainingNames = Object.keys(profiles).filter(name => name !== currentProfileName);
    const updated = { ...profiles };
    delete updated[currentProfileName];
    
    setProfiles(updated);
    const nextProfile = remainingNames[0];
    setCurrentProfileName(nextProfile);
    setState(updated[nextProfile]);
    localStorage.setItem('resume_profiles_list', JSON.stringify(updated));
    localStorage.setItem('resume_active_profile_name', nextProfile);
  };

  // Switch profiles
  const handleProfileSwitch = (name: string) => {
    setCurrentProfileName(name);
    setState(profiles[name] || DEFAULT_STATE);
    localStorage.setItem('resume_active_profile_name', name);
  };

  // General field handlers
  const handleFieldChange = (key: keyof ResumeState, value: string) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  // Experience handlers
  const handleAddExperience = () => {
    const newEntry: ExperienceEntry = {
      id: Math.random().toString(36).substring(2, 9),
      company: '',
      role: '',
      duration: '',
      description: '',
    };
    setState((prev) => ({ ...prev, experience: [...prev.experience, newEntry] }));
  };

  const handleRemoveExperience = (id: string) => {
    setState((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }));
  };

  const handleExperienceChange = (id: string, field: keyof ExperienceEntry, val: string) => {
    setState((prev) => ({
      ...prev,
      experience: prev.experience.map((item) =>
        item.id === id ? { ...item, [field]: val } : item
      ),
    }));
  };

  // Education handlers
  const handleAddEducation = () => {
    const newEntry: EducationEntry = {
      id: Math.random().toString(36).substring(2, 9),
      institution: '',
      degree: '',
      year: '',
      grade: '',
    };
    setState((prev) => ({ ...prev, education: [...prev.education, newEntry] }));
  };

  const handleRemoveEducation = (id: string) => {
    setState((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  const handleEducationChange = (id: string, field: keyof EducationEntry, val: string) => {
    setState((prev) => ({
      ...prev,
      education: prev.education.map((item) =>
        item.id === id ? { ...item, [field]: val } : item
      ),
    }));
  };

  // Project handlers
  const handleAddProject = () => {
    const newEntry: ProjectEntry = {
      id: Math.random().toString(36).substring(2, 9),
      name: '',
      tech: '',
      description: '',
      link: '',
    };
    setState((prev) => ({ ...prev, projects: [...prev.projects, newEntry] }));
  };

  const handleRemoveProject = (id: string) => {
    setState((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }));
  };

  const handleProjectChange = (id: string, field: keyof ProjectEntry, val: string) => {
    setState((prev) => ({
      ...prev,
      projects: prev.projects.map((item) =>
        item.id === id ? { ...item, [field]: val } : item
      ),
    }));
  };

  // Certification handlers
  const handleAddCertification = () => {
    const newEntry: CertificationEntry = {
      id: Math.random().toString(36).substring(2, 9),
      name: '',
      issuer: '',
      year: '',
    };
    setState((prev) => ({ ...prev, certifications: [...prev.certifications, newEntry] }));
  };

  const handleRemoveCertification = (id: string) => {
    setState((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((item) => item.id !== id),
    }));
  };

  const handleCertificationChange = (id: string, field: keyof CertificationEntry, val: string) => {
    setState((prev) => ({
      ...prev,
      certifications: prev.certifications.map((item) =>
        item.id === id ? { ...item, [field]: val } : item
      ),
    }));
  };

  // Load sample data
  const handleLoadSample = () => {
    setState(SAMPLE_DATA);
  };

  // Clear Form State
  const handleClearAll = () => {
    setState(DEFAULT_STATE);
  };

  // Utility to split descriptions into bullet points based on newline
  const renderBullets = (text: string) => {
    if (!text) return null;
    const items = text.split('\n').filter((line) => line.trim() !== '');
    if (items.length === 0) return null;
    return (
      <ul className="res-bullets">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    );
  };

  // Parse skill string into tags
  const skillTags = state.skills
    ? state.skills.split(',').map((s) => s.trim()).filter((s) => s !== '')
    : [];

  // 3. ATS SCORING LOGIC
  const checkATS = () => {
    let score = 0;
    const itemsList: Array<{ text: string; passed: boolean; weight: number }> = [];

    const hasName = !!state.fullName.trim();
    itemsList.push({ text: 'Full Name provided', passed: hasName, weight: 10 });

    const hasTitle = !!state.jobTitle.trim();
    itemsList.push({ text: 'Job Title targeted', passed: hasTitle, weight: 10 });

    const hasEmail = !!state.email.trim();
    itemsList.push({ text: 'Email Address provided', passed: hasEmail, weight: 10 });

    const hasPhone = !!state.phone.trim();
    itemsList.push({ text: 'Phone Number provided', passed: hasPhone, weight: 10 });

    const hasLocation = !!state.location.trim();
    itemsList.push({ text: 'Location (City, State) included', passed: hasLocation, weight: 10 });

    const sumLen = state.summary.trim().length;
    const sumOk = sumLen >= 200 && sumLen <= 600;
    itemsList.push({ text: 'Summary length (200-600 characters)', passed: sumOk, weight: 15 });

    const skillCount = state.skills.split(',').map(s => s.trim()).filter(Boolean).length;
    const skillsOk = skillCount >= 5;
    itemsList.push({ text: 'Includes 5+ core skills keywords', passed: skillsOk, weight: 15 });

    const expCount = state.experience.length;
    const expOk = expCount >= 1;
    itemsList.push({ text: 'Minimum 1 professional work experience', passed: expOk, weight: 10 });

    let bulletsOk = false;
    if (expCount > 0) {
      bulletsOk = state.experience.every(exp => {
        const bulletCount = exp.description.split('\n').filter(line => line.trim().length > 5).length;
        return bulletCount >= 2;
      });
    }
    itemsList.push({ text: 'Detailed bullet points in job description', passed: bulletsOk, weight: 10 });

    let totalWeight = 0;
    let earnedWeight = 0;
    itemsList.forEach(it => {
      totalWeight += it.weight;
      if (it.passed) earnedWeight += it.weight;
    });

    score = Math.round((earnedWeight / totalWeight) * 100);
    return { score, items: itemsList };
  };

  const { score: atsScore, items: atsChecks } = checkATS();

  return (
    <>
      {/* HEADER */}
      <header>
        <div className="logo">
          <span className="logo-icon">📝</span>
          <span>ATS Resume Builder</span>
          <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: 'var(--accent)', color: 'var(--bg)', borderRadius: '4px', marginLeft: '6px', fontWeight: 'bold' }}>PRO</span>
        </div>
        <div className="author-chip">
          By <strong>Phulkeshwar Mahto</strong> &nbsp;·&nbsp;
          <a href="mailto:phulkeshwarmahto@gmail.com">phulkeshwarmahto@gmail.com</a>
        </div>
      </header>

      {/* DUAL COLUMN MAIN LAYOUT */}
      <div className="main-container">
        
        {/* LEFT COLUMN: SIDEBAR FORM PANEL */}
        <aside className="sidebar-panel">
          
          {/* Multiple Profile Switcher Widget */}
          <div className="profile-switcher">
            <h3 className="section-title" style={{ border: 'none', padding: 0, marginBottom: '8px' }}>Resume Profiles</h3>
            <div className="profile-select-row">
              <select 
                value={currentProfileName} 
                onChange={(e) => handleProfileSwitch(e.target.value)}
              >
                {Object.keys(profiles).map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
              <button type="button" className="btn-sec" style={{ padding: '6px 10px', fontSize: '0.78rem', color: '#EF4444', borderColor: '#EF4444' }} onClick={handleDeleteProfile}>
                Delete
              </button>
            </div>
            <form onSubmit={handleCreateProfile} className="profile-actions">
              <input
                type="text"
                placeholder="New Variant Name..."
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
              />
              <button type="submit" className="btn-sec" style={{ padding: '6px 10px', fontSize: '0.78rem' }}>
                + Create
              </button>
            </form>
          </div>

          {/* ATS Score Check Widget */}
          <div className="ats-widget">
            <div className="ats-score-row">
              <span className="ats-score-title">ATS Check Score</span>
              <span className="ats-score-badge">{atsScore}/100</span>
            </div>
            <div className="ats-bar-container">
              <div 
                className="ats-bar" 
                style={{ 
                  width: `${atsScore}%`, 
                  background: atsScore > 80 ? 'var(--accent)' : atsScore >= 50 ? 'var(--text-bright)' : '#EF4444' 
                }}
              ></div>
            </div>
            <div className="ats-suggestions">
              {atsChecks.map((check, idx) => (
                <div 
                  key={idx} 
                  className={`ats-item ${!check.passed ? 'critical' : ''}`}
                >
                  <span>{check.passed ? '✓' : '✗'}</span>
                  <span>{check.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Theme & Margins Row */}
          <div className="section-card" style={{ padding: '16px' }}>
            <h3 className="section-title" style={{ border: 'none', padding: 0, marginBottom: '10px' }}>Layout Config</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="field" style={{ marginBottom: 0 }}>
                <label htmlFor="themeSelect">Typography</label>
                <select
                  id="themeSelect"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-bright)', borderRadius: '6px', padding: '6px', fontSize: '0.8rem', width: '100%' }}
                  value={fontTheme}
                  onChange={(e) => setFontTheme(e.target.value as any)}
                >
                  <option value="serif">Georgia Serif</option>
                  <option value="sans">Inter Sans</option>
                  <option value="mono">Courier Mono</option>
                </select>
              </div>

              <div className="field" style={{ marginBottom: 0 }}>
                <label htmlFor="spacingSelect">Spacing Layout</label>
                <select
                  id="spacingSelect"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-bright)', borderRadius: '6px', padding: '6px', fontSize: '0.8rem', width: '100%' }}
                  value={spacing}
                  onChange={(e) => setSpacing(e.target.value as any)}
                >
                  <option value="compact">Compact (No A4 Box)</option>
                  <option value="normal">Standard (Normal A4)</option>
                  <option value="spacious">Spacious (Large A4)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-header-row" style={{ marginTop: '24px' }}>
            <h2 className="form-title">Resume Content</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" className="btn-sec" style={{ padding: '6px 10px', fontSize: '0.72rem' }} onClick={handleLoadSample}>
                Sample
              </button>
              <button type="button" className="btn-sec" style={{ padding: '6px 10px', fontSize: '0.72rem', color: '#F85149' }} onClick={handleClearAll}>
                Reset
              </button>
            </div>
          </div>

          <div className="actions-row">
            <button type="button" className="btn-primary" onClick={() => window.print()}>
              🖨 Download Resume PDF
            </button>
          </div>

          {/* Section: Personal Details */}
          <div className="section-card">
            <h3 className="section-title">Personal Info</h3>
            <div className="field">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={state.fullName}
                onChange={(e) => handleFieldChange('fullName', e.target.value)}
                placeholder="e.g. John Doe"
              />
            </div>
            <div className="field">
              <label htmlFor="jobTitle">Job Title</label>
              <input
                id="jobTitle"
                type="text"
                value={state.jobTitle}
                onChange={(e) => handleFieldChange('jobTitle', e.target.value)}
                placeholder="e.g. Software Engineer"
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={state.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                placeholder="e.g. john@example.com"
              />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="text"
                value={state.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                placeholder="e.g. +91 9988776655"
              />
            </div>
            <div className="field">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                value={state.location}
                onChange={(e) => handleFieldChange('location', e.target.value)}
                placeholder="e.g. Ranchi, Jharkhand"
              />
            </div>
            <div className="field">
              <label htmlFor="linkedin">LinkedIn URL</label>
              <input
                id="linkedin"
                type="text"
                value={state.linkedin}
                onChange={(e) => handleFieldChange('linkedin', e.target.value)}
                placeholder="linkedin.com/in/username"
              />
            </div>
            <div className="field">
              <label htmlFor="github">GitHub / Portfolio URL</label>
              <input
                id="github"
                type="text"
                value={state.github}
                onChange={(e) => handleFieldChange('github', e.target.value)}
                placeholder="github.com/username"
              />
            </div>
          </div>

          {/* Section: Professional Summary */}
          <div className="section-card">
            <h3 className="section-title">Summary</h3>
            <div className="field">
              <label htmlFor="summary">Professional Summary</label>
              <textarea
                id="summary"
                value={state.summary}
                onChange={(e) => handleFieldChange('summary', e.target.value)}
                placeholder="Brief summary of your professional background and skills..."
                maxLength={800}
              />
              <div className="char-counter">
                {state.summary.length} / 800 chars (Rec: 300–500)
              </div>
            </div>
          </div>

          {/* Section: Skills */}
          <div className="section-card">
            <h3 className="section-title">Skills</h3>
            <div className="field">
              <label htmlFor="skills">Technical Skills (comma-separated)</label>
              <input
                id="skills"
                type="text"
                value={state.skills}
                onChange={(e) => handleFieldChange('skills', e.target.value)}
                placeholder="React, Node.js, Express, MongoDB..."
              />
            </div>
          </div>

          {/* Section: Professional Experience */}
          <div className="section-card">
            <h3 className="section-title">Work Experience</h3>
            {state.experience.map((exp) => (
              <div key={exp.id} className="entry-block">
                <div className="field">
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => handleExperienceChange(exp.id, 'role', e.target.value)}
                    placeholder="Role / Title"
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    value={exp.duration}
                    onChange={(e) => handleExperienceChange(exp.id, 'duration', e.target.value)}
                    placeholder="Duration (e.g. Jan 2024 – Present)"
                  />
                </div>
                <div className="field">
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                    placeholder="Description (Press Enter for new bullet point)"
                  />
                </div>
                <button type="button" className="remove-btn" onClick={() => handleRemoveExperience(exp.id)}>
                  ✕ Remove Experience
                </button>
              </div>
            ))}
            <button type="button" className="add-btn" onClick={handleAddExperience}>
              ➕ Add Experience
            </button>
          </div>

          {/* Section: Education */}
          <div className="section-card">
            <h3 className="section-title">Education</h3>
            {state.education.map((edu) => (
              <div key={edu.id} className="entry-block">
                <div className="field">
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)}
                    placeholder="Institution / School"
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                    placeholder="Degree / Course"
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => handleEducationChange(edu.id, 'year', e.target.value)}
                    placeholder="Year / Duration (e.g. 2020 – 2024)"
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    value={edu.grade}
                    onChange={(e) => handleEducationChange(edu.id, 'grade', e.target.value)}
                    placeholder="Grade / CGPA"
                  />
                </div>
                <button type="button" className="remove-btn" onClick={() => handleRemoveEducation(edu.id)}>
                  ✕ Remove Education
                </button>
              </div>
            ))}
            <button type="button" className="add-btn" onClick={handleAddEducation}>
              ➕ Add Education
            </button>
          </div>

          {/* Section: Projects */}
          <div className="section-card">
            <h3 className="section-title">Projects</h3>
            {state.projects.map((proj) => (
              <div key={proj.id} className="entry-block">
                <div className="field">
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => handleProjectChange(proj.id, 'name', e.target.value)}
                    placeholder="Project Name"
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    value={proj.tech}
                    onChange={(e) => handleProjectChange(proj.id, 'tech', e.target.value)}
                    placeholder="Tech Stack (e.g. React, WebRTC)"
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    value={proj.link}
                    onChange={(e) => handleProjectChange(proj.id, 'link', e.target.value)}
                    placeholder="Live Link (optional)"
                  />
                </div>
                <div className="field">
                  <textarea
                    value={proj.description}
                    onChange={(e) => handleProjectChange(proj.id, 'description', e.target.value)}
                    placeholder="Project Details (Press Enter for new bullet point)"
                  />
                </div>
                <button type="button" className="remove-btn" onClick={() => handleRemoveProject(proj.id)}>
                  ✕ Remove Project
                </button>
              </div>
            ))}
            <button type="button" className="add-btn" onClick={handleAddProject}>
              ➕ Add Project
            </button>
          </div>

          {/* Section: Certifications */}
          <div className="section-card">
            <h3 className="section-title">Certifications</h3>
            {state.certifications.map((cert) => (
              <div key={cert.id} className="entry-block">
                <div className="field">
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => handleCertificationChange(cert.id, 'name', e.target.value)}
                    placeholder="Certification Name"
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => handleCertificationChange(cert.id, 'issuer', e.target.value)}
                    placeholder="Issuing Authority"
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    value={cert.year}
                    onChange={(e) => handleCertificationChange(cert.id, 'year', e.target.value)}
                    placeholder="Year"
                  />
                </div>
                <button type="button" className="remove-btn" onClick={() => handleRemoveCertification(cert.id)}>
                  ✕ Remove Certification
                </button>
              </div>
            ))}
            <button type="button" className="add-btn" onClick={handleAddCertification}>
              ➕ Add Certification
            </button>
          </div>
        </aside>

        {/* RIGHT COLUMN: LIVE RESUME PREVIEW PANEL */}
        <section className="preview-panel">
          <div className="resume-preview-wrapper">
            <div className={`resume-paper theme-${fontTheme} spacing-${spacing}`} id="resume-print-area">
              
              {/* Resume Header */}
              <div className="res-header">
                <h1 className="res-name">{state.fullName || 'Phulkeshwar Mahto'}</h1>
                <div className="res-title">{state.jobTitle || 'Full Stack Developer'}</div>
                <div className="res-contact">
                  {state.email && (
                    <a href={`mailto:${state.email}`}>{state.email}</a>
                  )}
                  {state.phone && (
                    <>
                      {state.email && <span className="res-divider">|</span>}
                      <span>{state.phone}</span>
                    </>
                  )}
                  {state.location && (
                    <>
                      {(state.email || state.phone) && <span className="res-divider">|</span>}
                      <span>{state.location}</span>
                    </>
                  )}
                  {state.linkedin && (
                    <>
                      {(state.email || state.phone || state.location) && <span className="res-divider">|</span>}
                      <a href={`https://${state.linkedin}`} target="_blank" rel="noopener noreferrer">
                        {state.linkedin.replace(/^https?:\/\//, '')}
                      </a>
                    </>
                  )}
                  {state.github && (
                    <>
                      {(state.email || state.phone || state.location || state.linkedin) && <span className="res-divider">|</span>}
                      <a href={`https://${state.github}`} target="_blank" rel="noopener noreferrer">
                        {state.github.replace(/^https?:\/\//, '')}
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Resume Summary */}
              {state.summary && (
                <div className="res-section">
                  <h4 className="res-section-title">Summary</h4>
                  <p className="res-summary">{state.summary}</p>
                </div>
              )}

              {/* Resume Work Experience */}
              {state.experience.length > 0 && (
                <div className="res-section">
                  <h4 className="res-section-title">Experience</h4>
                  {state.experience.map((exp) => (
                    <div key={exp.id} className="res-item">
                      <div className="res-item-row">
                        <span>{exp.company}</span>
                        <span>{exp.duration}</span>
                      </div>
                      <div className="res-item-sub">
                        <span>{exp.role}</span>
                      </div>
                      {renderBullets(exp.description)}
                    </div>
                  ))}
                </div>
              )}

              {/* Resume Education */}
              {state.education.length > 0 && (
                <div className="res-section">
                  <h4 className="res-section-title">Education</h4>
                  {state.education.map((edu) => (
                    <div key={edu.id} className="res-item">
                      <div className="res-item-row">
                        <span>{edu.institution}</span>
                        <span>{edu.year}</span>
                      </div>
                      <div className="res-item-sub">
                        <span>{edu.degree}</span>
                        <span>{edu.grade && `Grade: ${edu.grade}`}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Resume Projects */}
              {state.projects.length > 0 && (
                <div className="res-section">
                  <h4 className="res-section-title">Projects</h4>
                  {state.projects.map((proj) => (
                    <div key={proj.id} className="res-item">
                      <div className="res-item-row">
                        <span>{proj.name}</span>
                        {proj.link && (
                          <a href={`https://${proj.link}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', fontWeight: 'normal', fontStyle: 'italic' }}>
                            {proj.link}
                          </a>
                        )}
                      </div>
                      {proj.tech && (
                        <div className="res-item-stack">
                          <strong>Tech Stack:</strong> {proj.tech}
                        </div>
                      )}
                      {renderBullets(proj.description)}
                    </div>
                  ))}
                </div>
              )}

              {/* Resume Skills */}
              {skillTags.length > 0 && (
                <div className="res-section">
                  <h4 className="res-section-title">Skills</h4>
                  <div className="res-skills-list">
                    {skillTags.map((tag, idx) => (
                      <span key={idx} className="res-skill-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Resume Certifications */}
              {state.certifications.length > 0 && (
                <div className="res-section" style={{ marginBottom: 0 }}>
                  <h4 className="res-section-title">Certifications</h4>
                  {state.certifications.map((cert) => (
                    <div key={cert.id} className="res-item" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                      <div>
                        <strong>{cert.name}</strong> &nbsp;·&nbsp; <span style={{ color: '#57606A' }}>{cert.issuer}</span>
                      </div>
                      <span style={{ fontStyle: 'italic', color: '#57606A' }}>{cert.year}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </section>
      </div>

      {/* FAQ SECTION */}
      <div className="faq-section-container">
        <div className="card faq-card">
          <div className="card-title">❓ Frequently Asked Questions (FAQ)</div>
          <div className="faq-list">
            {[
              {
                q: "How can I make my resume ATS-friendly?",
                a: "To make your resume ATS (Applicant Tracking System) friendly, use a clean single-column layout, standard headings, avoid tables or graphic elements, write list-based bullet points, and include relevant technical keywords matching the job description."
              },
              {
                q: "What is the recommended resume length?",
                a: "For students and professionals with under 5 years of experience, a single-page (1 page) resume is highly recommended. Ensure spacing and margins are adjusted to fit your profile neatly without crowding."
              },
              {
                q: "Should I create multiple resume variants?",
                a: "Yes. Customizing your resume for different targeted roles (e.g. Frontend vs Backend) increases your callback rates. Use the built-in profile variants manager to store and switch between different targeted profiles."
              },
              {
                q: "How does the ATS score checker work?",
                a: "Our built-in ATS checker analyzes the structured components of your resume (contact information, job summary length, technical skill tag counts, bullet points formatting) and evaluates conformity to industry best practices."
              }
            ].map((item, index) => (
              <div key={index} className={`faq-item ${faqActive === index ? 'active' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={faqActive === index}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon">{faqActive === index ? '−' : '+'}</span>
                </button>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <p className="footer-author">
          Built by <strong>Phulkeshwar Mahto</strong> &nbsp;·&nbsp;
          <a href="mailto:phulkeshwarmahto@gmail.com">phulkeshwarmahto@gmail.com</a>
          &nbsp;·&nbsp; B.Tech CSE · NIAMT Ranchi
        </p>
        <a className="dh-btn" href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          Built for Digital Heroes
        </a>
      </footer>
    </>
  );
}
