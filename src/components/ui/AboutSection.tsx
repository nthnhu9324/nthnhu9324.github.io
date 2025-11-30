"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/data/content";
import { TrendingUp, Users, Award } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const icons = {
  TrendingUp,
  Users,
  Award,
};

function InfoCard({
  card,
  index
}: {
  card: typeof content.about.cards[0];
  index: number
}) {
  const Icon = icons[card.icon as keyof typeof icons] || Award;

  return (
    <div className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-neon-purple/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden interactive">
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
           <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 text-neon-blue group-hover:text-white group-hover:bg-neon-blue transition-all duration-300">
             <Icon size={24} />
           </div>

           <h3 className="text-2xl font-bold font-display mb-3">{card.title}</h3>
           <p className="text-gray-400 leading-relaxed mb-6">
             {card.description}
           </p>
        </div>

        <div className="inline-block self-start px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-neon-purple">
          {card.highlight}
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".about-card", {
        scrollTrigger: {
          trigger: ".about-grid",
          start: "top 85%",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <span className="text-neon-blue font-mono text-sm tracking-widest uppercase mb-4 block">
            Who I Am
          </span>
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-display font-bold mb-6">
            A Modern Marketer with a <span className="text-gradient">Tech Soul</span>.
          </h2>
          <p className="text-gray-400 text-lg">
            {content.personalInfo.summary}
          </p>
        </div>

        <div className="about-grid grid md:grid-cols-3 gap-6">
          {content.about.cards.map((card, i) => (
            <div key={i} className="about-card h-full">
              <InfoCard card={card} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
