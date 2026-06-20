# ATS Resume Builder

A free, web-based ATS-friendly resume builder. It allows filling in resume fields via an intuitive form and previews a clean, print-ready single-column resume on the right in real time. Features a quick print command to output the resume as a PDF.

## Features

1.  **Live Real-Time Preview**: Resume updates in real-time on every keystroke.
2.  **Structured Form Sections**:
    *   **Personal Info**: Name, Job Title, Email, Phone, Location, LinkedIn, and GitHub.
    *   **Summary**: With an integrated character counter (recommended 300-500 characters).
    *   **Work Experience**: Dynamic array to add and remove multiple experience blocks (Company, Role, Duration, and Bullet-point descriptions).
    *   **Education**: Institution, Degree, Year, and Grade.
    *   **Skills**: Comma-separated entries that convert into visual tags.
    *   **Projects**: Name, Tech Stack, Link, and bullet-point descriptions.
    *   **Certifications**: Name, Issuer, and Year.
3.  **Local Storage Auto-Save**: Automatically saves form data locally to your browser’s `localStorage` as you type. Refreshing the browser or returning to the page recovers your details instantly.
4.  **A4 Layout & Print Configuration**:
    *   Responsive split layout: Sidebar controls on the left, live resume sheet preview on the right. Stacks into a single vertical column on mobile.
    *   Standard black-and-white, Georgia-serif styled ATS-friendly layout.
    *   Uses print media stylesheet directives (`@media print`) to hide the left form sidebar, header, and footer, outputting a perfect, standard-margined A4 document.
5.  **Actions**:
    *   **Print / Download PDF**: Opens the native print dialog to download/save the resume.
    *   **Load Sample**: Pre-populates the form with mock details (Phulkeshwar Mahto's profile) to test the builder instantly.
    *   **Clear All**: Resets the entire form and deletes local storage entries.

---

## Technical Details

*   **Framework**: [Vite](https://vite.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: GitHub Dark page chrome variables (`#0D1117`, `#161B22`, `#2EA44F`) and Georgia serif font for the resume document.
*   **Fonts**: `Space Grotesk` (chrome UI) and `Inter` (UI fields) loaded via Google Fonts.

---

## Local Setup

### Prerequisites
*   Node.js (v18+)
*   npm or yarn

### Installation
1. Navigate to the repository folder:
   ```bash
   cd ResumeBuilder
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run local dev server:
   ```bash
   npm run dev
   ```
4. Compile for production:
   ```bash
   npm run build
   ```

---

## Deployment

Since this is a client-side static web application, it can be hosted directly on Vercel:
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** → **Project**.
3. Import your GitHub repository `ResumeBuilder`.
4. Click **Deploy**.

---

## Advanced Features Implemented

*   **ATS Compatibility Score Checker**: Checks formatting, length, keyword presence, and experience bullets to output an ATS score from 0-100 with recommendations.
*   **Multiple Profiles Selector**: Save, update, and switch between multiple named resume variants (e.g., "Frontend Intern", "Backend Dev") stored in local storage.
*   **Custom Layout Themes & Spacing**: Instant font theme toggling (Serif, Sans, Mono) and margins adjustments (Compact, Normal, Spacious) tailored for print layouts.

## Submission Details
*   **Developer**: Phulkeshwar Mahto
*   **Email**: [phulkeshwar.e@gmail.com](mailto:phulkeshwar.e@gmail.com)
*   **Organization**: Built for Digital Heroes ([https://digitalheroesco.com](https://digitalheroesco.com))
