import { useEffect, useRef, useState } from 'react';
import { Video, Mic, Activity, Clock, FileJson, GitCompare } from 'lucide-react';

interface SignalProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

function SignalCard({ title, description, icon, delay }: SignalProps) {
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
      className={`group relative bg-white rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-brand-primary transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      } ${isHovered ? 'shadow-glow -translate-y-2' : ''}`}
    >
      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
        isHovered ? 'bg-brand-primary text-white rotate-[360deg]' : 'bg-brand-primary/10 text-brand-primary'
      }`}>
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-brand-dark mb-2 font-pixelify group-hover:text-brand-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed font-roboto">
        {description}
      </p>

      {/* Hover Glow */}
      <div className={`absolute inset-0 rounded-2xl bg-brand-primary/5 transition-opacity duration-300 -z-10 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
}

export function DetectionEngine() {
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

  const signals = [
    {
      title: 'Visual Forensics',
      description: 'CNN + ViT ensemble, FFT frequency analysis, GAN/diffusion artifact detection',
      icon: <Video className="w-6 h-6" />,
      delay: 100,
    },
    {
      title: 'Audio Forensics',
      description: 'MFCC spectral analysis, phase coherence, neural vocoder trace detection',
      icon: <Mic className="w-6 h-6" />,
      delay: 200,
    },
    {
      title: 'Biological Signals',
      description: 'rPPG pulse detection, blink analysis, micro-expression irregularities',
      icon: <Activity className="w-6 h-6" />,
      delay: 300,
    },
    {
      title: 'Temporal Analysis',
      description: 'Frame sequence analysis via Temporal CNNs + LSTMs for flicker and identity drift',
      icon: <Clock className="w-6 h-6" />,
      delay: 400,
    },
    {
      title: 'Metadata Forensics',
      description: 'EXIF analysis, sensor noise patterns (SPN), double compression detection',
      icon: <FileJson className="w-6 h-6" />,
      delay: 500,
    },
    {
      title: 'Cross-Modal Checks',
      description: 'Lip-sync vs voice alignment, face motion vs audio timing consistency',
      icon: <GitCompare className="w-6 h-6" />,
      delay: 600,
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-brand-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-light/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-secondary/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-4 font-roboto">
            Layer 1
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-pixelify">
            DETECTION ENGINE
          </h2>
          <p className="text-lg text-white/80 font-roboto">
            Six independent signal streams. Ensemble scoring. Full explainability.
          </p>
        </div>

        {/* Signal Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {signals.map((signal, index) => (
            <SignalCard key={index} {...signal} />
          ))}
        </div>

        {/* Output Bar */}
        <div
          className={`mt-12 max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-1000 delay-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-wrap items-center justify-center gap-4 text-white">
            <span className="text-sm font-semibold uppercase tracking-wider font-roboto">Output:</span>
            <div className="flex flex-wrap items-center gap-4">
              <span className="px-4 py-2 bg-white/10 rounded-lg text-sm font-roboto">Risk Score (0-100)</span>
              <span className="text-white/50">•</span>
              <span className="px-4 py-2 bg-white/10 rounded-lg text-sm font-roboto">Explainability Report</span>
              <span className="text-white/50">•</span>
              <span className="px-4 py-2 bg-white/10 rounded-lg text-sm font-roboto">Per-Signal Confidence</span>
              <span className="text-white/50">•</span>
              <span className="px-4 py-2 bg-white/10 rounded-lg text-sm font-roboto">Compliance Audit Log</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
