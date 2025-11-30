"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/data/content";
import { Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AwardsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".award-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="awards" ref={containerRef} className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
           <span className="text-neon-blue font-mono text-sm tracking-widest uppercase mb-4 block">
             Recognition
           </span>
           <h2 className="text-4xl md:text-5xl font-display font-bold">
             Hall of <span className="text-gradient">Fame</span>
           </h2>
        </div>

        <div className="flex flex-col gap-4">
          {content.awards.map((award, i) => (
            <div
              key={i}
              className="award-item group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-xl bg-white/5 border border-white/10 hover:border-neon-purple hover:bg-white/10 transition-all duration-300 interactive"
            >
              <div className="flex items-start gap-4 mb-2 md:mb-0">
                <div className="mt-1 text-neon-purple group-hover:text-neon-blue transition-colors">
                  <Award size={20} />
                </div>
                <div>
                   <h3 className="text-lg md:text-xl font-bold font-display">{award.title}</h3>
                   <p className="text-gray-400 text-sm">{award.organization}</p>
                </div>
              </div>

              <div className="pl-9 md:pl-0 font-mono text-gray-500 text-sm group-hover:text-white transition-colors">
                {award.year}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
