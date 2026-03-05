import { useEffect, useRef, useState } from 'react';
import { Check, X, Trophy, TrendingUp } from 'lucide-react';

interface Competitor {
  name: string;
  multimodal: string;
  c2pa: boolean;
  challenge: string;
  explainability: string;
  funding: string;
  isUs?: boolean;
}

const competitors: Competitor[] = [
  { name: 'Reality Defender', multimodal: '✓', c2pa: false, challenge: '✗', explainability: 'Partial', funding: '$33M' },
  { name: 'Pindrop', multimodal: 'Audio+Video', c2pa: false, challenge: 'Building', explainability: 'Partial', funding: '$100M' },
  { name: 'Resemble AI', multimodal: '✓', c2pa: false, challenge: '✗', explainability: '✓', funding: '$25M' },
  { name: 'Sensity AI', multimodal: 'Visual only', c2pa: false, challenge: '✗', explainability: '✓', funding: 'N/A' },
  { name: 'Adaptive Security', multimodal: 'Simulation', c2pa: false, challenge: '✗', explainability: '✗', funding: '$43M' },
  { name: 'TruthScan', multimodal: 'Image only', c2pa: false, challenge: '✗', explainability: '✗', funding: '$16M' },
];

const verisight: Competitor = {
  name: 'VeriSight AI',
  multimodal: '✓✓',
  c2pa: true,
  challenge: '✓✓',
  explainability: '✓✓',
  funding: 'Seed',
  isUs: true,
};

export function CompetitiveLandscape() {
  const [isVisible, setIsVisible] = useState(false);
  const [rowVisible, setRowVisible] = useState<boolean[]>(new Array(competitors.length).fill(false));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stagger row animations
          competitors.forEach((_, index) => {
            setTimeout(() => {
              setRowVisible(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 100);
          });
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

  const renderCell = (value: string | boolean, isHeader = false) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-red-400 mx-auto" />
      );
    }
    if (value === '✓') return <Check className="w-5 h-5 text-green-500 mx-auto" />;
    if (value === '✓✓') return <Check className="w-5 h-5 text-green-500 mx-auto" />;
    if (value === '✗') return <X className="w-5 h-5 text-red-400 mx-auto" />;
    return <span className={`${isHeader ? 'font-medium' : ''} font-roboto`}>{value}</span>;
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-white to-brand-bg opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-medium mb-4 font-roboto">
            Market Analysis
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4 font-pixelify">
            COMPETITIVE LANDSCAPE
          </h2>
          <p className="text-lg text-gray-600 font-roboto">
            We don't win on price. We win because we're building something fundamentally different.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr className="border-b-2 border-brand-primary">
                <th className="text-left py-4 px-4 font-bold text-brand-dark font-pixelify">Company</th>
                <th className="text-center py-4 px-4 font-bold text-brand-dark font-pixelify">Multimodal Detection</th>
                <th className="text-center py-4 px-4 font-bold text-brand-dark font-pixelify">C2PA Provenance</th>
                <th className="text-center py-4 px-4 font-bold text-brand-dark font-pixelify">Challenge-Response</th>
                <th className="text-center py-4 px-4 font-bold text-brand-dark font-pixelify">Explainability</th>
                <th className="text-center py-4 px-4 font-bold text-brand-dark font-pixelify">Funding</th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody>
              {competitors.map((competitor, index) => (
                <tr
                  key={competitor.name}
                  className={`border-b border-gray-100 hover:bg-brand-bg/50 transition-all duration-500 ${
                    rowVisible[index] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                >
                  <td className="py-4 px-4 font-medium text-gray-800 font-roboto">{competitor.name}</td>
                  <td className="text-center py-4 px-4">{renderCell(competitor.multimodal)}</td>
                  <td className="text-center py-4 px-4">{renderCell(competitor.c2pa)}</td>
                  <td className="text-center py-4 px-4">{renderCell(competitor.challenge)}</td>
                  <td className="text-center py-4 px-4">{renderCell(competitor.explainability)}</td>
                  <td className="text-center py-4 px-4 text-gray-600 font-roboto">{competitor.funding}</td>
                </tr>
              ))}
              
              {/* VeriSight Row - Highlighted */}
              <tr
                className={`bg-brand-primary text-white animate-pulse-glow transition-all duration-700 delay-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <td className="py-5 px-4 font-bold font-pixelify flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  {verisight.name}
                </td>
                <td className="text-center py-5 px-4">
                  <div className="flex items-center justify-center gap-1">
                    <Check className="w-5 h-5 text-green-400" />
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                </td>
                <td className="text-center py-5 px-4"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                <td className="text-center py-5 px-4">
                  <div className="flex items-center justify-center gap-1">
                    <Check className="w-5 h-5 text-green-400" />
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                </td>
                <td className="text-center py-5 px-4">
                  <div className="flex items-center justify-center gap-1">
                    <Check className="w-5 h-5 text-green-400" />
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                </td>
                <td className="text-center py-5 px-4 font-medium font-roboto text-green-400">{verisight.funding}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Insight Footer */}
        <div
          className={`mt-12 max-w-3xl mx-auto text-center transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-brand-primary/5 rounded-2xl border border-brand-primary/20">
            <TrendingUp className="w-6 h-6 text-brand-primary" />
            <p className="text-brand-dark font-medium font-roboto">
              <span className="font-bold">THE INSIGHT:</span> Every competitor is building a better lock. 
              We're building the entire security system.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
