import { useEffect, useRef, useState } from 'react';
import { Plug, Shield, Globe, Users } from 'lucide-react';

interface RevenueStreamProps {
  title: string;
  icon: React.ReactNode;
  delay: number;
}

function RevenueStream({ title, icon, delay }: RevenueStreamProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-glow hover:border-brand-primary transition-all duration-500 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-brand-dark font-pixelify group-hover:text-brand-primary transition-colors duration-300">
        {title}
      </h3>
    </div>
  );
}

interface PhaseProps {
  phase: string;
  timeline: string;
  description: string;
  delay: number;
}

function PhaseCard({ phase, timeline, description, delay }: PhaseProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`relative flex gap-6 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}
    >
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 bg-brand-primary rounded-full" />
        <div className="w-0.5 flex-1 bg-brand-primary/30" />
      </div>
      
      {/* Content */}
      <div className="pb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-brand-primary text-white text-sm font-medium rounded-lg font-roboto">
            {phase}
          </span>
          <span className="text-sm text-gray-500 font-roboto">{timeline}</span>
        </div>
        <p className="text-gray-700 font-roboto">{description}</p>
      </div>
    </div>
  );
}

export function BusinessModel() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const revenueStreams = [
    { title: 'Detection API', icon: <Plug className="w-6 h-6" />, delay: 100 },
    { title: 'Enterprise License', icon: <Shield className="w-6 h-6" />, delay: 200 },
    { title: 'Platform Licensing', icon: <Globe className="w-6 h-6" />, delay: 300 },
    { title: 'Consumer Freemium', icon: <Users className="w-6 h-6" />, delay: 400 },
  ];

  const phases = [
    {
      phase: 'PHASE 1',
      timeline: '0-6 mo',
      description: 'Build core API. Pilot with 3-5 South Asian fintechs where fraud is exploding and no vendor operates.',
      delay: 500,
    },
    {
      phase: 'PHASE 2',
      timeline: '6-12 mo',
      description: 'Launch commercial API. Expand to MEA/SE Asia banks. Begin challenge-response R&D. Partner with video KYC providers.',
      delay: 600,
    },
    {
      phase: 'PHASE 3',
      timeline: '12-24 mo',
      description: 'Ship all 3 layers. Platform API licensing. C2PA Conformance. Target $2M+ ARR for Series A.',
      delay: 700,
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-bg to-white opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-medium mb-4 font-roboto">
            Revenue Strategy
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4 font-pixelify">
            BUSINESS MODEL
          </h2>
          <p className="text-lg text-gray-600 font-roboto">
            API-first. Multiple revenue streams. B2B core with B2C and platform licensing.
          </p>
        </div>

        {/* Revenue Streams */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20">
          {revenueStreams.map((stream, index) => (
            <RevenueStream key={index} {...stream} />
          ))}
        </div>

        {/* Go-To-Market */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-brand-dark mb-8 text-center font-pixelify">
            GO-TO-MARKET
          </h3>
          
          <div className="space-y-2">
            {phases.map((phase, index) => (
              <PhaseCard key={index} {...phase} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
