"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { content } from "@/data/content";

function SkillBubble({ skill, index }: { skill: typeof content.skills[0]; index: number }) {
  const bubbleRef = useRef<HTMLDivElement>(null);

  // Random initial position offset
  const randomX = (Math.random() - 0.5) * 40;
  const randomY = (Math.random() - 0.5) * 40;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation
      gsap.to(bubbleRef.current, {
        y: "+=20",
        x: "+=10",
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });

      // Mouse interaction
      const onMouseMove = (e: MouseEvent) => {
        const rect = bubbleRef.current?.getBoundingClientRect();
        if (!rect) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

        if (dist < 150) {
            const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
            const force = (150 - dist) / 5;
            gsap.to(bubbleRef.current, {
                x: `-=${Math.cos(angle) * force}`,
                y: `-=${Math.sin(angle) * force}`,
                duration: 0.5,
                ease: "power2.out"
            });
        } else {
             gsap.to(bubbleRef.current, {
                x: 0,
                y: 0, // Should return to relative base, simplifying here
                duration: 1,
                ease: "elastic.out(1, 0.5)"
             });
        }
      };

      // Simple mouse repel effect implementation
      // For more complex physics, Matter.js would be better, but GSAP is fine for this lightness
    }, bubbleRef);

    return () => ctx.revert();
  }, []);

  // Size based on level
  const size = 100 + (skill.level / 100) * 80;

  return (
    <div
       ref={bubbleRef}
       className="relative flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-neon-purple/20 hover:border-neon-purple transition-colors duration-300 cursor-pointer group"
       style={{
         width: size,
         height: size,
         margin: '10px',
       }}
    >
       <div className="text-center z-10 p-2">
         <span className="block font-bold text-sm md:text-base group-hover:text-neon-blue transition-colors">{skill.name}</span>
         <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 block">{skill.type}</span>
       </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
        <span className="text-neon-blue font-mono text-sm tracking-widest uppercase mb-4 block">
            Tools & Expertise
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-bold">
            My <span className="text-gradient">Arsenal</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative min-h-[500px] flex flex-wrap justify-center items-center content-center gap-8">
         {content.skills.map((skill, i) => (
           <SkillBubble key={i} skill={skill} index={i} />
         ))}
      </div>
    </section>
  );
}
