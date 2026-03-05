import { useEffect, useRef, useState } from 'react';
import { Mic, Video, Lock, Globe, TrendingUp } from 'lucide-react';

interface UrgencyItemProps {
  icon: React.ReactNode;
  text: string;
  delay: number;
}

function UrgencyItem({ icon, text, delay }: UrgencyItemProps) {
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
      className={`flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-glow hover:border-brand-light transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}
    >
      <div className="p-3 bg-brand-primary/10 rounded-xl shrink-0">
        {icon}
      </div>
      <p className="text-gray-700 leading-relaxed font-roboto pt-1">{text}</p>
    </div>
  );
}

export function WhyNow() {
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

  const urgencyItems = [
    {
      icon: <Mic className="w-6 h-6 text-brand-primary" />,
      text: 'Indistinguishable from real speech. Human judgment is no longer a defense. Automated protection is the only path.',
      delay: 200,
    },
    {
      icon: <Video className="w-6 h-6 text-brand-primary" />,
      text: 'Live interactive deepfakes that react to humans. No current product addresses this. Our challenge-response layer is built for it.',
      delay: 300,
    },
    {
      icon: <Lock className="w-6 h-6 text-brand-primary" />,
      text: 'Google Pixel 10, Adobe, Microsoft, Meta, TikTok, OpenAI all ship Content Credentials. Ecosystem needs verification tools. We fill this role.',
      delay: 400,
    },
    {
      icon: <Globe className="w-6 h-6 text-brand-primary" />,
      text: 'EU AI Act live. US TAKE IT DOWN Act passed. DSA mandates platform action. Non-compliance = fines + liability.',
      delay: 500,
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-brand-primary" />,
      text: 'DaaS platforms widely available (Cyble, Dec 2025). Low-skill attackers can produce high-quality fakes. Attack surface multiplied.',
      delay: 600,
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-brand-bg relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-primary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-4 font-roboto">
            Urgency
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4 font-pixelify">
            WHY NOW?
          </h2>
          <p className="text-lg text-gray-600 font-roboto">
            The perfect storm of technology, regulation, and threat landscape
          </p>
        </div>

        {/* Urgency Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {urgencyItems.map((item, index) => (
            <UrgencyItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
