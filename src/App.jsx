import React from 'react';
import { Header } from './components/layout/Header';
import { GrowthSpine } from './components/layout/GrowthSpine';
import { Hero } from './components/sections/Hero';
import { ClientLogos } from './components/sections/ClientLogos';
import { About } from './components/sections/About';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { Services } from './components/sections/Services';
import { Process } from './components/sections/Process';
import { Portfolio } from './components/sections/Portfolio';
import { Testimonials } from './components/sections/Testimonials';
import { CTA } from './components/sections/CTA';
import { FAQ } from './components/sections/FAQ';
import { ContactForm } from './components/sections/ContactForm';
import { Footer } from './components/layout/Footer';
import './App.css';

/**
 * Root Application Component
 * Redesigned Homepage for Xntrova Technologies (Delhi NCR)
 * Structured along "The Growth Journey" performance spine:
 * Stage 01: Attract (Hero, Services)
 * Stage 02: Engage (About, Why Us, Process)
 * Stage 03: Prove (Portfolio, Testimonials)
 * Stage 04: Convert (CTA, Contact)
 */
export default function App() {
  return (
    <div className="app-layout">
      {/* Sticky Header with active nav & mobile slide-down drawer */}
      <Header />

      {/* "The Growth Journey" desktop progress spine (fills as user scrolls) */}
      <GrowthSpine />

      {/* Main Content Landmark */}
      <main id="main-content">
        {/* Stage 01: Attract */}
        <Hero />

        {/* Social Proof: Client Logos Marquee */}
        <ClientLogos />

        {/* Stage 02: Engage */}
        <About />
        <WhyChooseUs />

        {/* Stage 01: Attract (Capabilities Grid) */}
        <Services />

        {/* Stage 02: Engage (Interactive Methodology) */}
        <Process />

        {/* Stage 03: Prove */}
        <Portfolio />
        <Testimonials />

        {/* Stage 04: Convert */}
        <CTA />
        <FAQ />
        <ContactForm />
      </main>

      {/* Comprehensive 4-Column Footer */}
      <Footer />
    </div>
  );
}
