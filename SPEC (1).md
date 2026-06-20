# Tool 3 — Resume Builder
### Digital Heroes Trial | Vibe Coding Spec for Antigravity + Claude

---

## What to Build
A free, browser-based resume builder where users fill a form and instantly see a clean, print-ready resume on the right side — no signup, no downloads, no paid tools. One-click PDF via browser print.

**Personal use case to mention in submission:**
> "I built my own resume multiple times using Word and it always broke formatting when I exported to PDF. I wanted a tool where I just fill in my details and get a clean, ATS-friendly PDF instantly."

---

## Prompt to Paste into Antigravity (Claude Sonnet 4.6)

```
Build a single-file HTML/CSS/JS Resume Builder web app. No frameworks, no build step — pure HTML in one index.html that deploys directly on Vercel.

LAYOUT:
- Two-panel layout: LEFT = form inputs, RIGHT = live resume preview
- Preview updates in real time as user types (no submit button needed)
- On mobile: stacked — form on top, preview below
- A "Download PDF" button that triggers window.print() with the preview panel as the print target

FORM SECTIONS (left panel):
1. Personal Info: Full Name, Job Title, Email, Phone, Location, LinkedIn URL, GitHub/Portfolio URL
2. Summary: textarea (professional summary, 2-4 lines)
3. Experience: Add multiple entries — Company, Role, Duration (e.g. "Jan 2024 – Present"), Description (textarea). "Add Experience" button to add more. "Remove" button per entry.
4. Education: Add multiple entries — Institution, Degree, Year, Grade/CGPA. "Add Education" button.
5. Skills: comma-separated input that renders as tags on the resume
6. Projects: Add multiple — Project Name, Tech Stack, Description, Live URL (optional). "Add Project" button.
7. Certifications: Add multiple — Name, Issuer, Year

RESUME PREVIEW (right panel):
- Clean, ATS-friendly single-column layout
- Name large at top, job title below, then contact row (email | phone | location | links)
- Horizontal rule divider between sections
- Section headers: EXPERIENCE, EDUCATION, SKILLS, PROJECTS, CERTIFICATIONS
- Skills rendered as inline tags/pills
- Dates right-aligned in experience and education
- Bullet points for description fields (split by newline)
- Clean typography — no colors in the resume itself, pure black and white for print
- Page width: 794px (A4), with @media print styles so it prints perfectly

DESIGN (page chrome — not the resume itself):
- Dark theme for the page: background #0D1117, sidebar #161B22, accent #2EA44F (GitHub green — dev audience)
- Font: Space Grotesk for UI chrome, Georgia/serif for the resume preview (professional feel)
- Form labels clean and minimal
- Smooth live update — use input/change event listeners on all fields

FEATURES:
- Live preview updates on every keystroke
- "Download PDF" button → window.print() — @media print hides the form panel, shows only the resume
- "Clear All" button to reset the form
- "Load Sample" button that fills in a sample resume (use Phulkeshwar Mahto's details as the sample — B.Tech CSE student, NIAMT Ranchi, web developer)
- Local storage auto-save: save form state to localStorage on every change, restore on page load
- Character counter on Summary textarea (recommended: 300–500 chars)
- "Built for Digital Heroes" button linking to https://digitalheroesco.com — label must be EXACT
- Show name "Phulkeshwar Mahto" and email "phulkeshwarmahto@gmail.com" in the page footer

MANDATORY:
- Button labeled EXACTLY "Built for Digital Heroes" → href="https://digitalheroesco.com"
- Name: Phulkeshwar Mahto visible on page
- Email: phulkeshwarmahto@gmail.com visible on page (mailto: link)
- Works and produces real output — resume preview must populate from the form
- No paid APIs, no external dependencies except Google Fonts

SAMPLE DATA for "Load Sample" button:
- Name: Phulkeshwar Mahto
- Title: Full Stack Developer
- Email: phulkeshwarmahto@gmail.com
- Phone: +91-XXXXXXXXXX
- Location: Ranchi, Jharkhand
- LinkedIn: linkedin.com/in/phulkeshwarmahto
- GitHub: github.com/phulkeshwarmahto
- Summary: B.Tech Computer Engineering student at NIAMT Ranchi with hands-on experience in MERN stack development. Built production-grade apps including a WebRTC calling platform, AI health assistant, and disaster relief coordination system. Open-source contributor (GSSoC 2026) and founder of Garam Softwares.
- Skills: React, Node.js, Express, MongoDB, PostgreSQL, Socket.IO, Redis, Tailwind CSS, JavaScript, C++, Git
- Experience: UptoSkills — Backend Developer Intern — Jan 2025–Present — Analyzed Fastify/PostgreSQL codebase, traced 60+ API endpoints, delivered gap analysis document
- Education: NIAMT Ranchi — B.Tech Computer Engineering — 2024–2028
- Projects: Call.io — WebRTC, Socket.IO, Redis — Anonymous calling platform scaled to 100k users — callrandom.vercel.app
```

---

## Required Output Checklist (verify before deploying)

- [ ] Live preview updates as you type in every field
- [ ] "Add Experience" adds a new entry block; "Remove" deletes it
- [ ] "Add Education", "Add Project", "Add Certification" all work
- [ ] Skills comma-separated input renders as pills/tags in the preview
- [ ] "Load Sample" fills all fields with sample data and preview updates
- [ ] "Clear All" resets everything including preview
- [ ] Auto-save works — refresh the page, data comes back from localStorage
- [ ] "Download PDF" → only the resume preview prints, form panel is hidden
- [ ] Resume looks clean on A4 print (794px width, no dark backgrounds)
- [ ] "Built for Digital Heroes" button exists with exact label → digitalheroesco.com
- [ ] Name "Phulkeshwar Mahto" and email visible in footer
- [ ] Mobile layout: form above, preview below — not broken
- [ ] No console errors on load

---

## GitHub → Vercel Deployment

### Step 1 — GitHub Repo
```bash
git init
git add index.html
git commit -m "feat: resume builder - Digital Heroes trial tool 3"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/resume-builder-tool.git
git push -u origin main
```

### Step 2 — Vercel Deploy
1. vercel.com → **Add New Project** → Import `resume-builder-tool`
2. Framework Preset: **Other**
3. Build Command: **blank**
4. Output Directory: **blank**
5. Click **Deploy** → copy live URL

### Step 3 — Verify Live
- Open live URL → fill a field → preview updates instantly
- Click "Built for Digital Heroes" → goes to digitalheroesco.com
- Click "Download PDF" → clean resume prints, form hidden
- Refresh page → data still there (localStorage working)
- Test on mobile

---

## Submission Line (copy-paste ready)

> **Tool:** Resume Builder
> **Personal use:** My Word resume always broke formatting when exporting to PDF — I needed a tool to fill in details and get a clean ATS-friendly PDF instantly without fighting Word.
> **Live URL:** https://resume-builder-tool.vercel.app
> **GitHub:** https://github.com/phulkeshwarmahto/resume-builder-tool
> **Name:** Phulkeshwar Mahto
> **Email:** phulkeshwarmahto@gmail.com
