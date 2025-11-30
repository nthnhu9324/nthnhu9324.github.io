"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter hover:text-neon-blue transition-colors duration-300 font-display interactive"
          onClick={(e) => handleScrollTo(e, "#hero")}
        >
          Jelly<span className="text-neon-purple">.</span>
        </Link>

        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className="text-sm uppercase tracking-widest hover:text-neon-blue transition-colors duration-300 interactive"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <Link
           href="#contact"
           onClick={(e) => handleScrollTo(e, "#contact")}
           className="hidden md:block px-5 py-2 rounded-full border border-white/20 text-sm hover:bg-white hover:text-black transition-all duration-300 interactive"
        >
          Let's Talk
        </Link>
      </div>
    </header>
  );
}
