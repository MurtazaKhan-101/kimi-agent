import { useEffect, useRef, useState } from 'react';
import { Search, Lock, ShieldCheck, ChevronRight } from 'lucide-react';

interface LayerProps {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

function LayerCard({ number, title, subtitle, description, icon, delay }: LayerProps) {
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
      className={`group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-glow transition-all duration-500 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
      }`}
    >
      {/* Number Badge */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center text-white font-bold text-xl font-pixelify shadow-lg group-hover:scale-110 transition-transform duration-300">
        {number}
      </div>

      {/* Icon */}
      <div className="mb-6 pt-4">
        <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div>
        <span className="text-xs font-semibold text-brand-light uppercase tracking-wider font-roboto">
          {subtitle}
        </span>
        <h3 className="text-2xl font-bold text-brand-dark mt-2 mb-3 font-pixelify group-hover:text-brand-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed font-roboto">
          {description}
        </p>
      </div>

      {/* Arrow */}
      <div className="mt-6 flex items-center text-brand-primary font-medium text-sm font-roboto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>Learn more</span>
        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </div>
  );
}

export function Solution() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          setImageVisible(true);
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

  const layers = [
    {
      number: '01',
      title: 'DETECTION ENGINE',
      subtitle: 'Layer 1',
      description: 'Multimodal AI forensics across video, audio, and image. CNN + ViT ensemble, biological signal analysis (pulse, blink, micro-expressions), cross-modal checks.',
      icon: <Search className="w-7 h-7 text-brand-primary group-hover:text-white transition-colors duration-300" />,
      delay: 200,
    },
    {
      number: '02',
      title: 'PROVENANCE VERIFICATION',
      subtitle: 'Layer 2',
      description: 'C2PA Content Credentials integration. Cryptographically verifies WHO made content and HOW. Inverts the question from "is this fake?" to "can this be proven real?"',
      icon: <Lock className="w-7 h-7 text-brand-primary group-hover:text-white transition-colors duration-300" />,
      delay: 400,
    },
    {
      number: '03',
      title: 'CHALLENGE-RESPONSE',
      subtitle: 'Layer 3',
      description: 'Active verification for live video calls. Subtle challenges that real humans pass but real-time deepfake pipelines cannot maintain. Based on CMU Gotcha research (88.6% AUC).',
      icon: <ShieldCheck className="w-7 h-7 text-brand-primary group-hover:text-white transition-colors duration-300" />,
      delay: 600,
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-bg to-white opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <div
            className={`relative order-2 lg:order-1 transition-all duration-1000 ${
              imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/solution-image.jpg"
                alt="Digital trust visualization"
                className="w-full h-auto object-cover"
              />
              {/* Holographic Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/30 via-transparent to-brand-light/20" />
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'linear-gradient(180deg, transparent 0%, rgba(130, 98, 176, 0.3) 50%, transparent 100%)',
                  animation: 'scanline 3s linear infinite',
                }}
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-brand-primary text-white rounded-2xl p-6 shadow-xl">
              <div className="text-3xl font-bold font-pixelify">3 Layers</div>
              <div className="text-sm text-white/80 font-roboto">of Trust Architecture</div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Section Header */}
            <div
              className={`transition-all duration-1000 ${
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="inline-block px-4 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-4 font-roboto">
                Our Solution
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4 font-pixelify">
                OUR SOLUTION
              </h2>
              <p className="text-xl text-brand-primary font-medium mb-2 font-roboto">
                Three-Layer Trust Architecture
              </p>
              <p className="text-gray-600 font-roboto">
                VeriSight doesn't just detect fakes. It builds trust infrastructure.
              </p>
            </div>

            {/* Layer Cards */}
            <div className="space-y-6">
              {layers.map((layer, index) => (
                <LayerCard key={index} {...layer} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
