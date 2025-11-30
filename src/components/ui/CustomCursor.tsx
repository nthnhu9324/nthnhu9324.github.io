"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    window.addEventListener("mousemove", onMouseMove);

    // Add event listeners to all interactive elements
    const interactiveElements = document.querySelectorAll("a, button, .interactive");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return (
    <div
      id="custom-cursor"
      className={`custom-cursor ${isHovered ? "hovered" : ""}`}
    />
  );
}
