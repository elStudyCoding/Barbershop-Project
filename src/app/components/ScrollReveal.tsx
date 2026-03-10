"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-ready");

    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    if (elements.length === 0) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, current) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            current.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
