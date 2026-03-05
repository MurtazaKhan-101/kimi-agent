import { useEffect, useRef, useState } from 'react';
import { Lock, Target, CheckCircle, XCircle, Sparkles } from 'lucide-react';

interface AdvantageCardProps {
  title: string;
  subtitle: string;
  features: { text: string; positive: boolean }[];
  icon: React.ReactNode;
  delay: number;
}

function AdvantageCard({ title, subtitle, features, icon, delay }: AdvantageCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative h-full rounded-3xl overflow-hidden group"
        style={{
          transform: isHovered 
            ? `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * -10}deg) rotateY(${(mousePosition.x - 0.5) * 10}deg)` 
            : 'perspective(1000px) rotateX(0) rotateY(0)',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Glass Background */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl" />
        
        {/* Gloss Effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: isHovered 
              ? `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.2) 0%, transparent 50%)`
              : 'none',
          }}
        />

        {/* Content */}
        <div className="relative p-8 h-full">
          {/* Icon */}
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-2 font-pixelify">
            {title}
          </h3>
          <p className="text-white/70 text-sm mb-6 font-roboto">
            {subtitle}
          </p>

          {/* Features List */}
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                {feature.positive ? (
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                )}
                <span className="text-white/90 text-sm font-roboto">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function UnfairAdvantage() {
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

  const advantages = [
    {
      title: 'C2PA PROVENANCE',
      subtitle: 'Instead of only asking "is this fake?" we also ask "can this be proven real?"',
      icon: <Lock className="w-8 h-8 text-white" />,
      features: [
        { text: 'Verifies C2PA Content Credentials', positive: true },
        { text: 'Checks cryptographic chain-of-custody', positive: true },
        { text: 'Cross-references provenance vs detection signals', positive: true },
        { text: 'Catches forged C2PA credentials', positive: true },
      ],
      delay: 200,
    },
    {
      title: 'CHALLENGE-RESPONSE',
      subtitle: 'Like CAPTCHA for video calls. Forces deepfakes to fail instead of trying to detect them passively.',
      icon: <Target className="w-8 h-8 text-white" />,
      features: [
        { text: 'Subtle challenges during live calls', positive: true },
        { text: 'Real humans pass without noticing', positive: true },
        { text: 'Deepfake pipelines degrade measurably', positive: true },
        { text: '88.6% AUC in CMU research', positive: true },
      ],
      delay: 400,
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-20 md:py-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #3d1d6b 0%, #211c52 100%)',
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-light/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-secondary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white font-roboto">Competitive Edge</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-pixelify">
            OUR UNFAIR ADVANTAGE
          </h2>
          <p className="text-lg text-white/70 font-roboto">
            Two proprietary technologies that no competitor offers
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {advantages.map((advantage, index) => (
            <AdvantageCard key={index} {...advantage} />
          ))}
        </div>
      </div>
    </section>
  );
}
