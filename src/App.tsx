import { CursorFollower } from './components/CursorFollower';
import { Navigation } from './components/Navigation';
import { Hero } from './sections/Hero';
import { Problem } from './sections/Problem';
import { WhySolutionsFail } from './sections/WhySolutionsFail';
import { Solution } from './sections/Solution';
import { DetectionEngine } from './sections/DetectionEngine';
import { UnfairAdvantage } from './sections/UnfairAdvantage';
import { CompetitiveLandscape } from './sections/CompetitiveLandscape';
import { WhyNow } from './sections/WhyNow';
import { BusinessModel } from './sections/BusinessModel';
import { TheAsk } from './sections/TheAsk';
import { Footer } from './sections/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-brand-bg">
      {/* Interactive Cursor Following Dots */}
      <CursorFollower />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section id="hero">
          <Hero />
        </section>
        
        {/* Problem Section */}
        <section id="problem">
          <Problem />
        </section>
        
        {/* Why Current Solutions Fail */}
        <section id="why-fail">
          <WhySolutionsFail />
        </section>
        
        {/* Solution Section */}
        <section id="solution">
          <Solution />
        </section>
        
        {/* Detection Engine Section */}
        <section id="technology">
          <DetectionEngine />
        </section>
        
        {/* Unfair Advantage Section */}
        <section id="advantage">
          <UnfairAdvantage />
        </section>
        
        {/* Competitive Landscape */}
        <section id="competition">
          <CompetitiveLandscape />
        </section>
        
        {/* Why Now */}
        <section id="why-now">
          <WhyNow />
        </section>
        
        {/* Business Model */}
        <section id="business">
          <BusinessModel />
        </section>
        
        {/* The Ask / CTA */}
        <section id="contact">
          <TheAsk />
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
