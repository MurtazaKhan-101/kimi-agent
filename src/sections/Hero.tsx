import { useEffect, useRef, useState } from 'react';
import { Shield, TrendingUp, AlertTriangle } from 'lucide-react';

interface StatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  delay: number;
}

function AnimatedStat({ value, label, icon, delay }: StatProps) {
  const [displayValue, setDisplayValue] = useState('0');
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const prefix = value.match(/^[^0-9]*/)?.[0] || '';
    const suffix = value.match(/[^0-9.]*$/)?.[0] || '';
    const isPercentage = value.includes('%');
    const isBillion = value.includes('B');

    const duration = 2000;
    const steps = 60;
    const stepValue = numericValue / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentValue = stepValue * currentStep;
      
      if (isBillion) {
        setDisplayValue(`${prefix}${currentValue.toFixed(2)}B`);
      } else if (isPercentage) {
        setDisplayValue(`${prefix}${Math.round(currentValue)}%`);
      } else {
        setDisplayValue(`${prefix}${Math.round(currentValue)}${suffix}`);
      }

      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [isVisible, value]);

  return (
    <div
      ref={ref}
      className={`bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-brand-light/20 transition-all duration-700 hover:shadow-glow hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-brand-primary/10 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="text-3xl md:text-4xl font-bold text-brand-primary font-pixelify">
        {displayValue}
      </div>
      <div className="text-sm text-gray-600 mt-1 font-roboto">{label}</div>
    </div>
  );
}

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const robotRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-brand-bg to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #3d1d6b 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 rounded-full transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Shield className="w-4 h-4 text-brand-primary" />
              <span className="text-sm font-medium text-brand-primary font-roboto">
                Deepfake Detection Platform
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark leading-tight transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="font-pixelify">DEEPFAKE DETECTION</span>
              <br />
              <span className="text-brand-primary font-pixelify">THAT ACTUALLY WORKS</span>
              <br />
              <span className="text-brand-secondary font-pixelify">IN THE REAL WORLD</span>
            </h1>

            {/* Subtitle */}
            <p
              className={`text-lg md:text-xl text-gray-600 font-roboto transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Detection + Provenance + Challenge-Response
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <button className="px-8 py-4 bg-brand-primary text-white rounded-xl font-medium font-roboto hover:bg-brand-secondary transition-all duration-300 hover:shadow-glow hover:-translate-y-1">
                Get Started
              </button>
              <button className="px-8 py-4 border-2 border-brand-primary text-brand-primary rounded-xl font-medium font-roboto hover:bg-brand-primary hover:text-white transition-all duration-300">
                Learn More
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <AnimatedStat
                value="$1.56B"
                label="Fraud losses in 2025"
                icon={<AlertTriangle className="w-5 h-5 text-brand-primary" />}
                delay={500}
              />
              <AnimatedStat
                value="45-50%"
                label="Detection accuracy drop"
                icon={<TrendingUp className="w-5 h-5 text-brand-primary" />}
                delay={700}
              />
              <AnimatedStat
                value="900%"
                label="Annual deepfake growth"
                icon={<Shield className="w-5 h-5 text-brand-primary" />}
                delay={900}
              />
            </div>
          </div>

          {/* Right Content - Robot Image */}
          <div
            className={`relative flex justify-center lg:justify-end transition-all duration-1000 delay-400 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-brand-light/20 rounded-full blur-3xl scale-75 animate-pulse" />
              
              {/* Robot Image */}
              <img
                ref={robotRef}
                src="/hero-robot.png"
                alt="AI Detection Robot"
                className="relative z-10 w-full max-w-md lg:max-w-lg animate-float drop-shadow-2xl"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-brand-primary/10 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-brand-light/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 -right-12 w-8 h-8 bg-brand-secondary/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-brand-primary/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-brand-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
