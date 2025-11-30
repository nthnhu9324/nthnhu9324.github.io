"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { content } from "@/data/content";
import Hero3DScene from "@/components/ui/Hero3DScene";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Typewriter/Reveal effect
      const tl = gsap.timeline();

      tl.from(textRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.5,
      });

      // Glitch effect loop for headline
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
           duration: 2.5,
           textShadow: "2px 0px 2px #b026ff, -2px 0px 2px #00d2ff",
           repeat: -1,
           yoyo: true,
           ease: "sine.inOut"
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* 3D Background */}
      <Hero3DScene />

      <div className="container relative z-10 px-6 md:px-12 grid md:grid-cols-1 gap-12 text-center">
        <div ref={textRef} className="flex flex-col items-center justify-center">
           <span className="inline-block py-1 px-3 rounded-full border border-white/20 bg-white/5 text-neon-blue text-sm font-mono tracking-widest mb-6 backdrop-blur-sm">
             DIGITAL MARKETER & COMMUNITY LEADER
           </span>

           <h1 ref={headlineRef} className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6">
             {content.hero.greeting}
           </h1>

           <h2 className="text-2xl md:text-4xl text-gray-300 font-light mb-8 max-w-3xl leading-snug">
             Bridging <span className="text-neon-purple font-semibold">Data-Driven Strategy</span> <br className="hidden md:block"/>
             & <span className="text-neon-blue font-semibold">Creative Storytelling</span>.
           </h2>

           <p className="text-gray-400 max-w-xl text-lg mb-10">
             {content.hero.subtext}
           </p>

           <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
             <a
               href="#about"
               className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neon-blue hover:text-white transition-all duration-300 transform hover:scale-105 interactive"
             >
               {content.hero.cta.primary}
             </a>
             <a
               href="#contact"
               className="px-8 py-4 border border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 interactive"
             >
               {content.hero.cta.secondary}
             </a>
           </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-white/50 w-6 h-6" />
      </div>
    </section>
  );
}
