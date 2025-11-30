"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/data/content";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const totalWidth = scrollContainer.scrollWidth;
      const viewportWidth = window.innerWidth;

      // Horizontal Scroll Animation
      gsap.to(scrollContainer, {
        x: () => -(totalWidth - viewportWidth + 100), // Scroll to end + padding
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="py-24 md:py-32 overflow-hidden h-screen bg-black">
       <div className="container px-6 md:px-12 mb-10 md:absolute md:top-32 md:left-0 md:w-full md:z-10 pointer-events-none">
          <span className="text-neon-blue font-mono text-sm tracking-widest uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Featured <span className="text-gradient">Work</span>
          </h2>
       </div>

       <div className="h-full flex items-center">
         <div ref={scrollContainerRef} className="flex gap-8 px-6 md:px-12 w-max pt-20 md:pt-0">
           {content.projects.map((project, i) => (
             <div
               key={project.id}
               className="group relative w-[85vw] md:w-[600px] aspect-video md:aspect-[16/9] rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0 interactive"
             >
               {/* Placeholder Image Overlay */}
               <div className="absolute inset-0 bg-gradient-to-br from-[#222] to-[#111] group-hover:scale-105 transition-transform duration-700">
                  {/* Abstract shapes for placeholder */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_#b026ff_0%,_transparent_50%)]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-bold text-white/5 select-none">
                    0{i + 1}
                  </div>
               </div>

               {/* Content Overlay */}
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <span className="text-neon-blue text-xs font-mono uppercase tracking-wider mb-2 block">
                          {project.category}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold font-display text-white">
                          {project.title}
                        </h3>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-neon-blue">
                         <ArrowUpRight size={24} />
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm md:text-base max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-4">
                      {project.description}
                    </p>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 rounded bg-black/50 backdrop-blur-sm border border-white/10 text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
               </div>
             </div>
           ))}
           {/* End padding for scroll */}
           <div className="w-[10vw]"></div>
         </div>
       </div>
    </section>
  );
}
