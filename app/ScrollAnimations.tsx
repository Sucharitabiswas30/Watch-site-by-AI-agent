"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.from(".hero-copy > *", { y: 28, opacity: 0, duration: .85, stagger: .1, delay: .15, ease: "power2.out" });

      const revealGroup = (containerSelector: string, childSelector: string, from: gsap.TweenVars) => {
        gsap.utils.toArray<HTMLElement>(containerSelector).forEach((container) => {
          const targets = container.querySelectorAll(childSelector);
          if (!targets.length) return;
          gsap.from(targets, { opacity: 0, duration: .82, stagger: .08, ease: "power3.out", ...from, scrollTrigger: { trigger: container, start: "top 88%", once: true } });
        });
      };

      revealGroup(".campaign-editorial-copy", ":scope > *", { x: -58 });
      revealGroup(".campaign-carousel-head", ":scope > *", { y: 34, stagger: .12 });
      revealGroup(".section-heading", ":scope > *", { y: 32, skewY: 2 });
      revealGroup(".category-copy", ":scope > *", { x: -44, stagger: .11 });
      revealGroup(".spotlight-copy", ":scope > *", { x: 52, stagger: .07 });
      revealGroup(".journal-strip", ":scope > *", { x: 46, stagger: .13 });
      revealGroup(".newsletter", ":scope > *", { y: 24, scale: .94, stagger: .1 });
      revealGroup(".collection-hero-copy", ":scope > *", { x: -62, stagger: .1 });
      revealGroup(".collection-tools", ":scope > *", { y: -24 });
      revealGroup(".collection-note", ":scope > *", { y: 45, scale: .94, stagger: .12 });
      revealGroup(".product-detail-copy", ":scope > *", { x: 54, stagger: .06 });
      revealGroup(".product-story", ":scope > *", { y: 36, scale: .92, stagger: .1 });

      const wearerCards = gsap.utils.toArray<HTMLElement>(".wearer-card");
      if (wearerCards.length) gsap.from(wearerCards, { x: (index) => index % 2 ? 70 : -70, opacity: 0, duration: .9, stagger: .12, ease: "power3.out", scrollTrigger: { trigger: ".wearer-grid", start: "top 86%", once: true } });

      ScrollTrigger.batch(".product-card", {
        start: "top 92%",
        once: true,
        onEnter: (elements) => gsap.from(elements, { y: 42, opacity: 0, duration: .72, stagger: .08, ease: "power2.out", overwrite: true }),
      });

      ScrollTrigger.batch(".campaign-product-card", {
        start: "top 91%",
        once: true,
        onEnter: (elements) => gsap.from(elements, { x: 52, opacity: 0, duration: .76, stagger: .1, ease: "power3.out", overwrite: true }),
      });

      ScrollTrigger.batch(".collection-product", {
        start: "top 94%",
        once: true,
        onEnter: (elements) => gsap.from(elements, { scale: .92, rotation: .6, opacity: 0, duration: .68, stagger: .06, ease: "back.out(1.25)", overwrite: true }),
      });

      ScrollTrigger.batch(".related-grid > a", {
        start: "top 92%",
        once: true,
        onEnter: (elements) => gsap.from(elements, { x: 45, opacity: 0, duration: .7, stagger: .09, ease: "power2.out", overwrite: true }),
      });

      const revealFrames = (selector: string, from: gsap.TweenVars) => {
        gsap.utils.toArray<HTMLElement>(selector).forEach((frame) => gsap.from(frame, { opacity: .5, duration: .95, ease: "power3.out", ...from, scrollTrigger: { trigger: frame, start: "top 92%", once: true } }));
      };

      revealFrames(".product-image-wrap", { clipPath: "inset(100% 0 0 0)", y: 18 });
      revealFrames(".campaign-editorial-media", { clipPath: "inset(0 0 0 100%)" });
      revealFrames(".spotlight-image", { clipPath: "inset(0 100% 0 0)" });
      revealFrames(".collection-hero-image", { scale: .94, y: -18 });
      revealFrames(".collection-product-image", { clipPath: "inset(7% 7% 7% 7%)", scale: .97 });
      revealFrames(".product-main-image", { clipPath: "inset(0 0 18% 0)", y: 28 });
      revealFrames(".related-grid > a > div", { clipPath: "inset(0 0 100% 0)" });
      revealFrames(".explore-card", { clipPath: "polygon(0 0,0 0,0 100%,0 100%)", x: -20 });

      gsap.utils.toArray<HTMLElement>(".campaign-editorial-media,.spotlight-image,.collection-hero-image").forEach((frame) => {
        const image = frame.querySelector("img");
        if (!image) return;
        gsap.fromTo(image, { yPercent: -4, scale: 1.08 }, {
          yPercent: 4,
          scale: 1.08,
          ease: "none",
          scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: .8 },
        });
      });

      gsap.utils.toArray<HTMLElement>(".manifesto,.collection-note,.product-story").forEach((panel) => {
        gsap.fromTo(panel, { backgroundPosition: "center 35%" }, {
          backgroundPosition: "center 65%",
          ease: "none",
          scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });

      gsap.utils.toArray<HTMLElement>(".wearer-card,.category-image").forEach((panel) => {
        gsap.fromTo(panel, { backgroundPosition: "center 44%" }, {
          backgroundPosition: "center 56%",
          ease: "none",
          scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: .8 },
        });
      });

      gsap.utils.toArray<HTMLElement>(".parallax-watch-panel").forEach((panel) => {
        const details = panel.querySelectorAll(".parallax-watch-detail > *");
        const cta = panel.querySelector(".parallax-watch-cta");

        gsap.fromTo(panel, { backgroundPosition: "center 43%" }, {
          backgroundPosition: "center 57%",
          ease: "none",
          scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: .55 },
        });
        if (details.length) gsap.from(details, {
          y: 34,
          opacity: 0,
          duration: .78,
          stagger: .08,
          ease: "power3.out",
          scrollTrigger: { trigger: panel, start: "top 76%", once: true },
        });
        if (cta) gsap.from(cta, {
          x: 42,
          opacity: 0,
          duration: .72,
          ease: "power2.out",
          scrollTrigger: { trigger: panel, start: "top 76%", once: true },
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const refreshTimer = window.setTimeout(refresh, 250);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);
      context.revert();
    };
  }, []);

  return null;
}
