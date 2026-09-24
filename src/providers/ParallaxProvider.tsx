"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

interface ParallaxContextValue {
  scrollY: number;
  scrollProgress: number;
  windowHeight: number;
  documentHeight: number;
}

const ParallaxContext = createContext<ParallaxContextValue>({
  scrollY: 0,
  scrollProgress: 0,
  windowHeight: 0,
  documentHeight: 0,
});

export function useGlobalParallax() {
  return useContext(ParallaxContext);
}

interface ParallaxProviderProps {
  children: React.ReactNode;
}

export function ParallaxProvider({ children }: ParallaxProviderProps) {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setWindowHeight(window.innerHeight);
    setDocumentHeight(document.documentElement.scrollHeight);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setDocumentHeight(document.documentElement.scrollHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [reduced]);

  const value = useMemo(() => ({
    scrollY,
    scrollProgress: documentHeight > windowHeight
      ? scrollY / (documentHeight - windowHeight)
      : 0,
    windowHeight,
    documentHeight,
  }), [scrollY, windowHeight, documentHeight]);

  return (
    <ParallaxContext.Provider value={value}>
      {children}
    </ParallaxContext.Provider>
  );
}

// =============================================================================
// Parallax Components
// =============================================================================

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "section" | "article" | "main" | "aside" | "header" | "footer" | "nav";
}

export function ParallaxSection({
  children,
  speed = 0.1,
  className = "",
  style = {},
  as = "section"
}: ParallaxSectionProps) {
  const { scrollY } = useGlobalParallax();
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  const offset = reduced ? 0 : scrollY * speed;
  const Tag = as;

  return (
    <Tag
      className={className}
      style={{
        ...style,
        transform: `translateY(${offset}px)`,
        willChange: reduced ? "auto" : "transform",
      }}
    >
      {children}
    </Tag>
  );
}

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  rotate?: number;
  scale?: number;
}

export function ParallaxElement({
  children,
  speed = 0.2,
  className = "",
  style = {},
  rotate = 0,
  scale = 0,
}: ParallaxElementProps) {
  const { scrollY, windowHeight } = useGlobalParallax();
  const [reduced, setReduced] = useState(false);
  const [elementTop, setElementTop] = useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      setElementTop(ref.current.getBoundingClientRect().top + window.scrollY);
    }
  }, []);

  // Calculate parallax based on element position
  const relativeScroll = scrollY - elementTop + windowHeight;
  const progress = Math.max(0, Math.min(1, relativeScroll / (windowHeight * 2)));

  const offset = reduced ? 0 : (progress - 0.5) * speed * 100;
  const rotateValue = reduced ? 0 : (progress - 0.5) * rotate;
  const scaleValue = reduced ? 1 : 1 + (progress - 0.5) * scale;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `translateY(${offset}px) rotate(${rotateValue}deg) scale(${scaleValue})`,
        willChange: reduced ? "auto" : "transform",
      }}
    >
      {children}
    </div>
  );
}

// Fade in on scroll component
interface FadeInOnScrollProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  delay?: number;
}

export function FadeInOnScroll({
  children,
  className = "",
  style = {},
  threshold = 0.1,
  delay = 0,
}: FadeInOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      {children}
    </div>
  );
}
