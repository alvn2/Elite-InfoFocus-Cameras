import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Truck, Users } from 'lucide-react';

interface TrustFactor {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const factors: TrustFactor[] = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: '1-Year Warranty',
    description: 'All bodies and lenses come with official manufacturer warranty coverage.'
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Same Day Delivery',
    description: 'Free delivery within Nairobi CBD. Secure courier options countrywide.'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Training & Support',
    description: 'Get free setup assistance and basic operation training with every purchase.'
  }
];

const TrustFactors: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  return (
    <section ref={sectionRef} className="py-20 bg-zinc-900 border-y border-zinc-800 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {factors.map((factor, index) => (
            <div
              key={index}
              className={`group flex flex-col items-center text-center p-8 rounded-2xl hover:bg-zinc-800/50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative bg-zinc-950 p-5 rounded-2xl border border-zinc-800 mb-6 shadow-lg shadow-blue-900/10 group-hover:shadow-blue-500/20 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500/30">
                <div className="text-blue-500 group-hover:text-blue-400 transition-colors">
                  {factor.icon}
                </div>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-display group-hover:text-blue-400 transition-colors">{factor.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {factor.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustFactors;