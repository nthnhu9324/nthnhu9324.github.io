"use client";

import { content } from "@/data/content";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black pt-20 pb-10 overflow-hidden">
      {/* Marquee */}
      <div className="absolute top-0 left-0 w-full overflow-hidden py-4 bg-neon-purple/10 border-b border-neon-purple/20">
        <div className="animate-marquee whitespace-nowrap flex gap-10 text-neon-purple font-mono text-sm uppercase tracking-widest">
           <span>{content.footer.marquee}</span>
           <span>{content.footer.marquee}</span>
           <span>{content.footer.marquee}</span>
           <span>{content.footer.marquee}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-10 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-gray-400 max-w-md mb-8">
            {content.footer.contactText}
          </p>
          <div className="flex flex-col gap-2">
            <a href={`mailto:${content.personalInfo.email}`} className="text-xl hover:text-neon-blue transition-colors interactive">
              {content.personalInfo.email}
            </a>
            <a href={content.personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-xl hover:text-neon-blue transition-colors interactive">
              LinkedIn
            </a>
          </div>
        </div>

        <div id="contact" className="glass-panel p-8 rounded-2xl">
          <form className="flex flex-col gap-4">
             <div>
               <label className="block text-sm text-gray-500 mb-1">Name</label>
               <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-neon-purple transition-colors" placeholder="Your Name" />
             </div>
             <div>
               <label className="block text-sm text-gray-500 mb-1">Email</label>
               <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-neon-purple transition-colors" placeholder="your@email.com" />
             </div>
             <div>
               <label className="block text-sm text-gray-500 mb-1">Message</label>
               <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-neon-purple transition-colors" placeholder="Tell me about your project..."></textarea>
             </div>
             <button type="submit" className="bg-white text-black py-3 rounded-lg font-bold hover:bg-neon-blue hover:text-white transition-all duration-300 interactive">
               Send Message
             </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} {content.personalInfo.name}. All rights reserved.</p>
        <p>Built with Next.js, Tailwind & GSAP.</p>
      </div>
    </footer>
  );
}
