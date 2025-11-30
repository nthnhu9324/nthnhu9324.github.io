"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/data/content";
import { cn } from "@/lib/utils";
import { ChevronDown, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function TimelineItem({ item, index, isLast }: { item: typeof content.experience[0]; index: number; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expanded) {
      gsap.fromTo(contentRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    } else {
       gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
    }
  }, [expanded]);

  return (
    <div className={`timeline-item relative pl-12 md:pl-0 md:grid md:grid-cols-2 gap-10 ${index % 2 === 0 ? "text-right" : "text-left md:text-left"} pb-12`}>
      {/* Center Line & Dot */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 flex flex-col items-center justify-start md:-translate-x-1/2">
        <div className="w-4 h-4 rounded-full bg-neon-purple border-4 border-black z-10 box-content shadow-[0_0_10px_#b026ff]" />
        {!isLast && <div className="w-px h-full bg-white/20 mt-1" />}
      </div>

      {/* Date (Left for Even, Right for Odd) */}
      <div className={`hidden md:block ${index % 2 === 0 ? "order-1 pr-10" : "order-2 pl-10 md:text-left"}`}>
        <span className="text-neon-blue font-mono text-sm tracking-widest uppercase mb-2 block">
          {item.period}
        </span>
      </div>

      {/* Content (Right for Even, Left for Odd) */}
      <div className={`md:col-span-1 ${index % 2 === 0 ? "order-2 pl-10 md:text-left" : "order-1 pr-10 md:text-right"}`}>
        {/* Mobile Date */}
        <div className="md:hidden flex items-center gap-2 text-neon-blue font-mono text-sm tracking-widest uppercase mb-2">
           <Calendar size={14} /> {item.period}
        </div>

        <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-1">
          {item.role}
        </h3>
        <h4 className="text-lg text-gray-400 mb-4">{item.company}</h4>

        <button
          onClick={() => setExpanded(!expanded)}
          className={`flex items-center gap-2 text-sm text-neon-purple font-bold uppercase tracking-wider hover:text-white transition-colors interactive ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
        >
          {expanded ? "Show Less" : "Read More"}
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
        </button>

        <div ref={contentRef} className="overflow-hidden h-0 mt-4">
           <p className="text-gray-400 text-sm leading-relaxed mb-4">
             {item.description}
           </p>
           <div className={`flex flex-wrap gap-2 ${index % 2 !== 0 ? "md:justify-end" : ""}`}>
             {item.highlights.map((tag, i) => (
               <span key={i} className="px-2 py-1 rounded bg-white/10 text-xs text-white/80">
                 {tag}
               </span>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate line drawing
      const items = gsap.utils.toArray<HTMLElement>(".timeline-item");

      items.forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.out",
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={containerRef} className="py-24 md:py-32 relative bg-black/50">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mb-20 text-center">
          <span className="text-neon-blue font-mono text-sm tracking-widest uppercase mb-4 block">
            My Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Experience <span className="text-gradient">Timeline</span>
          </h2>
        </div>

        <div className="relative">
          {content.experience.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isLast={index === content.experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
