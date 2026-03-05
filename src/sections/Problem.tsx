import { useEffect, useRef, useState } from 'react';
import { Mic, Video, Phone, AlertCircle } from 'lucide-react';

interface ProblemCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

function ProblemCard({ title, description, icon, delay }: ProblemCardProps) {
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
      className={`bg-white rounded-2xl p-6 shadow-lg border-l-4 border-brand-primary hover:shadow-glow transition-all duration-500 hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-brand-primary/10 rounded-xl shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-brand-dark mb-2 font-pixelify">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed font-roboto">{description}</p>
        </div>
      </div>
    </div>
  );
}

export function Problem() {
  const [imageVisible, setImageVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageVisible(true);
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

  const problems = [
    {
      title: 'Voice cloning is now "indistinguishable"',
      description: 'A few seconds of audio creates a perfect voice clone. Prof. Siwei Lyu (UB) says 2026 deepfakes will react to humans in real time.',
      icon: <Mic className="w-6 h-6 text-brand-primary" />,
      delay: 200,
    },
    {
      title: '$25.5M stolen in one video call',
      description: 'Arup Engineering: Every person on a finance video call was a deepfake. The employee authorized 15 wire transfers. No detection tool flagged it.',
      icon: <Video className="w-6 h-6 text-brand-primary" />,
      delay: 400,
    },
    {
      title: '7 deepfake attacks per customer per day',
      description: 'Pindrop Security reports enterprises now face 7 deepfake attacks daily, up from 1/month in 2023. Some retailers get 1,000+ AI scam calls/day.',
      icon: <Phone className="w-6 h-6 text-brand-primary" />,
      delay: 600,
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-bg to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <div
            className={`relative transition-all duration-1000 ${
              imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/problem-image.jpg"
                alt="Frustrated woman dealing with deepfake fraud"
                className="w-full h-auto object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent" />
            </div>
            
            {/* Floating Stat Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-brand-light/20">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand-dark font-pixelify">24.5%</div>
                  <div className="text-sm text-gray-600 font-roboto">Human detection rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            {/* Section Header */}
            <div>
              <span className="inline-block px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-4 font-roboto">
                The Crisis
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4 font-pixelify">
                THE PROBLEM
              </h2>
              <p className="text-xl text-brand-primary font-medium mb-2 font-roboto">
                Brands Often Face the Same Dilemma
              </p>
              <p className="text-gray-600 font-roboto">
                Deepfakes are causing billions in damage. Current detection is failing catastrophically.
              </p>
            </div>

            {/* Problem Cards */}
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <ProblemCard key={index} {...problem} />
              ))}
            </div>

            {/* Footer Note */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 italic font-roboto">
                Humans detect high-quality video deepfakes only 24.5% of the time. 
                Detection tools lose 45-50% accuracy outside lab conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
