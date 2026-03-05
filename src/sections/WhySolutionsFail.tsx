import { useEffect, useRef, useState } from 'react';
import { TrendingDown, Zap, Lock, ShieldAlert } from 'lucide-react';

interface FailCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

function FailCard({ title, description, icon, delay }: FailCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
        isHovered 
          ? 'bg-brand-primary border-brand-primary text-white scale-105 shadow-glow-lg' 
          : 'bg-white border-gray-200 text-gray-800 hover:border-brand-light'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className={`p-3 rounded-xl mb-4 inline-block transition-colors duration-300 ${
        isHovered ? 'bg-white/20' : 'bg-brand-primary/10'
      }`}>
        {icon}
      </div>
      <h3 className={`text-xl font-bold mb-3 font-pixelify ${isHovered ? 'text-white' : 'text-brand-dark'}`}>
        {title}
      </h3>
      <p className={`text-sm leading-relaxed font-roboto ${isHovered ? 'text-white/90' : 'text-gray-600'}`}>
        {description}
      </p>
    </div>
  );
}

export function WhySolutionsFail() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const failPoints = [
    {
      title: 'Passive detection degrades',
      description: 'Models trained on clean datasets (FaceForensics++, DFDC) lose 45-50% accuracy on real-world compressed, low-res media. Every competitor has this problem.',
      icon: <TrendingDown className={`w-6 h-6`} />,
      delay: 200,
    },
    {
      title: 'Real-time deepfakes are coming',
      description: '2026 brings live interactive deepfakes that react in real time. Frame-by-frame passive scanning cannot keep up with this. No product addresses it.',
      icon: <Zap className={`w-6 h-6`} />,
      delay: 400,
    },
    {
      title: 'No provenance integration',
      description: 'C2PA (Adobe, Microsoft, Google, Meta) can prove content IS real. But no detection tool uses provenance as a signal. They only ask "is this fake?"',
      icon: <Lock className={`w-6 h-6`} />,
      delay: 600,
    },
    {
      title: 'Detection ≠ Trust',
      description: 'A confidence score alone doesn\'t help an enterprise. Banks need audit trails. HR needs explainability. Platforms need compliance. Nobody provides all three.',
      icon: <ShieldAlert className={`w-6 h-6`} />,
      delay: 800,
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-brand-bg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-light/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-4xl mx-auto mb-16 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-medium mb-4 font-roboto">
            The Architecture Problem
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-6 font-pixelify">
            WHY CURRENT SOLUTIONS FAIL
          </h2>
          <p className="text-lg text-gray-600 font-roboto">
            Every competitor is building better classifiers. The problem isn't the classifier — it's the architecture.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {failPoints.map((point, index) => (
            <FailCard key={index} {...point} />
          ))}
        </div>
      </div>
    </section>
  );
}
