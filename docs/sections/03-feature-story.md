# 03 — Feature story and most-loved slider

The `.campaign` section uses a responsive editorial-commerce composition inspired by the pacing of the supplied Timex reference while retaining original Aevum content and project-owned demo imagery.

- Desktop: full-height campaign image and copy on the left, two-card product carousel on the right.
- Tablet: the panels stack to protect the headline and product-card proportions.
- Mobile: the product rail becomes a touch-swipable single-card layout with a partial next-card preview.
- Navigation: previous and next buttons move one product at a time, reflect the rail's actual scroll position, and disable at either boundary.
- Products: every image/title opens the existing product detail route and every add button uses the shared cart state.
- Motion: CSS scroll snapping provides smooth native swipe behavior; the existing GSAP system gives the editorial image, heading, and product cards distinct entrance treatments.
