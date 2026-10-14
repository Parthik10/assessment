# Xntrova Technologies — Homepage Redesign

A high-performance, conversion-focused redesign of the homepage for **Xntrova Technologies** (Digital Marketing & Technology Agency based in Dwarka, New Delhi). 

Architected with **React + Vite**, modern plain CSS with CSS variables, zero external UI or animation libraries, and strict adherence to **WCAG AA accessibility standards**.

---

## 🚀 Live Demo & Repository Overview

- **Live URL**: Redesign for [https://www.xntrova.com/](https://www.xntrova.com/)
- **Target Audience**: B2B founders, enterprise marketing leads, and high-growth brands in Delhi NCR and worldwide.
- **Agency Location**: A107, 2nd Floor, Sector 8, Dwarka, New Delhi - 110077
- **Primary Direct Lines**: Phone: `+91 868-382-8646` | Email: `info@xntrova.com` | WhatsApp: `https://wa.me/918683828646`

---

## 🛠️ Tech Stack & Constraints

| Layer | Choice | Rationale |
|---|---|---|
| **Framework** | React 19 + Vite | Instant HMR, minimal bundling footprint, modern JSX architecture |
| **Styling** | Plain CSS (`variables.css` + `global.css`) | Zero Tailwind, zero styled-components. Standard CSS variables with BEM-style modular scoping |
| **Animation Engine** | Custom `useReveal` & `useCountUp` | Browser-native `IntersectionObserver` + `requestAnimationFrame`. No Framer Motion or GSAP |
| **Icons** | Lucide React + Inline SVGs | Lightweight SVG icons with inline fallback for social platforms |
| **Typography** | Google Fonts (`display=swap`) | *Plus Jakarta Sans* (geometric sans for headings) + *Inter* (clean sans for body copy) |
| **Accessibility** | WCAG AA Compliant | 4.5:1+ contrast, visible focus rings, ARIA roles, skip link, and native `prefers-reduced-motion` |

---

## 📦 Project Structure

```
assessment/
├── index.html                       # SEO title, meta, Open Graph, Organization JSON-LD, Fonts
├── vite.config.js                   # Vite configuration with React plugin
├── package.json                     # Clean dependency footprint
├── README.md                        # Documentation & deployment guide
├── TECHNICAL_QA.md                  # 10 comprehensive interview Q&As
└── src/
    ├── data/                        # Decoupled content modules (.map() driven)
    │   ├── companyData.js           # Real contact info, socials & Growth Journey stages
    │   ├── heroData.js              # Trust statistics & mock dashboard metrics
    │   ├── services.js              # 6 core agency capabilities
    │   ├── aboutData.js             # 4 principles & verified existing site stats
    │   ├── benefits.js              # Why Choose Us blocks & grayscale tool pills
    │   ├── processData.js           # 4-stage methodology with detailed deliverables
    │   ├── projects.js              # Industry-mapped sample case study placeholders
    │   ├── testimonials.js          # Real client quotes & ratings
    │   ├── clients.js               # Typographic brand marquee names
    │   ├── faqData.js               # Structured FAQ queries & answers
    │   └── footerData.js            # Footer service, company & legal links
    ├── hooks/
    │   ├── useReveal.js             # IntersectionObserver hook with reduced-motion fallback
    │   └── useCountUp.js            # requestAnimationFrame numeric counter hook
    ├── styles/
    │   ├── variables.css            # Brand color tokens, spacing scale, shadows, typography
    │   └── global.css               # Modern CSS reset, scroll-margin, focus-visible states
    ├── components/
    │   ├── ui/                      # Reusable atomic UI components
    │   │   ├── Container.jsx        # Fluid layout boundary with responsive gutters
    │   │   ├── Button.jsx           # Accessible button/anchor with variants & icons
    │   │   ├── SectionHeading.jsx   # Eyebrow ('01 — Attract'), title & lead hierarchy
    │   │   ├── Card.jsx             # Rounded card with elevation shadows
    │   │   ├── Badge.jsx            # Metric chips, stage pills & sample indicators
    │   │   └── index.js             # Barrel export
    │   ├── layout/                  # Page scaffolding & persistent fixtures
    │   │   ├── Header.jsx           # Glassmorphic navbar, active section highlight, drawer
    │   │   ├── GrowthSpine.jsx      # Desktop scroll-fill progress funnel
    │   │   └── Footer.jsx           # 4-column footer, WhatsApp floater, back-to-top
    │   └── sections/                # Modular landing page sections
    │       ├── Hero.jsx             # Single H1, trust proofs, SVG dashboard chart
    │       ├── ClientLogos.jsx      # Calm typographic marquee
    │       ├── About.jsx            # Ethos, 2x2 principles, animated counters
    │       ├── WhyChooseUs.jsx      # Minimalist icon-led value blocks & tool pills
    │       ├── Services.jsx         # 3/2/1 capability cards with hover elevation
    │       ├── Process.jsx          # Interactive horizontal/vertical timeline
    │       ├── Portfolio.jsx        # Category filter tabs & SVG cover cards
    │       ├── Testimonials.jsx     # Scratch-built accessible touch carousel
    │       ├── CTA.jsx              # Dark accent conversion banner & WhatsApp shortcut
    │       ├── FAQ.jsx              # Single-open accordion with CSS grid 0fr->1fr
    │       └── ContactForm.jsx      # Controlled validation form & office channels
    ├── App.jsx                      # Semantic page landmark composer
    ├── App.css                      # App layout boundaries
    └── main.jsx                     # Root React mounting
```

---

## ⚡ Quick Setup & Local Development

1. **Clone or navigate to the directory**:
   ```bash
   cd assessment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local Vite development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment Instructions

### Deploy to Vercel
1. Install the Vercel CLI (`npm i -g vercel`) or connect the Git repository on [vercel.com](https://vercel.com).
2. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Click **Deploy**.

### Deploy to Netlify
1. Connect repository on [netlify.com](https://netlify.com).
2. Set build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. Create a `_redirects` file in `public/` containing `/* /index.html 200` for single-page routing fallback.
4. Click **Deploy Site**.

---

## 🌟 Major Changes & Strategic Improvements

1. **Cleaner Hero with a Decisive Single CTA**:
   The original website suffered from competing banners, visual noise, and lack of visual focus. The redesign introduces a single H1 (*"Scale Your Business With a Digital Marketing Agency That Delivers Results"*), verified trust badges, above-the-fold geometry, and a live CSS/SVG performance dashboard mock that captures immediate intent.
2. **"The Growth Journey" Performance Spine**:
   Translated Xntrova's core tagline (*Build Visibility → Engage Audience → Drive Conversions → Measure & Improve*) into a functional visual backbone: section eyebrow indicators (`01 — Attract`, `02 — Engage`, `03 — Prove`, `04 — Convert`) and an interactive vertical scroll-progress spine that fills dynamically as the user descends the funnel.
3. **Scannable Services Architecture**:
   Replaced verbose paragraphs with 6 scannable, outcome-focused cards arranged in a responsive 3/2/1 grid. Each card features an elevated hover lift, border glow, icon background fill, and animated slide arrows.
4. **Calmer Social Proof & Brand Representation**:
   Instead of dumping dozens of chaotic, blurry client logos across multiple rows, the redesign introduces a calm, single-row typographic marquee that scrolls smoothly at 34s, pauses on hover, and gracefully collapses into a static wrapped grid when `prefers-reduced-motion` is active.
5. **Interactive Methodology Timeline**:
   Transformed the 4-stage process into a horizontal progress line on desktop with scroll-fill detection and an interactive detail inspector supporting keyboard arrow-key navigation, transitioning into an intuitive vertical stepper on mobile.
6. **Handwritten Form Validation with Accessibility Focus**:
   Engineered a controlled contact form with zero dependencies. Validates inputs on blur and submit with RFC-compliant regex, connects error messages via `aria-describedby` and `aria-invalid`, shifts focus automatically to the first invalid field, intercepts spam via a hidden honeypot, and provides a 1.5s simulated loading lifecycle with a polite confirmation screen.
7. **High-Conversion Touches (FAQ & Direct WhatsApp)**:
   Added an accessible single-open FAQ accordion animated via modern CSS Subgrid (`0fr` → `1fr`) along with integrated `FAQPage` JSON-LD schema. Embedded a non-intrusive floating WhatsApp action button that remains accessible across all mobile viewports without covering interactive elements.
8. **Performance, Accessibility & WCAG AA Contrast**:
   Strictly zero heavy runtime frameworks (Framer Motion, Tailwind, Lodash). Achieved full keyboard tab order, skip links, visible focus outlines, 16px iOS input zoom prevention, `display=swap` Google Fonts, and automatic motion disabling for users with vestibular sensitivities.

---

## 📝 Placeholder Content Checklist (To Replace Before Production Launch)

Before taking this site live for Xntrova Technologies, update the following placeholders:

- [ ] **Brand Color Hex Code**: Replace `--color-primary: #0E62E4;` in [`src/styles/variables.css`](file:///c:/Users/PARTHIK/Desktop/New%20folder/assessment/src/styles/variables.css#L13) with Xntrova's exact corporate hex code.
- [ ] **Logo Asset**: Swap the typographic wordmark `<span className="header-logo__wordmark">` in [`Header.jsx`](file:///c:/Users/PARTHIK/Desktop/New%20folder/assessment/src/components/layout/Header.jsx) and [`Footer.jsx`](file:///c:/Users/PARTHIK/Desktop/New%20folder/assessment/src/components/layout/Footer.jsx) with Xntrova's official SVG logo file (`/public/logo.svg`).
- [ ] **Portfolio Case Studies**: Replace the 6 illustrative sample projects in [`src/data/projects.js`](file:///c:/Users/PARTHIK/Desktop/New%20folder/assessment/src/data/projects.js) with real client case studies and verified metrics.
- [ ] **Client Vector Logos**: In [`src/components/sections/ClientLogos.jsx`](file:///c:/Users/PARTHIK/Desktop/New%20folder/assessment/src/components/sections/ClientLogos.jsx), optionally replace the text wordmarks with official monochrome SVG logo files.
- [ ] **Form Submission Endpoint**: Connect the `handleSubmit` function in [`src/components/sections/ContactForm.jsx`](file:///c:/Users/PARTHIK/Desktop/New%20folder/assessment/src/components/sections/ContactForm.jsx#L170) to your production backend, Web3Forms, or Formspree endpoint ID (`https://formspree.io/f/YOUR_ID`).

