import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Cpu, Clock, ArrowRight, Mail } from 'lucide-react';

interface AllocationProps {
  percentage: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

function AllocationCard({ percentage, title, description, icon, delay }: AllocationProps) {
  const [displayPercentage, setDisplayPercentage] = useState('0%');
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

  useEffect(() => {
    if (!isVisible) return;

    const targetValue = parseInt(percentage);
    const duration = 1500;
    const steps = 30;
    const stepValue = targetValue / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentValue = Math.round(stepValue * currentStep);
      setDisplayPercentage(`${currentValue}%`);

      if (currentStep >= steps) {
        setDisplayPercentage(percentage);
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [isVisible, percentage]);

  return (
    <div
      ref={ref}
      className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-white/20 rounded-xl">
          {icon}
        </div>
        <div className="text-4xl font-bold text-white font-pixelify">
          {displayPercentage}
        </div>
      </div>
      <h3 className="text-lg font-bold text-white mb-2 font-pixelify">{title}</h3>
      <p className="text-white/70 text-sm font-roboto">{description}</p>
    </div>
  );
}

export function TheAsk() {
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

  const allocations = [
    {
      percentage: '50-60%',
      title: 'Research & Engineering',
      description: 'ML team, model training, API infrastructure, C2PA integration',
      icon: <Cpu className="w-6 h-6 text-white" />,
      delay: 200,
    },
    {
      percentage: '20-25%',
      title: 'Go-to-Market',
      description: 'Pilot acquisition, enterprise relationships, conference presence',
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      delay: 300,
    },
    {
      percentage: '10-15%',
      title: 'Operations & IP',
      description: 'Cloud/GPU compute, patent filings, C2PA Conformance application',
      icon: <Users className="w-6 h-6 text-white" />,
      delay: 400,
    },
    {
      percentage: '10%',
      title: 'Runway',
      description: '12-18 months to Series A milestones',
      icon: <Clock className="w-6 h-6 text-white" />,
      delay: 500,
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-20 md:py-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #3d1d6b 0%, #563393 50%, #211c52 100%)',
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-light/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-4 font-roboto">
            Investment Opportunity
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 font-pixelify">
            THE ASK
          </h2>
          <p className="text-2xl text-brand-light font-medium mb-8 font-roboto">
            $500K - $1.5M Seed Round
          </p>
        </div>

        {/* Allocation Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {allocations.map((allocation, index) => (
            <AllocationCard key={index} {...allocation} />
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-600 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button className="group px-8 py-4 bg-white text-brand-primary rounded-xl font-bold font-roboto hover:bg-brand-light hover:text-white transition-all duration-300 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Contact Us
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold font-roboto hover:bg-white hover:text-brand-primary transition-all duration-300">
            Download Pitch Deck
          </button>
        </div>

        {/* Tagline */}
        <div
          className={`text-center transition-all duration-1000 delay-800 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xl text-white/80 italic font-roboto max-w-2xl mx-auto">
            "Building the trust infrastructure for a world where seeing is no longer believing."
          </p>
        </div>
      </div>
    </section>
  );
}
