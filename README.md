# Boardmind AI 🏛️
### Autonomous Multi-Agent Executive Decision Platform

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black.svg)](https://threejs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg)](https://vitejs.dev/)

**Boardmind AI** is an enterprise-grade multi-agent executive decision-support platform designed for B2B strategic planning and corporate governance. Rather than relying on a single AI prompt, Boardmind simulates a virtual boardroom meeting with specialized C-Suite agents (**CEO, CFO, CTO, CMO, Legal, and Risk**) who debate, cross-examine, and negotiate corporate proposals to reach a weighted consensus.

---

## 🚀 Key Features

* **🏛️ Interactive 3D Boardroom (Three.js & React Three Fiber):**
  * Modern conference room with 6 executive seats and a Human Chairperson seat.
  * Real-time active speaker lighting with spotlight tracking and holographic floor waves.
  * Interactive orbit controls (mouse drag camera orbit, zoom, pan).
* **⚖️ Multi-Round Adversarial Deliberation:**
  * **Round 1 (Initial Stance):** Independent departmental analysis.
  * **Round 2 (Cross-Examination):** Direct rebuttals and counter-proposals across departments.
  * **Round 3 (Compromise & Consensus):** Mutual concessions and unanimous board resolution.
* **✍️ Freeform Custom Proposal Input:**
  * Enter *any* strategic business proposal or question (e.g., *"Should we launch PhonePe in the USA?"* or *"Should we acquire competitor X for $45M?"*).
  * Domain-aware dynamic synthesis generates deep domain-specific arguments across all 6 executives.
* **📂 Multimodal Dossier & Document Ingestion:**
  * Upload PDFs (pitch decks, regulatory dossiers), CSVs (financial forecasts), or images (architecture charts).
  * Direct in-debate citations referencing specific pages and figures.
* **👤 Live Human-in-the-Loop (HITL) Chairman Intervention:**
  * Inject executive directives or budget constraints live during the board meeting.
  * Agents acknowledge directives on the official record and adjust risk boundaries.
* **📊 Quantitative Consensus & Decision Analytics:**
  * **Risk Index ($R$):** Category breakdown across Financial, Technical, Regulatory, and Market risks.
  * **Board Confidence Index ($C$):** Sentiment convergence measurement.
  * **Weighted Voting Score ($S_{vote}$):**
    $$S_{vote} = \frac{\sum_{i=1}^{N} w_i \cdot v_i}{\sum_{i=1}^{N} w_i}$$
  * **Strategic Amendments:** 4 actionable operational modifications to turn objections into unanimous board approval.
* **📄 One-Click Printable Board Resolution Memo:**
  * Official corporate document view with Resolution ID, roll call vote table, legal clauses, and signature blocks.
* **🌓 Dual Theme System:**
  * One-click toggle between **Cyber Executive Dark Mode** and **Corporate Light Mode**.

---

## 🏛️ Executive Agents & Personas

| Role | Name | Department | Primary Focus |
| :--- | :--- | :--- | :--- |
| **CEO** | Alexandra Vance | Executive Strategy & Vision | Enterprise value, long-term moat, top-line growth |
| **CFO** | Marcus Sterling | Finance & Capital Allocation | Cash runway, ROI, burn rate, unit economics |
| **CTO** | Dr. Evelyn Chen | Engineering & R&D | Scalability, tech debt, security, infrastructure CapEx |
| **CMO** | Devon Wright | Brand & Growth Strategy | CAC/LTV, market share, customer sentiment, positioning |
| **CLO** | Eleanor Roosevelt-Shaw | Legal & Regulatory Compliance | GDPR/HIPAA compliance, IP liability, antitrust, contracts |
| **CRO** | Vikram Sethi | Enterprise Risk & Governance | Black swan exposure, downside protection, single points of failure |

---

## 🛠️ Tech Stack

* **Frontend:** React 18, TypeScript, Vite 5
* **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
* **Styling & UI:** Tailwind CSS, Lucide React, Glassmorphism CSS, Canvas Confetti
* **Architecture:** Observer Pattern (`SimulationEngine.ts`), Dynamic Deliberation Synthesis (`proposalGenerator.ts`)

---

## 📦 Getting Started

### Prerequisites
* **Node.js** (v18.0.0 or higher)
* **npm** (v9.0.0 or higher)

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/boardmind-ai.git
   cd boardmind-ai/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:3000` (or `http://localhost:3001`).

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🎓 Academic Capstone Details

* **Project Title:** Boardmind AI: Multi-Agent Executive Decision Platform
* **Academic Review:** B.Tech Final Year Capstone Project
* **Architecture:** Distributed Multi-Agent Deliberation, WebGL 3D Chamber, Multimodal RAG

---

## 📜 License

MIT License. Developed for BTech Final Year Project.
